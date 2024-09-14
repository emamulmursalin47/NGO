import { useState } from "react";
import EmployeeNav from "./EmployeeNav/EmployeeNav";
import useMutationHook from "../../../hooks/useMutationHook";
import { getAllEmployeeByBranchIdAndSmityId } from "../../../api/admin";
import BranchSamitySelector from "../../component/branchSamitySelector";
import EmployeeListView from "./EmployeeListView";
const initalState = {
  branchId: null,
  samityId: null,
};
const EmployeeList = () => {
  const [formData, setFormData] = useState(initalState);
  const [employee, setEmployee] = useState([]);
  const { mutate, isPending } = useMutationHook(
    getAllEmployeeByBranchIdAndSmityId,
    {
      onSuccess: (data) => {
        setEmployee(data.data);

      },
    }
  );

  function handleSubmit(event) {
    event.preventDefault();
    mutate(formData);
  }
  return (
    <div>
      <section>
        <EmployeeNav />
      </section>

      <section className="m-4">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
          Employee List{" "}
        </h1>

        <section className="flex flex-col md:flex-row items-center justify-around gap-2 my-8 pb-8 border-b-2 max-w-5xl mx-auto">
          <BranchSamitySelector callBackFn={setFormData} />
          <button
            className="btn bg-teal-700 text-white mt-4 "
            onClick={handleSubmit}
          >
            Search
          </button>
        </section>
        {/* Local User List */}
        <section>
          <div className="max-w-5xl mx-auto bg-teal-700 text-white py-4 ">
            <tr className="grid grid-cols-3 text-xs md:text-base md:grid-cols-6  items-center justify-center gap-1 text-start">
              <th>SL</th>
              <th>Employee Name</th>
              <th>Phone Number</th>
              <th className="hidden md:block">Email</th>
              <th className="hidden md:block"> Address</th>
              <th>Action</th>
            </tr>
          </div>
          <div>
            {employee.length
              ? employee.map((user, idx) => (
                <EmployeeListView key={idx} idx={idx} data={user} />
              ))
              : null}
          </div>
        </section>
      </section>
    </div>
  );
};

export default EmployeeList;
