import { defineStore } from "pinia";
import axios from "axios";

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
                if (error.response.status === 400 && error.response.data) {
                    throw new Error(error.response.data.errors[0].message)
                }
                if (error.response.status === 401 && error.response.data) {
                    throw new Error(error.response.data.message)
                }
            }
        },
        async verify(otp: string) {
            console.log(otp)
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