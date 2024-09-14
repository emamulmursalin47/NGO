import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const ReportNav = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="bg-teal-700">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">

            <div className="block sm:hidden relative">
              <button
                onClick={toggleDropdown}
                className="ml-4 text-black bg-white focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button">

                Select Menu
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6">

                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              {isOpen && (
                <div className="ml-4 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">


                  <ul className="py-2 text-sm text-black" aria-labelledby="dropdownDefaultButton">


                    <li>
                      <NavLink to={'/balance_sheet'}>
                        <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">Balance Sheet</p>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to={'/trial_balance_sheet'}>
                        <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">Trial Balance Sheet</p>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to={'/income_vs_expense'}>
                        <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">Income Vs Expense</p>
                      </NavLink>
                    </li>

                    {/* <li>
                      <NavLink to={'/debit'}>
                        <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">Debit</p>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to={'/debit_vs_credit'}>
                        <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">Debit vs Credit</p>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to={'/liabilities'}>
                        <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">Liabilities</p>
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to={'/tds_tax_vat'}>
                        <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-normal">TDX, TAX, VAT</p>
                      </NavLink>
                    </li> */}

                  </ul>
                </div>
              )}
            </div>




            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">

                <NavLink to={'/balance_sheet'}>
                  <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Balance Sheet</p>
                </NavLink>

                <NavLink to={'/trial_balance_sheet'}>
                  <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Trial Balance Sheet</p>
                </NavLink>

                <NavLink to={'/income_vs_expense'}>
                  <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Income Vs Expense</p>
                </NavLink>

                {/* <NavLink to={'/debit'}>
                  <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Debit</p>
                </NavLink>

                <NavLink to={'/debit_vs_credit'}>
                  <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Debit vs Credit</p>
                </NavLink>

                <NavLink to={'/liabilities'}>
                  <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Liabilities</p>
                </NavLink>

                <NavLink to={'/tds_tax_vat'}>
                  <p className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">TDX, TAX, VAT</p>
                </NavLink> */}

              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ReportNav;