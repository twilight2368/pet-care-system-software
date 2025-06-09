import React, { useEffect, useState } from "react";
import {
  Button,
  Select,
  Input,
  message,
  Descriptions,
  Divider,
  Space,
  Tag,
  Skeleton,
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
} from "@ant-design/icons";
import dayjs from "dayjs";
import { FaPaw } from "react-icons/fa6";
import { FaRegSave } from "react-icons/fa";
import VetModal from "../../../components/modals/VetModal";
import MedicalRecordModal from "../../../components/center/vet/MedicalRecordModal";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { getAppointmentById, updateAppointment } from "../../../apis/api";

const { Option } = Select;
const { TextArea } = Input;

const statusConfig = {
  PENDING: { color: "orange", icon: <ClockCircleOutlined /> },
  CONFIRMED: { color: "blue", icon: <CheckCircleOutlined /> },
  COMPLETED: { color: "green", icon: <CheckCircleOutlined /> },
  CHECKED_IN: { color: "cyan", icon: <UserOutlined /> },
  CHECKED_OUT: { color: "purple", icon: <UserOutlined /> },
  CANCELLED: { color: "red", icon: <ExclamationCircleOutlined /> },
};

const statusOptions = Object.keys(statusConfig);

export default function AppointmentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSave = () => {
    console.log("Updated Appointment:", appointment);
    updateAppointment(id, appointment)
      .then((res) => {
        setAppointment(res.data);
        toast.success("Appointment updated successfully!");
      })
      .catch(() => {
        toast.error("Appointment update failed!");
      });
  };

  useEffect(() => {
    if (id) {
      getAppointmentById(id)
        .then((res) => {
          setAppointment(res.data);
          console.log("====================================");
          console.log(res.data);
          console.log("====================================");
          setIsLoading(false);
        })
        .catch(() => {
          toast.error("Failed to get appointment data");
        });
    }
  }, [id]);

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="min-h-screen pt-1 px-0">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6 mb-3 rounded-t-lg">
        <div className="flex items-center justify-between">
          <Space size="middle">
            <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
            <div className="flex items-center space-x-2">
              <MedicineBoxOutlined className="text-2xl text-blue-500" />
              <h1 className="text-2xl font-semibold text-gray-800 m-0">
                Appointment Details
              </h1>
            </div>
          </Space>

          <div className="flex flex-row gap-2 items-center justify-end">
            <Button
              type="link"
              icon={<FaPaw />}
              onClick={() =>
                navigate(`/center/vet/pet-profile/${appointment?.pet?.petId}`)
              }
            >
              See pet profile
            </Button>
            <MedicalRecordModal pet={appointment?.pet} />
            <VetModal isVetMaking={true} pet_id={id} pet={appointment?.pet} />
            <Button type="primary" icon={<FaRegSave />} onClick={handleSave}>
              Save changes
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white">
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
                  {appointment.pet.name} (ID: {appointment.pet.petId})
                </div>
                <div className="text-gray-500 text-sm">
                  Owner: {appointment.pet.owner.fullName}
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
              {appointment.veterinarian.fullName}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <Space>
                  <MedicineBoxOutlined />
                  Type
                </Space>
              }
            >
              <Tag color="blue">{appointment.appointmentType}</Tag>
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <Space>
                  <CalendarOutlined />
                  Date & Time
                </Space>
              }
            >
              {dayjs(appointment.appointmentDate)
                .add(7, "h")
                .format("MMM D, YYYY h:mm A")}
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
                  color={statusConfig[appointment.status]?.color}
                  icon={statusConfig[appointment.status]?.icon}
                  className="ml-3"
                >
                  {appointment.status}
                </Tag>
                <Select
                  value={appointment.status}
                  onChange={(val) =>
                    setAppointment((prev) => ({ ...prev, status: val }))
                  }
                  style={{ width: 200 }}
                >
                  {statusOptions.map((s) => (
                    <Option key={s} value={s}>
                      {s}
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
              {appointment.notesFromClient ? (
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-200">
                  {appointment.notesFromClient}
                </div>
              ) : (
                <span className="text-gray-400 italic">No notes provided</span>
              )}
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          {/* Internal Notes */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <EditOutlined className="text-lg text-gray-600" />
              <h3 className="text-lg font-medium text-gray-800 m-0">
                Internal Notes
              </h3>
            </div>

            <TextArea
              rows={6}
              value={appointment.notes}
              onChange={(e) =>
                setAppointment((prev) => ({
                  ...prev,
                  notes: e.target.value,
                }))
              }
              placeholder="Add internal notes, observations, treatment details..."
              className="resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
