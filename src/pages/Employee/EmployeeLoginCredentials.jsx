import EmployeeNav from "./EmployeeNav/EmployeeNav";
import { useState } from "react";
import { MoonLoader } from "react-spinners";
import { IconSearch } from "../../../icons/icons";
import toast from "react-hot-toast";
import {
  searchEmployeeByPhoneNumber,
  setEmployeeCredentials,
} from "../../../api/admin";
import useMutationHook from "../../../hooks/useMutationHook";
const initialState = {
  employeeName: "",
  id: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const EmployeeLoginCredentials = () => {
  const [formData, setFormData] = useState(initialState);
  const [searchedUser, setSearchedUser] = useState(null);
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const { mutate, isSuccess, isError, errorMessage, isPending } =
    useMutationHook(setEmployeeCredentials, {
      onSuccess: () => {
        toast.success("Credentials set successfully!");
        setFormData(initialState);
      },
    });
  const [showLoadingIcon, setShowLoadingIcon] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  // * handleSearchUser
  const handleSearchUser = async (event) => {
    const { value } = event.target;
    if (value.length >= 11) {
      const userData = await searchEmployeeByPhoneNumber(value);
      if (userData.length) {
        setShowLoadingIcon(false);
        setSearchedUser(userData[0]);
      } else {
        toast.error("No Data Found");
        setShowLoadingIcon(false);
      }
    } else {
      setShowLoadingIcon(true);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchedUser) {
      toast.error("No User Data Found");
      return;
    }
    if (formData.password === formData.confirmPassword) {
      const body = {
        employeeId: searchedUser._id,
        password: formData.password,
      };
      mutate(body);
    } else {
      setIsPasswordMatched(false);
    }
  };

  return (
    <div>
      <section>
        <EmployeeNav />
      </section>

      <section className="m-4">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
          Employee Login Credentials{" "}
        </h1>
        <form className="my-8">
          <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="acc_id">
                Search By Phone Number:{" "}
              </label>
              <label className="input input-sm hover:border-teal-500 input-bordered flex items-center gap-2">
                <input
                  type="text"
                  id="acc_id"
                  className="grow  "
                  placeholder="Search"
                  onChange={handleSearchUser}
                />
                {!showLoadingIcon ? (
                  <IconSearch className="w-6 h-6 opacity-50" />
                ) : (
                  <MoonLoader size={15} />
                )}
              </label>
            </div>

            <div className="flex flex-col gap-1 ">
              <label className="font-medium" htmlFor="id">
                {" "}
                Email:
              </label>
              <input
                className="input input-bordered input-sm  hover:border-teal-500  "
                id="id"
                name="id"
                value={searchedUser ? searchedUser.email : "No data available"}
                type="text"
                disabled
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="phone_number">
                Name
              </label>
              <input
                className="input input-bordered input-sm  hover:border-teal-500  "
                value={searchedUser ? searchedUser.name : "No data available"}
                disabled
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="password">
                Password:
              </label>
              <input
                className="input input-bordered input-sm  hover:border-teal-500  "
                id="password"
                name="password"
                onChange={handleChange}
                type="password"
                placeholder=""
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="confirm_password">
                Confirm Password:
              </label>
              <input
                className="input input-bordered input-sm  hover:border-teal-500  "
                id="confirm_password"
                name="confirmPassword"
                onChange={handleChange}
                type="password"
                placeholder=""
              />
            </div>
          </section>
        </form>
        {isPasswordMatched ? null : "Password does not match"}
        {isError ? errorMessage : null}
        <div className="w-fit mx-auto  m-8">
          <button
            className="bg-teal-600 hover:bg-teal-700 px-10 py-2 rounded font-medium     text-white"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </section>
    </div>
  );
};

export default EmployeeLoginCredentials;
