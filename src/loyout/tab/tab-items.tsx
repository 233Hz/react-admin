import { IconHeart } from '@/assets/icons/heart';
import React, { type ReactNode } from 'react';
import classNames from 'classnames';
import './index.css';

interface Props {
  dataKey: number | string;
  name: string;
  icon?: ReactNode;
}

const TabItem: React.FC<Props> = props => {
  const tabItemClass = classNames(
    'm-[4px]',
    'px-[16px]',
    'h-[32px]',
    'leading-[32px]',
    'cursor-pointer',
    'select-none',
    'rounded-[6px]',
    'flex',
    'ml-[6px]',
    'items-center',
    'bg-[#ffffff]',
    'text-[#333333]',
    'dark:(bg-[#f9bc6033] text-[#f9bc60])'
  );
  return (
    <div draggable className={tabItemClass}>
      {props.icon ? <IconHeart /> : null}
      <span>{props.name}</span>
    </div>
  );
};

export default TabItem;
