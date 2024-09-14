import SavingAccountNav from "./SavingAccountNav/SavingAccountNav";

const ClosingAccountRequest = () => {
  return (
    <div>
      <section>
        <SavingAccountNav />
      </section>

      <section>
        <section className="m-4">
          <h1 className="text-xl font-bold text-start max-w-5xl mx-auto  pt-4 border-b-4 pb-2 ">
            Closing Account Request 1
          </h1>
          <form className="my-8">
            <section className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="member_id">
                  Member Id:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="member_id"
                  type="text"
                  placeholder="auto refill"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium" htmlFor="account_id">
                  Account Id:
                </label>
                <input
                  className="input input-bordered input-sm  hover:border-teal-500  "
                  id="account_id"
                  type="text"
                  placeholder=""
                />
              </div>

              <div className="flex  flex-col md:flex-row text-center  gap-1 ">
                <label className="font-medium pt-10" htmlFor="account_id">
                  Action:
                </label>

                <div className="w-full flex justify-center  mt-8">
                  <input
                    className="bg-green-500 hover:bg-green-700 px-10 py-2 rounded font-medium     text-white"
                    type="submit"
                    value="Approve"
                  />
                </div>

                <div className="w-full flex justify-center  mt-8">
                  <input
                    className="bg-red-500 hover:bg-red-700 px-10 py-2 rounded font-medium     text-white"
                    type="submit"
                    value="Reject"
                  />
                </div>
              </div>
            </section>
          </form>
        </section>
      </section>
    </div>
  );
};

export default ClosingAccountRequest;
