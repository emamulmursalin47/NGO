import { useState } from "react";
import useMutationHook from "../../../hooks/useMutationHook";
import { makeWithdraw } from "../../../api/admin";
import toast from "react-hot-toast";
const initialData = {
  date: new Date(),
  amount: 0,
  id: null,
  description: "",
};
function WithdrawMoney({ id }) {
  const [formData, setFormData] = useState(initialData);
  const { mutate } = useMutationHook(makeWithdraw, {
    key: [`saving-account-${id}`, `withdraws-${id}`],
    onSuccess: () => {
      console.log("success");
      toast.success("Succ");
    },
    onError: (data) => {
      toast.error(data.response.data.message);
    },
  });
  function handleChange(e) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    let data = {
      ...formData,
      id: id,
    };
    mutate(data);
  }
  return (
    <section className="m-4">
      <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2">
        Withdraw Money
      </h1>
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-4 my-8">
          <div className="flex flex-col gap-1">
            <label htmlFor="">Amount</label>
            <input
              onChange={handleChange}
              type="number"
              name="amount"
              className="input input-sm hover:border-teal-500 input-bordered flex items-center gap-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="addFineAmount">Description</label>
            <input
              onChange={handleChange}
              type="text"
              name="description"
              className="input input-sm hover:border-teal-500 input-bordered flex items-center gap-2"
            />
          </div>
        </div>

        <div className="w-full flex justify-center  mt-12">
          <button
            className="bg-teal-600 hover:bg-teal-700 px-20 py-2 rounded font-medium  text-white"
            onClick={handleSubmit}
          >
            WithDraw Money
          </button>
        </div>
      </form>
    </section>
  );
}
export default WithdrawMoney;
