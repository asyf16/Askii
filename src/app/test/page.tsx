"use client"
import { useState } from "react";


export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      // Step 1: Get presigned URL from backend
      const res = await fetch("/api/s3", {
        method: "POST",
        body: JSON.stringify({ filename: file.name }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to get presigned URL");
      }

      const { url, fields } = await res.json();

      // Step 2: Upload the video to S3
      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("file", file);

      const uploadRes = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload video");
      }

      // Step 3: Get the video URL from the S3 bucket (assuming public read)
      setVideoUrl(`${url}/${fields.key}`);
    } catch (error) {
      console.error("Error during file upload", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Upload Video</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {videoUrl && (
        <div>
          <h2>Uploaded Video</h2>
          <video controls>
            <source src={videoUrl} />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}
