import UserDetailsCard from "../../component/UserDetailsCard";
import BranchesNav from "./BranchesNav/BranchesNav";

const BranchList = () => {
  return (
    <div>
      <section>
        <BranchesNav />
      </section>
      <h1>Branch List</h1>

      <section>
        <UserDetailsCard />
      </section>
    </div>
  );
};

export default BranchList;