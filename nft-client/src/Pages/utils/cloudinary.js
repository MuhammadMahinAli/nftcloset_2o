// import axios from "axios";
// import FormData from "form-data";

// export const imageUpload = async (image) => {
//   const formData = new FormData();
//   formData.append("file", image);
//   formData.append("upload_preset", "nn648eww");
//   let imageUrl = null;
//   const response = await axios.post("https://api.cloudinary.com/v1_1/dv51da0o9/image/upload", formData);
//   if (response.data && response.data.secure_url) {
//     imageUrl = response.data.secure_url;
//   }

//   return imageUrl;
// };


export const fileUpload = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "nn648eww");
  let fileUrl = null;
 
  const response = await fetch("https://api.cloudinary.com/v1_1/dv51da0o9/image/upload", {
     method: 'POST',            
     body: formData
  });
 
  if (response.ok) {
     const data = await response.json();
     if (data && data.secure_url) {
       fileUrl = data.secure_url;
     }
  } else {
     throw new Error('Upload failed');
  }
 
  return fileUrl;
 };