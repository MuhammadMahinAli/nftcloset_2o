export const rawFileUpload = async (file, type = "raw") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "nn648eww"); // Your upload preset
    formData.append("resource_type", type); // Use "raw" for non-image files like PDFs
  
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dv51da0o9/auto/upload", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.secure_url; // Return the uploaded file's URL
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };