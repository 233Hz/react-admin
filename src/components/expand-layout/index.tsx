import { DownOutlined } from '@ant-design/icons';
import { Col, Row, Space, RowProps, ColProps } from 'antd';
import { useState } from 'react';

type Props = {
  col?: number;
  expandRow?: number;
  items?: React.ReactNode[];
  actions?: React.ReactNode[];
  rowProps?: RowProps;
  colProps?: ColProps;
  expandTextStyle?: React.CSSProperties;
};

const ExpandLayout: React.FC<Props> = ({
  col = 6,
  expandRow = 1,
  items = [],
  actions = [],
  rowProps = { gutter: 16 },
  colProps,
  expandTextStyle = { fontSize: 12 },
}) => {
  const colSpan = 24 / col;
  const { xs = 24, sm = 24, md = 24, lg = colSpan, xl = colSpan, ...restColProps } = colProps || {};
  const [expand, setExpand] = useState(false);

  const getItems = () => {
    const renderItems = expand ? items.slice(0, col * expandRow) : [...items];
    if (items.length < col) {
      renderItems.push(<Space size="small">{...actions}</Space>);
    }
    return renderItems.map((item, index) => (
      <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl} {...restColProps} key={index}>
        {item}
      </Col>
    ));
  };
  return (
    <>
      <Row {...rowProps}>{getItems()}</Row>
      {items.length >= col ? (
        <div className="text-right">
          <Space size="small">
            {...actions}
            {items.length > col ? (
              <a
                style={expandTextStyle}
                onClick={() => {
                  setExpand(!expand);
                }}>
                <DownOutlined rotate={expand ? 0 : 180} /> {expand ? '展开' : '收起'}
              </a>
            ) : null}
          </Space>
        </div>
      ) : null}
    </>
  );
};

export default ExpandLayout;
