import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{message: string; errors: unknown}>) => {
        if(error.response) {
            toast.error(`Error ${error.status}: ${error.response.data.message || 'An error has occured'}`);
        } else {
            toast.error('Error : Unable to contact server');
        }

        return Promise.reject(error);
    }
)

export const setupInterceptors = (getToken: () => Promise<string>) => {
    api.interceptors.request.use(
        async (config) => {
            const token = await getToken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};

// add a second `options` argument here if you want to pass extra options to each generated query
export const AXIOS_INSTANCE = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
    const source = axios.CancelToken.source();
    const baseURL = import.meta.env.VITE_API_URL.endsWith('/api')
        ? import.meta.env.VITE_API_URL.slice(0, -4)
        : import.meta.env.VITE_API_URL;
    const promise = api({
        ...config,
        ...options,
        cancelToken: source.token,
        baseURL
    }).then(({ data }) => data);

    // @ts-expect-error -- see orval documentation
    promise.cancel = () => {
        source.cancel('Query was cancelled');
    };

    return promise;
};

export default api;