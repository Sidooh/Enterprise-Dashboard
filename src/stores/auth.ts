import { defineStore } from "pinia";
import axios from "axios";
import { logger } from "@/utils/logger";

export type LoginData = { email: string, password: string }
export type RegistrationData = LoginData & { name: string, country: string, address: string }

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: '',
        user: {}
    }),

    actions: {
        async authenticate(data: LoginData) {
            try {
                const { data: { data: response } } = await axios.post("auth/login", data)

                this.token = response.token
                this.user = {
                    token: response.token
                }

                localStorage.setItem("TOKEN", response.token);

                axios.defaults.headers.common['Authorization'] = "Bearer " + response.token;
            } catch (err: any) {
                if ([400, 422].includes(err.response.status) && Boolean(err.response.data)) {
                    throw new Error(err.response.data.errs[0].message)
                }
                if (err.response.status === 401 && err.response.data) {
                    throw new Error(err.response.data.message)
                }
            }
        },
        async register(data: RegistrationData) {
            try {
                logger.log(data)
                const { data: response } = await axios.post("auth/register", data)
                logger.info(response)

                if (response.status) {
                    return response
                } else {
                    logger.warn(response)
                }
            } catch (err: any) {
                if ([400, 422].includes(err.response.status) && Boolean(err.response.data)) {
                    let errors = err.response.data.errors
                    logger.log(errors)
                    return Array.isArray(errors) ? errors.map(e => e.message) : [errors.message]
                }
            }
        },
        async verify(otp: string) {
            logger.log(otp)

            return await new Promise((r) => setTimeout(r, 1000))
        },
        checkLocalAuth() {
            const token = localStorage.getItem("TOKEN")

            if (token) this.token = token
        },
        logout() {
            this.$reset()

            localStorage.removeItem('TOKEN')
        }
    }
})