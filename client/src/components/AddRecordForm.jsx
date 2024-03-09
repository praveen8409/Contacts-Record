import React, { useState } from "react";
import toast from "react-hot-toast";

const AddRecordForm = ({ selectedDatabase, addRecord }) => {
  const [newRecordData, setNewRecordData] = useState({ name: "", email: "", phone: "" });

  const handleAddRecord = async () => {
    try {
      if (newRecordData.name === "" || newRecordData.email === "" || newRecordData.phone === "") {
        toast.error("Input data should not be empty");
        return;
      }

      const isEmailValid = validateEmail(newRecordData.email);
      const isPhoneValid = validatePhone(newRecordData.phone);

      if (!isEmailValid) {
        toast.error("Invalid email format");
        return;
      }

      if (!isPhoneValid) {
        toast.error("Invalid phone number format");
        return;
      }

      await addRecord(selectedDatabase, newRecordData);
      setNewRecordData({ name: "", email: "", phone: "" });
      
    } catch (error) {
      
      console.error("Error adding record:", error.message);
      toast.error("Error adding record");
    }
  };

  const validateEmail = (email) => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
   
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  return (
    <div className="mt-4 mb-4">
      <h3 className="text-lg font-bold mb-2">Add New Record</h3>
      <div className="flex space-x-2">
        <input
          className="py-2 px-4 border rounded-md"
          type="text"
          placeholder="Name"
          value={newRecordData.name}
          onChange={(e) => setNewRecordData({ ...newRecordData, name: e.target.value })}
        />
        <input
          className="py-2 px-4 border rounded-md"
          type="email"
          placeholder="Email"
          value={newRecordData.email}
          onChange={(e) => setNewRecordData({ ...newRecordData, email: e.target.value })}
        />
        <input
          className="py-2 px-4 border rounded-md"
          type="tel"
          placeholder="Phone"
          value={newRecordData.phone}
          onChange={(e) => setNewRecordData({ ...newRecordData, phone: e.target.value })}
        />
        <button onClick={handleAddRecord} className="py-2 px-4 bg-blue-500 text-white rounded-md ml-2">
          Add
        </button>
      </div>
    </div>
  );
};

export default AddRecordForm;
