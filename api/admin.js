import axiosAdmin from "../axios/admin";
import { uploadPhoto } from "./upload-photo";
// Add Branch
export async function addBranch(data) {
  console.log(data);
  const response = await axiosAdmin.post(`/branch/add`, data);
  return response.data;
}
//Get all branches
export async function getAllBranches() {
  const response = await axiosAdmin.get(`/branch/all`);
  return response.data.data;
}
//Add Samity
export async function addSamity(data) {
  const response = await axiosAdmin.post(`/samity/add`, data);
  return response.data;
}

//create member
export async function createMember(data) {
  const { t1, t2, nidDetails, birthCertificate } = data;
  console.log(t1, t2);
  console.log(data);
  const uploadPromises = [];
  // first index user photo 
  uploadPromises.push(uploadPhoto(data.photo));
  //second index nominee photo
  uploadPromises.push(uploadPhoto(data.nominee.photo));
  if (data.t1 === "NID") {
    const { nidPhotoFront, nidPhotoBack } = data.nidDetails;
    uploadPromises.push(uploadPhoto(nidPhotoFront));
    uploadPromises.push(uploadPhoto(nidPhotoBack));

  } else {
    const { photo } = data.birthCertificate;
    uploadPromises.push(uploadPhoto(photo));
  }
  if (t2 === "NID") {
    const { nidPhotoFront, nidPhotoBack } = data.nominee.nidDetails;
    uploadPromises.push(uploadPhoto(nidPhotoFront));
    uploadPromises.push(uploadPhoto(nidPhotoBack));

  } else {
    const { photo } = data.nominee.birthCertificate;
    uploadPromises.push(uploadPhoto(photo));
  }
  // Await all uploads
  const uploadResults = await Promise.all(uploadPromises);

  // Assign URLs back to the data object
  let uploadIndex = 0;

  // Assign member photo URL
  data.photo = uploadResults[uploadIndex++];

  // Assign nominee photo URL
  data.nominee.photo = uploadResults[uploadIndex++];

  if (t1 === "NID") {
    data.nidDetails.nidPhotoFront = uploadResults[uploadIndex++];
    data.nidDetails.nidPhotoBack = uploadResults[uploadIndex++];
    delete data.birthCertificate;
  } else {
    data.birthCertificate.photo = uploadResults[uploadIndex++];
    delete data.nidDetails;
  }

  if (t2 === "NID") {
    data.nominee.nidDetails.nidPhotoFront = uploadResults[uploadIndex++];
    data.nominee.nidDetails.nidPhotoBack = uploadResults[uploadIndex++];
    delete data.nominee.birthCertificate;
  } else {
    data.nominee.birthCertificate.photo = uploadResults[uploadIndex++];
    delete data.nominee.nidDetails;
  }
  delete data.t1;
  delete data.t2;
  console.log(data);
  const response = await axiosAdmin.post(`/localuser/add`, data);

  return response.data;


}
//update user
export async function updateUserSettings(data) {
  if (data.photo instanceof File || data.photo instanceof Blob) {
    const photoUrl = await uploadPhoto(data.photo);
    data["photo"] = photoUrl;
  }
  const id = data._id;
  delete data._id;
  delete data.branchName;
  delete data.samityName;
  const response = await axiosAdmin.put(`/localuser/update/${id}`, data);
  return response.data;
}
//update emoloyee
export async function updateEmployeeSettings(data) {
  if (data.photo instanceof File || data.photo instanceof Blob) {
    const photoUrl = await uploadPhoto(data.photo);
    data["photo"] = photoUrl;
  }
  const id = data._id;
  delete data._id;
  delete data.salaryDue;
  delete data.advance;
  const response = await axiosAdmin.put(`/employee/update/${id}`, data);
  return response.data;

}

//get member using phoneNumber
export async function searchUserByPhoneNumber(number) {
  const response = await axiosAdmin.get(`/localuser/${number}`);
  return response.data.data;
}
//get users using samity and branch id
export async function getLocalUsersByBranchIdAndSmityId(data) {
  const { branchId, samityId } = data;
  const response = await axiosAdmin.get(
    `/localuser/all?branchId=${branchId}&samityId=${samityId}`
  );
  return response.data;
}
//create Deposit Account
export async function createDepositAccount(data) {
  const response = await axiosAdmin.post(`/deposit/create`, data);
  return response.data;
}

