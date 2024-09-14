import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUserType } from "../../../hooks/userContext";

import "./SideNavbarStyle.css";

const SideNavbar = () => {
  const { logout, getUser } = useUserType();
  const nextPage = useNavigate();
  const logOutFunction = () => {
    logout();
    nextPage("/auth/login");
  };
  const role = getUser();

  return (
    <div className="">
      <div className=" md:block w-full min-h-screen p-3 space-y-2  bg-gray-300 text-gray-800">
        <div className="flex items-center p-2 space-x-4">
          <img
            src="https://source.unsplash.com/100x100/?portrait"
            alt=""
            className="w-12 h-12 rounded-full bg-gray-500"
          />
          <div>
            <h2 className="text-lg font-semibold">NGO</h2>
            <span className="flex items-center space-x-1">
              <a
                rel="noopener noreferrer"
                href="#"
                className="text-xs hover:underline text-gray-600"
              >
                View profile
              </a>
            </span>
          </div>
        </div>
        <div className="divide-y divide-gray-300">
          <ul className="pt-2 pb-4 px-1 space-y-3 text-sm font-normal text-black ">
            <li className=" bg-gray-100 hover:bg-teal-500 hover:text-white rounded-md transform hover:scale-105 duration-500">
              {role == "admin" || role == "collector" ? (
                <NavLink className="" to={"/"}>
                  <p className="flex items-center p-2 space-x-3 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-current text-gray-600"
                    >
                      <path d="M68.983,382.642l171.35,98.928a32.082,32.082,0,0,0,32,0l171.352-98.929a32.093,32.093,0,0,0,16-27.713V157.071a32.092,32.092,0,0,0-16-27.713L272.334,30.429a32.086,32.086,0,0,0-32,0L68.983,129.358a32.09,32.09,0,0,0-16,27.713V354.929A32.09,32.09,0,0,0,68.983,382.642ZM272.333,67.38l155.351,89.691V334.449L272.333,246.642ZM256.282,274.327l157.155,88.828-157.1,90.7L99.179,363.125ZM84.983,157.071,240.333,67.38v179.2L84.983,334.39Z"></path>
                    </svg>
                    <span>Dashboard</span>
                  </p>
                </NavLink>
              ) : (
                <></>
              )}
            </li>
            <li className="  bg-gray-100 hover:bg-teal-500 hover:text-white rounded-md transform hover:scale-105 duration-500">
              {role == "admin" || role == "collector" ? (
                <NavLink to={"/add_member"}>
                  <p className="flex items-center p-2 space-x-3 rounded-md">
                    <img
                      className="w-4"
                      src="/NGO Dashboard icon/Member.png"
                      alt=""
                    />
                    <span>Members</span>
                  </p>
                </NavLink>
              ) : (
                <></>
              )}
            </li>

            <li className="  bg-gray-100 hover:bg-teal-500 hover:text-white rounded-md transform hover:scale-105 duration-500">
              {role == "admin" ? (
                <NavLink to={"/add_new_branch"}>
                  <p className="flex items-center p-2 space-x-3 rounded-md">
                    <img
                      className="w-4"
                      src="/NGO Dashboard icon/branch.png"
                      alt=""
                    />
                    <span>Branches</span>
                  </p>
                </NavLink>
              ) : (
                <></>
              )}
            </li>
            <li className="  bg-gray-100 hover:bg-teal-500 hover:text-white rounded-md transform hover:scale-105 duration-500">
              {role == "admin" || role == "collector" ? (
                <NavLink to={"/savings"}>
                  <p className="flex items-center p-2 space-x-3 rounded-md">
                    <img
                      className="w-4"
                      src="/NGO Dashboard icon/Saving account.png"
                      alt=""
                    />
                    <span>Saving Account</span>
                  </p>
                </NavLink>
              ) : (
                <></>
              )}
            </li>
            <li className="  bg-gray-100 hover:bg-teal-500 hover:text-white rounded-md transform hover:scale-105 duration-500">
              {role == "admin" || role == "collector" ? (
                <NavLink to={"/open_loan_account"}>
                  <p className="flex items-center p-2 space-x-3 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-current text-black"
                    >
                      <path d="M203.247,386.414,208,381.185V355.4L130.125,191H93.875L16,355.4v27.042l4.234,4.595a124.347,124.347,0,0,0,91.224,39.982h.42A124.343,124.343,0,0,0,203.247,386.414ZM176,368.608a90.924,90.924,0,0,1-64.231,26.413h-.33A90.907,90.907,0,0,1,48,369.667V362.6l64-135.112L176,362.6Z"></path>
                      <path d="M418.125,191h-36.25L304,355.4v27.042l4.234,4.595a124.347,124.347,0,0,0,91.224,39.982h.42a124.343,124.343,0,0,0,91.369-40.607L496,381.185V355.4ZM464,368.608a90.924,90.924,0,0,1-64.231,26.413h-.33A90.907,90.907,0,0,1,336,369.667V362.6l64-135.112L464,362.6Z"></path>
                      <path d="M272,196.659A56.223,56.223,0,0,0,309.659,159H416V127H309.659a55.991,55.991,0,0,0-107.318,0H96v32H202.341A56.223,56.223,0,0,0,240,196.659V463H136v32H376V463H272ZM232,143a24,24,0,1,1,24,24A24,24,0,0,1,232,143Z"></path>
                    </svg>
                    <span>Loan Management</span>
                  </p>
                </NavLink>
              ) : (
                <></>
              )}
            </li>

            <li className="  bg-gray-100 hover:bg-teal-500 hover:text-white rounded-md transform hover:scale-105 duration-500">
              {role == "collector" ? (
                <NavLink to={"/employee_leave_application"}>
                  <p className="flex items-center p-2 space-x-3 rounded-md">
                    <img
                      className="w-4"
                      src="/NGO Dashboard icon/application.png"
                      alt=""
                    />
                    <span>Leave Application</span>
                  </p>
                </NavLink>
              ) : (
                <></>
              )}
            </li>

            {/* <li className="  bg-gray-100 hover:bg-sky-400 hover:text-white rounded-md">
                            <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <img className="w-4" src="/NGO Dashboard icon/payroll.png" alt="" />
                                <span>Payroll</span>
                            </a>
                        </li> */}

            <li className="  bg-gray-100 hover:bg-teal-500 hover:text-white rounded-md transform hover:scale-105 duration-500">
              {role == "admin" ? (
                <NavLink to={"/all_expense"}>
                  <p className="flex items-center p-2 space-x-3 rounded-md">
                    <img
                      className="w-4"
                      src="/NGO Dashboard icon/expense.png"
                      alt=""
                    />
                    <span>Expense</span>
                  </p>
                </NavLink>
              ) : (
                <></>
              )}
            </li>
            <li className="  bg-gray-100 hover:bg-teal-500 hover:text-white rounded-md transform hover:scale-105 duration-500">
              {role == "admin" ? (
                <NavLink to={"/employee_add"}>
                  <p className="flex items-center p-2 space-x-3 rounded-md">
                    <img
                      className="w-4"
                      src="/NGO Dashboard icon/employee.png"
                      alt=""
                    />
                    <span>Employee</span>
                  </p>
                </NavLink>
              ) : (
                <></>
              )}
            </li>
            <li className="  bg-gray-100 hover:bg-teal-500 hover:text-white rounded-md transform hover:scale-105 duration-500">
              {role == "admin" ? (
                <NavLink to={"/income"}>
                  <a className="flex items-center p-2 space-x-3 rounded-md">
                    <img
                      className="w-4"
                      src="/NGO Dashboard icon/income.png"
                      alt=""
                    />
                    <span>Income</span>
                  </a>
                </NavLink>
              ) : (
                <></>
              )}
            </li>
            <li className="  bg-gray-100 hover:bg-teal-500 hover:text-white rounded-md transform hover:scale-105 duration-500">
              {role == "admin" ? (
                <NavLink to={"/drawer_cash"}>
                  <p className="flex items-center p-2 space-x-3 rounded-md">
                    <img
                      className="w-4"
                      src="/NGO Dashboard icon/manage-drawer-cash.png"
                      alt=""
                    />
                    <span>Manage Drawer Cash</span>
                  </p>
                </NavLink>
              ) : (
                <></>
              )}
            </li>
            {/* <li className=" hidden  bg-gray-100 hover:bg-teal-500 hover:text-white rounded-md">
                            <Link to={'/bank_cash'}>
                                <a className="flex items-center p-2 space-x-3 rounded-md">
                                    <img className="w-4" src="/NGO Dashboard icon/manage-bank-cash.png" alt="" />
                                    <span>Manage Bank Cash</span>
                                </a>
                            </Link>

                        </li> */}
            {/* <li className=" hidden  bg-gray-100 hover:bg-teal-500 hover:text-white rounded-md">
                            <Link to={'/add_new_user'}>
                                <a className="flex items-center p-2 space-x-3 rounded-md">
                                    <img className="w-4" src="/NGO Dashboard icon/user-maintenance.png" alt="" />
                                    <span>User Maintenance</span>
                                </a>
                            </Link>

                        </li> */}

            {/* <li className="  bg-gray-100 hover:bg-sky-400 hover:text-white rounded-md">
                            <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                <img className="w-4" src="/NGO Dashboard icon/bank-building.png" alt="" />
                                <span>Bank</span>
                            </a>
                        </li> */}

            <li className="  bg-gray-100 hover:bg-teal-500 hover:text-white rounded-md transform hover:scale-105 duration-500">
              {role == "admin" ? (
                <NavLink to={"/attendance"}>
                  <p className="flex items-center p-2 space-x-3 rounded-md">
                    <img
                      className="w-4"
                      src="/NGO Dashboard icon/hrm.png"
                      alt=""
                    />
                    <span>HRM</span>
                  </p>
                </NavLink>
              ) : (
                <></>
              )}
            </li>
            <li className="  bg-gray-100 hover:bg-teal-500 hover:text-white rounded-md transform hover:scale-105 duration-500">
              {role == "admin" ? (
                <NavLink to={"/edit_fixed_asset"}>
                  <p className="flex items-center p-2 space-x-3 rounded-md">
                    <img
                      className="w-4"
                      src="/NGO Dashboard icon/asset.png"
                      alt=""
                    />
                    <span> Assets</span>
                  </p>
                </NavLink>
              ) : (
                <></>
              )}
            </li>

            <li className=" hidden w-full bg-gray-100 hover:bg-teal-500  rounded-md transform hover:scale-105 duration-500 ">
              {role == "admin" ? (
                <div className="dropdown w-full">
                  <p
                    tabIndex={0}
                    role="button"
                    className="p-2 w-full flex gap-2 hover:text-white"
                  >
                    <img
                      className="w-5 object-fill"
                      src="/NGO Dashboard icon/asset.png"
                      alt=""
                    />
                    <span className="">Asset Section</span>
                  </p>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded w-full flex gap-2"
                  >
                    {/* <li><a>Item 1</a></li>
                                <li><a>Item 2</a></li> */}

                    <li className="  bg-gray-100 hover:bg-teal-500 hover:text-white rounded-md transform hover:scale-105 duration-500">
                      <NavLink to={"/add_new_temporary_asset"}>
                        <p
                          rel="noopener noreferrer"
                          href="#"
                          className="flex items-center p-2 space-x-3 rounded-md"
                        >
                          <img
                            className="w-4"
                            src="/NGO Dashboard icon/asset.png"
                            alt=""
                          />
                          <span>Temporary Assets</span>
                        </p>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              ) : (
                <></>
              )}
            </li>

            {/* <li className="  bg-gray-100 hover:bg-teal-500 hover:text-white rounded-md">
                            <Link to={'/add_new_temporary_asset'}>
                                <p rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
                                    <img className="w-4" src="/NGO Dashboard icon/asset.png" alt="" />
                                    <span>Temporary Assets</span>
                                </p>
                            </Link>
                        </li> */}
            <li className="  bg-gray-100 hover:bg-teal-500 hover:text-white rounded-md transform hover:scale-105 duration-500">
              {role == "admin" ? (
                <NavLink to={"/liabilities/expense"}>
                  <p className="flex items-center p-2 space-x-3 rounded-md">
                    <img
                      className="w-4"
                      src="/NGO Dashboard icon/liability.png"
                      alt=""
                    />
                    <span>Liabilities</span>
                  </p>
                </NavLink>
              ) : (
                <></>
              )}
            </li>
            <li className="  bg-gray-100 hover:bg-teal-500 hover:text-white rounded-md transform hover:scale-105 duration-500">
              {role == "admin" ? (
                <NavLink to={"/balance_sheet"}>
                  <p className="flex items-center p-2 space-x-3 rounded-md">
                    <img
                      className="w-4"
                      src="/NGO Dashboard icon/report.png"
                      alt=""
                    />
                    <span>Report</span>
                  </p>
                </NavLink>
              ) : (
                <></>
              )}
            </li>
          </ul>
          <ul className="pt-4 pb-2 space-y-1 text-sm">
            <li>
              {role == "admin" ? (
                <NavLink to={"/settings"}>
                  <p
                    rel="noopener noreferrer"
                    href="#"
                    className="flex items-center p-2 space-x-3 rounded-md transform hover:scale-105 duration-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 fill-current text-gray-600"
                    >
                      <path d="M245.151,168a88,88,0,1,0,88,88A88.1,88.1,0,0,0,245.151,168Zm0,144a56,56,0,1,1,56-56A56.063,56.063,0,0,1,245.151,312Z"></path>
                      <path d="M464.7,322.319l-31.77-26.153a193.081,193.081,0,0,0,0-80.332l31.77-26.153a19.941,19.941,0,0,0,4.606-25.439l-32.612-56.483a19.936,19.936,0,0,0-24.337-8.73l-38.561,14.447a192.038,192.038,0,0,0-69.54-40.192L297.49,32.713A19.936,19.936,0,0,0,277.762,16H212.54a19.937,19.937,0,0,0-19.728,16.712L186.05,73.284a192.03,192.03,0,0,0-69.54,40.192L77.945,99.027a19.937,19.937,0,0,0-24.334,8.731L21,164.245a19.94,19.94,0,0,0,4.61,25.438l31.767,26.151a193.081,193.081,0,0,0,0,80.332l-31.77,26.153A19.942,19.942,0,0,0,21,347.758l32.612,56.483a19.937,19.937,0,0,0,24.337,8.73l38.562-14.447a192.03,192.03,0,0,0,69.54,40.192l6.762,40.571A19.937,19.937,0,0,0,212.54,496h65.222a19.936,19.936,0,0,0,19.728-16.712l6.763-40.572a192.038,192.038,0,0,0,69.54-40.192l38.564,14.449a19.938,19.938,0,0,0,24.334-8.731L469.3,347.755A19.939,19.939,0,0,0,464.7,322.319Zm-50.636,57.12-48.109-18.024-7.285,7.334a159.955,159.955,0,0,1-72.625,41.973l-10,2.636L267.6,464h-44.89l-8.442-50.642-10-2.636a159.955,159.955,0,0,1-72.625-41.973l-7.285-7.334L76.241,379.439,53.8,340.562l39.629-32.624-2.7-9.973a160.9,160.9,0,0,1,0-83.93l2.7-9.972L53.8,171.439l22.446-38.878,48.109,18.024,7.285-7.334a159.955,159.955,0,0,1,72.625-41.973l10-2.636L222.706,48H267.6l8.442,50.642,10,2.636a159.955,159.955,0,0,1,72.625,41.973l7.285,7.334,48.109-18.024,22.447,38.877-39.629,32.625,2.7,9.972a160.9,160.9,0,0,1,0,83.93l-2.7,9.973,39.629,32.623Z"></path>
                    </svg>
                    <span>Settings</span>
                  </p>
                </NavLink>
              ) : (
                <></>
              )}
            </li>
            <li>
              <a
                rel="noopener noreferrer"
                href="#"
                className="flex items-center p-2 space-x-3 rounded-md transform hover:scale-105 duration-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current text-gray-600"
                >
                  <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                  <rect width="32" height="64" x="256" y="232"></rect>
                </svg>
                <button onClick={logOutFunction}>
                  <span>Logout</span>
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
