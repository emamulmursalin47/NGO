import BranchSamitySelector from "../../component/branchSamitySelector";
import ExpenseNav from "./ExpenseNav/ExpenseNav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useMemo, useState } from "react";
import { createAssetExpense, createPurchaseExpense } from "../../../api/admin";
import useMutationHook from "../../../hooks/useMutationHook";
import swal from "sweetalert";
import AssetHeadSelector from "./AssetHeadSelector";
import DrawerBankCashSelector from "../../component/DrawerBankCashSelector";
import { useUserType } from "../../../hooks/userContext";

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

const Purchase = () => {
  const [formData, setFormData] = useState(initialState);
  const { userDetails } = useUserType(); // Get user details from user context
  const user = userDetails();
  const { mutate, isSuccess, isError, errorMessage, isPending } =
    useMutationHook(createAssetExpense, {
      onSuccess: () => {
        swal("Purchase Added Successfully", "Press Ok To Continue", "success");
        setFormData(initialState);
      },
    });
  const totalMemo = useMemo(() => {
    const productCost = formData.unitAmount * formData.unitPrice;
    const total =
      productCost +
      (productCost * formData.tds) / 100 +
      (productCost * formData.vat) / 100 +
      (productCost * formData.tax) / 100;
    setFormData((prev) => ({ ...prev, total: total }));
    return total;
  }, [
    formData.unitAmount,
    formData.unitPrice,
    formData.tds,
    formData.vat,
    formData.tax,
  ]);
  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: type === "number" ? Number(value) : value };
    });
  };
  const handleChangeDate = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: new Date(date),
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newData = {
      ...formData,
      by: user,
    };
    mutate(newData);
  };
  useEffect(() => {
    setFormData((prev) => ({ ...prev, date: new Date() }));
  }, []);
  return (
    <div>
      <section>
        <ExpenseNav />
      </section>
      <section className="m-4">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
          Add Purchase{" "}
        </h1>
        <form className="my-8">
          <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
            <BranchSamitySelector callBackFn={setFormData} />
            <AssetHeadSelector callBackFn={setFormData} />
            <DrawerBankCashSelector
              samityId={formData.samityId}
              callBackFn={setFormData}
              text={"Pay From"}
            />

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="date">
                Date(DD/MM/YYYY):
              </label>
              <DatePicker
                selected={formData.date}
                onChange={handleChangeDate}
                className="border-2 hover:border-teal-500 rounded "
                dateFormat="dd/MM/yyyy"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="unit_amount">
                Unit Amount:
              </label>
              <input
                className="input input-bordered input-sm  hover:border-teal-500  "
                id="unit_amount"
                name="unitAmount"
                onChange={handleChange}
                type="number"
                placeholder="type unit amount here"
                value={formData.unitAmount}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="unit_price">
                Unit Price:
              </label>
              <input
                className="input input-bordered input-sm  hover:border-teal-500  "
                id="unit_price"
                name="unitPrice"
                onChange={handleChange}
                type="number"
                placeholder="Enter unit price here"
                value={formData.unitPrice}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="tds">
                TDS:
              </label>
              <input
                className="input input-bordered input-sm  hover:border-teal-500  "
                id="tds"
                name="tds"
                onChange={handleChange}
                type="number"
                placeholder="Enter TDS amount here"
                value={formData.tds}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="tax">
                TAX:
              </label>
              <input
                className="input input-bordered input-sm  hover:border-teal-500  "
                id="tax"
                name="tax"
                onChange={handleChange}
                type="number"
                placeholder="Enter TAX amount here"
                value={formData.tax}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="vat">
                VAT:
              </label>
              <input
                className="input input-bordered input-sm  hover:border-teal-500  "
                id="vat"
                name="vat"
                onChange={handleChange}
                type="number"
                placeholder="Enter VAT amount here"
                value={formData.vat}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="total">
                Total Payment:
              </label>
              <input
                className="input input-bordered input-sm  hover:border-teal-500  "
                id="total"
                type="number"
                value={formData.total}
                disabled
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="appreciation">
                Appreciation Price:
              </label>
              <input
                className="input input-bordered input-sm  hover:border-teal-500  "
                id="appreciation"
                name="appreciation"
                type="number"
                onChange={handleChange}
                value={formData.appreciation}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="depreciation">
                Depreciation Price:
              </label>
              <input
                className="input input-bordered input-sm  hover:border-teal-500  "
                id="depreciation"
                name="depreciation"
                type="number"
                onChange={handleChange}
                value={formData.depreciation}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="remarks">
                {" "}
                Remarks :
              </label>
              <textarea
                className="input input-bordered hover:border-teal-500 "
                id="remarks"
                name="remarks"
                onChange={handleChange}
                cols="10"
                rows="1"
                value={formData.remarks}
              ></textarea>
            </div>
          </section>

          {isError ? errorMessage : null}
          <div className="w-full flex justify-center  mt-12">
            <button
              className="bg-teal-600 hover:bg-teal-700 px-10 py-2 rounded font-medium     text-white"
              onClick={handleSubmit}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Purchase;
