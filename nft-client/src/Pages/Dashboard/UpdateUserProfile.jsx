import { useContext, useEffect, useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { IoIosCamera } from "react-icons/io";
import { AuthContext } from "../../Context/UserContext";
import { useGetSingleUserQuery, useUpdateUserInfoMutation } from "../../features/auth/authApi";
import { fileUpload } from "../utils/cloudinary";
import Swal from "sweetalert2";

const UpdateUserProfile = () => {
  const { userId } = useContext(AuthContext);
  const [updateUserInfo] = useUpdateUserInfoMutation();
  const { data: getSingleUser } = useGetSingleUserQuery(userId);
  const userInfo = getSingleUser?.data;

  //const totalAddress = userInfo?.addresses;
  //
  //console.log("plm", userInfo, totalAddress);

  const [formData, setFormData] = useState({
    firstName: userInfo?.name?.firstName || "",
    lastName: userInfo?.name?.lastName || "",
    phoneNumber: userInfo?.phoneNumber || "",
    profilePic: userInfo?.profilePic || "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle phone number change separately
  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumber: value,
    }));
  };

  // Update preview image state with initial value
  const [previewImage, setPreviewImage] = useState(userInfo?.profilePic || "");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const uploadedUrl = await fileUpload(file);
      setFormData((prev) => ({
        ...prev,
        profilePic: uploadedUrl,
      }));
      setPreviewImage(uploadedUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedData = {
      name: {
        firstName: formData.firstName,
        lastName: formData.lastName
      },
      phoneNumber: formData.phoneNumber,
      profilePic: formData.profilePic
    };

    try {
      const response = await updateUserInfo({
        id: userId,
        data: updatedData,
      }).unwrap();

      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Profile updated successfully',
          showConfirmButton: false,
          timer: 1500
        });
        
        // Refetch the updated data
        //refetch();
        
        // Update local state with new data
        setFormData({
          firstName: response.data.name.firstName,
          lastName: response.data.name.lastName,
          phoneNumber: response.data.phoneNumber,
          profilePic: response.data.profilePic
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.data?.message || 'Something went wrong!',
      });
    }
  };
  useEffect(() => {
    if (userInfo) {
      setFormData({
        firstName: userInfo.name.firstName || '',
        lastName: userInfo.name.lastName || '',
        phoneNumber: userInfo.phoneNumber || '',
        profilePic: userInfo.profilePic || ''
      });
      setPreviewImage(userInfo.profilePic || '');
    }
  }, [userInfo]);

  return (
    <div className="my-5 lg:my-16">
      <h2 className="text-xl font-bold mb-6">Profile</h2>
      {/* <!-- Profile Section --> */}
      <div className="bg-white  rounded-lg shadow-xl px-2 py-4 md:p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* <!-- Profile Image --> */}
          <div className="relative">
            <img
              src={
                previewImage ||
                formData.profilePic ||
                "https://plus.unsplash.com/premium_photo-1671077420134-4cce62252a2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8M2QlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D"
              }
              alt="Profile"
              className="w-32 h-32 lg:w-44 lg:h-44 rounded-full object-center border-teal-500 border-4 "
            />
            <input
              type="file"
              id="display"
              className="mb-2 hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <label htmlFor="display">
              <div className="absolute bottom-4 right-0 bg-teal-500  w-9 h-9 rounded-full flex items-center justify-center border-2 border-white">
                <IoIosCamera className="text-2xl text-white" />
              </div>
            </label>
          </div>

          {/* <!-- Form Fields --> */}
          <form onSubmit={handleSubmit} className="flex-1">
            <p className="text-[19px] xl:text-[22px] text-gray-400 mb-4">
              Personal
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-7 mb-4">
              <div>
                <label className="block text-sm mb-1 font-semibold xl:text-[18px]">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md outline-[#14b8a6]"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 font-semibold xl:text-[18px]">
                  Surname
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md outline-[#14b8a6]"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1 font-semibold xl:text-[18px]">
                Email
              </label>
              <input
                type="email"
                readOnly
                value={userInfo?.email}
                className="w-full px-3 py-2 border border-gray-200 rounded-md outline-[#14b8a6]"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1 font-semibold xl:text-[18px]">
                Phone Number
              </label>
              <PhoneInput
                className="phone-input"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
              />
            </div>

            <button className="float-right px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserProfile;
{
  /* <!-- Address Section --> */
}
{
  /* <div className="bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-[19px] xl:text-[22px] text-gray-400 font-semibold mb-6">Address</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1 font-semibold xl:text-[18px]">Delivery Address</label>
              <input
                type="text"
                placeholder="Enter address"
                className="w-full px-3 py-2 border border-gray-200 rounded-md outline-[#14b8a6]"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-semibold xl:text-[18px]">Country</label>
              <input
                type="text"
                placeholder="Select country"
                className="w-full px-3 py-2 border border-gray-200 rounded-md outline-[#14b8a6]"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-semibold xl:text-[18px]">City</label>
              <input
                type="text"
                placeholder="Enter city"
                className="w-full px-3 py-2 border border-gray-200 rounded-md outline-[#14b8a6]"
              />
            </div>

            <div>
              <label className="block text-sm mb-1 font-semibold xl:text-[18px]">Street</label>
              <input
                type="text"
                placeholder="Enter street"
                className="w-full px-3 py-2 border border-gray-200 rounded-md outline-[#14b8a6]"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="default"
                className="rounded text-teal-500"
              />
              <label htmlFor="default" className="text-sm">
                Set As Default
              </label>
            </div>

            <div className="flex flex-col justify-center items-center md:flex-row md:items-start md:justify-start gap-3">
              <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                Edit
              </button>
              <button className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors">
                Add
              </button>
              <button className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div> */
}
