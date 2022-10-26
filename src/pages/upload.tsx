import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { trpc } from "utils/trpc";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const uploadFileMutation = trpc.useMutation(["upload.uploadFile"]);

  // convert file to base64 string
  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleFileChange = async (file: File | null) => {
    if (file) {
      const base64 = await toBase64(file);
      setFile(file);
      setFileBase64(base64);

      console.log(base64);
    }
  };

  const handleUpload = async () => {
    if (fileBase64) {
      setUploading(true);

      const imgId = await uploadFileMutation.mutateAsync({
        file: fileBase64,
        id: uuidv4(),
      });

      const imgUrl = `/img/${imgId}`;

      setUploading(false);
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
