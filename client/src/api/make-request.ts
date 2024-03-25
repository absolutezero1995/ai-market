import axios, { AxiosRequestConfig } from 'axios'

console.log('!!!!!!!!!!!')
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true // Отправлять куки с каждым запросом
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId')
    console.log('INTERSEPTOR11')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    console.log(config, 'CONFIG15')
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Проверяем, истек ли accessToken и не происходит ли уже обновление токена
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        // Отправляем запрос на обновление токенов
        await api.post('api/users/refresh-token')
        // Повторяем оригинальный запрос с обновлённым accessToken
        return api(originalRequest)
      } catch (e) {
        return Promise.reject(e)
      }
    }
    return Promise.reject(error)
  }
)

export async function makeRequest<T = unknown>(
  url: string,
  options: AxiosRequestConfig = {}
): Promise<T> {
  try {
    const res = await api(url, options)
    return res.data as T
  } catch (error) {
    throw error instanceof Error ? error.message : 'Error'
  }
}