import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { trpc } from "utils/trpc";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file) {
      console.log(file);
      setFile(file);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const filename = encodeURIComponent(file.name);
      const fileType = encodeURIComponent(file.type);

      const res = await fetch(
        `/api/upload-url?file=${filename}&fileType=${fileType}`
      );
      const { url, fields } = await res.json();
      const formData = new FormData();

      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      const upload = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const json = await upload.json();
      console.log(json);

      if (upload.ok) {
        console.log("Uploaded successfully!");
      } else {
        console.error("Upload failed.");
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
      />
      <button onClick={handleUpload} disabled={uploading}>
        Upload
      </button>
    </div>
  );
};

export default Upload;

// https://github.com/trpc/trpc/discussions/658
