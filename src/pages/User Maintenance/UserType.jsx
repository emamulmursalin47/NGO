import { useState } from "react";
import UserMaintanaceNav from "./UserMaintananceNav/UserMaintanaceNav";
const initialState = {
  status: "",
  userType: "",

};

const UserType = () => {
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
        <UserMaintanaceNav />
      </section>

      <section className="m-4">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">User Type</h1>
        <form className="my-8" >
          <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">

            <div className="flex flex-col gap-1">
              <label className="font-medium " htmlFor="status">Status :</label>
              <select
                name="status"
                onChange={handleChange}
                className=" input input-bordered input-sm hover:border-teal-500 " >
                <option disabled defaultValue>Select</option>
                <option value="active">Active</option>
                <option value="deactive">Deactive</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium " htmlFor="user_type">User Type :</label>
              <select
                name="userType"
                onChange={handleChange}
                className=" input input-bordered input-sm hover:border-teal-500 " >
                <option disabled defaultValue>Select</option>
                <option value="dummy_1">dummy 1</option>
                <option value="dummy_2">dummy 2</option>
                <option value="dummy_3">dummy 3</option>
              </select>
            </div>


          </section>

        </form>

        <div className="w-full flex justify-center  m-8">
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

export default UserType;