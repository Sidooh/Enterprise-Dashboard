import { defineStore } from "pinia";
import { FloatTransaction } from "@/utils/types";
import { logger } from "@/utils/logger";
import client from "@/utils/client";

export const useFloatStore = defineStore("float", {
    state: () => ({
        transactions: <FloatTransaction[]>[],
    }),

    actions: {
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