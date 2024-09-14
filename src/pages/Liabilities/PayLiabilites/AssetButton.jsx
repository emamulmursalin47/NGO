import React, { useEffect, useState } from "react";
import { useUserType } from "../../../../hooks/userContext";
import { payAssetLiability } from "../../../../api/admin";
import DrawerBankCashSelector from "../../../component/DrawerBankCashSelector";
import useMutationHook from "../../../../hooks/useMutationHook";
import toast from "react-hot-toast";
const initialState = {
  branchId: "",
  samityId: "",
  date: "",
  unitAmount: 0,
  unitPrice: 0,
  tds: 0,
  tax: 0,
  vat: 0,
  remarks: "",
  total: 0,
  headId: "",
  appreciation: 0,
  depreciation: 0,
  payFrom: null,
};
export default function AssetButton({ data }) {
  const [formData, setFormData] = useState(initialState);
  const { userDetails } = useUserType(); // Get user details from user context
  const user = userDetails();
  const { mutate, isSuccess, isError, errorMessage, isPending } =
    useMutationHook(payAssetLiability, {
      key: ["asset-liability"],
      onSuccess: () => {
        document.getElementById("my_modal_3").close();
        toast.success("Asset Liability Paid Successfully");
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
