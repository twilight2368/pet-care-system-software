INSERT INTO boarding_rooms (room_number, room_type) VALUES
('A101', 'STANDARD')
ON CONFLICT (room_number) DO NOTHING;

INSERT INTO boarding_rooms (room_number, room_type) VALUES
('A102', 'STANDARD')
ON CONFLICT (room_number) DO NOTHING;

INSERT INTO boarding_rooms (room_number, room_type) VALUES
('B201', 'VIP')
ON CONFLICT (room_number) DO NOTHING;

INSERT INTO boarding_rooms (room_number, room_type) VALUES
('B202', 'VIP')
ON CONFLICT (room_number) DO NOTHING;

INSERT INTO boarding_rooms (room_number, room_type) VALUES
('C301', 'STANDARD')
ON CONFLICT (room_number) DO NOTHING;
