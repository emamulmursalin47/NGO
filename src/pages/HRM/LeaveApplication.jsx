import { useQuery } from "@tanstack/react-query";
import HRMNav from "./HRMNav/HRMNav";
import { employeeLeaveApplicationAcceptReject, employeeLeaveApplicationPendingList } from "../../../api/admin";
import useMutationHook from "../../../hooks/useMutationHook";

function LeaveApplicationCard({ data }) {
  const { _id, reason, employeeName, branchName, samityName, days } = data;
  const { mutate } = useMutationHook(employeeLeaveApplicationAcceptReject, {
    key: ["leave-applications"]
  })
  return (



    <div className="mx-8">

      <div className="">
        <table className="table">
          <thead className='grid grid-cols-7 w-full bg-teal-500 text-white rounded-md'>
            <th>Name</th>
            <th>Branch Name</th>
            <th>Samity Name</th>
            <th>Leave Needed</th>
            <th>Reason</th>
            <th>Date</th>
            <th>Action</th>
          </thead>
          <tbody className="grid grid-cols-7 w-full text-black rounded-md border-b-2 mt-4">
            <td>{employeeName}</td>
            <td>{branchName}</td>
            <td>{samityName}</td>
            <td>{days} days</td>
            <td>{reason}</td>
            <td>12 july, 2024</td>
            <td>
              <div className="flex flex-col md:flex-row ">

                <button onClick={() => mutate({ status: 'accepted', id: _id })} className="bg-green-500 hover:bg-green-700 px-2 py-1 ml-2 rounded font-medium     text-white">
                  Accept
                </button>

                <button onClick={() => mutate({ status: 'rejected', id: _id })} className="bg-red-500 hover:bg-red-700 px-2 py-1 ml-2 rounded font-medium     text-white">
                  Reject
                </button>

              </div>
            </td>

          </tbody>
        </table>
      </div>
    </div>
  );
}
const LeaveApplication = () => {
  const { data } = useQuery({
    queryKey: ["leave-applications"],
    queryFn: employeeLeaveApplicationPendingList,
    initialData: [],
  });
  console.log(data);
  return (
    <div>
      <section>
        <HRMNav />
      </section>

      <section className="m-4">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
          {" "}
          Leave Application{" "}
        </h1>
        <div className="flex flex-col w-full mt-8">
          {
            data.length ? data.map((data, idx) => <LeaveApplicationCard data={data} key={idx} />) : <div>No data</div>
          }
        </div>

      </section>
    </div>
  );
};

export default LeaveApplication;

