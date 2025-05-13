import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

export default function App() {
  const [editStudent, setEditStudent] = useState(null); // For editing student
  const [refreshTrigger, setRefreshTrigger] = useState(false); // Trigger to refresh list

  // Trigger refresh in the list after any add/edit action
  const refreshStudentList = () => {
    setRefreshTrigger(!refreshTrigger);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Student Inventory System</h1>

      {/* Form for adding or updating a student */}
      <StudentForm
        editStudent={editStudent}
        clearEdit={() => setEditStudent(null)} // Clear edit state
        onStudentChange={refreshStudentList} // Refresh the list after changes
      />

      {/* List of students, passing refresh trigger */}
      <StudentList
        setEditStudent={setEditStudent} // Pass setEditStudent to update student details
        refresh={refreshTrigger} // Trigger to refresh list
      />
    </div>
  );
}
