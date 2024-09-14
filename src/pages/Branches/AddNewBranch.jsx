import { useState } from "react";
import useMutationHook from "../../../hooks/useMutationHook";
import BranchesNav from "./BranchesNav/BranchesNav";
import { addBranch } from "../../../api/admin";
import { SpinnerButton } from "../../component/SpinnerButton";
import toast from "react-hot-toast";
import swal from "sweetalert";
const initialState = {
  hostBranch: false,
  branchCode: "",
  branchName: "",
  address: "",
  status: "Active",
};
const AddNewBranch = () => {
  const { mutate, isSuccess, isError, errorMessage, isPending } =
    useMutationHook(addBranch, {
      key: ["branches"],
      onSuccess: () => {

        {/**RAFI */ }
        setFormData(initialState);
        swal("New Branch Added Successfully.");

      }

    });
  const [formData, setFormData] = useState(initialState);

  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    setFormData({ ...formData, hostBranch: checked });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  function handleSubmit(e) {
    e.preventDefault();
    mutate(formData);
  }
  return (
    <div>
      <section>
        <BranchesNav />
      </section>

      <section className="m-4 ">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
          Add New Branch
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-4 my-8">
          <div className="flex flex-col gap-1">
            <label className="font-medium" htmlFor="name">
              Branch Name:{" "}
            </label>
            <input
              className="input input-bordered input-sm  hover:border-teal-500  "
              name="branchName"
              value={formData.branchName}
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium" htmlFor="relation_with_member">
              Branch Code:{" "}
            </label>
            <input
              className="input input-bordered input-sm  hover:border-teal-500  "
              name="branchCode"
              value={formData.branchCode}
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium" htmlFor="share">
              Address:{" "}
            </label>
            <input
              className="input input-bordered input-sm  hover:border-teal-500  "
              name="address"
              value={formData.address}
              type="text"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium" htmlFor="occupation">
              Status:
            </label>
            <select className="input input-bordered input-sm  hover:border-teal-500  ">
              <option>Active</option>
              <option>Deactive</option>
            </select>
          </div>

          <div>
            <input
              onChange={handleCheckboxChange}
              type="checkbox"
              name="hostBranch"
            />
            <label className="font-medium ml-2" htmlFor="occupation">
              Host Branch
            </label>
          </div>
        </div>
        {isError ? errorMessage : null}

        <div className="w-full flex flex-col md:flex-row justify-center  mt-24">
          <SpinnerButton
            className="bg-teal-600 hover:bg-teal-700 px-20 py-2 rounded font-medium     text-white"
            isLoading={isPending}
            name="Submit"
            onClick={handleSubmit}
          />
        </div>
      </section>
    </div>
  );
};

export default AddNewBranch;
