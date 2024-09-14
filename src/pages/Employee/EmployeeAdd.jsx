import { useState } from "react";
import EmployeeNav from "./EmployeeNav/EmployeeNav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useMutationHook from "../../../hooks/useMutationHook";
import { createEmployee } from "../../../api/admin";
import BranchSamitySelector from "../../component/branchSamitySelector";
import { useUserType } from "../../../hooks/userContext";
const nidDetails = {
  nidNumber: "",
  nidPhotoFront: "",
  nidPhotoBack: "",
};
const initialState = {
  name: "",
  fatherName: "",
  date: new Date(),
  motherName: "",
  presentAddress: "",
  permanentAddress: "",
  educationalQualification: "HSC",
  dateOfBirth: "",
  mobileNumber: "",
  email: "",
  emergencyContactNumber: "",
  religion: "Islam",
  nidDetails: nidDetails,
  photo: "",
  branchId: "",
  samityId: "",
  previousOrganization: {
    name: "",
    address: "",
    joiningDate: "",
    position: "",
    salary: "",
    switchReason: "",
  },
  presentPosition: {
    designation: "Senior",
    dateOfJoining: "",
    salaryAmount: "",
    mobileBill: "",
    taDa: "",
    additionalTotal: "",
    employeeSecurityFund: "",
  },
  guarantorDetails: {
    name: "",
    address: "",
    relation: "",
    occupation: "",
    nidDetails,
  },
};

