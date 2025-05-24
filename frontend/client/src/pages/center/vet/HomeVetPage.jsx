import React, { useState } from "react";
import {
  Calendar,
  Button,
  Modal,
  Input,
  Badge,
  Typography,
  Select,
  Empty,
  Divider,
} from "antd";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Title } = Typography;

const colorOptions = [
  { label: "Red", value: "red" },
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
  { label: "Orange", value: "orange" },
  { label: "Purple", value: "purple" },
  { label: "Cyan", value: "cyan" },
];

export default function HomeVetPage() {
  const [notes, setNotes] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [selectedColor, setSelectedColor] = useState("blue");

  const today = dayjs().format("YYYY-MM-DD");
  const todayNotes = notes[today] || [];

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    const newEntry = { text: newNote.trim(), color: selectedColor };

    setNotes((prev) => ({
      ...prev,
      [today]: [...(prev[today] || []), newEntry],
    }));

    setNewNote("");
    setSelectedColor("blue");
    setModalOpen(false);
  };

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <Title level={3} className="!mb-0 logo">
          🗓️ Vet Calendar
        </Title>
        <Button type="primary" size="middle" onClick={() => setModalOpen(true)}>
          ➕ Add Note for Today
        </Button>
      </div>

      <Calendar fullscreen className="bg-white p-4 rounded shadow mb-8" />

      <Divider />
      {/* Notes Section */}
      <div className="bg-white p-6 rounded shadow">
        <Title level={4} className="mb-4 logo">
          📝 Notes for Today
        </Title>

        <div className="px-6 pt-3 pb-3">
          {todayNotes.length > 0 ? (
            <ul className="space-y-3">
              {todayNotes.map((note, idx) => (
                <li key={idx} className="flex items-center gap-3 space-x-3">
                  <Badge color={note.color} />
                  <span className="text-gray-800">{note.text}</span>
                </li>
              ))}
            </ul>
          ) : (
            <Empty description="No notes for today" />
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        title="Add a Note for Today"
        open={modalOpen}
        onOk={handleAddNote}
        onCancel={() => setModalOpen(false)}
        okText="Save Note"
      >
        <div className="flex flex-col gap-3 justify-center items-center">
          <TextArea
            rows={3}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write your note here..."
          />
          <Select
            value={selectedColor}
            onChange={setSelectedColor}
            options={colorOptions}
            className="w-full"
            placeholder="Select badge color"
          />
        </div>
      </Modal>
    </div>
  );
}
