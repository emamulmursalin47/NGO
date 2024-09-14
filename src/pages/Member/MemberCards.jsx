import EditBtn from "../../component/button/EditBtn";
import { dateToString } from "../../utils/DateHelper";
// react print
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
// react print

const MemberCards = ({ data }) => {
  const {
    name,
    fathersName,
    mothersName,
    spouseName,
    occupation,
    occupationBrief,
    presentAddress,
    permanentAddress,
    educationalQualification,
    dateOfBirth,
    nidNumber,
    mobileNumber,
    emergencyContactNumber,
    religion,
    membershipFee,
    photo,
    status,
    nominee,
    branchName,
    samityName,
    nidDetails,
  } = data;

  const { nidPhotoFront, nidPhotoBack } = nominee.nidDetails;
  const {
    name: nomineeName,
    address: nomineeAddress,
    relation: nomineeRelation,
    share: nomineeShare,
    occupation: nomineeOccupation,
  } = nominee;
  console.log(nominee);
  console.log(data);
  console.log(nidPhotoBack);
  console.log(nidPhotoFront);

  // react print
  const [print, setPrint] = useState(false);
  const componentRef = useRef();
  const printFun = () => {
    setPrint(true);
    setTimeout(() => {
      handlePrint();
      setPrint(false);
    }, 100);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  //react print

  return (
    <>
      <section
        ref={componentRef}
        className="p-4 max-w-5xl mx-auto  md:mt-8 rounded "
      >
        {print && (
          <div className={``}>
            <h1></h1>
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-4 border-b-4 pb-4">
          <div className=" ">
            <img className=" rounded h-52 object-cover " src={photo} alt="" />
          </div>
          <div className=" space-y-2 p-4 ">
            <h1 className="md:text-4xl">{name}</h1>
            <p className="font-bold text-green-600">{status}</p>
            <p className=" font-medium flex items-center  ">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  aria-label="Phonenumber"
                  className="w-5 h-5 font-bold"
                >
                  <path
                    fill="currentColor"
                    d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"
                  ></path>
                </svg>
              </span>
              <span className=" pl-1 font-normal">{mobileNumber}</span>
            </p>
            <p className=" font-medium">
              {" "}
              NID:<span className="font-normal pl-2">{nidNumber}</span>
            </p>
          </div>
        </div>
        {/* <div className=" font-bold grid grid-cols-1 md:grid-cols-1 gap-4 py-4 space-y-2 tracking-wide  ">
                    <div>

                        <p className="flex justify-between pl-4 bg-base-200 p-2 border-b-2 items-center">Education:  <span className="font-normal text-base ">{educationalQualification}</span></p>
                        <p className="flex justify-between pl-4 bg-base-200 p-2 border-b-2 items-center">Date of Birth:  <span className="font-normal text-base ">{dateToString(dateOfBirth)}</span></p>
                        <p className="flex justify-between pl-4 bg-base-200 p-2 border-b-2 items-center">Present Address:  <span className="font-normal text-base ">{presentAddress}</span></p>
                        <p className="flex justify-between pl-4 bg-base-200 p-2 border-b-2 items-center">Permanent Address:  <span className="font-normal text-base ">{permanentAddress}</span></p>
                        <p className="flex justify-between pl-4 bg-base-200 p-2 border-b-2 items-center">Father Name:  <span className="font-normal text-base ">{fathersName}</span></p>
                        <p className="flex justify-between pl-4 bg-base-200 p-2 border-b-2 items-center">Mother Name:  <span className="font-normal text-base ">{mothersName}</span></p>
                        <p className="flex justify-between pl-4 bg-base-200 p-2 border-b-2 items-center">Spouse Name:  <span className="font-normal text-base ">{spouseName}</span></p>
                        <p className="flex justify-between pl-4 bg-base-200 p-2 border-b-2 items-center">Occupation:  <span className="font-normal text-base ">{occupation}</span></p>
                        <p className="flex justify-between pl-4 bg-base-200 p-2 border-b-2 items-center">Job Description:  <span className="font-normal text-base ">{occupationBrief}</span></p>
                        <p className="flex justify-between pl-4 bg-base-200 p-2 border-b-2 items-center">Educational Qualification: <span className="font-normal text-base ">{educationalQualification}</span></p>
                        <p className="flex justify-between pl-4 bg-base-200 p-2 border-b-2 items-center">Emergency Contact:  <span className="font-normal text-base ">{emergencyContactNumber}</span></p>
                        <p className="flex justify-between pl-4 bg-base-200 p-2 border-b-2 items-center">Religion:  <span className="font-normal text-base ">{religion}</span></p>
                        <p className="flex justify-between pl-4 bg-base-200 p-2 border-b-2 items-center">Membership Fee:  <span className="font-normal text-base ">{membershipFee}</span></p>
                        <p className="flex justify-between pl-4 bg-base-200 p-2 border-b-2 items-center">Branch Name:  <span className="font-normal text-base ">{branchName}</span></p>
                        <p className="flex justify-between pl-4 bg-base-200 p-2 border-b-2 items-center">Samity Name:  <span className="font-normal text-base ">{samityName}</span></p>

                    </div>
                </div > */}
        <section>
          <div className="container mx-auto py-4">
            <table className="min-w-full bg-base-100 border">
              <tbody>
                <tr className="border-b  bg-teal-500 text-white ">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Title
                  </td>
                  <td
                    className="p-2  text-base font-bold"
                    style={{ width: "60%" }}
                  >
                    Description
                  </td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Branch Name:
                  </td>
                  <td
                    className="p-2 font-normal text-base border-l-2 "
                    style={{ width: "60%" }}
                  >
                    {branchName}
                  </td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Samity Name:
                  </td>
                  <td
                    className="p-2 font-normal text-base border-l-2 "
                    style={{ width: "60%" }}
                  >
                    {samityName}
                  </td>
                </tr>
                <tr className="border-b  ">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Education:
                  </td>
                  <td
                    className="p-2 font-normal text-base border-l-2 "
                    style={{ width: "60%" }}
                  >
                    {educationalQualification}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Date of Birth:
                  </td>
                  <td
                    className="p-2 font-normal text-base border-l-2 "
                    style={{ width: "60%" }}
                  >
                    {dateToString(dateOfBirth)}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Present Address:
                  </td>
                  <td
                    className="p-2 font-normal text-base border-l-2 "
                    style={{ width: "60%" }}
                  >
                    {presentAddress}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Permanent Address:
                  </td>
                  <td
                    className="p-2 font-normal text-base border-l-2 "
                    style={{ width: "60%" }}
                  >
                    {permanentAddress}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Father Name:
                  </td>
                  <td
                    className="p-2 font-normal text-base border-l-2 "
                    style={{ width: "60%" }}
                  >
                    {fathersName}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Mother Name:
                  </td>
                  <td
                    className="p-2 font-normal text-base border-l-2 "
                    style={{ width: "60%" }}
                  >
                    {mothersName}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Spouse Name:
                  </td>
                  <td
                    className="p-2 font-normal text-base border-l-2 "
                    style={{ width: "60%" }}
                  >
                    {spouseName}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Occupation:
                  </td>
                  <td
                    className="p-2 font-normal text-base border-l-2 "
                    style={{ width: "60%" }}
                  >
                    {occupation}
                  </td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Job Description:
                  </td>
                  <td
                    className="p-2 font-normal text-base border-l-2 "
                    style={{ width: "60%" }}
                  >
                    {occupationBrief}
                  </td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Educational Qualification:
                  </td>
                  <td
                    className="p-2 font-normal text-base border-l-2 "
                    style={{ width: "60%" }}
                  >
                    {educationalQualification}
                  </td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Emergency Contact:
                  </td>
                  <td
                    className="p-2 font-normal text-base border-l-2 "
                    style={{ width: "60%" }}
                  >
                    {emergencyContactNumber}
                  </td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Religion:
                  </td>
                  <td
                    className="p-2 font-normal text-base border-l-2 "
                    style={{ width: "60%" }}
                  >
                    {religion}
                  </td>
                </tr>
                <tr className="border-b ">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Membership Fee:
                  </td>
                  <td
                    className="p-2 font-normal text-base border-l-2 "
                    style={{ width: "60%" }}
                  >
                    {membershipFee}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
          Nominee Details
        </h1>
        {/* <div className=" font-bold grid grid-cols-1 md:grid-cols-4 py-4 space-y-3 tracking-wide ">
                    <p>Name: <br /> <span className="font-normal text-base ">{nomineeName}</span></p>
                    <p>Address: <br /> <span className="font-normal text-base ">{nomineeAddress}</span></p>
                    <p>Relation: <br /> <span className="font-normal text-base ">{nomineeRelation}</span></p>
                    <p>Share: <br /> <span className="font-normal text-base ">{nomineeShare}</span></p>
                    <p>Occupation: <br /> <span className="font-normal text-base ">{nomineeOccupation}</span></p>
                </div> */}
        <section>
          <div className=" ">
            <img
              className=" rounded h-52 object-cover "
              src={nominee.photo}
              alt=""
            />
          </div>
          <div className="container mx-auto py-4">
            <table className="min-w-full bg-base-100 border">
              <tbody>
                <tr className="border-b bg-teal-500 text-white">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Title
                  </td>
                  <td
                    className="p-2 text-base font-bold"
                    style={{ width: "60%" }}
                  >
                    Description
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Name:
                  </td>
                  <td
                    className="p-2 font-normal text-base border-l-2 "
                    style={{ width: "60%" }}
                  >
                    {nomineeName}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Address:
                  </td>
                  <td
                    className="p-2 font-normal text-base border-l-2 "
                    style={{ width: "60%" }}
                  >
                    {nomineeAddress}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Relation:
                  </td>
                  <td
                    className="p-2 font-normal text-base border-l-2 "
                    style={{ width: "60%" }}
                  >
                    {nomineeRelation}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Share:
                  </td>
                  <td
                    className="p-2 font-normal text-base border-l-2 "
                    style={{ width: "60%" }}
                  >
                    {nomineeShare}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="pl-4 p-2 font-bold" style={{ width: "40%" }}>
                    Occupation:
                  </td>
                  <td
                    className="p-2 font-normal text-base border-l-2 "
                    style={{ width: "60%" }}
                  >
                    {nomineeOccupation}
                  </td>
                </tr>
              </tbody>
            </table>

            <div>
              <h3 className="font-bold p-4">Nid Photo: </h3>
              <div className=" flex gap-4 items-center p-2 ">
                <img className=" rounded  h-52  " src={nidPhotoFront} alt="" />
                <img className=" rounded  h-52  " src={nidPhotoBack} alt="" />
              </div>
            </div>
          </div>
        </section>

        {/* <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
                    Details
                </h1>
                <section>
                    <div className="container mx-auto py-4">
                        <table className="min-w-full bg-base-100 border">
                            <tbody>
                                <tr className="border-b bg-teal-500 text-white">
                                    <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Title</td>
                                    <td className="p-2 text-base font-bold" style={{ width: '60%' }}>Description</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Name:</td>
                                    <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{nomineeName}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Address:</td>
                                    <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{nomineeAddress}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Relation:</td>
                                    <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{nomineeRelation}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Share:</td>
                                    <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{nomineeShare}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="pl-4 p-2 font-bold" style={{ width: '40%' }}>Occupation:</td>
                                    <td className="p-2 font-normal text-base border-l-2 " style={{ width: '60%' }}>{nomineeOccupation}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </section> */}

        <div className="divider"></div>

        <div className=" flex gap-2 max-w-4xl justify-end ">
          <button
            onClick={printFun}
            className="btn btn-sm bg-teal-700 text-white"
          >
            Print
          </button>
          <EditBtn data={data} />
        </div>
      </section>
    </>
  );
};

export default MemberCards;
