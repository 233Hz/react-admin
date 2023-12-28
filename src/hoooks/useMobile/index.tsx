import { useState, useEffect } from 'react';

// 定义一个自定义 hook，用于检查当前是否是移动端设备
export default function useIsMobile(breakpoint = '768px') {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 使用 matchMedia 进行媒体查询，判断屏幕宽度
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint})`);

    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };

    // 监听事件
    mediaQuery.addEventListener('change', handleResize);

    // 立即检查一次
    handleResize();

    // 清除函数
    return () => {
      // 移除事件监听器
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
}
