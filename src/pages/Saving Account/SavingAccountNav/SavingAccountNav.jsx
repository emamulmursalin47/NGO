import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const SavingAccountNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="bg-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-4">
          <div className="relative flex items-center justify-between h-16">
            <div className="block sm:hidden relative">
              <button
                onClick={toggleDropdown}
                className="ml-4 text-black bg-white focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
              >
                Select Menu
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {isOpen && (
                <div className="ml-4 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
                  <ul
                    className="py-2 text-sm text-black"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    {/* <li>
                      <NavLink to={"/deposit"}>
                        <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">
                          Deposit
                        </p>
                      </NavLink>
                    </li> */}
                    <li>
                      <NavLink to={"/savings"}>
                        <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">
                          Savings
                        </p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/fdr"}>
                        <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">
                          FDR Account
                        </p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/dps"}>
                        <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">
                          DPS Account
                        </p>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to={"/transactionn_posting"}>
                        <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">
                          Transaction Posting
                        </p>
                      </NavLink>
                    </li>

                    {/* <li>
                      <NavLink to={"/saving_account_request"}>
                        <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">
                          Saving Account Request
                        </p>
                      </NavLink>
                    </li> */}

                    {/* <li>
                      <NavLink to={"/closing_account_request"}>
                        <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">
                          Closing Account Request
                        </p>
                      </NavLink>
                    </li> */}

                    <li>
                      <NavLink to={"/saving_account_list"}>
                        <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">
                          Saving Account List
                        </p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/fdr_account_list"}>
                        <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">
                          FDR Account List
                        </p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"/dps_account_list"}>
                        <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">
                          Saving Account List
                        </p>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="hidden md:block ">
              <div className="flex flex-wrap w-full  ">
                {/* <NavLink to={"/deposit"}>
                  <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Deposit
                  </p>
                </NavLink> */}
                <NavLink to={"/savings"}>
                  <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Savings
                  </p>
                </NavLink>
                <NavLink to={"/fdr"}>
                  <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    FDR Account
                  </p>
                </NavLink>
                <NavLink to={"/dps"}>
                  <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    DPS Account
                  </p>
                </NavLink>
                <NavLink to={"/transactionn_posting"}>
                  <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Transaction Posting
                  </p>
                </NavLink>

                {/* <NavLink to={"/saving_account_request"}>
                  <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Saving Account Request
                  </p>
                </NavLink> */}

                {/* <NavLink to={"/closing_account_request"}>
                  <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Closing Account Request
                  </p>
                </NavLink> */}

                <NavLink to={"/saving_account_list"}>
                  <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Saving Account List
                  </p>
                </NavLink>
                <NavLink to={"/fdr_account_list"}>
                  <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    FDR Account List
                  </p>
                </NavLink>
                <NavLink to={"/dps_account_list"}>
                  <p className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    DPS Account List
                  </p>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SavingAccountNav;
