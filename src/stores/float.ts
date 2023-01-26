import { defineStore } from "pinia";
import { FloatAccount, FloatTransaction } from "@/utils/types";
import { logger } from "@nabcellent/sui-vue";
import client from "@/utils/client";

export const useFloatStore = defineStore("float", {
    state: () => ({
        float_account: <FloatAccount>{},
        transactions: <FloatTransaction[]>[],
    }),

    actions: {
        async fetchAccount() {
            try {
                const { data } = await client.get('/float-account')

                this.float_account = data.data

                return data.data
            } catch (e) {
                logger.error(e)
            }
        },
        async fetchTransactions() {
            try {
                const { data } = await client.get('/float-account/transactions')

                this.transactions = data.data

                logger.info(this.transactions)

                return data.data
            } catch (e) {
                logger.error(e)
            }
        },
    }
})