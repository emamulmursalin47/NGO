import { useState } from "react";
import { Link } from "react-router-dom";
import useMutationHook from "../../../hooks/useMutationHook";
import { loginAdminCollector } from "../../../api/admin";
import toast from "react-hot-toast";
import { useUserType } from "../../../hooks/userContext";

import { useNavigate } from "react-router-dom";
const initialState = {
  phoneNumber: null,
  password: null,
  type: "admin",
};
const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { setUser } = useUserType();
  const navigate = useNavigate();
  const { mutate, isError, errorMessage } = useMutationHook(
    loginAdminCollector,
    {
      onSuccess: (data) => {
        console.log(data);
        setUser(data);
        toast.success("Successfully Logged In");
        navigate("/");
      },
    }
  );
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    mutate(formData);
  }
  const minHeightStyle = {
    minHeight: `calc(100vh - 50px)`,
  };

  // useEffect(() => {
  //   if (role) {
  //     navigate("/")
  //   }
  // }, [])
  return (
    <div>
      <section>
        <div className="hero  bg-teal-800 w-full" style={minHeightStyle}>
          <div className="hero-content flex flex-col lg:flex-row">
            <div className="text-center lg:text-left w-full md:w-1/2 hidden md:block">
              <h1 className="text-5xl font-bold text-white mb-8">Audit Based Micro Credit NGO Software</h1>
              <h1 className="text-3xl font-bold text-white">Login Now!</h1>
              <p className="py-6 text-base-300">
                <span className="">ATC</span> Tech Limited has been dedicated to
                providing innovative and sustainable solutions. Our team of
                skilled engineers is passionate about creating high-quality
                products that meet your needs while minimizing environmental
                impact. We are committed to exceeding your expectations and
                building long-lasting partnerships.
              </p>
            </div>
            <div className="card md:w-96 shrink-0  max-w-sm shadow-2xl bg-base-100">
              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone Number</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter phone number here.."
                    className="input input-bordered"
                    required
                    name="phoneNumber"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password here.."
                    className="input input-bordered"
                    required
                    name="password"
                    onChange={handleChange}
                  />
                  <div className="p-4 items-center flex flex-wrap md:flex-row  gap-4">
                    <label className="flex items-center gap-1">
                      <input
                        className="radio radio-success"
                        type="radio"
                        name="type"
                        value="admin"
                        checked={formData.type === "admin"} // Check if type is admin
                        onChange={handleChange}
                      />
                      Admin
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        className="radio radio-success"
                        type="radio"
                        name="type"
                        value="collector"
                        checked={formData.type === "collector"} // Check if type is collector
                        onChange={handleChange}
                      />
                      Collector
                    </label>
                    {/* <label className="flex items-center gap-1">
                      <input
                        className="radio radio-success"
                        type="radio"
                        name="type"
                        value="user"
                        checked={formData.type === "user"} // Check if userType is user
                        onChange={handleChange}
                      />
                      User
                    </label> */}
                  </div>
                  <label className="label">
                    <Link
                      to={"/auth/forgot_pass"}
                      className="label-text-alt link link-hover"
                    >
                      Forget password?
                    </Link>
                  </label>
                </div>

                {isError ?
                  <div className="toast toast-top toast-start  ">
                    <div className="alert alert-error">
                      <span> <p className="text-white">
                        {isError ? errorMessage : null}
                      </p></span>
                    </div>
                  </div>
                  : null
                }
                <div className="form-control mt-6">
                  <button
                    onClick={handleSubmit}
                    className="btn  bg-teal-500 hover:bg-teal-700 text-white"
                  >
                    Login
                  </button>
                </div>
                {/* <div className="form-control mt-1">
                  <Link
                    to={"/auth/registration"}
                    className="btn  bg-emerald-500 hover:bg-teal-700 text-white"
                  >
                    Sign Up
                  </Link>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </section>
      <section></section>
    </div>
  );
};

export default Login;
