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
  Switch,
} from "antd";
import dayjs from "dayjs";

const { Text } = Typography;
const { TextArea } = Input;

const statusColors = {
  Pending: "default",
  Confirmed: "blue",
  Completed: "green",
  CheckedIn: "cyan",
  CheckedOut: "purple",
  Cancelled: "red",
};

const serviceTypeColors = {
  BathAndTrim: "gold",
  Spa: "pink",
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
    "YYYY-MM-DD HH:mm"
  );

  return (
    <>
      <div className="shadow rounded-xl p-6">
        <div className="flex items-center text-sm gap-4 mb-2">
          <div className="w-1/6">
            {grooming_service?.pet?.id || "000"} -{" "}
            {grooming_service?.pet?.name || "Belle"}
          </div>
          <div className="w-1/6">
            {grooming_service?.pet_owner?.name || "Belle owner"}
          </div>
          <div className="w-1/6">
            <Tag
              color={
                serviceTypeColors[grooming_service?.service_type] || "default"
              }
            >
              {grooming_service?.service_type}
            </Tag>
          </div>
          <div className="w-1/6">
            {grooming_service?.staff?.name || "Staff name"}
          </div>
          <div className="w-1/6">
            <Tag color={statusColors[grooming_service?.status] || "default"}>
              {grooming_service?.status}
            </Tag>
          </div>
          <div className="w-1/6">
            <Button
              size="small"
              variant="link"
              type="link"
              onClick={() => setVisible(true)}
            >
              See Details
            </Button>
          </div>
        </div>
        <div className="text-xs italic text-gray-500">{formattedDate}</div>
      </div>

      <Modal
        open={visible}
        title="Grooming Service Details"
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
        okButtonProps={{ disabled: isDisabled }}
        cancelButtonProps={{ disabled: isDisabled }}
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
    <>
      <Form layout="vertical" initialValues={initValue}>
        <div className=" flex flex-row  gap-2 justify-between items-center">
          <Form.Item label="Pet" name="pet" className="w-1/3">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Owner" name="owner" className="w-1/3">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Staff" name="staff" className="w-1/3">
            <Select disabled={isDisabled}>
              {(staffList || []).map((staff) => (
                <Select.Option key={staff.id} value={staff.id}>
                  {staff.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="w-full flex flex-row gap-2 justify-between">
          <Form.Item label="Service Type" name="service_type" className="w-1/2">
            <Select disabled>
              {serviceTypes.map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Status" name="status" className="w-1/2">
            <Select disabled={isDisabled}>
              {statusOptions.map((s) => (
                <Select.Option key={s} value={s}>
                  {s}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <div className="w-full flex flex-row gap-2 items-center">
          <Form.Item label="Service Date" name="service_date" className="w-1/2">
            <DatePicker showTime disabled />
          </Form.Item>

          <Form.Item
            label="Recurrence Pattern"
            name="recurrence_pattern"
            className="w-1/2"
          >
            <Select disabled>
              {recurrenceOptions.map((pattern) => (
                <Select.Option key={pattern} value={pattern}>
                  {pattern}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Form.Item label="Notes" name="notes">
          <TextArea rows={3} disabled={isDisabled} />
        </Form.Item>

        <Form.Item label="Client Notes" name="notes_from_client">
          <TextArea rows={3} disabled />
        </Form.Item>
      </Form>
    </>
  );
};
