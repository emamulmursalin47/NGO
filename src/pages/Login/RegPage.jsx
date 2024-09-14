import { useState } from "react";
import toast from "react-hot-toast";
import useMutaionHook from "../../../hooks/useMutationHook";
import { adminRegistration } from "../../../api/admin";
import { useNavigate } from "react-router-dom";
const initialState = {
  phoneNumber: null,
  name: null,
  password: null,
  confirmPassword: null,
};
const RegPage = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const { mutate, isError, errorMessage } = useMutaionHook(adminRegistration, {
    onSuccess: () => {
      toast.success("Registration Successfully");
      navigate("/auth/login");
    },
  });
  function handleChange(e) {
    const { name, value } = e.target;
    // if (name == 'phoneNumber' && name.value < 11) {
    //   return toast.error("Please enter a valid 11-digit phone number.");
    // }

    // Define the regular expression for phone number validation
    // const phoneRegex = /^\d{11}$/; // Regex for 11-digit phone number

    // // Check if the input field is for phone number and validate against the regex
    // if (name === "phoneNumber" && !phoneRegex.test(value)) {
    //   // If the phone number doesn't match the regex pattern, show an error message
    //   return toast.error("Please enter a valid 11-digit phone number.");
    // }

    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    const { password, confirmPassword, phoneNumber } = formData;
    if (password !== confirmPassword) {
      return toast.error("Password does not match");
    }
    // else if (!/^\d{8}$/.test(password)) {
    //   return toast.error("Password must be at least 8 characters");
    // }
    // if (!/^\d{11}$/.test(phoneNumber)) {
    //   return toast.error("Phone must be at least 11 characters BD Format");
    // }
    mutate(formData);
  }
  return (
    <div className="w-full py-8 min-h-screen flex justify-center items-center bg-teal-800">
      <div className="card md:w-96 shrink-0  max-w-sm shadow-2xl bg-base-100">
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">User Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter user_name here.."
              className="input input-bordered"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="number"
              placeholder="Enter Phone Number Here.. "
              className="input input-bordered"
              name="phoneNumber"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password here.."
              className="input input-bordered"
              name="password"
              required
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered"
              name="confirmPassword"
              required
              onChange={handleChange}
            />
          </div>
          {isError ? errorMessage : null}
          <div className="form-control mt-6">
            <button
              className="btn  bg-emerald-500 hover:bg-teal-700 text-white"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegPage;
