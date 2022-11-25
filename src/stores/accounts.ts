import { defineStore } from "pinia";
import axios from "axios";
import { Account } from "@/utils/types";

export const useAccountsStore = defineStore("account", {
    state: () => ({
        accounts: <Account[]>[],
    }),

    actions: {
        async fetchAccounts() {
            console.log('fetch accounts')

            try {
                const data = await axios.get('accounts')
                this.accounts = data.data
            } catch (e) {
                console.error(e)
            }
        }
    }
})