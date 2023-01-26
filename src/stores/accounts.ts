import { defineStore } from "pinia";
import { Account, AccountRequest } from "@/utils/types";
import { logger } from "@nabcellent/sui-vue";
import client from "@/utils/client";

export const useAccountStore = defineStore("account", {
    state: () => ({
        account: <Account>{},
        accounts: <Account[]>[],
    }),

    actions: {
        async fetchAccounts() {
            try {
                const { data } = await client.get('/accounts')

                this.accounts = data.data

                return data.data
            } catch (e) {
                logger.error(e)
            }
        },
        async fetchAccount(id: number) {
            try {
                const { data } = await client.get(`/accounts/${id}`)

                logger.info(data.data)
                this.account = data.data

                return data.data
            } catch (e) {
                logger.error(e)
            }
        },
        async create(requestData: AccountRequest) {
            try {
                let url = '/accounts'

                if (requestData?.accounts?.length) url += '/bulk'

                const { data } = await client.post(url, requestData)

                this.accounts.push(data.data)

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