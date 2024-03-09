
import React, { useEffect, useState } from "react";
import useDatabaseData from "../hooks/useDatabaseData";
import SortButton from "./SortButton";
import SearchBar from "./SearchBar";
import AddRecordForm from "./AddRecordForm";

const DatabaseComponent = ({ selectedDatabase }) => {
  const { loading, records, error, fetchDatabaseData, sortRecords, searchRecords, addRecord,deleteRecord } = useDatabaseData();
  const [sortField, setSortField] = useState(null);

  useEffect(() => {
    fetchDatabaseData(selectedDatabase);
  }, [selectedDatabase, fetchDatabaseData]);

  const handleSort = (field) => {
    setSortField(field);
    sortRecords(selectedDatabase, field);
  };

  const handleSearch = (query) => {
    searchRecords(selectedDatabase, query);
  };

  const handleDelete = (recordId) => {

    deleteRecord(selectedDatabase, recordId);
  };

  return (
    <div className=" container mx-auto mt-8 p-4 sm:p-8">

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {records.length === 0 && (
        <>
        <AddRecordForm selectedDatabase={selectedDatabase} addRecord={addRecord} />
        <p className="text-red-600">No records found.</p>
        </>
        
      )}
      {records.length > 0 && (
      
          <div className="">
          <SearchBar onSearch={handleSearch} />

          <div className="mb-4">
            <SortButton field="name" onSort={handleSort} />
            <SortButton field="email" onSort={handleSort} />
            <SortButton field="phone" onSort={handleSort} />
          </div>
          <AddRecordForm selectedDatabase={selectedDatabase} addRecord={addRecord} />
        <div className="container mx-auto mt-8 p-4" style={{ height: "400px", overflow: "scroll" }}>
          <table className="min-w-full border rounded-md overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record._id} className="border-t">
                  <td className="py-2 px-4">{record.name}</td>
                  <td className="py-2 px-4">{record.email}</td>
                  <td className="py-2 px-4">{record.phone}</td>
                  <td className="py-2 px-4">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(record._id)}
                      >
                        Delete
                      </button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
</div>

        </div>
      )}
    </div>
  );
};

export default DatabaseComponent;
