import { defineStore } from "pinia";
import axios from "axios";
import { VoucherType } from "@/utils/types";
import { logger } from "@/utils/logger";

export const useVoucherTypeStore = defineStore("voucher-type", {
    state: () => ({
        voucher_type: <VoucherType>{},
        voucher_types: <VoucherType[]>[],
    }),

    actions: {
        async fetchVoucherType(id: number) {
            try {
                await new Promise(r => setTimeout(r, 1000));
                const { data } = await axios.get(`voucher-types/${id}`)

                this.voucher_type = data.data
                logger.info(this.voucher_type)

                return data.data
            } catch (e) {
                logger.error(e)
            }
        },
        async fetchVoucherTypes() {
            try {
                const { data } = await axios.get('voucher-types')

                this.voucher_types = data.data

                return data.data
            } catch (e) {
                logger.error(e)
            }
        },
        async fetchVouchers() {

        },
        async create(voucherType: VoucherType) {
            try {
                const { data } = await axios.post('/voucher-types', voucherType)

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
        }
    }
})