import { defineStore } from "pinia";
import axios from "axios";
import { logger } from "@/utils/logger";
import Swal from "sweetalert2";
import { FloatTransaction, VoucherTransaction } from "@/utils/types";

type DashboardStats = {
    float_balance: number
    accounts_count: number
    vouchers_disbursed: number
}

export const useEnterpriseStore = defineStore("enterprise", {
    state: () => ({
        dash_stats: <DashboardStats>{},
        recent_voucher_transactions: <VoucherTransaction[]>[],
        recent_float_transactions: <FloatTransaction[]>[],
    }),
    actions: {
        async fetchDashboardStatistics() {
            try {
                // await new Promise(r => setTimeout(r, 3000));
                const { data } = await axios.get('/dashboard/statistics')

                this.dash_stats = data.data

                logger.info(this.dash_stats)

                return data.data
            } catch (e) {
                logger.error(e)
            }
        },
        async fetchRecentVoucherTransactions() {
            try {
                // await new Promise(r => setTimeout(r, 5000));
                const { data } = await axios.get('/dashboard/recent-voucher-transactions?limit=100')

                this.recent_voucher_transactions = data.data

                logger.info(this.recent_voucher_transactions)

                return data.data
            } catch (e) {
                logger.error(e)
            }
        },
        async fetchRecentFloatTransactions() {
            try {
                // await new Promise(r => setTimeout(r, 2000));
                const { data } = await axios.get('/dashboard/recent-float-transactions?limit=100')

                this.recent_float_transactions = data.data

                logger.info(this.recent_float_transactions)

                return data.data
            } catch (e) {
                logger.error(e)
            }
        },
        creditFloat: async (amount: number, phone: number) => {
            try {
                const { data } = await axios.post('/float-account/credit', { amount, phone })

                logger.info(data)

                await Swal.fire({
                    icon: "info",
                    title: "Info",
                    html: 'Your request has been received and is being processed. <b>PLEASE ENTER MPESA PIN</b> when prompted, then click OK.',
                    showLoaderOnConfirm: true,
                    showCancelButton: true,
                    backdrop: `rgba(0, 0, 123, 0.4)`,
                    allowOutsideClick: () => !Swal.isLoading(),
                })

                return data.data
            } catch (e: any) {
                logger.error(e)
                if (e.response.status === 422 && Boolean(e.response.data)) {
                    throw new Error(e.response.data.errors[0].message)
                } else {
                    throw new Error("Something went wrong.")
                }
            }
        }
    }
})