import React, { useEffect, useState, useRef } from "react";
import moment from "moment";

const PopupForm = ({ isOpen, onClose, onSubmit, isEditConfirmation, editData, onDelete, onEdit}) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [isEdit, setIsEdit] = useState(isEditConfirmation);
  const prevEditData = useRef(null);

    useEffect(() => {
        if (!editData) {            
            console.log("EditData set to Null:", editData);
            setTitle("");
            setLocation("");
            setDate("");
        }
        if (editData && editData !== prevEditData.current) {
            console.log("EditData updated:", editData);
            setTitle(editData.title || "");
            setLocation(editData.location || "");
            setDate(editData.date ? moment(editData.date).format("MMM DD, YYYY") : "");

            // Update previous editData reference
            prevEditData.current = editData;
        }
    }, [editData]);
    
    if (!isOpen) return null; // Don't render if popup is closed



  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, location }); // Send data to parent
    setTitle(""); // Reset input field
    setLocation(""); // Reset input field
  };
  const handleEdit = (e) => {
    e.preventDefault();
    onEdit({ title, location }); // Send data to parent
    setTitle(""); // Reset input field
    setLocation(""); // Reset input field
  };



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          {
              (!isEdit && editData) ?
                  (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                              <h2 className="text-xl font-bold mb-4">{title}</h2>
                              <div className="">
                                  <h3>Date: {date}</h3>
                                  <h3>Location: {location}</h3>
                              </div>
                              <div className="flex justify-right align-right">
                                  <button type="button" onClick={(e) => { setIsEdit(true); console.log("isEdit", isEdit) }} className="bg-gray-400 text-white px-4 py-2 rounded">
                                      Edit
                                  </button>
                                  <button type="button" onClick={onDelete} className="bg-red-400 text-white px-4 py-2 rounded hover:bg-blue-700">
                                      Delete
                                  </button>
                              </div>
                          </div>
                      </div>
                  )
    
                  :
                  (
                      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                          <h2 className="text-xl font-bold mb-4">{editData ? "Modify" : "Create"} Event</h2>
                          <form onSubmit={editData ? handleEdit : handleSubmit}>
                                  <input
                                      type="text"
                                      value={title}
                                      onChange={(e) => setTitle(e.target.value)}
                                      className="w-full p-2 border border-gray-300 rounded"
                                      placeholder="Event Title"
                                      required
                                  />
                                  <input
                                      type="text"
                                      value={location}
                                      onChange={(e) => setLocation(e.target.value)}
                                      className="w-full p-2 border border-gray-300 rounded"
                                      placeholder="Event Location"
                                      required
                                  />
                                  <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
                                      Cancel
                                  </button>
                                  <button type="submit" className="mm-popup__box__footer__right-space mm-popup__btn bg-green-400 text-white px-4 py-2 rounded hover:bg-blue-700">
                                      {editData ? "Update" : "Save"}
                                  </button>
                          </form>
                      </div>
                  )
          

          }

      </div>
  );
}


export default PopupForm;