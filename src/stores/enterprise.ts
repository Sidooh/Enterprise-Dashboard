import { defineStore } from "pinia";
import axios from "axios";
import { logger } from "@/utils/logger";
import Swal from "sweetalert2";
import { FloatTransaction } from "@/utils/types";

export const useEnterpriseStore = defineStore("enterprise", {
    state: () => ({
        recent_transactions: <FloatTransaction[]>[],
    }),
    actions: {
        async fetchRecentTransactions() {
            try {
                const { data } = await axios.get('/float-account/transactions?limit=1')

                this.recent_transactions = data.data

                logger.info(this.recent_transactions)

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