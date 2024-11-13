import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PinData } from "../context/PinContext";
import { Loading } from "../components/Loading";
import { MdDelete } from "react-icons/md";

const PinPage = ({ user }) => {
  const params = useParams();
  const {
    loading,
    fetchPin,
    pin,
    updatePin,
    addComment,
    deleteComment,
    deletePin,
  } = PinData();

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [pinValue, setPinValue] = useState("");

  const editHandler = () => {
    setTitle(pin.title);
    setPinValue(pin.pin);
    setEdit(!edit);
  };

  const updateHandler = () => {
    updatePin(pin._id, title, pinValue, setEdit);
  };

  const [comment, setComment] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    addComment(pin._id, comment, setComment);
  };

  const deleteCommentHandler = (id) => {
    if (confirm("Are you sure you want to delete this comment?"))
      deleteComment(pin._id, id);
  };

  const navigate = useNavigate();

  const deletePinHandler = () => {
    if (confirm("Are you sure you want to delete this pin?"))
      deletePin(pin._id, navigate);
  };

  useEffect(() => {
    fetchPin(params.id);
  }, [params.id]);

  return (
    <div className="flex flex-col items-center bg-gray-100 py-6 min-h-screen">
      {loading ? (
        <Loading />
      ) : (
        pin && (
          <div className="bg-white rounded-lg shadow-lg flex flex-wrap w-full max-w-4xl p-6">
            {/* Image and Info Section */}
            <div className="w-full md:w-1/2">
              <img
                src={pin?.image?.url || "/path/to/default-image.jpg"}
                alt={pin?.title || "Pin image"}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 mt-4 md:mt-0 md:px-6">
              <div className="flex justify-between items-center mb-4">
                {edit ? (
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="common-input w-48 border-gray-300 rounded-lg p-2"
                    placeholder="Enter Title"
                  />
                ) : (
                  <h1 className="text-2xl font-semibold text-gray-800">
                    {pin.title}
                  </h1>
                )}
                {pin.owner && pin.owner._id === user._id && (
                  <div className="flex gap-2">
                    <button
                      onClick={editHandler}
                      className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={deletePinHandler}
                      className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              {edit ? (
                <input
                  value={pinValue}
                  onChange={(e) => setPinValue(e.target.value)}
                  className="common-input w-48 border-gray-300 rounded-lg p-2"
                  placeholder="Enter Description"
                />
              ) : (
                <p className="text-gray-600">{pin.pin}</p>
              )}
              {edit && (
                <button
                  onClick={updateHandler}
                  className="bg-red-600 text-white py-1 px-4 mt-4 rounded hover:bg-red-700"
                >
                  Update
                </button>
              )}

              {/* Owner Info */}
              {pin.owner && (
                <Link to={`/user/${pin.owner._id}`}>
                  <div className="flex items-center mt-6 border-b pb-4">
                    <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center">
                      <span className="font-bold text-gray-800">
                        {pin.owner.name.slice(0, 1)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {pin.owner.name}
                      </h2>
                      <p className="text-gray-500">
                        {pin.owner.followers.length} Followers
                      </p>
                    </div>
                  </div>
                </Link>
              )}

              {/* Comment Section */}
              <div className="mt-6">
                <form onSubmit={submitHandler} className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter Comment"
                    className="flex-grow border border-gray-300 rounded-lg p-2"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Add
                  </button>
                </form>
              </div>

              {/* Display Comments */}
              <div className="mt-6 h-48 overflow-y-auto">
                {pin.comments && pin.comments.length > 0 ? (
                  pin.comments.map((e) => (
                    <div
                      key={e._id}
                      className="flex justify-between items-center mt-4"
                    >
                      <div className="flex items-center">
                        <Link to={`/user/${e.user}`}>
                          <div className="rounded-full h-10 w-10 bg-gray-300 flex items-center justify-center">
                            <span className="font-bold text-gray-800">
                              {e.name.slice(0, 1)}
                            </span>
                          </div>
                        </Link>
                        <div className="ml-4">
                          <h2 className="text-lg font-semibold text-gray-800">
                            {e.name}
                          </h2>
                          <p className="text-gray-600">{e.comment}</p>
                        </div>
                      </div>
                      {e.user === user._id && (
                        <button
                          onClick={() => deleteCommentHandler(e._id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <MdDelete size={20} />
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">
                    Be the first one to add a comment
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PinPage;
