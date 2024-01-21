import axios, {
  CreateAxiosDefaults,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { useUserStore } from '@/store/user';
import { antdUtils } from './antd';
import { TokenVO } from '@/pages/login/api';

export interface R<T> {
  code: number;
  data: T;
  msg: string;
}

export type Response<T> = Promise<[boolean, T, AxiosResponse<T>]>;

interface RequestQueueItem {
  resolve: (value: any | PromiseLike<any>) => void;
  config: InternalAxiosRequestConfig;
  type: 'request' | 'response';
}

class Request {
  private isRefreshToken = false;
  private requestQueue: RequestQueueItem[] = [];
  private axiosInstance: AxiosInstance;
  constructor(config?: CreateAxiosDefaults) {
    this.axiosInstance = axios.create(config);
    this.axiosInstance.interceptors.request.use(config => this.requestInterceptor(config));
    this.axiosInstance.interceptors.response.use(
      response => this.responseInterceptor(response),
      error => this.responseErrorInterceptor(error)
    );
  }

  /**
   * 请求拦截器
   */
  private async requestInterceptor(config: InternalAxiosRequestConfig): Promise<any> {
    if (this.isRefreshToken) {
      return new Promise(resolve => {
        this.requestQueue.push({ resolve, config, type: 'request' });
      });
    }

    const { token } = useUserStore.getState();
    // 为每个接口注入token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return Promise.resolve(config);
  }

  /**
   * 响应拦截器
   */
  private responseInterceptor(response: AxiosResponse<any, any>): Promise<any> {
    return Promise.resolve([false, response.data, response]);
  }

  /**
   * 响应错误拦截器
   */
  private responseErrorInterceptor(error: any): Promise<any> {
    const { status, config } = error?.response || {};
    if (status === 401) {
      return new Promise(resolve => {
        this.requestQueue.push({ resolve, config, type: 'response' });
        if (!this.isRefreshToken) {
          this.refreshToken();
        }
      });
    } else {
      antdUtils.notification?.error({
        message: '出错了',
        description: error?.response?.data?.message,
      });
      return Promise.resolve([true, error?.response?.data, error?.response]);
    }
  }

  private refreshToken = async () => {
    this.isRefreshToken = true;
    const { refreshToken, setToken } = useUserStore();
    if (!refreshToken) {
      // 重定向到登入
      return;
    }
    const [error, tokenVO] = await this.get<TokenVO>('/auth/refresh/token');
    if (error) {
      // 重定向到登入
      return;
    }
    setToken(tokenVO.token);
    this.isRefreshToken = false;
    Array.from({ length: this.requestQueue.length }).forEach(async () => {
      const request = this.requestQueue.shift();
      if (request) {
        const { resolve, config, type } = request;
        if (type === 'request') {
          config.headers.Authorization = tokenVO.token;
        } else if (type === 'response') {
          resolve(await this.request(config));
        }
      }
    });
  };

  request<T, D = any>(config: AxiosRequestConfig<D>): Response<T> {
    return this.axiosInstance(config);
  }

  get<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Response<T> {
    return this.axiosInstance.get(url, config);
  }

  post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Response<T> {
    return this.axiosInstance.post(url, data, config);
  }

  put<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Response<T> {
    return this.axiosInstance.put(url, data, config);
  }

  del<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Response<T> {
    return this.axiosInstance.delete(url, config);
  }
}

const request = new Request({ timeout: 30000, baseURL: import.meta.env.VITE_BASE_API });

export default request;
