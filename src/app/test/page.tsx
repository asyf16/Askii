"use client";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useState } from "react";

export default function Test() {
  const uploadFile = useFileUpload();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileSelect = async (file: File | null) => {
    if (!file) return;
    
    setSelectedFile(file);
    setUploadStatus("idle");
    setFileUrl(null);
    
    try {
      const result = await uploadFile(file.name, file);
      if (result.success) {
        setUploadStatus("success");
        setFileUrl(result.url);
      } else {
        setUploadStatus("error");
      }
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
        <div className="space-y-2">
          <p className="text-green-600">File uploaded successfully!</p>
          {fileUrl && (
            <div className="mt-4">
              <p className="font-semibold">File URL:</p>
              <a 
                href={fileUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {fileUrl}
              </a>
              <div className="mt-2">
                <img 
                  src={fileUrl} 
                  alt="Uploaded file preview" 
                  className="max-w-full h-auto rounded-lg shadow-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {uploadStatus === "error" && (
        <p className="text-red-600">Error uploading file. Please try again.</p>
      )}
    </div>
  );
}