//search deposit account
export async function searchDepositAccount(number) {
  try {
    const response = await axiosAdmin.get(`/deposit/search/${number}`);
    return response.data.data;
  } catch (error) {
    return [];
  }
}
// make deposit
export async function makeDeposit(data) {
  const response = await axiosAdmin.post(`/deposit/makeDeposit`, data);
  return response.data;
}
// deposit transaction list
export async function depositTransactionList(id) {
  const response = await axiosAdmin.get(`/deposit/transaction/${id}`);
  return response.data.data;
}
// deposit transaction list
export async function withdrawTransactionList(id) {
  const response = await axiosAdmin.get(`/deposit/withdraw/${id}`);
  return response.data.data;
}
// make withdraw
export async function makeWithdraw(data) {
  const response = await axiosAdmin.post(`/deposit/makeWithdraw`, data);
  return response.data;
}
//create loan account
export async function createLoanAccount(data) {
  const response = await axiosAdmin.post(`/loan/create`, data);
  return response.data;
}
//pay loan account
export async function payLoanAccount(data) {
  const response = await axiosAdmin.post("/loan/pay", data);
  return response.data;
}
//get loan transaction details
export async function getLoanTransactionDetailsById(id) {
  const response = await axiosAdmin.get(`/loan/user-transaction/search/${id}`);
  return response.data.data;
}
//get loan accounts using samity and branch id adn type
export async function getAllLoanAccountByBranchIdAndSmityId(data) {
  const { branchId, samityId, paymentTerm } = data;
  const response = await axiosAdmin.get(
    `/loan/all?branchId=${branchId}&samityId=${samityId}&paymentTerm=${paymentTerm}`
  );
  return response.data;
}
//search deposit account
export async function searchLoanAccount(number) {
  const response = await axiosAdmin.get(`/loan/search/${number}`);
  return response.data.data;
}
export async function searchDepositAccountByBranchAndSamity(body) {
  const { branchId, samityId } = body;
  const response = await axiosAdmin.get(
    `/savings/list?branchId=${branchId}&samityId=${samityId}`
  );
  return response.data;
}

export async function searchFdrAccountByBranchAndSamity(body) {
  const { branchId, samityId } = body;
  const response = await axiosAdmin.get(
    `/fdr/list?branchId=${branchId}&samityId=${samityId}`
  );
  return response.data;
}
export async function searchDpsAccountByBranchAndSamity(body) {
  const { branchId, samityId } = body;
  const response = await axiosAdmin.get(
    `/dps/list?branchId=${branchId}&samityId=${samityId}`
  );
  return response.data;
}



export async function createEmployee(data) {
  const [
    photoUrl,
    nidPhotoFront,
    nidPhotoBack,
    guarantorNidPhotoFront,
    guarantorNidPhotoBack
  ] = await Promise.all([
    uploadPhoto(data.photo),
    uploadPhoto(data.nidDetails.nidPhotoFront),
    uploadPhoto(data.nidDetails.nidPhotoBack),
    uploadPhoto(data.guarantorDetails.nidDetails.nidPhotoFront),
    uploadPhoto(data.guarantorDetails.nidDetails.nidPhotoBack)
  ]);

  const updatedData = {
    ...data,
    photo: photoUrl,
    nidDetails: {
      ...data.nidDetails,
      nidPhotoFront,
      nidPhotoBack
    },
    guarantorDetails: {
      ...data.guarantorDetails,
      nidDetails: {
        ...data.guarantorDetails.nidDetails,
        nidPhotoFront: guarantorNidPhotoFront,
        nidPhotoBack: guarantorNidPhotoBack
      }
    }
  };

  const response = await axiosAdmin.post('/employee/create', updatedData);
  return response.data;
}
//get empolyee using samity and branch id
export async function getAllEmployeeByBranchIdAndSmityId(data) {
  const { branchId, samityId } = data;
  const response = await axiosAdmin.get(
    `/employee/all?branchId=${branchId}&samityId=${samityId}`
  );
  return response.data;
}
//get member using phoneNumber
export async function searchEmployeeByPhoneNumber(number) {
  try {
    const response = await axiosAdmin.get(`/employee/search/${number}`);
    return response.data.data;
  } catch (err) {
    return [];
  }
}
// payslip searrch
export async function searchEmployeeByPhoneNumberPaySlip(number) {
  try {
    const response = await axiosAdmin.get(
      `/employee/payslip/search/${number}?date=${new Date()}`
    );
    return response.data.data;
  } catch (err) {
    return [];
  }
}

//set employee credentials
export async function setEmployeeCredentials(data) {
  const response = await axiosAdmin.post("/employee/credentials", data);
  return response.data;
}

//add monthly expense

export async function addMonthlyExpense(data) {
  const response = await axiosAdmin.post("/expense/monthly/add", data);
  return response.data;
}

