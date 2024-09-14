import { useState } from "react";
import HRMNav from "./HRMNav/HRMNav";

const initialState={
  yearlyLeave: "",
  maternityLeave: "",
  mobileBill: "",
  ait: "",
  providentFund: "",
  salary: ""
}

const Fixation = () => {

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
        <HRMNav />
      </section>

      <section className="m-4">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 "> Fixation</h1>
        <form className="my-8" >
          <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="yearly_leave">Yearly Leave :</label>
              <input className="input input-bordered input-sm  hover:border-teal-500  " 
              id="yearly_leave" 
              name="yearlyLeave"
              onChange={handleChange}
              type="text" placeholder="enter yearly leave" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="maternity_leave">Maternity Leave :</label>
              <input className="input input-bordered input-sm  hover:border-teal-500  " 
              id="maternity_leave" 
              name="maternityLeave"
              onChange={handleChange}
              type="text" placeholder="enter maternity leave" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="mobile_bill">Mobile Bill :</label>
              <input className="input input-bordered input-sm  hover:border-teal-500  " 
              id="mobile_bill" 
              name="mobileBill"
              onChange={handleChange}
              type="text" placeholder="enter your mobile bill" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="ait">AIT :</label>
              <input className="input input-bordered input-sm  hover:border-teal-500  " 
              id="ait" 
              name="ait"
              onChange={handleChange}
              type="text" placeholder="%" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="provident_fund">Provident Fund :</label>
              <input className="input input-bordered input-sm  hover:border-teal-500  " 
              id="provident_fund" 
              name="providentFund"
              onChange={handleChange}
              type="text" placeholder="%" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="provident_fund">Salary :</label>
              <input className="input input-bordered input-sm  hover:border-teal-500  " 
              id="salary" 
              name="salary"
              onChange={handleChange}
              type="text" placeholder="" />
            </div>


          </section>

        </form>

        <div className="w-fit mx-auto flex justify-center  m-8">
          <button className="bg-teal-600 hover:bg-teal-700 px-10 py-2 rounded font-medium     text-white" 
          onClick={handleSubmit}
          type="submit">
            Submit
          </button>
         
        </div>
      </section>
    </div>
  );
};

export default Fixation;