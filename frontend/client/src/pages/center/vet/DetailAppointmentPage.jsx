import React, { useState } from "react";
import {
  Button,
  Select,
  Input,
  message,
  Descriptions,
  Divider,
  Space,
  Tag,
} from "antd";
import {
  ArrowLeftOutlined,
  SaveOutlined,
  UserOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  TeamOutlined,
  FileTextOutlined,
  EditOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  FileAddFilled,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { FaPaw } from "react-icons/fa6";
import { FaRegSave } from "react-icons/fa";
import { RiCalendar2Line } from "react-icons/ri";
import VetModal from "../../../components/modals/VetModal";
import { useNavigate, useParams } from "react-router";
import MedicalRecordModal from "../../../components/center/vet/MedicalRecordModal";
import { toast } from "react-toastify";

const { Option } = Select;
const { TextArea } = Input;

// Status options with colors and icons
const statusConfig = {
  Pending: { color: "orange", icon: <ClockCircleOutlined /> },
  Confirmed: { color: "blue", icon: <CheckCircleOutlined /> },
  Completed: { color: "green", icon: <CheckCircleOutlined /> },
  CheckedIn: { color: "cyan", icon: <UserOutlined /> },
  CheckedOut: { color: "purple", icon: <UserOutlined /> },
  Cancelled: { color: "red", icon: <ExclamationCircleOutlined /> },
};

const statusOptions = Object.keys(statusConfig);

// Sample appointment data
const mockAppointment = {
  appointment_id: 1,
  pet: {
    id: 101,
    name: "Buddy",
    owner: { full_name: "Alice Smith" },
  },
  veterinarian: { full_name: "Dr. Jane Doe" },
  appointment_type: "Checkup",
  appointment_date: "2025-05-20T10:00:00",
  status: "Completed",
  notes_from_client: "He's been limping a bit.",
  notes: "Initial diagnosis completed.",
};

export default function AppointmentDetailPage({ props }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(mockAppointment.status);
  const [notes, setNotes] = useState(mockAppointment.notes);

  const handleSave = () => {
    console.log("Saving", { status, notes });
    message.success("Appointment updated successfully!");
  };

  return (
    <div className="min-h-screen pt-1 px-0 ">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6 mb-3 rounded-t-lg">
        <div className="flex items-center justify-between">
          <Space size="middle">
            <Button
              icon={<ArrowLeftOutlined />}
              size="middle"
              onClick={() => {
                navigate(-1);
              }}
            ></Button>
            <div className="flex items-center space-x-2">
              <MedicineBoxOutlined className="text-2xl text-blue-500" />
              <h1 className="text-2xl logo font-semibold text-gray-800 m-0">
                Appointment Details
              </h1>
            </div>
          </Space>

          <div className="flex flex-row gap-2 items-center justify-end">
            <Button
              type="link"
              icon={<FaPaw />}
              onClick={() => {
                navigate("/center/vet/pet-profile/" + id);
              }}
            >
              See pet profile
            </Button>
            <MedicalRecordModal />
            <VetModal isVetMaking={true} pet_id={id} />
            <Button
              type="primary"
              color="default"
              icon={<FaRegSave />}
              onClick={() => {
                toast.info("Doing something !!!");
              }}
            >
              Save changes
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white ">
        <div className="p-6">
          {/* Appointment Information */}
          <div className="flex items-center space-x-2 mb-4">
            <FileTextOutlined className="text-lg text-gray-600" />
            <h2 className="text-lg font-medium text-gray-800 m-0">
              Appointment Information
            </h2>
          </div>

          <Descriptions
            bordered
            size="middle"
            column={2}
            labelStyle={{
              backgroundColor: "#fafafa",
              fontWeight: 600,
              color: "#374151",
            }}
          >
            <Descriptions.Item
              label={
                <Space>
                  <FaPaw />
                  Pet
                </Space>
              }
            >
              <div>
                <div className="font-medium">
                  {mockAppointment.pet.name} (ID: {mockAppointment.pet.id})
                </div>
                <div className="text-gray-500 text-sm">
                  Owner: {mockAppointment.pet.owner.full_name}
                </div>
              </div>
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <Space>
                  <TeamOutlined />
                  Veterinarian
                </Space>
              }
            >
              {mockAppointment.veterinarian.full_name}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <Space>
                  <MedicineBoxOutlined />
                  Type
                </Space>
              }
            >
              <Tag color="blue">{mockAppointment.appointment_type}</Tag>
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <Space>
                  <CalendarOutlined />
                  Date & Time
                </Space>
              }
            >
              {dayjs(mockAppointment.appointment_date).format(
                "MMM D, YYYY h:mm A"
              )}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <Space>
                  <CheckCircleOutlined />
                  Status
                </Space>
              }
              span={2}
            >
              <div className="flex flex-row justify-between items-center">
                <Tag
                  color={statusConfig[status].color}
                  icon={statusConfig[status].icon}
                  className="ml-3"
                >
                  {status}
                </Tag>
                <Select
                  value={status}
                  onChange={(val) => setStatus(val)}
                  style={{ width: 200 }}
                  size="middle"
                >
                  {statusOptions.map((s) => (
                    <Option key={s} value={s}>
                      <Space>{s}</Space>
                    </Option>
                  ))}
                </Select>
              </div>
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <Space>
                  <FileTextOutlined />
                  Client Notes
                </Space>
              }
              span={2}
            >
              {mockAppointment.notes_from_client ? (
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-200">
                  {mockAppointment.notes_from_client}
                </div>
              ) : (
                <span className="text-gray-400 italic">No notes provided</span>
              )}
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          {/* Internal Notes Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <EditOutlined className="text-lg text-gray-600" />
              <h3 className="text-lg font-medium text-gray-800 m-0">
                Internal Notes
              </h3>
            </div>

            <TextArea
              rows={6}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add internal notes, observations, treatment details..."
              className="resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
