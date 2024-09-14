import { useState } from "react";
import TemporaryAssetNav from "./TeamporaryAssetNav/TemporaryAssetNav";
const initialState = {
  year: "",
  branch: "",
  type: "",
  item: "",
  productCode: "",
  depreciation: "",
  remarks: "",

};

const AddNewTemporaryAsset = () => {
  const [formData, setFormData] = useState(initialState);
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  return (
    <div>
      <section>
        <TemporaryAssetNav />
      </section>
      
      <section className="m-4">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">Add New Temporary Asset</h1>
        <form className="my-8" >
          <section className="grid  grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="year">Year:</label>
              <input
                name="year"
                onChange={handleChange}
                className="input input-bordered input-sm  hover:border-teal-500  " id="year" type="text" placeholder="enter year here" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium " htmlFor="branch">Branch :</label>
              <select
                name="branch"
                onChange={handleChange}
                className=" input input-bordered input-sm hover:border-teal-500 " >
                <option disabled defaultValue>Select</option>
                <option value="dummy_1">dummy 1</option>
                <option value="dummy_2">dummy 2</option>
                <option value="dummy_3">dummy 3</option>
                <option value="dummy_4">dummy 4</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium " htmlFor="type">Type :</label>
              <select
                name="type"
                onChange={handleChange}
                className=" input input-bordered input-sm hover:border-teal-500 " >
                <option disabled defaultValue>Select</option>
                <option value="dummy_1">dummy 1</option>
                <option value="dummy_2">dummy 2</option>
                <option value="dummy_3">dummy 3</option>
                <option value="dummy_4">dummy 4</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium " htmlFor="item">Item :</label>
              <select
                name="item"
                onChange={handleChange}
                className=" input input-bordered input-sm hover:border-teal-500 " >
                <option disabled defaultValue>Select</option>
                <option value="dummy_1">dummy 1</option>
                <option value="dummy_2">dummy 2</option>
                <option value="dummy_3">dummy 3</option>
                <option value="dummy_4">dummy 4</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="product_code">Product Code:</label>
              <input
                name="productCode"
                onChange={handleChange}
                className="input input-bordered input-sm  hover:border-teal-500  " id="product_code" type="text" placeholder="enter product code here" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="depreciation_rate">Depreciation %:</label>
              <input
                name="depreciation"
                onChange={handleChange}
                className="input input-bordered input-sm  hover:border-teal-500  " id="depreciation_rate" type="text" placeholder="Enter depreciation rate here" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="permanent_address"> Remarks :</label>
              <textarea
                name="remarks"
                onChange={handleChange}
                className="input input-bordered hover:border-teal-500 " id=" permanent_address" cols="10" rows="1"></textarea>
            </div>

          </section>

        </form>

        <div className="w-fit mx-auto  m-8">
          <button
            className="bg-teal-600 hover:bg-teal-700 px-10 py-2 rounded font-medium     text-white"
            onClick={handleSubmit} >
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default AddNewTemporaryAsset;