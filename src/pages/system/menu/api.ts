import request from '@/utils/request';

export interface MenuVO {
  id: number;
  name: string;
  code: string;
  type: number;
  path?: string;
  icon?: string;
  redirect?: string;
  keepAlive?: boolean;
  hidden?: boolean;
  children?: MenuVO[];
}

const menuApi = {
  getMenuTreeApi: () => request.get<MenuVO[]>('/menu/list/tree'),
};

export default menuApi;