//create purchase expense
export async function createPurchaseExpense(data) {
  const response = await axiosAdmin.post("/expense/purchase/add", data);
  return response.data;
}
// get all expense list
export async function getAllExpenses(data) {
  const { branchId, samityId, from, to } = data;
  const response = await axiosAdmin.get(
    `/expense/all?branchId=${branchId}&samityId=${samityId}&from=${from}&to=${to}`
  );
  return response.data.data;
}
export async function getAllAssets(data) {
  const { branchId, samityId, from, to } = data;
  const response = await axiosAdmin.get(
    `/asset/all?branchId=${branchId}&samityId=${samityId}&from=${from}&to=${to}`
  );
  return response.data.data;
}
//create bank
export async function createBank(data) {
  const response = await axiosAdmin.post("/bank/add", data);
  return response.data;
}

// get all bank
export async function getAllBank() {
  const response = await axiosAdmin.get("/bank/all");
  return response.data.data;
}
// add drawerToBank transaction
export async function addDrawerToBank(data) {
  const response = await axiosAdmin.post(
    "/bank/transfer",
    data
  );
  return response.data;
}

//add drawer cash
export async function addDrawerCashInOut(data) {
  const response = await axiosAdmin.post("/drawer/add", data);
  return response.data;
}
//get attendance sheet
export async function getAttendeesSheet(branch, samity, date) {
  const response = await axiosAdmin.get(
    `/employee/attendance?branchId=${branch}&samityId=${samity}&date=${date}`
  );
  return response.data;
}
//set attendance sheet
export async function setAttendeesSheet(data, other) {
  const { branchId, samityId, date } = other;
  console.log(data);
  const response = await axiosAdmin.post(
    `/employee/set-attendance?branchId=${branchId}&samityId=${samityId}&date=${date}`,
    data
  );
  return response;
}
//get attendnce of

//create praying amount application
export async function createPrayingAmountApplication(data) {
  const response = await axiosAdmin.post("/praying-application/create", data);
  console.log(response.data);
  return response.data;
}

//create monthly payslip
export async function createMonthlyPaySlipApplication(data) {
  const response = await axiosAdmin.post("/pay-slip/monthly/create", data);
  return response.data;
}
// add asset
export async function addAsset(data) {
  const response = await axiosAdmin.post("/asset/add", data);
  return response.data;
}

//get income
export async function getIncome(data) {
  const response = await axiosAdmin.get(
    `/income/day-wise?date=${data}`
  );
  return response.data;
}

//admin registration

export async function adminRegistration(data) {
  delete data["confirmPassword"];
  const response = await axiosAdmin.post("/admin/create", data);
  return response.data;
}
//login
export async function loginAdminCollector(data) {
  const response = await axiosAdmin.post("/auth/user", data);
  return response.data;
}

//ngo loan create
export async function ngoLoansCreate(data) {
  const response = await axiosAdmin.post("/loan/ngo-loan/create", data);
  return response.data;
}
//ngo loan list
export async function ngoLoanList() {
  const response = await axiosAdmin.get("/loan/ngo-loan/list");
  return response.data.data;
}

//ngo loan transaction by id
export async function ngoLoanTransaction(id) {
  const response = await axiosAdmin.get(`/loan/ngo-loan/${id}`);
  return response.data.data;
}
//ngo loan pay
export async function ngoLoanPayment(data) {
  const response = await axiosAdmin.post("/loan/ngo-loan/pay", data);
  return response.data;
}
//ngo liabilities


//create employee leave application
export async function employeeLeaveApplication(data) {
  const response = await axiosAdmin.post("/employee/leave-application", data);
  console.log(response.data);
  return response.data;
}
// emoloyee leave application list by id
export async function employeeLeaveApplicationList(id) {
  const response = await axiosAdmin.get(`/employee/leave-application-list/${id}`);
  console.log(response.data);
  return response.data.data;
}
// hrm get employee leave application pending list
export async function employeeLeaveApplicationPendingList() {
  const response = await axiosAdmin.get("/employee/leave-application-pending-list");
  console.log(response.data);
  return response.data.data;
}

// hrm employee application accept or reject
export async function employeeLeaveApplicationAcceptReject(data) {
  const response = await axiosAdmin.put('/employee/leave-application-accept-or-reject', data);
  return response.data;
}
// salary sheet 
export async function salarySheetList(data) {
  const { branchId, samityId, date } = data;
  const response = await axiosAdmin.get(`/pay-slip/list?branchId=${branchId}&samityId=${samityId}&date=${date}`);
  return response.data;
}

