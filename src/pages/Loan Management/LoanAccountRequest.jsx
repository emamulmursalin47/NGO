import { useQuery } from "@tanstack/react-query";
import LoanManagementNav from "./LoanManagementNav/LoanManagementNav";
import {
  acceptLoanPendingAccount,
  pendingLoanAccountList,
} from "../../../api/admin";
import BranchSamitySelector from "../../component/branchSamitySelector";
import { useState } from "react";
import { Link } from "react-router-dom";
import useMutationHook from "../../../hooks/useMutationHook";
const initialState = {
  branchId: "",
  samityId: "",
};
const LoanAccountRequest = () => {
  const [formData, setFormData] = useState(initialState);
  const { data: d } = useQuery({
    queryKey: ["pending-loan-list"],
    queryFn: () => pendingLoanAccountList(formData),
    initialData: [],
    enabled: formData.branchId && formData.samityId ? true : false,
  });
  console.log(d);
  return (
    <div>
      <section>
        <LoanManagementNav />
      </section>

      <section>
        <section className="m-4">
          <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
            Loan Account Request
          </h1>
          <section className=" flex flex-col md:flex-row p-2 gap-2 items-center max-w-5xl mx-auto">
            <BranchSamitySelector callBackFn={setFormData} />
          </section>
        </section>
        <section>
          <div className="flex flex-col max-w-5xl mx-auto">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="border overflow-hidden ">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-teal-700 ">
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
                          className="px-6 py-3 text-start text-xs font-bold text-white uppercase"
                        >
                          Profit Percentage
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-bold text-white uppercase"
                        >
                          Loan Amount
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
                      {d.length
                        ? d.map((data, idx) => (
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
      </section>
    </div>
  );
};

function TableRow({ data }) {
  const {
    name,
    branchName,
    samityName,
    _id,
    profitPercentage,
    loanAmount,
    phoneNumber,
  } = data;
  const { mutate } = useMutationHook(acceptLoanPendingAccount, {
    key: ["pending-loan-list"],
  });
  function handleAccept() {
    const data = {
      id: _id,
      status: "approved",
    };

    mutate(data);
  }
  function handleReject() {
    const data = {
      id: _id,
      status: "rejected",
    };
    mutate(data);
  }
  return (
    <>
      <tr>
        <td className="px-6 py-4 text-sm font-medium text-black">
          <Link to={`/members_details/${phoneNumber}`}>{name}</Link>
        </td>
        <td className="px-6 py-4 text-sm text-black">{branchName}</td>
        <td className="px-6 py-4 text-sm text-black">{samityName}</td>
        <td className="px-6 py-4 text-sm text-black">{profitPercentage}</td>
        <td className="px-6 py-4 text-sm text-black">{loanAmount}</td>
        <td className="px-6 py-4 text-center text-sm font-medium">
          <button
            onClick={handleAccept}
            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg text-green-500 hover:text-green-700 pr-4"
          >
            Approve{" "}
          </button>
          <button
            onClick={handleReject}
            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg text-red-500 hover:text-red-700"
          >
            Reject
          </button>
        </td>
      </tr>
    </>
  );
}
export default LoanAccountRequest;
