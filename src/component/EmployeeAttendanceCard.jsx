export default function EmployeeAttendanceCard({ employee }) {
  const { name, mobileNumber, email, _id } = employee;
  return (
    <div className="border">
      <div>
        <h1>{name}</h1>
        <h2>{mobileNumber}</h2>
        <h2>{email}</h2>
      </div>
    </div>
  );
}
