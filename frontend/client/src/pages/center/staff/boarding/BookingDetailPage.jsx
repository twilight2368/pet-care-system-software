import React, { useEffect, useState } from "react";
import {
  Typography,
  Tag,
  Select,
  DatePicker,
  Input,
  Upload,
  Button,
  Image,
  message,
  Spin,
  Empty,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import Footer from "../../../../components/footers/Footer";
import { TbArrowBackUp } from "react-icons/tb";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const statusOptions = [
  "Pending",
  "Confirmed",
  "Completed",
  "CheckedIn",
  "CheckedOut",
  "Cancelled",
];
const statusColors = {
  Pending: "orange",
  Confirmed: "blue",
  Completed: "green",
  CheckedIn: "cyan",
  CheckedOut: "purple",
  Cancelled: "red",
};

const mockStaffList = [
  { id: 1, name: "Dr. Alex" },
  { id: 2, name: "Dr. Lisa" },
  { id: 3, name: "Sam Groomer" },
];

export default function BookingDetailPage() {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setBooking({
        booking_id: 101,
        pet: { name: "Buddy" },
        owner: { name: "Jane Doe" },
        room: { room_number: 204 },
        staff_id: 1,
        staff: { name: "Dr. Alex" },
        check_in_date: "2025-06-01",
        check_out_date: "2025-06-05",
        status: "Confirmed",
        notes: "Pet is friendly but barks at strangers.",
        notes_from_client: "Please ensure Buddy gets his favorite toy.",
        images: [
          "https://yourdost-blog-images.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2016/01/03165939/Dogs-360x270.jpg",
          "http://yourdost-blog-images.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2016/01/03170233/cute-cat.jpg",
        ],
      });
      setLoading(false);
    }, 300);
  }, []);

  const handleUpdate = (field, value) => {
    setBooking((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "staff_id"
        ? { staff: mockStaffList.find((s) => s.id === value) }
        : {}),
    }));
    message.success(`${field} updated`);
  };

  const handleImageUpload = ({ file }) => {
    const url = URL.createObjectURL(file);
    setBooking((prev) => ({
      ...prev,
      images: [...prev.images, url],
    }));
    message.success("Image uploaded");
  };

  if (loading) return <Spin className="mt-10 block" />;
  if (!booking)
    return (
      <div className="w-full pt-24">
        <Empty />
      </div>
    );

  return (
    <div className="p-6 space-y-0">
      <div className="flex justify-between items-center">
        <Button onClick={() => navigate(-1)}>
          <TbArrowBackUp />
        </Button>
        <Button type="primary" size="large" icon={<GrUpdate />}>
          Update Booking
        </Button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between gap-6 p-6 mt-6 mb-6 shadow rounded-lg">
        <Title level={3} className=" text-gray-800">
          Booking #{booking.booking_id}
        </Title>
        <Tag color="volcano" className="text-base px-4 py-2 font-medium">
          Room #{booking.room?.room_number}
        </Tag>
      </div>

      {/* Main Details */}
      <div className="bg-white p-6 rounded-lg border-l-6 border-blue-400 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <strong className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              🐾 Pet:
            </strong>
            <div className="text-lg text-gray-900">{booking.pet?.name}</div>
          </div>
          <div className="space-y-1">
            <strong className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              👤 Owner:
            </strong>
            <div className="text-lg text-gray-900">{booking.owner?.name}</div>
          </div>
          <div className="space-y-1">
            <strong className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              📅 Check-in:
            </strong>
            <div className="text-lg text-gray-900">{booking.check_in_date}</div>
          </div>
          <div className="space-y-1">
            <strong className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              📅 Check-out:
            </strong>
            <DatePicker
              value={dayjs(booking.check_out_date)}
              onChange={(date) =>
                handleUpdate("check_out_date", date.format("YYYY-MM-DD"))
              }
              className="w-full"
              size="large"
            />
          </div>
          <div className="space-y-1">
            <strong className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              📌 Status:
            </strong>
            <Select
              size="large"
              value={booking.status}
              onChange={(val) => handleUpdate("status", val)}
              options={statusOptions.map((s) => ({ value: s, label: s }))}
              className="w-full"
            />
          </div>
          <div className="space-y-1">
            <strong className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              🧑‍⚕️ Staff:
            </strong>
            <Select
              size="large"
              value={booking.staff_id}
              onChange={(val) => handleUpdate("staff_id", val)}
              options={mockStaffList.map((s) => ({
                value: s.id,
                label: s.name,
              }))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className=" rounded-lg border-l-6 border-red-400  mb-6">
        <div className="bg-white p-6 rounded-lg">
          <Title level={5} className="!mb-4 text-gray-800">
            📝 Staff Notes
          </Title>
          <TextArea
            rows={4}
            value={booking.notes}
            onChange={(e) => handleUpdate("notes", e.target.value)}
            className="w-full"
            size="large"
          />
        </div>

        <div className="bg-white p-6 rounded-lg ">
          <Title level={5} className="!mb-4 text-gray-800">
            💬 Client Notes
          </Title>
          <div className="bg-gray-50 p-4 rounded-md">
            <Paragraph type="secondary" className="!mb-0">
              {booking.notes_from_client || <em>No client note</em>}
            </Paragraph>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className=" rounded-lg border-l-6 border-orange-300 mb-6">
        <div className="bg-white p-6 rounded-lg ">
          <Title level={5} className="!mb-4 text-gray-800">
            🖼️ Image Gallery
          </Title>
          <div className="grid grid-cols-6 gap-4">
            {booking.images?.map((url, idx) => (
              <div key={idx} className="relative">
                <Image
                  src={url}
                  width={150}
                  height={150}
                  className="rounded-lg object-cover w-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg">
          <Title level={5} className="!mb-4 text-gray-800">
            📤 Upload New Images
          </Title>
          <Upload
            beforeUpload={() => false}
            showUploadList={true}
            customRequest={handleImageUpload}
          >
            <Button icon={<UploadOutlined />} size="large" type="primary">
              Upload Images
            </Button>
          </Upload>
        </div>
      </div>

      <Footer />
    </div>
  );
}
