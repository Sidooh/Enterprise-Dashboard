import { defineStore } from "pinia";
import moment from "moment";
import client from "@/utils/client";
import router from "@/router";
import { JWT } from "@nabcellent/sui-vue";
import { logger } from "@/utils/logger";

export type LoginData = { email: string, password: string }
export type RegistrationData = LoginData & { name: string, country: string, address: string }
export type User = {
    email: string,
    enterprise: { id: number, name: string, phone: string },
    id: number, name: string, roles: string[]
} | null

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: <string | null>null,
        user: <User>{},
    }),

    actions: {
        async login(data: LoginData) {
            try {
                const { data: response } = await client.post("auth/login", data)

                if (response?.status) {
                    const { data } = response

                    this.token = data.token

                    await this.sendOTP(data.user.id, 'SMS')

                    localStorage.setItem("user", JSON.stringify(data.user));
                } else {
                    logger.warn(response)
                }
            } catch (err: any) {
                logger.error(err.response)

                if ([400, 422].includes(err.response?.status) && Boolean(err.response.data)) {
                    throw new Error(err.response.data.errs[0].message)
                } else if (err.response?.status === 401 && err.response.data) {
                    throw new Error('Invalid credentials!')
                } else if (err.response?.status === 429) {
                    throw new Error("Sorry! We failed to log you in. Please try again in a few minutes.")
                } else {
                    throw new Error('Something went wrong!')
                }
            }
        },
        async register(data: RegistrationData) {
            try {
                const { data: response } = await client.post("auth/register", data)
                logger.info(response)

                if (response?.status) {
                    const { data } = response

                    localStorage.setItem("user", JSON.stringify(data.User));

                    return data
                } else {
                    logger.warn(response)
                }
            } catch (err: any) {
                logger.error(err.response)

                if ([400, 422].includes(err.response?.status) && Boolean(err.response.data)) {
                    throw new Error(err.response.data.errs[0].message)
                }
            }
        },
        async sendOTP(userId: number, channel: string) {
            await client.post('auth/otp/generate', { id: userId, channel })
        },
        async verifyOTP(otp: number) {
            const id = (JSON.parse(String(localStorage.getItem("user"))) as User)?.id

            const { data: response } = await client.post("auth/otp/verify", { id, otp })

            if (response?.status) {
                const { token, user } = response.data

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                this.token = token
                this.user = user
            } else {
                logger.warn(response)
            }
        },
        async verifyUser(phone_otp: number, email_otp: number) {
            try {
                const id = (JSON.parse(String(localStorage.getItem("user"))) as User)?.id

                const { data: { data: response } } = await client.post("auth/verify", { id, phone_otp, email_otp })

                logger.log(response)
            } catch (err: any) {
                logger.error(err)

                if ([400, 422].includes(err.response?.status) && Boolean(err.response.data)) {
                    throw new Error(err.response.data.errs[0].message)
                }
            }
        },
        checkLocalAuth() {
            this.token = localStorage.getItem("token")
            this.user = JSON.parse(String(localStorage.getItem("user")))

            if (this.token) {
                const tokenData = JWT.decode(this.token)
                const expiresIn = moment.unix(tokenData.exp).diff(moment(), 'minutes');

                logger.log(`Session expires in: ${expiresIn} minutes`);

                if (moment.unix(tokenData.exp).isBefore(moment())) this.logout()
            }
        },
        logout() {
            this.$reset()

            localStorage.removeItem('user')
            localStorage.removeItem('token')

            router.push({ name: 'login' })
        }
    }
})