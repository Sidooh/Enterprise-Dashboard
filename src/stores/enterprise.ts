import { defineStore } from "pinia";
import { logger } from "@/utils/logger";
import Swal from "sweetalert2";
import { FloatTransaction, VoucherTransaction } from "@/utils/types";
import client from "@/utils/client";
import { groupBy } from "@/utils/helpers";
import moment from "moment";
import { TransactionType } from "@/utils/enums";

type DashboardStats = {
    float_balance: number
    accounts_count: number
    vouchers_disbursed: number
}

export const useEnterpriseStore = defineStore("enterprise", {
    state: () => ({
        chart_datasets: <{ [k: string]: { labels: string[], data: number[] } }>{},
        dash_stats: <DashboardStats>{},
        recent_voucher_transactions: <VoucherTransaction[]>[],
        recent_float_transactions: <FloatTransaction[]>[],
    }),
    actions: {
        async fetchChartData() {
            const { data: res } = await client.get('/voucher-transactions')

            if (res.status) {
                const data: VoucherTransaction[] = res.data.filter((vT: VoucherTransaction) => {
                    const isForLastSixMonths = moment(vT.created_at).isAfter(moment().subtract(6, 'M')),
                        isVoucherCredit = vT.type === TransactionType.CREDIT

                    return isForLastSixMonths && isVoucherCredit
                })
                    .map((d: VoucherTransaction) => ({ ...d, date: moment(d.created_at).format('MMM YY') }))

                const grouped = groupBy(data, 'voucher.voucher_type.name'),
                    voucherTypes = Object.keys(grouped);

                const getDatasets = (rawData: any) => {
                    const byMonth = groupBy(rawData, 'date');

                    Object.keys(byMonth).forEach(m => {
                        byMonth[m] = byMonth[m].reduce((prev: number, current: VoucherTransaction) => prev + current.amount, 0)
                    })

                    let labels = [], data = []
                    for (let i = 5; i >= 0; i--) {
                        const month = moment().subtract(i, 'M').format('MMM YY')

                        labels.push(month)
                        data.push(!byMonth[month] ? 0 : byMonth[month])
                    }

                    return { labels, data }
                }

                this.chart_datasets['ALL'] = getDatasets(data)

                voucherTypes.forEach(vT => {
                    this.chart_datasets[vT] = getDatasets(grouped[vT])
                })

                console.log(this.chart_datasets)
            }
        },
        async fetchDashboardStatistics() {
            try {
                // await new Promise(r => setTimeout(r, 3000));
                const { data } = await client.get('/dashboard/statistics')

                this.dash_stats = data.data

                return data.data
            } catch (e) {
                logger.error(e)
            }
        },
        async fetchRecentVoucherTransactions() {
            try {
                // await new Promise(r => setTimeout(r, 5000));
                const { data } = await client.get('/dashboard/recent-voucher-transactions?limit=100')

                this.recent_voucher_transactions = data.data

                return data.data
            } catch (e) {
                logger.error(e)
            }
        },
        async fetchRecentFloatTransactions() {
            try {
                // await new Promise(r => setTimeout(r, 2000));
                const { data } = await client.get('/dashboard/recent-float-transactions?limit=100')

                this.recent_float_transactions = data.data

                return data.data
            } catch (e) {
                logger.error(e)
            }
        },
        creditFloat: async (amount: number, phone: number) => {
            try {
                const { data } = await client.post('/float-account/credit', { amount, phone })

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