const EmployeeAdd = () => {
  const [formData, setFormData] = useState(initialState);
  const { userDetails } = useUserType();
  const user = userDetails();
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: type === "file" ? files[0] : value });
  };
  const handleChangeDate = (date) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: new Date(date),
    }));
  };
  const previousHandleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prev) => ({
      ...prev,
      previousOrganization: {
        ...prev.previousOrganization,
        [name]: value,
      },
    }));
  };

  const handleChangeDatePrevious = (date) => {
    setFormData((prev) => ({
      ...prev,
      previousOrganization: {
        ...prev.previousOrganization,
        joiningDate: date,
      },
    }));
  };

  const handleChangeDatePrensentPosition = (date) => {
    setFormData((prev) => ({
      ...prev,
      presentPosition: {
        ...prev.presentPosition,
        dateOfJoining: date,
      },
    }));
  };

  const handleChangePresent = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      presentPosition: {
        ...prev.presentPosition,
        [name]: value,
      },
    }));
  };
  const handleChangeGurantor = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      guarantorDetails: {
        ...prev.guarantorDetails,
        [name]: value,
      },
    }));
  };
  function handleChangeEmployeeNidDetails(e) {
    const { name, value, files, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      nidDetails: {
        ...prev.nidDetails,
        [name]:
          type === "file"
            ? files[0]
            : type === "number"
            ? Number(value)
            : value,
      },
    }));
  }
  function handleChangeGuarantorNidDetails(e) {
    const { name, value, files, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      guarantorDetails: {
        ...prev.guarantorDetails,
        nidDetails: {
          ...prev.guarantorDetails.nidDetails,
          [name]:
            type === "file"
              ? files[0]
              : type === "number"
              ? Number(value)
              : value,
        },
      },
    }));
  }
  const { mutate, isSuccess, isError, errorMessage, isPending } =
    useMutationHook(createEmployee, {
      onSuccess: () => {
        {
          /**Rafi */
        }
        setFormData(initialState);
        swal("Employee Added Successfully!");
      },
    });
  const handleSubmit = (event) => {
    event.preventDefault();
    const newData = {
      ...formData,
      by: user,
    };
    mutate(newData);
  };

  return (
    <div>
      <section>
        <EmployeeNav />
      </section>

      <section>
        <section className="m-4">
          <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
            Employee Add{" "}
          </h1>
          <form className="my-8">
            <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="name">
                  Employee Name:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="name"
                  name="name"
                  onChange={handleChange}
                  type="text"
                  placeholder="enter your name"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="father_name">
                  Father Name:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="father_name"
                  name="fatherName"
                  onChange={handleChange}
                  type="text"
                  placeholder="enter your father name"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="mother_name">
                  Mother Name:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="mother_name"
                  name="motherName"
                  onChange={handleChange}
                  type="text"
                  placeholder="enter your mother name"
                />
              </div>

              {/* <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="spouse_name">
                  Spouse Name :
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="spouse_name"
                  name="spouseName"
                  onChange={handleChange}
                  type="text"
                  placeholder="enter your spouse name"
                />
              </div> */}
              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="nid_number">
                  NID Number:
                </label>
                <input
                  onChange={handleChangeEmployeeNidDetails}
                  className="border-2 hover:border-teal-500 rounded "
                  id="nid_number"
                  type="number"
                  name="nidNumber"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="font-medium"
                  htmlFor="employee_nid_front_photo"
                >
                  NID Photo (Front):
                </label>
                <input
                  onChange={handleChangeEmployeeNidDetails}
                  className="input input_bordered  hover:border-teal-500 "
                  id="employee_nid_front_photo "
                  type="file"
                  name="nidPhotoFront"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="font-medium"
                  htmlFor="employee_nid_back_photo"
                >
                  NID Photo (Back):
                </label>
                <input
                  onChange={handleChangeEmployeeNidDetails}
                  className="input input_bordered  hover:border-teal-500 "
                  id="employee_nid_back_photo "
                  type="file"
                  name="nidPhotoBack"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="present_address">
                  {" "}
                  Present Address:
                </label>
                <textarea
                  className="input input-bordered hover:border-teal-500 "
                  id=" present_address"
                  name="presentAddress"
                  onChange={handleChange}
                  cols="10"
                  rows="1"
                ></textarea>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="permanent_address">
                  {" "}
                  Permanent Address:
                </label>
                <textarea
                  className="input input-bordered hover:border-teal-500 "
                  id=" permanent_address"
                  name="permanentAddress"
                  onChange={handleChange}
                  cols="10"
                  rows="1"
                ></textarea>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium " htmlFor="occupation">
                  Educational Qualification:
                </label>
                <select
                  name="educationalQualification"
                  onChange={handleChange}
                  className=" input input-bordered input-sm hover:border-teal-500 "
                >
                  <option disabled defaultValue>
                    --Select--
                  </option>
                  <option value="HSC">HSC</option>
                  <option value="BA">BA</option>
                  <option value="Bcom">Bcom</option>
                  <option value="BBA">BBA</option>
                  <option value="BSc">BSc</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="membership_fee ">
                  DOB (DD/MM/YYYY):
                </label>
                <DatePicker
                  selected={formData.dateOfBirth}
                  onChange={handleChangeDate}
                  className="border-2 hover:border-teal-500 rounded "
                  dateFormat="dd/MM/yyyy"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="mobile_no">
                  Mobile Number:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="mobile_no"
                  name="mobileNumber"
                  onChange={handleChange}
                  type="text"
                  placeholder="enter your mobile number"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="email">
                  Email:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="email"
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="enter your email"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="font-medium"
                  htmlFor="emergency_contact_number"
                >
                  Emergency Contact Number:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="emergency_contact_number"
                  name="emergencyContactNumber"
                  onChange={handleChange}
                  type="text"
                  placeholder="enter emergency contact number"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium " htmlFor="religion">
                  Religion:
                </label>
                <select
                  name="religion"
                  onChange={handleChange}
                  className=" input input-bordered input-sm hover:border-teal-500 "
                >
                  <option disabled defaultValue>
                    --Select--
                  </option>
                  <option value="Islam">Islam</option>
                  <option value="Hinduism">Hinduism</option>
                  <option value="Christianity">Christianity</option>
                  <option value="Buddhism">Buddhism</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="Attach_Photo ">
                  Employee Photo:
                </label>
                <input
                  className="input input_bordered  hover:border-teal-500 "
                  id="Attach_Photo "
                  name="photo"
                  onChange={handleChange}
                  type="file"
                />
              </div>

              {/* <div className="flex flex-col gap-1">
                <label className="font-medium " htmlFor="status">
                  Status :
                </label>
                <select
                  name="status"
                  onChange={handleChange}
                  className=" input input-bordered input-sm hover:border-teal-500 "
                >
                  <option disabled defaultValue>
                    --Select--
                  </option>
                  <option value="Working">Working</option>
                  <option value="Resigned">Resigned</option>
                </select>
              </div> */}
            </section>
          </form>
        </section>

        {/* Previous Organization Section */}
        <section className="m-4">
          <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
            Previous Organization{" "}
          </h1>
          <form className="my-8">
            <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="name">
                  Organization Name:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="name"
                  name="name"
                  onChange={previousHandleChange}
                  type="text"
                  placeholder="enter your name"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="address">
                  {" "}
                  Address:
                </label>
                <textarea
                  className="input input-bordered hover:border-teal-500 "
                  id="address"
                  name="address"
                  onChange={previousHandleChange}
                  cols="10"
                  rows="1"
                ></textarea>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium">
                  Joining Date (DD/MM/YYYY):
                </label>
                <DatePicker
                  selected={formData.previousOrganization.joiningDate}
                  onChange={handleChangeDatePrevious}
                  className="input input-bordered input-sm  hover:border-teal-500 w-full"
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="position">
                  Position:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="position"
                  name="position"
                  onChange={previousHandleChange}
                  type="text"
                  placeholder=""
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="salary">
                  Salary:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="salary"
                  name="salary"
                  onChange={previousHandleChange}
                  type="text"
                  placeholder=""
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="switch_reason">
                  Switch Reason:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="switch_reason"
                  name="switchReason"
                  onChange={previousHandleChange}
                  type="text"
                  placeholder="write your reason here"
                />
              </div>
            </section>
          </form>
        </section>

        {/* Present Position Section */}
        <section className="m-4">
          <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
            Present Position{" "}
          </h1>
          <form className="my-8">
            <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium " htmlFor="designation">
                  Designation:
                </label>
                <select
                  name="designation"
                  onChange={handleChangePresent}
                  className=" input input-bordered input-sm hover:border-teal-500 "
                >
                  <option disabled defaultValue>
                    --Select--
                  </option>
                  <option value="Senior">Senior</option>
                  <option value="Mid">Mid</option>
                  <option value="Junior">Junior</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="membership_fee ">
                  Date Of Joining (DD/MM/YYYY):
                </label>
                <DatePicker
                  selected={formData.presentPosition.dateOfJoining}
                  onChange={handleChangeDatePrensentPosition}
                  className="input input-bordered input-sm  hover:border-teal-500 w-full"
                  dateFormat="dd/MM/yyyy"
                />
              </div>

              {/* <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="branch_name">
                  Branch Name :
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="branch_name"
                  name="branchName"
                  onChange={handleChangePresent}
                  type="text"
                  placeholder="Enter your branch name"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="samity_name">
                  Samity Name :
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="samity_name"
                  name="samityName"
                  onChange={handleChangePresent}
                  type="text"
                  placeholder="Enter your samity name"
                />
              </div> */}
              <BranchSamitySelector callBackFn={setFormData} />

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="salary_amount">
                  Salary Amount:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="salary_amount"
                  name="salaryAmount"
                  onChange={handleChangePresent}
                  type="text"
                  placeholder="auto calculated"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="mobile_bill">
                  Mobile Bill:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="mobile_bill"
                  name="mobileBill"
                  onChange={handleChangePresent}
                  type="text"
                  placeholder="auto calculated"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="salary_amount">
                  TA/DA:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="salary_amount"
                  name="taDa"
                  onChange={handleChangePresent}
                  type="text"
                  placeholder="auto calculated"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="additional_total">
                  Additional Total:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="additional_total"
                  name="additionalTotal"
                  onChange={handleChangePresent}
                  type="text"
                  placeholder="auto calculated"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="employee_security_fund">
                  Employee Security Fund:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="employee_security_fund"
                  name="employeeSecurityFund"
                  onChange={handleChangePresent}
                  type="text"
                  placeholder="Enter your security money deposite"
                />
              </div>
            </section>
          </form>
        </section>

        {/* Guarantor Section */}
        <section className="m-4">
          <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
            Guarantor Details{" "}
          </h1>
          <form className="my-8">
            <section className="grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="name">
                  Guarantor Name:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="name"
                  name="name"
                  onChange={handleChangeGurantor}
                  type="text"
                  placeholder="Enter gurantor name"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="address">
                  {" "}
                  Address:
                </label>
                <textarea
                  className="input input-bordered hover:border-teal-500 "
                  id=" address"
                  name="address"
                  onChange={handleChangeGurantor}
                  cols="10"
                  rows="1"
                ></textarea>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="nid_number">
                  NID Number:
                </label>
                <input
                  onChange={handleChangeGuarantorNidDetails}
                  className="border-2 hover:border-teal-500 rounded "
                  id="nid_number"
                  type="number"
                  name="nidNumber"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="font-medium"
                  htmlFor="employee_nid_front_photo"
                >
                  NID Photo (Front):
                </label>
                <input
                  onChange={handleChangeGuarantorNidDetails}
                  className="input input_bordered  hover:border-teal-500 "
                  id="employee_nid_front_photo "
                  type="file"
                  name="nidPhotoFront"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="font-medium"
                  htmlFor="employee_nid_back_photo"
                >
                  NID Photo (Back):
                </label>
                <input
                  onChange={handleChangeGuarantorNidDetails}
                  className="input input_bordered  hover:border-teal-500 "
                  id="employee_nid_back_photo "
                  type="file"
                  name="nidPhotoBack"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="relation">
                  Relation:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="relation"
                  name="relation"
                  onChange={handleChangeGurantor}
                  type="text"
                  placeholder="Enter your relation with gurantor"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="occupation">
                  Occupation:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="occupation"
                  name="occupation"
                  onChange={handleChangeGurantor}
                  type="text"
                  placeholder="Enter gurantor occupation"
                />
              </div>
            </section>
          </form>
        </section>
        {isError ? errorMessage : null}
        <div className="w-fit mx-auto m-16">
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

export default EmployeeAdd;
