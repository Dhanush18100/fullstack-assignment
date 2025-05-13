import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function StudentList({ setEditStudent, refresh }) {
  const [students, setStudents] = useState([]); // List of students
  const [search, setSearch] = useState("");     // Search input

  // Use useCallback to memoize fetchStudents and avoid re-creating it on each render
  const fetchStudents = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/students?search=${search}`);
      setStudents(response.data); // Store the data in state
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }, [search]); // Re-run fetchStudents when search changes

  // Delete a student by ID
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      fetchStudents(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Fetch data on component load and when `search` or `refresh` changes
  useEffect(() => {
    fetchStudents();
  }, [search, refresh, fetchStudents]); // Add fetchStudents to dependency array

  return (
    <div className="max-w-5xl mx-auto">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by Name or USN"
        className="p-2 w-full mb-4 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Student list */}
      <div className="grid gap-4">
        {students.map((student) => (
          <div key={student._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-bold">{student.name} ({student.usn})</p>
              <p>{student.phone} | {student.address}</p>
            </div>
            <div className="flex gap-2">
              {/* Edit button */}
              <button
                className="px-4 py-1 rounded bg-yellow-500 text-white"
                onClick={() => setEditStudent(student)}
              >
                Edit
              </button>

              {/* Delete button */}
              <button
                className="px-4 py-1 rounded bg-red-500 text-white"
                onClick={() => deleteStudent(student._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
