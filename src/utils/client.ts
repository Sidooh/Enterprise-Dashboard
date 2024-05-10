import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const client = axios.create({
    baseURL: import.meta.env.VITE_ENTERPRISE_API_URL,
    headers: {
        Accept: 'application/json',
        post: {
            ContentType: 'application/json'
        }
    }
})

/** Adding the request interceptors
 *
 * Auth interceptors
 * @description Add auth tokens to every outgoing request.
 * @param {*} config
 */
client.interceptors.request.use(config => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${useAuthStore().token}`
        config.headers.common?.setAccept('Application/json')
        config.headers['Access-Control-Allow-Origin'] = '*'
    }

    return config
})

/**
 * Logger interceptors
 * @description Log app requests.
 * @param {*} config
 */
client.interceptors.request.use(config => config)

/** Adding the response interceptors */
client.interceptors.response.use(response => {
        if (response.data && response.data.errors) return Promise.reject(response.data)

        return response
    }, error => {
        if (error.response?.status === 401) {
            useAuthStore().logout()
        }

        const errorMessage = error.response.data.message

        error.response.data.message = errorMessage?.length > 200
            ? JSON.parse(errorMessage.split('code :').pop()).error.message.split(':')[0]
            : errorMessage

        return Promise.reject(error)
    }
)
/*axios.interceptors.response.use(response => {
        if (response.data && response.data.errors) return Promise.reject(response.data)

        return response
    }, async error => {
        if (error.response) {
            if (error.response.status === 401) {
                const authStore = useAuthStore()

                authStore.logout()
            }
        }

        return Promise.reject(error)
    }
)*/
export default client