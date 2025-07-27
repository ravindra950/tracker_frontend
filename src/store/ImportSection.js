import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { triggerImportWithFile } from "../redux/actions/jobActions"; // if accepting file

const ImportSection = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("jobFile", file); // assuming backend expects 'jobFile'

    dispatch(triggerImportWithFile(formData));
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">📥 Upload & Import Jobs</h2>
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept=".xml,.json"
          onChange={handleFileChange}
          className="border px-2 py-1 rounded"
        />
        <button
          type="button"
          onClick={handleImport}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Import Jobs
        </button>
      </div>
    </div>
  );
};

export default ImportSection;
