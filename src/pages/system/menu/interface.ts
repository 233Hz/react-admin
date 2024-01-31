export interface QueryType {
  name?: string;
  code?: string;
}

export interface DataType {
  id: number;
  name: string;
  code: string;
  type: number;
  path?: string;
  icon?: string;
  redirect?: string;
  keepAlive?: boolean;
  hidden?: boolean;
}

export enum MenuType {
  MENU = 1,
  BUTTON,
}

export const MenuTypeName = {
  [MenuType.MENU]: '菜单',
  [MenuType.BUTTON]: '按钮',
};
