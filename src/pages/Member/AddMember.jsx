import { useState } from "react";
import MemberNav from "./MemberNav/MemberNav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BranchSamitySelector from "../../component/branchSamitySelector";
import useMutationHook from "../../../hooks/useMutationHook";
import { createMember } from "../../../api/admin";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { useUserType } from "../../../hooks/userContext";
const birthCertificate = {
  birthCertificateNumber: "",
  photo: "",
};
const nidDetails = {
  nidNumber: "",
  nidPhotoFront: "",
  nidPhotoBack: "",
};
const initialState = {
  name: "",
  branchId: "",
  samityId: "",
  fathersName: "",
  mothersName: "",
  spouseName: "",
  occupation: "",
  religion: "",
  occupationBrief: "",
  presentAddress: "",
  permanentAddress: "",
  dateOfBirth: "",
  mobileNumber: "",
  educationalQualification: "SSC",
  emergencyContactNumber: "",
  openingDate: new Date(),
  membershipFee: "",
  formFee: "",
  memberSalary: "",
  birthCertificate,
  nidDetails,
  referenceSection: {
    employeeName: "",
    employeeNumber: "",
  },
  photo: "",
  nominee: {
    name: "",
    address: "",
    relation: "",
    share: "",
    occupation: "",
    phoneNumber: "",
    photo: "",
    birthCertificate,
    nidDetails,
  },
};
const AddMember = () => {
  const { userDetails } = useUserType(); // Get user details from user context
  const user = userDetails();
  const { mutate, isSuccess, isError, errorMessage, isPending } =
    useMutationHook(createMember, {
      key: ["user"],
      onSuccess: () => {
        setFormData(initialState);
        swal("Member Added Successfully!", "Press Ok To Continue", "Success");
      },
    });

  const [formData, setFormData] = useState(initialState);

  {
    /**Rafi */
  }
  const [selectedDocumentType, setSelectedDocumentType] = useState("NID");
  const [nomineeSelectedType, setNomineeSelectedType] = useState("NID");

  function handleChangeUserDocumentType(e) {
    const { value, name } = e.target;
    setSelectedDocumentType(value);
  }
  function handleChangeNomineeDocuments(e) {
    const { value } = e.target;
    setNomineeSelectedType(value);
  }
  function handleChangeUserDocument(e) {
    const { name, value, files, type } = e.target;

    if (selectedDocumentType === "NID") {
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
    } else {
      setFormData((prev) => ({
        ...prev,
        birthCertificate: {
          ...prev.birthCertificate,
          [name]:
            type === "file"
              ? files[0]
              : type === "number"
              ? Number(value)
              : value,
        },
      }));
    }
  }
  function handleChangeNomineeDocument(e) {
    const { name, value, files, type } = e.target;
    console.log(selectedDocumentType);
    if (nomineeSelectedType === "NID") {
      console.log(name, value);
      setFormData((prev) => ({
        ...prev,
        nominee: {
          ...prev.nominee,
          nidDetails: {
            ...prev.nominee.nidDetails,
            [name]:
              type === "file"
                ? files[0]
                : type === "number"
                ? Number(value)
                : value,
          },
        },
      }));
    } else {
      console.log(name, value);
      setFormData((prev) => ({
        ...prev,
        nominee: {
          ...prev.nominee,
          birthCertificate: {
            ...prev.nominee.birthCertificate,
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
  }
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    console.log(name, value, files, type);
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "file" ? files[0] : type === "number" ? Number(value) : value,
    }));
  };

  const handleChangeNominie = (e) => {
    const { name, value, files, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      nominee: {
        ...prevState.nominee,
        [name]: type === "file" ? files[0] : value,
      },
    }));
  };
  const handleChangeRefSection = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      referenceSection: {
        ...prev.referenceSection,
        [name]: value,
      },
    }));
  };

  const handleChangeDate = (date) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: new Date(date),
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let mock = {};
    let role = localStorage.getItem("userType");
    if (role === "admin") {
      mock = { ...formData, status: "accepted" };
    } else {
      mock = { ...formData, status: "pending" };
    }
    mock = {
      t1: selectedDocumentType,
      t2: nomineeSelectedType,
      openedBy: user,
      ...mock,
    };

    mutate(mock);
  };
  return (
    <div>
      <section>
        <MemberNav />
      </section>
      <section className="m-4 ">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
          Branch Samity Selector{" "}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 my-8 max-w-5xl mx-auto">
          <BranchSamitySelector callBackFn={setFormData} />
        </div>
      </section>
      <section className="m-4">
        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
          New Member Add{" "}
        </h1>
        <form className="my-8" action="">
          <section className=" grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4 ">
            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="name">
                Name:{" "}
              </label>
              <input
                onChange={handleChange}
                className="input input-bordered input-sm  hover:border-teal-500"
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="fathers_name">
                Father’s Name:
              </label>
              <input
                onChange={handleChange}
                className="input input-bordered input-sm  hover:border-teal-500"
                id="fathers_name"
                type="text"
                name="fathersName"
                required
                value={formData.fathersName}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="mothers_name">
                Mother’s Name:
              </label>
              <input
                onChange={handleChange}
                className="input input-bordered input-sm  hover:border-teal-500"
                id="mothers_name"
                type="text"
                name="mothersName"
                required
                value={formData.mothersName}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="spouse_name">
                Spouse Name:
              </label>
              <input
                onChange={handleChange}
                className="input input-bordered input-sm  hover:border-teal-500"
                id="spouse_name"
                type="text"
                name="spouseName"
                required
                value={formData.spouseName}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="occupation">
                Occupation:
              </label>
              <input
                onChange={handleChange}
                className="input input-bordered input-sm  hover:border-teal-500"
                id="occupation"
                type="text"
                name="occupation"
                required
                value={formData.occupation}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="religion">
                Religion:
              </label>
              <input
                onChange={handleChange}
                className="input input-bordered input-sm  hover:border-teal-500"
                id="religion"
                type="text"
                name="religion"
                required
                value={formData.religion}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                className="font-medium"
                htmlFor="short_brief_of_occupation"
              >
                Short Brief of Occupation:
              </label>
              <textarea
                onChange={handleChange}
                name="occupationBrief"
                id="short_brief_of_occupation"
                cols="10"
                rows="2"
                className="input input-bordered input-sm  hover:border-teal-500  "
              ></textarea>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="present_address">
                {" "}
                Present Address:
              </label>
              <textarea
                onChange={handleChange}
                name="presentAddress"
                id=" present_address"
                cols="10"
                rows="2"
                className="input input-bordered input-sm  hover:border-teal-500"
                required
              ></textarea>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor=" permanent_address">
                {" "}
                Permanent Address:
              </label>
              <textarea
                onChange={handleChange}
                name="permanentAddress"
                id="  permanent_address"
                cols="10"
                rows="2"
                className="input input-bordered input-sm  hover:border-teal-500"
                required
              ></textarea>
            </div>

            {/*-------------------------------------------
            Rafi Start
            -------------------------------------------*/}

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="Attach_Photo ">
                Select Document Type:
              </label>
              <select
                onChange={handleChangeUserDocumentType}
                className="input input-bordered input-sm  hover:border-teal-500"
                name="selectDocument"
                required
              >
                <option disabled defaultValue>
                  --Select--
                </option>
                <option value="NID">NID</option>
                <option value="Birth Certificate">Birth Certificate</option>
              </select>
            </div>

            {/**Rafi */}

            {selectedDocumentType === "NID" && (
              <>
                {/**Rafi */}

                <div className="flex flex-col gap-1">
                  <label className="font-medium" htmlFor="member_nid_number">
                    NID Number:
                  </label>
                  <input
                    onChange={handleChangeUserDocument}
                    className="input input-bordered input-sm  hover:border-teal-500"
                    id="member_nid_number"
                    type="number"
                    name="nidNumber"
                    required
                    value={formData.nidNumber}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className="font-medium"
                    htmlFor="member_nid_front_photo"
                  >
                    NID Photo (Front):
                  </label>
                  <input
                    onChange={handleChangeUserDocument}
                    className="input input_bordered  hover:border-teal-500 "
                    id="member_nid_front_photo "
                    type="file"
                    name="nidPhotoFront"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className="font-medium"
                    htmlFor="member_nid_back_photo"
                  >
                    NID Photo (Back):
                  </label>
                  <input
                    onChange={handleChangeUserDocument}
                    className="input input_bordered  hover:border-teal-500 "
                    id="member_nid_back_photo "
                    type="file"
                    name="nidPhotoBack"
                    required
                  />
                </div>
              </>
            )}

            {/**Rafi */}

            {selectedDocumentType === "Birth Certificate" && (
              <>
                {/**Rafi */}

                <div className="flex flex-col gap-1">
                  <label
                    className="font-medium"
                    htmlFor="member_birth_certificate_number"
                  >
                    Birth Certificate Number:
                  </label>
                  <input
                    onChange={handleChangeUserDocument}
                    className="input input-bordered input-sm  hover:border-teal-500"
                    id="member_birth_certificate_number"
                    type="number"
                    name="birthCertificateNumber"
                    required
                    value={formData.birthCertificate.birthCertificateNumber}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    className="font-medium"
                    htmlFor="member_birth_certificate_photo"
                  >
                    Birth Certificate Photo:
                  </label>
                  <input
                    onChange={handleChangeUserDocument}
                    className="input input_bordered  hover:border-teal-500 "
                    id="member_birth_certificate_photo "
                    type="file"
                    name="photo"
                    required
                  />
                </div>
              </>
            )}

            {/*-------------------------------------------
            Rafi End
            -------------------------------------------*/}

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="mobile_number">
                Mobile Number:
              </label>
              <input
                onChange={handleChange}
                className="input input-bordered input-sm  hover:border-teal-500"
                id="mobile_number"
                type="text"
                placeholder="+880"
                name="mobileNumber"
                required
                value={formData.mobileNumber}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="emergency_number">
                Emergency Contact Number:
              </label>
              <input
                onChange={handleChange}
                className="input input-bordered input-sm  hover:border-teal-500"
                id="emergency_number"
                type="number"
                placeholder="+880"
                name="emergencyContactNumber"
                required
                value={formData.emergencyContactNumber}
              />
            </div>

            {/*-------------------------------------------
            Rafi Start
            -------------------------------------------*/}

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="member_salary">
                Member Salary:
              </label>
              <input
                onChange={handleChange}
                className="input input-bordered input-sm  hover:border-teal-500"
                id="member_salary"
                type="number"
                name="memberSalary"
                value={formData.memberSalary}
              />
            </div>

            {/*-------------------------------------------
            Rafi End
            -------------------------------------------*/}

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="membership_fee ">
                Membership Fee:
              </label>
              <input
                onChange={handleChange}
                className="input input-bordered input-sm  hover:border-teal-500"
                id="membership_fee "
                type="number"
                name="membershipFee"
                required
                value={formData.membershipFee}
              />
            </div>

            {/*-------------------------------------------
            Rafi Start
            -------------------------------------------*/}

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="form_fee ">
                Form Fee:
              </label>
              <input
                onChange={handleChange}
                className="input input-bordered input-sm  hover:border-teal-500"
                id="form_fee "
                type="number"
                name="formFee"
                required
                value={formData.formFee}
              />
            </div>

            {/*-------------------------------------------
            Rafi End
            -------------------------------------------*/}

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="membership_fee ">
                DOB (DD/MM/YYYY):
              </label>
              <DatePicker
                selected={formData.dateOfBirth}
                onChange={handleChangeDate}
                className="input input-bordered input-sm  hover:border-teal-500 w-full"
                dateFormat="dd/MM/yyyy"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="member_photo ">
                Member Photo:
              </label>
              <input
                onChange={handleChange}
                className="input input_bordered  hover:border-teal-500 "
                id="member_photo "
                type="file"
                name="photo"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium" htmlFor="Attach_Photo ">
                Education Qualification:
              </label>
              <select
                onChange={handleChange}
                className="input input-bordered input-sm  hover:border-teal-500"
                name="educationalQualification"
                required
              >
                <option disabled defaultValue>
                  --Select Education Qualification--
                </option>
                <option value="SSC">SSC</option>
                <option value="HSC">HSC</option>
                <option value="B.A">B.A</option>
                <option value="M.A">M.A</option>
                <option value="NONE">NONE</option>
              </select>
            </div>

            {/* <BranchSamitySelector callBackFn={setFormData} /> */}
          </section>

          {/*-------------------------------------------
            Rafi Start
            -------------------------------------------*/}

          {/*Reference Section */}
          <section className="m-4">
            <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
              Reference Section{" "}
            </h1>
            <form className="my-8" action="">
              <section className=" grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-4 ">
                <div className="flex flex-col gap-1">
                  <label className="font-medium" htmlFor="employee_name">
                    Employee Name:{" "}
                  </label>
                  <input
                    onChange={handleChangeRefSection}
                    className="input input-bordered input-sm  hover:border-teal-500"
                    id="employee_name"
                    type="text"
                    name="employeeName"
                    required
                    value={formData.employeeName}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-medium" htmlFor="Phone_Number">
                    Phone Number:{" "}
                  </label>
                  <input
                    onChange={handleChangeRefSection}
                    className="input input-bordered input-sm  hover:border-teal-500"
                    id="phone_number"
                    type="number"
                    name="employeeNumber"
                    required
                    value={formData.employeeNumber}
                  />
                </div>
              </section>
            </form>
          </section>

          {/*-------------------------------------------
            Rafi End
            -------------------------------------------*/}

          {/* nominee section */}
          <section>
            <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
              Nominee Section
            </h1>
            <section className=" grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto gap-4 my-8">
              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="name">
                  Name:{" "}
                </label>
                <input
                  onChange={handleChangeNominie}
                  className="input input-bordered input-sm  hover:border-teal-500"
                  id="name"
                  type="text"
                  name="name"
                  required
                  value={formData.nominee.name}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor=" permanent_address">
                  {" "}
                  Address:
                </label>
                <input
                  onChange={handleChangeNominie}
                  name="address"
                  id="address"
                  cols="10"
                  rows="2"
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  required
                  value={formData.nominee.address}
                />
              </div>

              {/*-------------------------------------------
            Rafi Start
            -------------------------------------------*/}

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="phone_number">
                  Phone Number:{" "}
                </label>
                <input
                  onChange={handleChangeNominie}
                  className="input input-bordered input-sm  hover:border-teal-500"
                  id="phone_number"
                  type="text"
                  name="phoneNumber"
                  required
                  value={formData.nominee.phoneNumber}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="nominee_photo ">
                  Nominee Photo:
                </label>
                <input
                  onChange={handleChangeNominie}
                  className="input input_bordered  hover:border-teal-500 "
                  id="nominee_photo "
                  type="file"
                  name="photo"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="select_document">
                  Select Document Type:
                </label>
                <select
                  onChange={handleChangeNomineeDocuments}
                  className="input input-bordered input-sm  hover:border-teal-500"
                  name="selectDocument"
                  required
                >
                  <option disabled defaultValue>
                    --Select--
                  </option>
                  <option value="NID">NID</option>
                  <option value="Birth Certificate">Birth Certificate</option>
                </select>
              </div>

              {/**Rafi */}

              {nomineeSelectedType === "NID" && (
                <>
                  {/**Rafi */}

                  <div className="flex flex-col gap-1">
                    <label className="font-medium" htmlFor="nominee_nid_number">
                      NID Number:
                    </label>
                    <input
                      onChange={handleChangeNomineeDocument}
                      className="input input-bordered input-sm  hover:border-teal-500"
                      id="nominee_nid_number"
                      type="number"
                      name="nidNumber"
                      required
                      value={formData.nominee.nidDetails.nidNumber}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      className="font-medium"
                      htmlFor="nominne_nid_front_photo "
                    >
                      NID Photo (Front):
                    </label>
                    <input
                      onChange={handleChangeNomineeDocument}
                      className="input input_bordered  hover:border-teal-500 "
                      id="nominee_nid_front_photo "
                      type="file"
                      name="nidPhotoFront"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      className="font-medium"
                      htmlFor="nominee_nid_back_photo "
                    >
                      NID Photo (Back):
                    </label>
                    <input
                      onChange={handleChangeNomineeDocument}
                      className="input input_bordered  hover:border-teal-500 "
                      id="nominee_nid_back_photo "
                      type="file"
                      name="nidPhotoBack"
                      required
                    />
                  </div>
                </>
              )}

              {/**Rafi */}

              {nomineeSelectedType === "Birth Certificate" && (
                <>
                  {/**Rafi */}

                  <div className="flex flex-col gap-1">
                    <label
                      className="font-medium"
                      htmlFor="nominee_birth_certificate_number"
                    >
                      Birth Certificate Number:
                    </label>
                    <input
                      onChange={handleChangeNomineeDocument}
                      className="input input-bordered input-sm  hover:border-teal-500"
                      id="nomminee_birth_certificate_number"
                      type="number"
                      name="birthCertificateNumber"
                      required
                      value={
                        formData.nominee.birthCertificate.birthCertificateNumber
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label
                      className="font-medium"
                      htmlFor="nominee_birth_certificate_photo "
                    >
                      Birth Certificate Photo:
                    </label>
                    <input
                      onChange={handleChangeNomineeDocument}
                      className="input input_bordered  hover:border-teal-500 "
                      id="nominee_birth_certificate_photo "
                      type="file"
                      name="photo"
                      required
                    />
                  </div>
                </>
              )}

              {/*-------------------------------------------
            Rafi End
            -------------------------------------------*/}

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="relation_with_member">
                  Relation with Member:{" "}
                </label>
                <input
                  onChange={handleChangeNominie}
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="relation_with_member"
                  type="text"
                  name="relation"
                  required
                  value={formData.nominee.relation}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="share">
                  Share %:{" "}
                </label>
                <input
                  onChange={handleChangeNominie}
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="share"
                  type="number"
                  name="share"
                  required
                  value={formData.nominee.share}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="occupation">
                  Occupation:
                </label>
                <input
                  onChange={handleChangeNominie}
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="occupation"
                  type="text"
                  name="occupation"
                  value={formData.nominee.occupation}
                />
              </div>
            </section>
          </section>

          <section></section>
          {isError ? errorMessage : null}
          <div className="w-full flex flex-col md:flex-row justify-center  mt-8">
            <button
              onClick={handleSubmit}
              className="bg-teal-600 hover:bg-teal-700 px-20 py-2 rounded font-medium     text-white"
              disabled={isPending}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddMember;
