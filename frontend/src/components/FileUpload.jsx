import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ onExtract }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = async (file) => {
    setFileName(file.name);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/upload", formData);
      console.log("📦 Full Backend Response:", res.data);
      onExtract(res.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 max-w-2xl mx-auto mt-8">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Upload Health Report</h2>
      </div>

      <div
        className={`p-8 sm:p-10 text-center transition-all duration-200 ${
          isDragging ? 'bg-blue-50 border-2 border-blue-400' : 'bg-white'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl text-gray-400 shadow-inner">
            {fileName ? '✓' : '+'}
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {fileName || 'Drag & drop your report here'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {fileName ? 'Ready to analyze' : 'or click to browse files'}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-3">
            <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium cursor-pointer transition-all text-sm">
              Select File
              <input
                type="file"
                className="sr-only"
                accept=".pdf,image/*"
                onChange={(e) => e.target.files[0] && handleFileChange(e.target.files[0])}
              />
            </label>

            {fileName && (
              <button
                onClick={() => setFileName('')}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md font-medium transition-colors text-sm"
              >
                Clear
              </button>
            )}
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Supported formats: PDF, JPG, PNG • Max size: 10MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
