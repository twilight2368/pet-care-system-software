import React from "react";
import { Form, Input, Select, Typography, Space, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  GroomingServiceTypeTag,
  RecurrencePatternTag,
} from "../../tags/CustomTags";
import { updateGroomingBooking } from "../../../apis/api";
import { toast } from "react-toastify";
const { Title } = Typography;
const { TextArea } = Input;

const statusOptions = [
  { key: "PENDING", label: "Pending" },
  { key: "CONFIRMED", label: "Confirmed" },
  { key: "COMPLETED", label: "Completed" },
  { key: "CHECKED_IN", label: "Checked In" },
  { key: "CHECKED_OUT", label: "Checked Out" },
  { key: "CANCELLED", label: "Cancelled" },
];

const GroomingServiceForm = ({
  grooming_service,
  isDisabled = false,
  staffList = [],
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    const selectedStaff = staffList.find(
      (staff) => staff.userId === values.staff.userId
    );

    const structuredData = {
      groomingId: grooming_service.groomingId,
      serviceDate: grooming_service.serviceDate,
      serviceType: grooming_service.serviceType,
      recurrencePattern: grooming_service.recurrencePattern,
      status: values.status,
      notes: values.notes,
      notesFromClient: values.notesFromClient,
      pet: grooming_service.pet,
      owner: grooming_service.owner,
      staff: selectedStaff,
    };

    console.log("✅ Full Structured Submission:", structuredData);

    updateGroomingBooking(grooming_service.groomingId, structuredData)
      .then((res) => {
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
        toast.success("Update grooming booking");
      })
      .catch(() => {
        toast.error("Error on updating grooming booking");
      });
  };

  return (
    <div className="mt-6">
      <Form
        layout="vertical"
        form={form}
        initialValues={{ ...grooming_service }}
        onFinish={handleSubmit}
      >
        {/* Pet & Owner Info */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <Title level={5} className="mb-4 text-gray-700">
            ℹ️ Pet & Owner Information
          </Title>
          <div className="grid grid-cols-3 gap-4">
            <Form.Item label="Pet Name" name={["pet", "name"]}>
              <Input disabled prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item label="Owner Name" name={["owner", "fullName"]}>
              <Input disabled prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item label="Assigned Staff" name={["staff", "userId"]}>
              <Select
                value={grooming_service?.staff?.userId}
                disabled={isDisabled}
                placeholder="Select staff"
              >
                {staffList.map((staff) => (
                  <Select.Option key={staff.userId} value={staff.userId}>
                    {staff.fullName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </div>

        {/* Service Info */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <Title level={5} className="mb-4 text-gray-700">
            📇 Service Details
          </Title>
          <div className="grid grid-cols-2 gap-x-8 gap-y-0 mb-4">
            <Form.Item label="Service Type">
              <GroomingServiceTypeTag value={grooming_service?.serviceType} />
            </Form.Item>

            <Form.Item label="Service Status" name="status">
              <Select disabled={isDisabled}>
                {statusOptions.map(({ key, label }) => (
                  <Select.Option key={key} value={key}>
                    {label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Service Date & Time">
              <Input
                disabled
                value={dayjs(grooming_service?.serviceDate)
                  .add(7, "h")
                  .format("MMM DD, YYYY • h:mm A")}
              />
            </Form.Item>

            <Form.Item label="Recurrence Pattern">
              <RecurrencePatternTag
                value={grooming_service?.recurrencePattern}
              />
            </Form.Item>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-green-50 p-4 rounded-lg">
          <Title level={5} className="mb-4 text-gray-700">
            📝 Notes & Instructions
          </Title>
          <Space direction="vertical" className="w-full">
            <Form.Item label="Service Notes" name="notes">
              <TextArea
                rows={3}
                disabled={isDisabled}
                placeholder="Add any service notes..."
                className="resize-none"
              />
            </Form.Item>

            <Form.Item label="Client Notes" name="notesFromClient">
              <TextArea rows={3} disabled className="resize-none bg-gray-50" />
            </Form.Item>
          </Space>
        </div>

        {/* Submit Button */}
        {!isDisabled && (
          <div className="mt-6 text-right">
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default GroomingServiceForm;
