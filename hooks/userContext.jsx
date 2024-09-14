import { createContext, useState, useContext, useEffect } from "react";

// Create a context
const UserTypeContext = createContext({
  userType: null,
  setUser: () => {},
  getUser: () => null,
  userDetails: () => null,
  logout: () => {},
  isLoading: true, // Add isLoading state for loading indicator
});

// Custom hook to use UserTypeContext
export const useUserType = () => {
  return useContext(UserTypeContext);
};

// Provider component
export const UserTypeProvider = ({ children }) => {
  const [userType, setUserType] = useState(() => {
    // Initialize userType from localStorage, defaulting to null if not found
    return localStorage.getItem("userType") || null;
  });

  const [isLoading, setIsLoading] = useState(false); // Set initial loading state to false

  // Function to set user type
  const setUser = (data) => {
    setUserType(data.type);
    localStorage.setItem("id", data.id);
    localStorage.setItem("name", data.name);
    localStorage.setItem("phone", data.phone);
    localStorage.setItem("userType", data.type); // Update localStorage
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
  };

  // Function to get user type
  const getUser = () => {
    return userType;
  };
  const userDetails = () => {
    const name = localStorage.getItem("name");
    const phone = localStorage.getItem("phone");
    const type = localStorage.getItem("userType");

    return { name, phone, type };
  };

  // Function to logout user
  const logout = () => {
    setUserType(null);
    localStorage.removeItem("id");
    localStorage.removeItem("userType"); // Remove userType from localStorage
    localStorage.removeItem("refreshToken"); // Remove refreshToken from localStorage
    localStorage.removeItem("accessToken"); // Remove accessToken from localStorage
    localStorage.removeItem("name"); // Remove name from localStorage
    localStorage.removeItem("phone"); // Remove phone from localStorage
  };

  useEffect(() => {
    // Simulate asynchronous data fetching (replace with actual fetch logic)

    setUserType(localStorage.getItem("userType"));
    setIsLoading(false); // Set loading to false after simulated fetch
    // Simulate 1 second delay
  }, []); // Empty dependency array to run only on initial render

  // Value to be provided by the context
  const value = {
    setUser,
    getUser,
    logout,
    isLoading, // Include isLoading in the provided value
    userDetails,
  };

  return (
    <UserTypeContext.Provider value={value}>
      {children}
    </UserTypeContext.Provider>
  );
};
