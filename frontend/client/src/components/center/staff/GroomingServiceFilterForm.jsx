import React from "react";
import { Form, Select, Button } from "antd";

const { Option } = Select;

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

export default function GroomingServiceFilterForm({
  staffList = [],
  onFilter,
}) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    onFilter?.(values);
  };

  const handleReset = () => {
    form.resetFields();
    onFilter?.({});
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item name="staff" label="Staff">
        <Select allowClear placeholder="Select staff">
          {staffList.map((staff) => (
            <Option key={staff.id} value={staff.id}>
              {staff.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="service_type" label="Service Type">
        <Select allowClear placeholder="Select service type">
          {serviceTypes.map((type) => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="status" label="Status">
        <Select allowClear placeholder="Select status">
          {statusOptions.map((s) => (
            <Option key={s} value={s}>
              {s}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="recurrence_pattern" label="Recurrence">
        <Select allowClear placeholder="Select pattern">
          {recurrenceOptions.map((pattern) => (
            <Option key={pattern} value={pattern}>
              {pattern}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Filter
        </Button>
      </Form.Item>

      <Form.Item>
        <Button onClick={handleReset} className="w-full">
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
}
