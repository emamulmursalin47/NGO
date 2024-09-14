import { useState } from "react";
import ManageBankCashNav from "./ManageBankCashNav/ManageBankCashNav";

const initialState ={
  cashInAmount: "",
  cashOutAmount: "",
  bankName: "",
  branchName: "",
  samityName:  "",
  date: "",
  sourceDetails: "",
  remarks: "",
}

const BankCashtoDrawer = () => {

  const [getFormData, setFormData] = useState(initialState);
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(getFormData);
    setFormData();
  };

  return (
    <div>
      <section>
        <ManageBankCashNav />
      </section>

      <section className="m-4">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">Bank Cash to Drawer</h1>
        <form className="my-8" >
          <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="cash_in_amount">Cash In Amount :</label>
              <input className="input input-bordered input-sm  hover:border-teal-500  " 
              id="cash_in_amount" 
              name="cashInAmount"
              onChange={handleChange}
              type="number" placeholder="enter cash in amount" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="cash_out_amount">Cash Out Amount :</label>
              <input className="input input-bordered input-sm  hover:border-teal-500  " 
              id="cash_out_amount" 
              name="cashOutAmount"
              onChange={handleChange}
              type="number" placeholder="enter cash out amount" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="bank_name">Bank Name :</label>
              <input className="input input-bordered input-sm  hover:border-teal-500  " 
              id="bank_name" 
              name="bankName"
              onChange={handleChange}
              type="text" placeholder="enter bank name" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium " htmlFor="branch_name">Branch Name :</label>
              <select 
              name="branchName"
              onChange={handleChange}
              className=" input input-bordered input-sm hover:border-teal-500 " >
                <option disabled defaultValue>--Select--</option>
                <option value="Branch_1">branch 1</option>
                <option value="Branch_2">branch 2</option>
                <option value="Branch_3">branch 3</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium " htmlFor="branch_name">Samity Name :</label>
              <select 
              name="samityName"
              onChange={handleChange}
              className=" input input-bordered input-sm hover:border-teal-500 " >
                <option disabled defaultValue>--Select--</option>
                <option value="Samity_1">samity 1</option>
                <option value="Samity_2">samity 2</option>
                <option value="Samity_3">samity 3</option>
              </select>
            </div>


            <div className="flex flex-col gap-1 ">
              <label className="font-medium" htmlFor="date"> Date :</label>
              <input className="input input-bordered input-sm  hover:border-teal-500  " 
              id="date" 
              name="date"
              onChange={handleChange}
              type="date" placeholder="" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="source_details">Source Details:</label>
              <textarea className="input input-bordered hover:border-teal-500 " id="source_details" 
              name="sourceDetails"
              onChange={handleChange}
              cols="10" rows="1"></textarea>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="remarks"> Remarks :</label>
              <textarea className="input input-bordered hover:border-teal-500 " id="remarks" 
              name="remarks"
              onChange={handleChange}
              cols="10" rows="1"></textarea>
            </div>


          </section>

        </form>

        <div className="w-full flex justify-center  m-8">
          <button className="bg-teal-600 hover:bg-teal-700 px-10 py-2 rounded font-medium     text-white" 
          onClick={handleSubmit}
          type="submit">Submit</button>
        </div>
      </section>
    </div>
  );
};

export default BankCashtoDrawer;