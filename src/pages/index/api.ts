import request from '@/utils/request';

const homeApi = {
  logout: () => request.get('/auth/logout'),
};

export default homeApi;
