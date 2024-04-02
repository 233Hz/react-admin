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
  getTreeList: () => request.get<MenuVO[]>('/menu/tree'),
  getSelectTree: () => request.get<MenuVO[]>('/menu/selectTree'),
  saveOrUpdate: (data: MenuVO) => request.post('/menu/saveOrUpdate', data),
};

export default menuApi;
