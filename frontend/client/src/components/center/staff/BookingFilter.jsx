import React from "react";
import { Form, Select, DatePicker, Button, Space } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";

export default function BookingFilter({
  staffOptions = [],
  roomOptions = [],
  onFilter,
}) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    const filters = {
      staff_id: values.staff_id || null,
      room_id: values.room_id || null,
      check_in_date: values.check_in_date?.startOf("day").toISOString() || null,
      check_out_date: values.check_out_date?.endOf("day").toISOString() || null,
    };
    onFilter?.(filters);
  };

  const handleReset = () => {
    form.resetFields();
    onFilter?.({
      staff_id: null,
      room_id: null,
      check_in_date: null,
      check_out_date: null,
    });
  };

  return (
    <div className="mb-4 p-4 ">
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item name="staff_id" label="Staff" className="mb-0">
          <Select
            allowClear
            placeholder="Select staff"
            className="w-full"
            options={staffOptions.map((staff) => ({
              label: staff.name,
              value: staff.id,
            }))}
          />
        </Form.Item>

        <Form.Item name="room_id" label="Room" className="mb-0">
          <Select
            allowClear
            placeholder="Select room"
            className="w-full"
            options={roomOptions.map((room) => ({
              label: `Room ${room.room_number}`,
              value: room.room_id,
            }))}
          />
        </Form.Item>

        <Form.Item name="check_in_date" label="Check-in" className="mb-0">
          <DatePicker placeholder="Check-in date" className="w-full" />
        </Form.Item>

        <Form.Item name="check_out_date" label="Check-out" className="mb-0">
          <DatePicker placeholder="Check-out date" className="w-full" />
        </Form.Item>

        <Form.Item className="mb-0">
          <Button
            onClick={handleReset}
            icon={<ClearOutlined />}
            className="w-full mb-3"
          >
            Clear
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
            className="w-full  mb-3"
          >
            Filter
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
