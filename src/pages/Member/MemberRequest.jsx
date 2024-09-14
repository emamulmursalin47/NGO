import { useQuery } from "@tanstack/react-query";
import MemberNav from "./MemberNav/MemberNav";
import { accepetUserPendingList, userPendingList } from "../../../api/admin";
import { Link } from "react-router-dom";
import useMutationHook from "../../../hooks/useMutationHook";
const MemberRequest = () => {
  const { data } = useQuery({
    queryKey: ["user-pending-list"],
    queryFn: userPendingList,
    initialData: [],
  });

  return (
    <div>
      <section>
        <MemberNav />
      </section>

      <section className="p-4 max-w-5xl mx-auto">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 mb-10">
          Member Request
        </h1>

        <p className="mb-3 font-medium">You have <span className="text-red-500 font-bold">{data.length}</span> Member request pending!!</p>

        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border overflow-hidden border-black">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-teal-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-bold text-white uppercase"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-bold text-white uppercase"
                      >
                        Branch Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-start text-xs font-bold text-white uppercase"
                      >
                        Samity Name
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-bold text-white uppercase"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {data.length
                      ? data.map((data, idx) => (
                        <TableRow data={data} key={idx} />
                      ))
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MemberRequest;

function TableRow({ data }) {
  const { name, mobileNumber, branchName, samityName, _id } = data;
  const { mutate } = useMutationHook(accepetUserPendingList, {
    key: ["user-pending-list"],
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (data) => {
      console.log(data);
    },
  });
  return (
    <>
      <tr>
        <td className="px-6 py-4 text-sm font-medium text-black">
          <Link to={`/members_details/${mobileNumber}`}>{name}</Link>
        </td>
        <td className="px-6 py-4 text-sm text-black">{branchName}</td>
        <td className="px-6 py-4 text-sm text-black">{samityName}</td>
        <td className="px-6 py-4 text-center text-sm font-medium">
          <button
            onClick={() => mutate({ id: _id, status: "accepted" })}
            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg text-green-500 hover:text-green-700 pr-4"
          >
            Approve{" "}
          </button>
          <button
            onClick={() => mutate({ id: _id, status: "rejected" })}
            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg text-red-500 hover:text-red-700"
          >
            Reject
          </button>
        </td>
      </tr>
    </>
  );
}
