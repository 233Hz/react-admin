import { Popover } from 'antd';
import AvatarContent from './avatar-content';

export default function Avatar() {
  return (
    <Popover placement="bottom" content={<AvatarContent />}>
      <div className="w-[50px] h-[50px] rounded-full border-white border-solid border-[1px]">
        <img
          src="https://picdm.sunbangyan.cn/2023/12/08/03f1d3225b970c0890ac7e6486c7ddce.jpeg"
          className="w-full h-full rounded-full overflow-hidden"
        />
      </div>
    </Popover>
  );
}
