import type { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import Swal from 'sweetalert2';
import { Telco } from "@/utils/enums";
import axios from "axios";
import { parsePhoneNumber } from "libphonenumber-js";
import { logger } from "@/utils/logger";

export const toast = async (data: SweetAlertOptions) => {
    const options = {
        ...data,
        icon: data.icon ?? 'success',
        timer: (data.timer ?? 7) * 1000, // 7 secs,
        position: data.position ?? 'bottom-right',
        toast: data.toast ?? true,
        title: data.title,
        showConfirmButton: data.showConfirmButton ?? false,
    };

    await Swal.fire(options);
};

export const currencyFormat = (number?: number, currency = 'KES', decimals = 0) => number && (new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    maximumFractionDigits: decimals
})).format(number);

export const getTelcoFromPhone = (phone: string | number) => {
    phone = String(phone);

    const safRegEx = /^(?:254|\+254|0)?((?:7(?:[0129]\d|4[0123568]|5[789]|6[89])|(1(1[0-5])))\d{6})$/,
        airtelRegEx = /^(?:254|\+254|0)?((?:(7(?:(3\d)|(5[0-6])|(6[27])|(8\d)))|(1(0[0-6])))\d{6})$/,
        telkomRegEx = /^(?:254|\+254|0)?(7(7\d)\d{6})$/,
        equitelRegEx = /^(?:254|\+254|0)?(7(6[3-6])\d{6})$/,
        faibaRegEx = /^(?:254|\+254|0)?(747\d{6})$/;

    if (phone.match(safRegEx)) {
        return Telco.SAFARICOM;
    } else if (phone.match(airtelRegEx)) {
        return Telco.AIRTEL;
    } else if (phone.match(telkomRegEx)) {
        return Telco.TELKOM;
    } else if (phone.match(equitelRegEx)) {
        return Telco.EQUITEL;
    } else if (phone.match(faibaRegEx)) {
        return Telco.FAIBA;
    } else {
        return null;
    }
};

export const getItemFromStore = (key: string, defaultValue?: string | boolean, store = localStorage) => {
    try {
        return JSON.parse(String(store.getItem(key))) || defaultValue;
    } catch {
        return store.getItem(key) || defaultValue;
    }
};
export const setItemToStore = (key: string, payload: string, store = localStorage) => store.setItem(key, payload);

export const JWT = {
    decode: (token: string) => {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    },
};

export class MpesaService {
    baseUrl = 'https://mpesa-node-api.herokuapp.com/api/v1/mpesa';
    checkoutRequestId = null;
    phone;
    amount = 1;
    onSuccess = () => {
    };

    constructor({ amount, phone, onSuccess }: { amount: number, phone: string, onSuccess: () => {} }) {
        this.amount = amount;
        this.phone = parsePhoneNumber(phone, 'KE').number;
        this.onSuccess = onSuccess
    }

    init = async () => {
        try {
            const { data: { checkout_request_id } } = await axios.post(`${this.baseUrl}/initiate-stk`, {
                phone: this.phone,
                amount: this.amount,
            });

            this.checkoutRequestId = checkout_request_id;

            return await this.alert();
        } catch (err: any) {
            logger.error(err);

            const msg = (err.response?.data?.errors && err.response?.data?.errors[0].message) ||
                (err.response && err.response.data && err.response.data.message) ||
                err.message || err.toString();

            toast({ titleText: msg });
        }
    };

    queryStkStatus = async () => {
        return axios.post(`${this.baseUrl}/query-request`, { checkout_request_id: this.checkoutRequestId, })
            .then(({ data }) => data);
    };

    alert = (titleText = "Your request has been received and is being processed. PLEASE ENTER MPESA PIN when prompted, then click OK."): Promise<SweetAlertResult | undefined> => {
        return Swal.fire({
            icon: "info",
            title: "Info",
            titleText,
            showLoaderOnConfirm: true,
            showCancelButton: true,
            backdrop: `rgba(0, 0, 123, 0.4)`,
            preConfirm: () => {
                return this.queryStkStatus().catch(async err => {
                    logger.error(err);

                    await Swal.fire({
                        icon: 'error',
                        titleText: 'Something went wrong!',
                        toast: false,
                        text: 'Oops...',
                        position: 'center',
                        timer: 3000,
                        backdrop: `rgba(150, 0, 0, 0.4)`,
                        footer: '<a href="/contact-us">Report this issue?</a>'
                    });

                    return false;
                });
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then(async (result) => {
            if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
                await Swal.fire({
                    position: 'top-end',
                    icon: 'info',
                    title: 'Payment Cancelled',
                    text: 'RewAd',
                    timer: 3000,
                    showConfirmButton: false
                });
            } else if (result.isConfirmed) {
                return await this.confirmResponse(result.value);
            } else {
                return await this.queryStkStatus().then(async result => await this.confirmResponse(result));
            }
        });
    };

    async confirmResponse(resp: any) {
        logger.log('response', resp)
        const { ResultCode, errorCode } = resp;

        let icon: SweetAlertIcon, title, showConfirmButton = false;

        if (errorCode && errorCode === '500.001.1001') {
            return this.alert('Payment still in process. Please retry after 3 seconds.');
        } else if (ResultCode === "1032") {
            icon = 'info';
            title = 'Payment Cancelled!';
        } else if (ResultCode === "0") {
            icon = 'success';
            title = 'Payment Successful!';

            this.onSuccess();
        } else {
            icon = 'warning';
            title = 'Something went wrong!';
            showConfirmButton = true;
        }

        await Swal.fire({
            icon,
            title,
            text: 'SIDOOH',
            timer: 3000,
            showConfirmButton
        });
    }
}