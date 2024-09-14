import React, { useEffect, useState } from "react";
import DrawerBankCashSelector from "../../../component/DrawerBankCashSelector";
import { useUserType } from "../../../../hooks/userContext";
import useMutationHook from "../../../../hooks/useMutationHook";
import { payExpenseLiability } from "../../../../api/admin";
import toast from "react-hot-toast";
const initialState = {
  branchId: "",
  samityId: "",
  date: new Date(),
  headId: "",
  amount: "",
  remarks: "",
  payFrom: null,
};
export default function ExpenseButton({ data }) {
  const [formData, setFormData] = useState(initialState);
  const { userDetails } = useUserType(); // Get user details from user context
  const user = userDetails();
  const { mutate } = useMutationHook(payExpenseLiability, {
    key: ["expense-liability"],
    onSuccess: () => {
      document.getElementById("my_modal_3").close();
      toast.success("Expense Liability Paid Successfully");
    },
  });
  const openModal = () => {
    document.getElementById("my_modal_3").showModal();
  };

  const closeModal = () => {
    document.getElementById("my_modal_3").close();
  };
  function handleSubmit(e) {
    e.preventDefault();
    const newData = {
      ...formData,
      by: user,
    };
    mutate(newData);
  }
  useEffect(() => {
    setFormData({ ...data, date: new Date() });
  }, []);
  return (
    <div>
      <button className="btn" onClick={openModal}>
        Pay
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Please Choose Payment Method.</h3>
          <div className="flex items-center justify-center gap-3">
            <DrawerBankCashSelector
              callBackFn={setFormData}
              text={"Pay From"}
              samityId={data.samityId}
            />
            <div className="mt-4">
              <button className="btn" onClick={handleSubmit}>
                Pay
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
