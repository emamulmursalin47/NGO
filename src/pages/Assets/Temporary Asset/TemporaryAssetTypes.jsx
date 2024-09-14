import { useState } from "react";
import TemporaryAssetNav from "./TeamporaryAssetNav/TemporaryAssetNav";
const initialState = {
  code: "",
  typeName: "",

};
const TemporaryAssetTypes = () => {
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
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 "> Temporary Asset Types</h1>
        <form className="my-8" >
          <section className="grid  grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="code">Code:</label>
              <input
                name="code"
                onChange={handleChange}
                className="input input-bordered input-sm  hover:border-teal-500  " id="code" type="text" placeholder="enter code here" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="type_name">Type Name :</label>
              <input
                name="typeName"
                onChange={handleChange}
                className="input input-bordered input-sm  hover:border-teal-500  " id="type_name" type="text" placeholder="enter type name here" />
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

export default TemporaryAssetTypes;