// get user pending list 
export async function userPendingList() {
  const response = await axiosAdmin.get("/localuser/pending");
  return response.data.data
}
//accepet user request 
export async function accepetUserPendingList(data) {
  const { id, status } = data;
  console.log(id, status);
  const response = await axiosAdmin.get(`/localuser/accept/${id}?status=${status}`)
  return response.data
}
//get pending deposit accounts
export async function pendingDepositAccountList(data) {
  const { branchId, samityId } = data;
  const response = await axiosAdmin.get(`/deposit/pending?branchId=${branchId}&samityId=${samityId}`);
  return response.data.data;
}
export async function acceptDepositPendingAccount(data) {
  const { id, status } = data;
  const response = await axiosAdmin.get(`/deposit/accept/${id}?status=${status}`);
  return response.data;
}
// get user deposit account list
export async function getDepositAccountListsOfUser(number) {
  console.log(number);
  const response = await axiosAdmin.get(`/deposit/account/list/${number}`);
  return response.data.data;
}
//get deposit account single
export async function getDepositAccountDetailsById(id) {
  const response = await axiosAdmin.get(`/deposit/deposit-account/${id}`);
  return response.data.data;
}

//pay loan from deposit account
export async function payLoanFromDepositAccount(data) {
  const { depositAccountId, loanAccountId, amount, payFrom, by } = data;
  const withdrawBody = {
    id: depositAccountId,
    date: new Date(),
    amount: amount,
    description: "For loan",
    payFrom,
    by

  }
  const loanPaymentBody = {
    loanId: loanAccountId,
    amount: amount,
    date: new Date(),
    addFineAmount: 0,
    fineReason: "",
    payFineAmount: 0,
    payFrom,
    by
  };
  const response = await makeWithdrawSavings(withdrawBody);
  const response2 = await payLoanAccount(loanPaymentBody);

}

//get pending loan accounts
export async function pendingLoanAccountList(data) {
  const { branchId, samityId } = data;
  const response = await axiosAdmin.get(`/loan/pending?branchId=${branchId}&samityId=${samityId}`);
  return response.data.data;
}
export async function acceptLoanPendingAccount(data) {
  const { id, status } = data;
  const response = await axiosAdmin.get(`/loan/accept/${id}?status=${status}`);
  return response.data;
}
export async function createSavingsAccount(data) {
  const response = await axiosAdmin.post(`/savings/create`, data);
  return response.data;
}
export async function createFdrAccount(data) {
  const response = await axiosAdmin.post(`/fdr/create`, data);
  return response.data;
}
export async function createDpsAccount(data) {
  const response = await axiosAdmin.post(`/dps/create`, data);
  return response.data;
}
// Savings
export async function getSavingAccountDetailsById(id) {
  const response = await axiosAdmin.get(`/savings/deposit-account/${id}`);
  return response.data.data;
}
export async function savingsTransactionList(id) {
  const response = await axiosAdmin.get(`/savings/transaction/${id}`);
  return response.data.data;
}

export async function savingsWithdrawTransactionList(id) {
  const response = await axiosAdmin.get(`/savings/withdraw/${id}`);
  return response.data.data;
}
export async function makeDepositSavings(data) {
  const response = await axiosAdmin.post(`/savings/makeDeposit`, data);
  return response.data;
}

export async function makeWithdrawSavings(data) {
  const response = await axiosAdmin.post(`/savings/makeWithdraw`, data);
  return response.data;
}
//FDR

export async function getFdrAccountDetailsById(id) {
  const response = await axiosAdmin.get(`/fdr/deposit-account/${id}`);
  return response.data.data;
}
export async function fdrTransactionList(id) {
  const response = await axiosAdmin.get(`/fdr/transaction/${id}`);
  return response.data.data;
}

export async function fdrWithdrawTransactionList(id) {
  console.log(id);
  const response = await axiosAdmin.get(`/fdr/withdraw/${id}`);
  return response.data.data;
}
export async function makeDepositFdr(data) {
  const response = await axiosAdmin.post(`/fdr/makeDeposit`, data);
  return response.data;
}

export async function makeWithdrawFdr(data) {
  const response = await axiosAdmin.post(`/fdr/makeWithdraw`, data);
  return response.data;
}
//Dps
export async function getDpsAccountDetailsById(id) {
  const response = await axiosAdmin.get(`/dps/deposit-account/${id}`);
  return response.data.data;
}
export async function dpsTransactionList(id) {
  const response = await axiosAdmin.get(`/dps/transaction/${id}`);
  return response.data.data;
}

export async function dpsWithdrawTransactionList(id) {
  console.log(id);
  const response = await axiosAdmin.get(`/dps/withdraw/${id}`);
  return response.data.data;
}
export async function makeDepositDps(data) {
  const response = await axiosAdmin.post(`/dps/makeDeposit`, data);
  return response.data;
}

