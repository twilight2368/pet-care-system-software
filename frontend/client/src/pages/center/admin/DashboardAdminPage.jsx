import React from "react";
import { Card, Col, Row, Typography } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import Footer from "../../../components/footers/Footer";

const { Title } = Typography;

const appointmentsData = [
  { date: "Mon", count: 5 },
  { date: "Tue", count: 8 },
  { date: "Wed", count: 4 },
  { date: "Thu", count: 9 },
  { date: "Fri", count: 6 },
  { date: "Sat", count: 7 },
  { date: "Sun", count: 3 },
];

const revenueData = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 1500 },
  { month: "Mar", revenue: 1800 },
  { month: "Apr", revenue: 2000 },
  { month: "May", revenue: 2400 },
];

const speciesData = [
  { name: "Dogs", value: 50 },
  { name: "Cats", value: 30 },
  { name: "Birds", value: 10 },
  { name: "Others", value: 10 },
];

const satisfactionData = [
  { month: "Jan", score: 4.1 },
  { month: "Feb", score: 4.3 },
  { month: "Mar", score: 4.5 },
  { month: "Apr", score: 4.6 },
  { month: "May", score: 4.7 },
];

const staffPerformance = [
  { subject: "Checkups", A: 120, fullMark: 150 },
  { subject: "Surgeries", A: 98, fullMark: 150 },
  { subject: "Vaccinations", A: 86, fullMark: 150 },
  { subject: "Consultations", A: 99, fullMark: 150 },
  { subject: "Follow-ups", A: 85, fullMark: 150 },
];

const medsUsageData = [
  { med: "Antibiotics", count: 40 },
  { med: "Painkillers", count: 25 },
  { med: "Vaccines", count: 35 },
  { med: "Dewormers", count: 20 },
];

const userRoleStats = [
  { role: "PET_OWNER", count: 200 },
  { role: "VETERINARIAN", count: 10 },
  { role: "STAFF", count: 15 },
  { role: "ADMIN", count: 5 },
];

const appointmentTypesStats = [
  { type: "CHECKUP", count: 90 },
  { type: "VACCINATION", count: 40 },
  { type: "TESTING", count: 30 },
  { type: "REEXAM", count: 20 },
  { type: "OTHER", count: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF"];

export default function DashboardAdminPage() {
  return (
    <div className="p-4">
      <div className="mt-4 mb-12">
        {" "}
        <Title level={2}>
          🐾 <span className="logo">Vet Clinic Admin Dashboard</span>
        </Title>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="📅 Weekly Appointments">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={appointmentsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="💰 Monthly Revenue">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="😊 Client Satisfaction">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={satisfactionData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorScore)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="👩‍⚕️ Staff Performance">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart outerRadius={90} data={staffPerformance}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar
                  name="Performance"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="🐶 Species Treated">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={speciesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {speciesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="💊 Medication Usage">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={medsUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="med" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="👥 User Roles Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userRoleStats}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {userRoleStats.map((entry, index) => (
                    <Cell
                      key={`cell-role-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, _name, props) => {
                    const role = props?.payload?.role ?? "Unknown";
                    return [`${value}`, role];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="📋 Appointment Types">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentTypesStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#a28cff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      <div className="h-60 flex justify-center items-center">
        <Footer />
      </div>
    </div>
  );
}
