"use client";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useState } from "react";

export default function Test() {
  const uploadFile = useFileUpload();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");

  const handleFileSelect = async (file: File | null) => {
    if (!file) return;
    
    setSelectedFile(file);
    setUploadStatus("idle");
    
    try {
      const uploadOk = await uploadFile(file.name, file);
      setUploadStatus(uploadOk ? "success" : "error");
    } catch (error) {
      setUploadStatus("error");
    }
  };

  return (
    <div className="p-4">
      <input
        type="file"
        onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
        className="mb-4"
      />
      {uploadStatus === "success" && (
        <p className="text-green-600">File uploaded successfully!</p>
      )}
      {uploadStatus === "error" && (
        <p className="text-red-600">Error uploading file. Please try again.</p>
      )}
    </div>
  );
}