export async function makeWithdrawDps(data) {
  const response = await axiosAdmin.post(`/dps/makeWithdraw`, data);
  return response.data;
}
// create income head
export async function createIncomeHead(data) {
  const response = await axiosAdmin.post(`/income/create`, data);
  return response.data;
}
// get all income head
export async function getAllIncomeHead() {
  const response = await axiosAdmin.get(`/income/all`);
  return response.data.data;
}
//create income head transaction
export async function createIncomeHeadTransaction(data) {
  const response = await axiosAdmin.post(`/income/create/transaction`, data);
  return response.data;
}
export async function drawerCashDetails() {
  console.log('data');
  const response = await axiosAdmin.get('/drawer/details');
  return response.data.data;
}

export async function addMoneyToBank(data) {
  const response = await axiosAdmin.post(
    "/bank/money-add",
    data
  );
  return response.data;
}
// all bank cash details
export async function bankCashDetails() {
  const response = await axiosAdmin.get('/bank/cash/all');
  return response.data.data;
}
// drawer cash details by samityid
export async function drawerCashDetailsBySamityId(samityId) {
  const response = await axiosAdmin.get(`/drawer/samity/${samityId}`);
  return response.data.data;
}
// bank cash by id
export async function bankCashById(id) {
  const response = await axiosAdmin.get(`/bank/bank/${id}`);
  return response.data.data;
}
//create expense head
export async function createExpenseHead(data) {
  const response = await axiosAdmin.post(`/expense/head/add`, data);
  return response;
}
// get all expense head
export async function getAllExpenseHead() {
  const response = await axiosAdmin.get(`/expense/head/all`);
  return response.data.data;
}
//create asset head
export async function createAssetHead(data) {
  const response = await axiosAdmin.post(`/asset/head/add`, data);
  return response;
}
// get all asset head
export async function getAllAssetHead() {
  const response = await axiosAdmin.get(`/asset/head/all`);
  return response.data.data;
}
// create asset 
export async function createAssetExpense(data) {
  const response = await axiosAdmin.post("/asset/add", data);
  return response.data;
}
export async function getBalanceSheet(data) {
  const { from, to } = data;
  const response = await axiosAdmin.get(`/report/balance_sheet?from=${from}&to=${to}`);
  return response.data.data;
}
export async function getIncomeVsExpense(data) {
  const { from, to } = data;
  const response = await axiosAdmin.get(`/report/income_vs_expense?from=${from}&to=${to}`);
  return response.data.data;
}
export async function getTrailBalance(data) {
  const { from, to } = data;
  const response = await axiosAdmin.get(`/report/trial_balance?from=${from}&to=${to}`);
  return response.data;
}
export async function createDonationTransaction(data) {
  const response = await axiosAdmin.post(`/donation/create`, data);
  return response.data;
}
export async function createExpenseLiability(data) {
  const response = await axiosAdmin.post(`/liabilities/expense/create`, data);
  return response.data;
}
export async function createAssetLiability(data) {
  const response = await axiosAdmin.post(`/liabilities/asset/create`, data);
  return response.data;
}
export async function getExpenseLiabilityByBranchIdAndSmityId(data) {
  const { branchId, samityId } = data;
  const response = await axiosAdmin.get(
    `/liabilities/expense/list?branchId=${branchId}&samityId=${samityId}`
  );
  return response.data;
}
export async function getAssetLiabilityByBranchIdAndSmityId(data) {
  const { branchId, samityId } = data;
  const response = await axiosAdmin.get(
    `/liabilities/asset/list?branchId=${branchId}&samityId=${samityId}`
  );
  console.log(response.data);
  return response.data;
}
export async function payExpenseLiability2(id) {

  const response = await axiosAdmin.get(`/liabilities/expense/pay/${id}`);
  return response.data;
}
export async function payExpenseLiability(data) {

  const expenseId = data._id;
  const date = data.date;
  delete data._id;
  delete data.head;
  const expenseResponse = await addMonthlyExpense(data);
  const response = await payExpenseLiability2(expenseId);
  return true;
}

//createAssetExpense
export async function payAssetLiability2(id) {

  const response = await axiosAdmin.get(
    `/liabilities/asset/pay/${id}`
  );
  return response.data;

}
export async function payAssetLiability(data) {
  const { _id, head, ...other } = data;
  delete data._id;
  delete data.head;
  const assetLiability = await createAssetExpense(other);
  const response = await payAssetLiability2(_id);
  return true;
}