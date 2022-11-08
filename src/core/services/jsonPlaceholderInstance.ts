import axios, { AxiosError, AxiosInterceptorOptions, AxiosRequestConfig } from "axios"
import applyCaseMiddleware from 'axios-case-converter';

export const BASE_URL = 'https://jsonplaceholder.typicode.com/'

const converterOptions = {
  preservedKeys: [
    '_destroy',
    'success_action_status',
    'x-amz-credential',
    'x-amz-algorithm',
    'x-amz-date',
    'x-amz-signature',
  ],
};

const jsonPlaceholderInstance = axios.create({
  baseURL: BASE_URL
})


const requestSuccessInterceptor = async (request?: AxiosRequestConfig) => {
  // Do Success Request Interception Here
  return request
}

const requestFailedInterceptor = (error: AxiosError) => {
  // Do Error Request Interception Here
  return error
}

const requestOptions: AxiosInterceptorOptions = {}

jsonPlaceholderInstance.interceptors.request.use(
  requestSuccessInterceptor,
  requestFailedInterceptor,
  requestOptions
)


export default applyCaseMiddleware(jsonPlaceholderInstance, converterOptions)