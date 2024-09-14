import { useEffect, useState } from "react";
import { setAttendeesSheet } from "../../api/admin";
import toast from "react-hot-toast";
export default function AttendanceTable({ data, attendance, other }) {
  const [selectedEmployees, setSelectedEmployees] = useState(
    attendance ? attendance : []
  );
  function handleSubmit(e) {
    e.preventDefault();
    console.log(selectedEmployees);
    const res = setAttendeesSheet(selectedEmployees, other);
    toast.success("Attendance has been updated!");
  }
  const handleCheckboxChange = (employeeId) => {
    setSelectedEmployees((prevSelected) => {
      if (prevSelected.includes(employeeId)) {
        // If the employee ID is already in the selectedEmployees array, remove it
        return prevSelected.filter((id) => id !== employeeId);
      } else {
        // Otherwise, add the employee ID to the selectedEmployees array
        return [...prevSelected, employeeId];
      }
    });
  };
  useEffect(() => {
    if (attendance) {
      setSelectedEmployees(attendance);
    }
  }, [attendance]);
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>Present</label>
            </th>
            <th>Name</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((employee, idx) => {
                const { photo, name, email, _id } = employee;
                return (
                  <tr key={idx}>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={selectedEmployees.includes(_id)}
                          onChange={() => handleCheckboxChange(_id)}
                        />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={photo}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{name}</div>
                          <div className="text-sm opacity-50">{email}</div>
                        </div>
                      </div>
                    </td>
                    <td>Collector</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
      {/* Display selected employees IDs for testing */}
      <div className="w-full flex justify-center  mt-2">
        {/* <SpinnerButton
          className="bg-teal-600 hover:bg-teal-700 px-10 py-2 rounded font-medium     text-white"
          onClick={handleSubmit}
          isLoading={isPending}
          name={"Submit"}
        /> */}
        <button
          onClick={handleSubmit}
          className="bg-teal-600 hover:bg-teal-700 px-10 py-2 rounded font-medium     text-white"
        >
          Submit{" "}
        </button>
      </div>
    </div>
  );
}
