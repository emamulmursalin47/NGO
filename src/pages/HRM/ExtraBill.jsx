import { useState } from "react";
import HRMNav from "./HRMNav/HRMNav";

const initialState={
  employeeId: "",
  date: "",
  payingAmount: "",
  reason: "",
  grantAmount: "",
  adjustmentDuration: "",
  adjustmentAmount: "",
  startingMonth: "",
};

const ExtraBill = () => {

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
        <HRMNav/>
      </section>

      <section className="m-4">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">Extra Bill</h1>

        <form className="my-8" action="">

          
          <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">

          <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="employee_id">Employee Id:</label>
              <input className="input input-bordered input-sm  hover:border-teal-500  " 
              id="employee_id" 
              name="employeeId"
              onChange={handleChange}
              type="text" placeholder="Enter your id here" />
          </div>

          <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="date">Date:</label>
              <input className="input input-bordered input-sm  hover:border-teal-500  " 
              id="date" 
              name="date"
              onChange={handleChange}
              type="date" placeholder=""/>
          </div>

          <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="paying_amount">Paying Amount:</label>
              <input className="input input-bordered input-sm  hover:border-teal-500" id="paying_amount" 
              name="payingAmount"
              onChange={handleChange}
              type="number" placeholder="Enter your amount"/>
          </div>

          <div className="flex flex-col gap-1">
              <label className="font-medium " htmlFor="reason">Reason:</label>
              <select 
              id="reason" 
              name="reason"
              onChange={handleChange}
              className=" input input-bordered input-sm hover:border-teal-500 " >
                <option disabled defaultValue>--Select--</option>
                <option value="Tour Bill">Tour Bill</option>
                <option value="Overtime">Overtime</option>
                <option value="Special Award">Special Award</option>
                <option value="Bonus">Bonus</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="grant_amount">Grant Amount:</label>
              <input className="input input-bordered input-sm  hover:border-teal-500" id="grant_amount" 
              name="grantAmount"
              onChange={handleChange}
              type="number" placeholder="Enter your total amount"/>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="adjustment_duration">Adjustment Duration:</label>
              <input className="input input-bordered input-sm  hover:border-teal-500  " 
              id="adjustment_duration" 
              name="adjustmentDuration"
              onChange={handleChange}
              type="date" placeholder=""/>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="adjustment_amount">Adjustment Amount:</label>
              <input className="input input-bordered input-sm  hover:border-teal-500" id="adjustment_amount" 
              name="adjustmentAmount"
              onChange={handleChange}
              type="number" placeholder="Enter your amount"/>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="starting_month">Starting Month:</label>
              <input className="input input-bordered input-sm  hover:border-teal-500" id="starting_month" 
              name="startingMonth"
              onChange={handleChange}
              type="date" placeholder=""/>
            </div>

            


          </section>
          
        </form>

        <div className="w-full flex justify-center  mt-12">
          <button className="bg-teal-600 hover:bg-teal-700 px-10 py-2 rounded font-medium     text-white" 
          onClick={handleSubmit}
          type="submit" >Submit</button>
          
        </div>

      </section>
      
    </div>
  );
};

export default ExtraBill;