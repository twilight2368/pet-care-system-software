import React from "react";
import { Tag } from "antd";

// AppointmentTypeTag
export const AppointmentTypeTag = ({ value }) => {
  const colors = {
    CHECKUP: "green",
    VACCINATION: "blue",
    TESTING: "purple",
    REEXAM: "cyan",
    OTHER: "default",
  };
  return (
    <Tag bordered={false} color={colors[value]}>
      {value}
    </Tag>
  );
};

// GroomingServiceTypeTag
export const GroomingServiceTypeTag = ({ value }) => {
  const colors = {
    BATH_AND_TRIM: "magenta",
    SPA: "gold",
  };
  return (
    <Tag bordered={false} color={colors[value]}>
      {value}
    </Tag>
  );
};

// NotificationTypeTag
export const NotificationTypeTag = ({ value }) => {
  const colors = {
    REMINDER: "blue",
    ALERT: "red",
    INFO: "cyan",
    WARNING: "orange",
  };
  return <Tag color={colors[value]}>{value}</Tag>;
};

// PetGenderTag
export const PetGenderTag = ({ value }) => {
  const colors = {
    MALE: "geekblue",
    FEMALE: "pink",
    UNKNOWN: "gray",
  };
  return <Tag color={colors[value]}>{value}</Tag>;
};

// RecurrencePatternTag
export const RecurrencePatternTag = ({ value }) => {
  const colors = {
    WEEKLY: "purple",
    MONTHLY: "blue",
    NONE: "default",
  };
  return (
    <Tag bordered={false} color={colors[value]}>
      {value}
    </Tag>
  );
};

// RoomTypeTag
export const RoomTypeTag = ({ value }) => {
  const colors = {
    STANDARD: "green",
    VIP: "gold",
  };
  return (
    <Tag bordered={false} color={colors[value]}>
      {value}
    </Tag>
  );
};

// ServiceStatusTag
export const ServiceStatusTag = ({ value }) => {
  const colors = {
    PENDING: "orange",
    CONFIRMED: "blue",
    COMPLETED: "green",
    CHECKED_IN: "cyan",
    CHECKED_OUT: "magenta",
    CANCELLED: "red",
  };
  return <Tag color={colors[value]}>{value}</Tag>;
};

// ServiceTypeTag
export const ServiceTypeTag = ({ value }) => {
  const colors = {
    MEDICAL: "red",
    GROOMING: "gold",
    BOARDING: "purple",
  };
  return <Tag color={colors[value]}>{value}</Tag>;
};

// UserRoleTag
export const UserRoleTag = ({ value }) => {
  const colors = {
    PET_OWNER: "blue",
    ADMIN: "volcano",
    VETERINARIAN: "green",
    STAFF: "geekblue",
  };
  return <Tag color={colors[value]}>{value}</Tag>;
};
