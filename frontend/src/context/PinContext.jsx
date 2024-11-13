import { useContext, createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { UserData } from "./UserContext"; // Use UserData() from UserContext

const PinContext = createContext();

export const PinProvider = ({ children }) => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Use UserData() to get user and isAuth from UserContext
  const { isAuth } = UserData(); // Correct usage of UserData()

  // Fetch all pins
  const fetchPins = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/pin/all");
      setPins(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Fetch a specific pin by ID
  const [pin, setPin] = useState([]);
  const fetchPin = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/pin/" + id);
      setPin(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Update a pin
  const updatePin = async (id, title, pinData, setEdit) => {
    try {
      const { data } = await axios.put("/api/pin/" + id, {
        title,
        pin: pinData,
      });
      toast.success(data.message);
      fetchPin(id); // Fetch updated pin
      setEdit(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Add a comment to a pin
  const addComment = async (id, comment, setComment) => {
    try {
      const { data } = await axios.post("/api/pin/comment/" + id, { comment });
      toast.success(data.message);
      fetchPin(id); // Fetch updated pin with new comment
      setComment(""); // Reset comment input
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Delete a comment from a pin
  const deleteComment = async (id, commentId) => {
    try {
      const { data } = await axios.delete(
        `/api/pin/comment/${id}?commentId=${commentId}`
      );
      toast.success(data.message);
      fetchPin(id); // Refresh pin after comment deletion
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Delete a pin
  const deletePin = async (id, navigate) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(`/api/pin/${id}`);
      toast.success(data.message);
      navigate("/");
      setLoading(false);
      fetchPins();
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  async function addPin(
    formData,
    setFilePrev,
    setFile,
    setTitle,
    setPin,
    navigate
  ) {
    try {
      const { data } = await axios.post("/api/pin/new", formData);

      toast.success(data.message);
      setFile([]);
      setFilePrev("");
      setPin("");
      setTitle("");
      fetchPins();
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  // Fetch pins only after user is authenticated
  useEffect(() => {
    if (isAuth) {
      // Only fetch pins after the user is authenticated
      fetchPins();
    }
  }, [isAuth]); // Re-run when `isAuth` changes (i.e., when user logs in)

  return (
    <PinContext.Provider
      value={{
        pins,
        loading,
        fetchPin,
        pin,
        updatePin,
        addComment,
        deleteComment,
        deletePin,
        addPin,
      }}
    >
      {children}
    </PinContext.Provider>
  );
};

export const PinData = () => useContext(PinContext);
