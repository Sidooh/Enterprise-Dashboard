import { defineStore } from "pinia";
import axios from "axios";
import { Account } from "@/utils/types";
import { logger } from "@/utils/logger";

export const useAccountStore = defineStore("account", {
    state: () => ({
        accounts: <Account[]>[],
    }),

    actions: {
        async fetchAccounts() {
            try {
                const { data } = await axios.get('accounts')

                logger.log(data.data)

                this.accounts = data.data
            } catch (e) {
                logger.error(e)
            }
        },
        async create(account: Account) {
            try {
                const { data } = await axios.post('/accounts', account)

                this.accounts.push(data.data)
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