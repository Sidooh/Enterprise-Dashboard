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
        async login(data: LoginData) {
            try {
                const { data: response } = await axios.post("auth/login", data)

                if (response.status) {
                    const { data } = response

                    this.sendOTP(data.user.id, 'SMS')

                    localStorage.setItem("TOKEN", data.token);
                    localStorage.setItem("userId", data.user.id);

                    axios.defaults.headers.common['Authorization'] = "Bearer " + data.token;
                } else {
                    logger.warn(response)
                }
            } catch (err: any) {
                if ([400, 422].includes(err.response.status) && Boolean(err.response.data)) {
                    throw new Error(err.response.data.errs[0].message)
                }
                if (err.response.status === 401 && err.response.data) {
                    throw new Error(err.response.data.message)
                }
                if(err.response.status === 429) {
                    throw new Error("Sorry! We failed to log you in. Please try again in a few minutes.")
                }
            }
        },
        async register(data: RegistrationData) {
            try {
                const { data: response } = await axios.post("auth/register", data)
                logger.info(response)

                if (response.status) {
                    const { data } = response

                    localStorage.setItem("userId", data.User.id);

                    return data
                } else {
                    logger.warn(response)
                }
            } catch (err: any) {
                logger.error(err.response)

                if ([400, 422].includes(err.response.status) && Boolean(err.response.data)) {
                    throw new Error(err.response.data.errs[0].message)
                }
            }
        },
        sendOTP(userId: number, channel: string) {
            axios.post('auth/otp/generate', { id: userId, channel })
        },
        async verifyOTP(otp: number) {
            const id = Number(localStorage.getItem("userId"))

            const { data: { data: response } } = await axios.post("auth/otp/verify", { id, otp })

            logger.log(response)

            this.token = response.token
            this.user = {
                token: response.token
            }

            localStorage.setItem("AUTH", JSON.stringify(response));

            axios.defaults.headers.common['Authorization'] = "Bearer " + response.token;
        },
        async verifyUser(phone_otp: number, email_otp: number) {
            try{
                const id = Number(localStorage.getItem("userId"))

                const { data: { data: response } } = await axios.post("auth/verify", { id, phone_otp, email_otp })

                logger.log(response)
            } catch(err:any) {
                logger.error(err.response)

                if ([400, 422].includes(err.response.status) && Boolean(err.response.data)) {
                    throw new Error(err.response.data.errs[0].message)
                }
            }
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