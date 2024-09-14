import { useEffect, useReducer } from "react";
import { getAllBranches } from "../../api/admin";
import axiosAdmin from "../../axios/admin";

function stateReducer(state, action) {
  switch (action.type) {
    case "branch":
      return { ...state, branch: action.payload };
    case "branches":
      return { ...state, branches: action.payload };
    case "samity":
      return { ...state, samity: action.payload };
    case "samities":
      return { ...state, samities: action.payload };
    default:
      return state;
  }
}

const initialState = {
  branch: null,
  branches: [],
  samity: null,
  samities: [],
};

export default function BranchSamitySelector({ callBackFn }) {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const handleBranchChange = async (event) => {
    dispatch({ type: "branch", payload: event.target.value });

    // Fetch new samity list for the selected branch
    const samityListResponse = await axiosAdmin.get(
      `/samity/all/${event.target.value}`
    );
    const newSamityList = samityListResponse.data.data;

    // Update samities state with the new list
    dispatch({ type: "samities", payload: newSamityList });

    // Reset samity state
    dispatch({ type: "samity", payload: null });

    // Pass branch and null samity to the parent component
    callBackFn((prev) => ({
      ...prev,
      branchId: event.target.value,
      samityId: null,
    }));
  };

  const handleSamityChange = (event) => {
    dispatch({ type: "samity", payload: event.target.value });

    // Pass branch and selected samity to the parent component
    callBackFn((prev) => ({
      ...prev,
      branchId: state.branch,
      samityId: event.target.value,
    }));
  };

  useEffect(() => {
    getAllBranches().then((data) =>
      dispatch({ type: "branches", payload: data })
    );
  }, []);

  return (
    <>
      {/* Branch List */}
      <div className="flex flex-col gap-1 w-full pr-4">
        <label className="font-medium" htmlFor="name">
          Branch Name:
        </label>
        <select
          onChange={handleBranchChange}
          className="input input-bordered input-sm hover:border-teal-500"
        >
          <option disabled selected>
            Select Branch
          </option>
          {state.branches.length > 0 &&
            state.branches.map((branch) => (
              <option key={branch._id} value={branch._id}>
                {branch.branchName}
              </option>
            ))}
        </select>
      </div>
      {/* Samity List */}
      <div className="flex flex-col gap-1 w-full">
        <label className="font-medium" htmlFor="name">
          Samity Name:
        </label>
        <select
          onChange={handleSamityChange}
          className="input input-bordered input-sm hover:border-teal-500"
        >
          {state.samities ? <option selected>Select Samity</option> : null}
          {Array.isArray(state.samities) &&
            state.samities.length > 0 &&
            state.samities.map((samity) => (
              <option key={samity._id} value={samity._id}>
                {samity.samityName}
              </option>
            ))}
        </select>
      </div>
    </>
  );
}
