import { Button, Skeleton, Space } from "antd";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";

const KanbanColumnSkeleton = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0 16px",
      }}
    >
      <div
        style={{
          padding: "12px",
        }}
      >
        <Space
          style={{
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Skeleton.Button size="small" style={{ width: "125px" }} />
          <Button
            disabled
            type="text"
            shape="circle"
            icon={
              <MoreOutlined
                style={{
                  transform: "rotate(90deg)",
                }}
              />
            }
          />
          <Button disabled shape="circle" icon={<PlusOutlined />} />
        </Space>
      </div>
      <div
        style={{
          flex: 1,
          border: "2px dashed transparent",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            marginTop: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default KanbanColumnSkeleton;