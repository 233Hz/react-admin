import * as icons from '@ant-design/icons';
import React from 'react';

interface Props {
  icon: string;
}

const DynamicIcon: React.FC<Props> = ({ icon }) => {
  const antdIcons: { [key: string]: any } = icons;
  return React.createElement(antdIcons[icon]);
};

export default DynamicIcon;
