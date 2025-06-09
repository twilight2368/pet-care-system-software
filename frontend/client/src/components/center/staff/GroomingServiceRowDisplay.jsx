import React, { useState } from "react";
import {
  Modal,
  Button,
  Typography,
  Form,
  Input,
  Select,
  DatePicker,
  Card,
  Space,
} from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import GroomingServiceForm from "./GroomingServiceForm";
import {
  GroomingServiceTypeTag,
  RecurrencePatternTag,
  ServiceStatusTag,
} from "../../tags/CustomTags";

const { Text, Title } = Typography;
const { TextArea } = Input;

export default function GroomingServiceRowDisplay({
  grooming_service,
  isDisabled = false,
  staffList = [],
}) {
  const [visible, setVisible] = useState(false);

  const formattedDate = dayjs(grooming_service?.serviceDate || new Date())
    .add(7, "h")
    .format("MMM DD, YYYY • h:mm A");

  return (
    <>
      <Card
        className="mb-4 hover:shadow-lg transition-shadow duration-200"
        bodyStyle={{ padding: "20px" }}
      >
        <div className="grid grid-cols-6 gap-4 items-center">
          <div className="flex items-center space-x-2">
            <div className="font-semibold text-sm">
              {grooming_service?.pet?.petId || "000"}
            </div>
            <div>-</div>
            <div>
              <Text strong className="text-gray-800">
                {grooming_service?.pet?.name || "-"}
              </Text>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <UserOutlined className="text-gray-400" />
            <Text className="text-gray-600">
              {grooming_service?.owner?.fullName || "-"}
            </Text>
          </div>

          <div>
            <GroomingServiceTypeTag value={grooming_service?.serviceType} />
          </div>

          <div className="flex items-center space-x-2">
            <TeamOutlined className="text-gray-400" />
            <Text className="text-gray-600">
              {grooming_service?.staff?.fullName || "-"}
            </Text>
          </div>

          <div>
            <ServiceStatusTag value={grooming_service?.status} />
          </div>

          <div className="text-right">
            <Button
              type="primary"
              ghost
              size="small"
              onClick={() => setVisible(true)}
              className="hover:bg-blue-50"
            >
              View Details
            </Button>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 flex flex-row justify-start gap-3">
          <div>
            <RecurrencePatternTag
              value={grooming_service?.recurrencePattern || "-"}
            />
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <CalendarOutlined />
            <Text type="secondary">{formattedDate}</Text>
          </div>
        </div>
      </Card>

      <Modal
        open={visible}
        title={<Title level={4}>Grooming Service Details</Title>}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
        okButtonProps={{ disabled: isDisabled }}
        cancelButtonProps={{ disabled: isDisabled }}
        width={800}
        style={{ top: 20 }}
      >
        <GroomingServiceForm
          grooming_service={grooming_service}
          isDisabled={isDisabled}
          staffList={staffList}
        />
      </Modal>
    </>
  );
}
