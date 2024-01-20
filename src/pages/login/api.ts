import request from '@/utils/request';

export interface CaptchaDTO {
  id: string;
  imageBase64: string;
}

export interface LoginDTO {
  accountNumber: string;
  password: string;
  captchaId: string;
  captcha: string;
  publicKey: string;
}

export interface TokenVO {
  expire: number;
  token: string;
  refreshExpire: number;
  refreshToken: string;
}

const loginApi = {
  // 获取验证码
  getCaptcha: () => request.get<CaptchaDTO>('/auth/captcha'),
  // 登入
  login: (loginDTO: LoginDTO) => request.post<TokenVO>('/auth/login', loginDTO),
  // 获取公钥
  getPublicKey: () => request.get<string>('/auth/publicKey'),
};

export default loginApi;
