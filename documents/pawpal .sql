CREATE TYPE "user_role" AS ENUM (
  'PetOwner',
  'Admin',
  'Veterinarian',
  'Staff'
);

CREATE TYPE "appointment_type" AS ENUM (
  'Checkup',
  'Vaccination',
  'Testing',
  'Reexam',
  'Other'
);

CREATE TYPE "service_status" AS ENUM (
  'Pending',
  'Confirmed',
  'Completed',
  'CheckedIn',
  'CheckedOut',
  'Cancelled'
);

CREATE TYPE "grooming_service_type" AS ENUM (
  'BathAndTrim',
  'Spa'
);

CREATE TYPE "service_type" AS ENUM (
  'Medical',
  'Grooming',
  'Boarding'
);

CREATE TYPE "pet_gender" AS ENUM (
  'Male',
  'Female',
  'Unknown'
);

CREATE TYPE "recurrence_pattern" AS ENUM (
  'Weekly',
  'Monthly',
  'None'
);

CREATE TYPE "notification_type" AS ENUM (
  'Reminder',
  'Alert',
  'Info',
  'Warning'
);

CREATE TABLE "Users" (
  "user_id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "username" varchar(50) UNIQUE NOT NULL,
  "password_hash" varchar(255) NOT NULL,
  "email" varchar(100) UNIQUE NOT NULL,
  "phone" varchar(20),
  "full_name" varchar(100) NOT NULL,
  "role" user_role NOT NULL DEFAULT 'PetOwner',
  "specialization" varchar(100),
  "is_lock" boolean
);

CREATE TABLE "Pets" (
  "pet_id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "owner_id" int NOT NULL,
  "name" varchar(50) NOT NULL,
  "age" int,
  "gender" pet_gender,
  "breed" varchar(50),
  "color" varchar(30),
  "photo_url" varchar(255),
  "weight_kg" decimal(5,2),
  "height_cm" decimal(5,2),
  "blood_type" text,
  "spayed_neutered" boolean DEFAULT false,
  "microchipped" boolean DEFAULT false,
  "is_alert" boolean DEFAULT false,
  "health_notes" text
);

CREATE TABLE "Medical_Records" (
  "record_id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "pet_id" int NOT NULL,
  "veterinarian_id" int NOT NULL,
  "visit_date" date NOT NULL
);

CREATE TABLE "Diet_Plans" (
  "diet_id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "pet_id" int NOT NULL,
  "diet_details" text NOT NULL,
  "start_date" date NOT NULL,
  "end_date" date
);

CREATE TABLE "Appointments" (
  "appointment_id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "pet_id" int NOT NULL,
  "owner_id" int NOT NULL,
  "veterinarian_id" int NOT NULL,
  "appointment_date" datetime NOT NULL,
  "appointment_type" appointment_type NOT NULL,
  "status" service_status NOT NULL DEFAULT 'Pending',
  "notes" text,
  "notes_from_client" text
);

CREATE TABLE "Grooming_Services" (
  "grooming_id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "pet_id" int NOT NULL,
  "owner_id" int NOT NULL,
  "staff_id" int NOT NULL,
  "service_date" datetime NOT NULL,
  "service_type" grooming_service_type NOT NULL,
  "status" service_status NOT NULL DEFAULT 'Pending',
  "notes" text,
  "notes_from_client" text,
  "recurrence_pattern" recurrence_pattern
);

CREATE TABLE "Boarding_Rooms" (
  "room_id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "room_number" varchar(20) UNIQUE NOT NULL,
  "room_type" RoomType
);

CREATE TABLE "Boarding_Bookings" (
  "booking_id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "pet_id" int NOT NULL,
  "owner_id" int NOT NULL,
  "room_id" int NOT NULL,
  "staff_id" int NOT NULL,
  "check_in_date" date NOT NULL,
  "check_out_date" date NOT NULL,
  "status" service_status NOT NULL DEFAULT 'Pending',
  "notes" text,
  "notes_from_client" text
);

CREATE TABLE "Notifications" (
  "notification_id" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "user_id" int,
  "pet_id" int,
  "message" text NOT NULL,
  "notification_type" notification_type NOT NULL,
  "is_read" boolean NOT NULL DEFAULT false
);

COMMENT ON TABLE "Users" IS 'Unified table for pet owners, veterinarians, admins, and staff';

COMMENT ON TABLE "Pets" IS 'Stores pet profiles including health stats';

COMMENT ON TABLE "Medical_Records" IS 'Stores medical history, vaccinations, allergies';

COMMENT ON TABLE "Diet_Plans" IS 'Stores diet and nutrition plans';

COMMENT ON TABLE "Appointments" IS 'Handles medical appointments, including recurring and follow-up visits';

COMMENT ON TABLE "Grooming_Services" IS 'Manages grooming sessions with optional recurrence';

COMMENT ON TABLE "Boarding_Rooms" IS 'Stores boarding room details';

COMMENT ON TABLE "Boarding_Bookings" IS 'Manages boarding stays';

COMMENT ON TABLE "Notifications" IS 'Stores reminders and alerts for users';

ALTER TABLE "Pets" ADD FOREIGN KEY ("owner_id") REFERENCES "Users" ("user_id");

ALTER TABLE "Medical_Records" ADD FOREIGN KEY ("pet_id") REFERENCES "Pets" ("pet_id");

ALTER TABLE "Medical_Records" ADD FOREIGN KEY ("veterinarian_id") REFERENCES "Users" ("user_id");

ALTER TABLE "Diet_Plans" ADD FOREIGN KEY ("pet_id") REFERENCES "Pets" ("pet_id");

ALTER TABLE "Appointments" ADD FOREIGN KEY ("pet_id") REFERENCES "Pets" ("pet_id");

ALTER TABLE "Appointments" ADD FOREIGN KEY ("owner_id") REFERENCES "Users" ("user_id");

ALTER TABLE "Appointments" ADD FOREIGN KEY ("veterinarian_id") REFERENCES "Users" ("user_id");

ALTER TABLE "Grooming_Services" ADD FOREIGN KEY ("pet_id") REFERENCES "Pets" ("pet_id");

ALTER TABLE "Grooming_Services" ADD FOREIGN KEY ("owner_id") REFERENCES "Users" ("user_id");

ALTER TABLE "Grooming_Services" ADD FOREIGN KEY ("staff_id") REFERENCES "Users" ("user_id");

ALTER TABLE "Boarding_Bookings" ADD FOREIGN KEY ("pet_id") REFERENCES "Pets" ("pet_id");

ALTER TABLE "Boarding_Bookings" ADD FOREIGN KEY ("owner_id") REFERENCES "Users" ("user_id");

ALTER TABLE "Boarding_Bookings" ADD FOREIGN KEY ("room_id") REFERENCES "Boarding_Rooms" ("room_id");

ALTER TABLE "Boarding_Bookings" ADD FOREIGN KEY ("staff_id") REFERENCES "Users" ("user_id");

ALTER TABLE "Notifications" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("user_id") ON DELETE SET NULL;

ALTER TABLE "Notifications" ADD FOREIGN KEY ("pet_id") REFERENCES "Pets" ("pet_id") ON DELETE SET NULL;
