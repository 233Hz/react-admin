import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import { debounce } from '@/utils/utils';
import { EllipsisOutlined } from '@ant-design/icons';
import TabItem from './tab-items';
import './index.css';
import Flip from '@/utils/flip';

interface TabItem {
  key: number | string;
  name: string;
  icon?: ReactNode;
}

interface _TabItem extends TabItem {
  overflow: boolean;
}

interface Props {
  tabs: TabItem[];
}

const Tab: React.FC<Props> = props => {
  const [isOverflow, setIsOverflow] = useState(false);
  const [tabs, setTabs] = useState<_TabItem[]>([]);

  const tabWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTabs(props.tabs.map(item => ({ ...item, overflow: false })));
  }, [props.tabs]);

  useEffect(() => {
    const wrap = tabWrapRef.current;
    if (wrap) {
      let flip: Flip;
      let sourceNode: HTMLDivElement;
      const onDragStart = (ev: DragEvent) => {
        const target = ev.target as HTMLDivElement;
        setTimeout(() => {
          target.classList.add('tab-moving');
        }, 0);
        ev.dataTransfer?.effectAllowed && (ev.dataTransfer.effectAllowed = 'move');
        sourceNode = target;
        flip = new Flip(
          Array.from(wrap.children).filter(item => item !== sourceNode),
          200
        );
      };
      let isPlaying = false;
      const onDragEnter = (ev: DragEvent) => {
        ev.preventDefault();
        if (isPlaying) return;
        const target = ev.target as HTMLDivElement;
        if (target.parentElement !== tabWrapRef.current || target === sourceNode) return;
        if (tabWrapRef.current?.children) {
          const children = Array.from(tabWrapRef.current?.children);
          const sourceIndex = children.indexOf(sourceNode);
          const targetIndex = children.indexOf(target);
          if (sourceIndex < targetIndex) {
            tabWrapRef.current.insertBefore(sourceNode, target.nextElementSibling);
          } else {
            tabWrapRef.current.insertBefore(sourceNode, target);
          }
          isPlaying = true;
          flip.play(() => (isPlaying = false));
        }
      };
      const onDragOver = (ev: DragEvent) => {
        ev.preventDefault();
      };
      const onDragEnd = (ev: DragEvent) => {
        ev.preventDefault();
        const target = ev.target as HTMLDivElement;
        target.classList.remove('tab-moving');
      };
      if (wrap) {
        wrap.addEventListener('dragstart', onDragStart);
        wrap.addEventListener('dragenter', onDragEnter);
        wrap.addEventListener('dragover', onDragOver);
        wrap.addEventListener('dragend', onDragEnd);
      }
      console.log('useEffect');

      const onResize = () => {
        console.log('onResize');

        const { scrollWidth, clientWidth } = wrap;
        setIsOverflow(scrollWidth > clientWidth);
      };
      const debounceResize = debounce(onResize, 500);
      debounceResize();
      window.addEventListener('resize', debounceResize);
      return () => {
        wrap.removeEventListener('dragstart', onDragStart);
        wrap.removeEventListener('dragenter', onDragEnter);
        wrap.removeEventListener('dragover', onDragOver);
        wrap.removeEventListener('dragend', onDragEnd);
        window.removeEventListener('resize', debounceResize);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-[40px] flex">
      <div ref={tabWrapRef} className="flex-1 h-[40px] overflow-hidden flex">
        {tabs.map(item => (
          <TabItem key={item.key} dataKey={item.key} name={item.name} icon={item.icon} />
        ))}
      </div>
      {isOverflow && (
        <div className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer btn-container">
          <EllipsisOutlined />
        </div>
      )}
    </div>
  );
};

export default Tab;
