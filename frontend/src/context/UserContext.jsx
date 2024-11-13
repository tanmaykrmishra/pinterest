import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Register User function
  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });
      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      localStorage.setItem("token", data.token); // Store token
      setBtnLoading(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }

  // Login User function
  async function loginUser(email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/login", { email, password });
      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      localStorage.setItem("token", data.token); // Store token
      setBtnLoading(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }

  // Fetch User function
  async function fetchUser() {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      try {
        const { data } = await axios.get("/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`, // Use token in the Authorization header
          },
        });
        setUser(data); // Set user data
        setIsAuth(true); // Set authentication state to true
      } catch (error) {
        console.log(error);
        setIsAuth(false); // If error, set authentication to false
      } finally {
        setLoading(false); // Stop loading once fetch is complete
      }
    } else {
      setLoading(false); // Stop loading if no token is found
    }
  }

  async function followUser(id,fetchUser){
    try {
      const { data } = await axios.post("/api/user/follow/" + id);
      toast.success(data.message);
      fetchUser(); // so that when i click follow the user count is updated
    } catch (error) {
      console.log(error);
    }
  }
  // Run fetchUser only once when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token"); // Check for token in localStorage
    if (token) {
      fetchUser(); // Fetch user data if token exists
    } else {
      setLoading(false); // If no token, stop loading and assume user is not authenticated
    }
  }, []); // Only run once on initial mount

  return (
    <UserContext.Provider
      value={{
        loginUser,
        btnLoading,
        isAuth,
        user,
        loading,
        registerUser,
        setIsAuth,
        setUser,
        followUser
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

// Custom hook to use the User Context
export const UserData = () => useContext(UserContext);
