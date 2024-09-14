import { useState } from "react";
import FixedAssetNav from "./FixedAssetNav/FixedAssetNav";
const initialState = {
  branch: "",
  productCode: "",

};

const RemoveWastedAsset = () => {
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
        <FixedAssetNav />
      </section>

      <section className="m-4">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">Remove Wasted Asset</h1>
        <form className="my-8" >
          <section className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center max-w-5xl mx-auto gap-4">

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
              <label className="font-medium" htmlFor="product_code">Product Code:</label>
              <input
                name="productCode"
                onChange={handleChange}
                className="input input-bordered input-sm  hover:border-teal-500  " id="product_code" type="text" placeholder="enter product code here" />
            </div>


            <div className=" flex flex-row justify-center items-center  mt-6 gap-4 md:col-span-2 lg:col-span-1">
              <button
                className="btn btn-info font-medium     text-white"
                onClick={handleSubmit} >
                Search
              </button>

              <button
                className="btn btn-error font-medium     text-white"
                onClick={handleSubmit} >
                Clear Search
              </button>
            </div>

          </section>

        </form>

        <div className="w-fit mx-auto  m-8">
          <button
            className="bg-teal-600 hover:bg-teal-700 px-10 py-2 rounded font-medium  mt-12   text-white"
            onClick={handleSubmit} >
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default RemoveWastedAsset;