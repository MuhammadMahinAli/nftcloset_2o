// export const rawFileUpload = async (file, type = "raw") => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "nn648eww"); // Your upload preset
//     formData.append("resource_type", type); // Use "raw" for non-image files like PDFs
  
//     try {
//       const response = await fetch("https://api.cloudinary.com/v1_1/dv51da0o9/auto/upload", {
//         method: "POST",
//         body: formData,
//       });
  
//       if (response.ok) {
//         const data = await response.json();
//         return data.secure_url; // Return the uploaded file's URL
//       } else {
//         throw new Error("Upload failed");
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       throw error;
//     }
//   };

// export const rawFileUpload = async (file, type = "raw", onProgress) => {
//   return new Promise((resolve, reject) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "nn648eww");
//     formData.append("resource_type", type);

//     const xhr = new XMLHttpRequest();
    
//     // Track upload progress
//     xhr.upload.onprogress = (event) => {
//       if (event.lengthComputable && onProgress) {
//         const percentCompleted = Math.round((event.loaded * 100) / event.total);
//         onProgress(percentCompleted);
//       }
//     };

//     // Handle response
//     xhr.onload = () => {
//       if (xhr.status === 200) {
//         const response = JSON.parse(xhr.responseText);
//         resolve(response.secure_url);
//       } else {
//         reject(new Error('Upload failed'));
//       }
//     };

//     // Handle errors
//     xhr.onerror = () => {
//       reject(new Error('Upload failed'));
//     };

//     // Open and send the request
//     xhr.open("POST", "https://api.cloudinary.com/v1_1/dv51da0o9/auto/upload", true);
//     xhr.send(formData);
//   });
// };

export const rawFileUpload = async (file, type = "raw", onProgress) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "nn648eww");
    formData.append("resource_type", type);

    // Setup progress tracking
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = Math.round((event.loaded * 100) / event.total);
        onProgress(progress);
      }
    });

    // Handle completion
    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        resolve(response.secure_url);
      } else {
        reject(new Error("Upload failed"));
      }
    };

    // Handle errors
    xhr.onerror = () => {
      reject(new Error("Upload failed"));
    };

    // Start upload
    xhr.open("POST", "https://api.cloudinary.com/v1_1/dv51da0o9/auto/upload");
    xhr.send(formData);
  });
};