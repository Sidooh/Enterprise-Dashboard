import { defineStore } from "pinia";
import axios from "axios";

export type LoginData = { email: string, password: string }
export type RegistrationData = LoginData & { name: string, country: string, address: string }

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: '',
        user: {}
    }),

    actions: {
        async authenticate(email: string, password: string) {
            try {
                const { data: response } = await axios.post("auth/login", {
                        email,
                        password
                    }),
                    data = response.data

                this.token = data.token
                this.user = {
                    token: data.token
                }

                localStorage.setItem("TOKEN", data.token);

                axios.defaults.headers.common['Authorization'] = "Bearer " + data.token;
            } catch (error: any) {
                if ([400, 422].includes(error.response.status) && error.response.data) {
                    throw new Error(error.response.data.errors[0].message)
                }
                if (error.response.status === 401 && error.response.data) {
                    throw new Error(error.response.data.message)
                }
            }
        },
        async register(data: RegistrationData) {
            try {
                console.log(data)
            } catch (error: any) {
                if ([400, 422].includes(error.response.status) && error.response.data) {
                    throw new Error(error.response.data.errors[0].message)
                }
            }
        },
        async verify(otp: string) {
            console.log(otp)

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