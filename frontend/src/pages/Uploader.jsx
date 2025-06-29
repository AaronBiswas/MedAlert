import React, { useState } from "react";
import { uploadFile } from "../api/upload.js";
import { toast } from "react-toastify";

const Uploader = () => {
  const [file, setFile] = useState(null);

  const handleChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async () => {
    if (!file) return;
    try {
      const res = await uploadFile(file);
      console.log("Uploaded:", res);
      toast.success("File Uploaded!");
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to upload file!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="card bg-white shadow-xl border border-gray-200 rounded-2xl w-full max-w-md p-6">
        <div className="card-body space-y-5">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Upload Medicine File
          </h2>
          <input
            type="file"
            onChange={handleChange}
            className="file-input file-input-bordered w-full"
          />
          <div className="card-actions justify-center pt-4">
            <button className="btn btn-primary w-full" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uploader;
