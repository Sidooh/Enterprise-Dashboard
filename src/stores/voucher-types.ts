import { defineStore } from "pinia";
import { VoucherType } from "@/utils/types";
import { logger } from "@/utils/logger";
import client from "@/utils/client";

export const useVoucherTypeStore = defineStore("voucher-type", {
    state: () => ({
        voucher_type: <VoucherType | undefined>undefined,
        voucher_types: <VoucherType[]>[],
    }),

    actions: {
        async fetchVoucherType(id: number) {
            try {
                // await new Promise(r => setTimeout(r, 1000));
                const { data } = await client.get(`voucher-types/${id}`)

                this.voucher_type = data.data
                logger.info(this.voucher_type)

                return data.data
            } catch (e) {
                logger.error(e)
            }
        },
        async fetchVoucherTypes() {
            try {
                const { data } = await client.get('voucher-types')

                this.voucher_types = data.data

                return data.data
            } catch (e) {
                logger.error(e)
            }
        },
        async create(voucherType: VoucherType) {
            try {
                const { data } = await client.post('/voucher-types', voucherType)

                this.voucher_types.push(data.data)

                return data.data
            } catch (e: any) {
                logger.error(e)
                if (e.response.status === 422 && Boolean(e.response.data)) {
                    throw new Error(e.response.data.errors[0].message)
                } else {
                    throw new Error("Something went wrong.")
                }
            }
        },
        async disburse(voucherTypeId: number, account_id: number, amount: number) {
            try {
                const { data } = await client.post(`/voucher-types/${voucherTypeId}/disburse`, {
                    account_id, amount
                })

                logger.info(data)
                if (data.status) {
                    if (this.voucher_type) {
                        let i = this.voucher_type.vouchers?.findIndex(v => v.account_id === account_id)

                        if (this.voucher_type) this.voucher_type.vouchers[i].balance += Number(data.data.amount)
                    }
                }

                return data.data
            } catch (e: any) {
                logger.error(e)

                if ([400, 422].includes(e.response?.status) && Boolean(e.response.data)) {
                    throw new Error(e.response.data.message)
                } else if (e.response?.status === 401 && e.response.data) {
                    throw new Error('Invalid credentials!')
                } else if (e.response?.status === 429) {
                    throw new Error("Sorry! We failed to log you in. Please try again in a few minutes.")
                } else {
                    throw new Error('Something went wrong!')
                }
            }
        },
    }
})