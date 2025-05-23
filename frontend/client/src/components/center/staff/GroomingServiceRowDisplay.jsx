import React, { useState } from "react";
import {
  Modal,
  Button,
  Tag,
  Typography,
  Form,
  Input,
  Select,
  DatePicker,
  Card,
  Space,
  Divider,
} from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Text, Title } = Typography;
const { TextArea } = Input;

const statusColors = {
  Pending: "orange",
  Confirmed: "blue",
  Completed: "green",
  CheckedIn: "cyan",
  CheckedOut: "purple",
  Cancelled: "red",
};

const serviceTypeColors = {
  BathAndTrim: "gold",
  Spa: "magenta",
};

const statusOptions = [
  "Pending",
  "Confirmed",
  "Completed",
  "CheckedIn",
  "CheckedOut",
  "Cancelled",
];

const serviceTypes = ["BathAndTrim", "Spa"];
const recurrenceOptions = ["Weekly", "Monthly", "None"];

export default function GroomingServiceRowDisplay({
  grooming_service,
  isDisabled = false,
}) {
  const [visible, setVisible] = useState(false);

  const today = new Date();
  const formattedDate = dayjs(grooming_service?.service_date || today).format(
    "MMM DD, YYYY • h:mm A"
  );

  return (
    <>
      <Card
        className="mb-4 hover:shadow-lg transition-shadow duration-200"
        bodyStyle={{ padding: "20px" }}
      >
        <div className="grid grid-cols-6 gap-4 items-center">
          <div className="flex items-center space-x-2">
            <div className="font-semibold text-sm">
              {grooming_service?.pet?.id || "000"}
            </div>
            <div>-</div>
            <div>
              <Text strong className="text-gray-800">
                {grooming_service?.pet?.name || "Belle"}
              </Text>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <UserOutlined className="text-gray-400" />
            <Text className="text-gray-600">
              {grooming_service?.pet_owner?.name || "Belle owner"}
            </Text>
          </div>

          <div>
            <Tag
              color={
                serviceTypeColors[grooming_service?.service_type] || "default"
              }
              className="font-medium"
            >
              {grooming_service?.service_type
                ?.replace(/([A-Z])/g, " $1")
                .trim()}
            </Tag>
          </div>

          <div className="flex items-center space-x-2">
            <TeamOutlined className="text-gray-400" />
            <Text className="text-gray-600">
              {grooming_service?.staff?.name || "Staff name"}
            </Text>
          </div>

          <div>
            <Tag
              color={statusColors[grooming_service?.status] || "default"}
              className="font-medium px-3 py-1"
            >
              {grooming_service?.status}
            </Tag>
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

        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <CalendarOutlined />
            <Text type="secondary">{formattedDate}</Text>
          </div>
        </div>
      </Card>

      <Modal
        open={visible}
        title={
          <Title level={4} className="mb-0">
            Grooming Service Details
          </Title>
        }
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
        okButtonProps={{ disabled: isDisabled }}
        cancelButtonProps={{ disabled: isDisabled }}
        width={800}
        style={{ top: 20 }}
      >
        <GroomingServiceForm
          initValue={{
            pet: grooming_service?.pet?.name,
            owner: grooming_service?.pet_owner?.name,
            staff: grooming_service?.staff?.name,
            service_type: grooming_service?.service_type,
            status: grooming_service?.status,
            service_date: dayjs(grooming_service?.service_date),
            notes: grooming_service?.notes,
            notes_from_client: grooming_service?.notes_from_client,
            recurrence_pattern: grooming_service?.recurrence_pattern,
          }}
          isDisabled={isDisabled}
        />
      </Modal>
    </>
  );
}

const GroomingServiceForm = ({ initValue, isDisabled = false, staffList }) => {
  return (
    <div className="mt-6">
      <Form layout="vertical" initialValues={initValue}>
        {/* Pet & Owner Information */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <Title level={5} className="mb-4 text-gray-700">
            ℹ️ Pet & Owner Information
          </Title>
          <div className="grid grid-cols-3 gap-4">
            <Form.Item label="Pet Name" name="pet">
              <Input
                disabled
                prefix={<UserOutlined className="text-gray-400" />}
                className="bg-white"
              />
            </Form.Item>
            <Form.Item label="Owner Name" name="owner">
              <Input
                disabled
                prefix={<UserOutlined className="text-gray-400" />}
                className="bg-white"
              />
            </Form.Item>
            <Form.Item label="Assigned Staff" name="staff">
              <Select
                disabled={isDisabled}
                placeholder="Select staff member"
                className="w-full"
              >
                {(staffList || []).map((staff) => (
                  <Select.Option key={staff.id} value={staff.id}>
                    {staff.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <Title level={5} className="mb-4 text-gray-700">
            📇 Service Details
          </Title>
          <div className="grid grid-cols-2 gap-x-4 gap-y-0 mb-4">
            <Form.Item label="Service Type" name="service_type">
              <Select disabled className="w-full">
                {serviceTypes.map((type) => (
                  <Select.Option key={type} value={type}>
                    {type.replace(/([A-Z])/g, " $1").trim()}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Status" name="status">
              <Select disabled={isDisabled} className="w-full">
                {statusOptions.map((s) => (
                  <Select.Option key={s} value={s}>
                    {s}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Service Date & Time" name="service_date">
              <DatePicker
                showTime
                disabled
                className="w-full"
                format="MMM DD, YYYY • h:mm A"
              />
            </Form.Item>

            <Form.Item label="Recurrence Pattern" name="recurrence_pattern">
              <Select disabled className="w-full">
                {recurrenceOptions.map((pattern) => (
                  <Select.Option key={pattern} value={pattern}>
                    {pattern}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-green-50 p-4 rounded-lg">
          <Title level={5} className="mb-4 text-gray-700">
            📝 Notes & Instructions
          </Title>
          <Space direction="vertical" className="w-full">
            <Form.Item label="Service Notes" name="notes">
              <TextArea
                rows={3}
                disabled={isDisabled}
                placeholder="Add any special instructions or notes about the service..."
                className="resize-none"
              />
            </Form.Item>

            <Form.Item label="Client Notes" name="notes_from_client">
              <TextArea
                rows={3}
                disabled
                placeholder="Notes from the client..."
                className="resize-none bg-gray-50"
              />
            </Form.Item>
          </Space>
        </div>
      </Form>
    </div>
  );
};
