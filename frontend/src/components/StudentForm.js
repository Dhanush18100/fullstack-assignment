import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentForm({ editStudent, clearEdit, onStudentChange }) {
  const [formData, setFormData] = useState({
    name: "",
    usn: "",
    phone: "",
    address: "",
  });

  // If in edit mode, fill form with student's data
  useEffect(() => {
    if (editStudent) {
      setFormData(editStudent);
    } else {
      setFormData({ name: "", usn: "", phone: "", address: "" });
    }
  }, [editStudent]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editStudent) {
        // Edit existing student
        await axios.put(`http://localhost:5000/api/students/${editStudent._id}`, formData);
        clearEdit(); // Clear the edit state
      } else {
        // Add new student
        await axios.post("http://localhost:5000/api/students", formData);
      }
      setFormData({ name: "", usn: "", phone: "", address: "" }); // Reset form
      onStudentChange(); // Trigger student list refresh
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto bg-white p-4 mb-6 rounded shadow"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["name", "usn", "phone", "address"].map((field) => (
          <input
            key={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            className="p-2 border rounded w-full"
            required
          />
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {editStudent ? "Update Student" : "Add Student"}
        </button>
        {editStudent && (
          <button
            type="button"
            onClick={clearEdit}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
