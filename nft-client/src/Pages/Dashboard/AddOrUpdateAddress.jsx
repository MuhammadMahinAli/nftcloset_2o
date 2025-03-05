import { useContext, useState } from "react";

import { FaEdit, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { FaRegTrashCan } from "react-icons/fa6";
import { AuthContext } from "../../Context/UserContext";
import {
  useAddAddressMutation,
  useDeleteAddressMutation,
  useGetSingleUserQuery,
  useUpdateAddressMutation,
} from "../../features/auth/authApi";
import { IoIosCloseCircle } from "react-icons/io";

const AddOrUpdateAddress = ({ setIsOpenEditAddress }) => {
  const { userId } = useContext(AuthContext);
  const { data: getSingleUser, refetch } = useGetSingleUserQuery(userId);
  const [updateAddress] = useUpdateAddressMutation();
  const [addAddress] = useAddAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const userInfo = getSingleUser?.data;

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    homeAddress: "",
    country: "",
    city: "",
    street: "",
    isDefault: false,
  });

  // Reset form
  const resetForm = () => {
    setAddressForm({
      homeAddress: "",
      country: "",
      city: "",
      street: "",
      isDefault: false,
    });
  };

  // Handle add new address
  const handleAddNew = async (e) => {
    e.preventDefault();
    try {
      const response = await addAddress({
        id: userId,
        data: addressForm,
      }).unwrap();

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "New address added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setShowAddForm(false);
        resetForm();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.data?.message || "Failed to add address",
      });
    }
  };

  // Handle delete address
  const handleDelete = async (addressId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await deleteAddress({
          id: userId,
          addressId,
        }).unwrap();

        if (response.success) {
          Swal.fire("Deleted!", "Address has been deleted.", "success");
          refetch();
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.data?.message || "Failed to delete address",
      });
    }
  };

  // Handle edit button click
  const handleEdit = (address) => {
    setEditingAddress(address._id);
    setAddressForm({
      homeAddress: address.homeAddress,
      country: address.country,
      city: address.city,
      street: address.street,
      isDefault: address.isDefault,
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAddress({
        id: userId,
        addressId: editingAddress,
        data: addressForm,
      }).unwrap();

      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Address updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setEditingAddress(null);
        resetForm();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.data?.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="p-4 md:p-8 xl:p-10 fixed lg:left-14  inset-0 flex justify-center items-center bg-black/50 ">
      <div className="bg-white md:w-11/12  overflow-y-auto min-h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[550px] 3xl:min-h-[550px] max-h-screen md:max-h-[400px] lg:max-h-[500px] xl:max-h-[550px] 3xl:max-h-[550px]  mt-16 rounded-lg p-5">
        <button
          className="float-right"
          onClick={() => setIsOpenEditAddress(false)}
        >
          <IoIosCloseCircle className="text-2xl  text-teal-600  rounded-md hover:text-teal-700 transition-colors" />
        </button>

        {showAddForm ? (
          <div className="pt-5">
            <h1 className="text-[19px] xl:text-[24px] text-gray-700 font-bold mb-6 text-center">
              Add New Address
            </h1>
            <div className="md:mx-10 mb-6 border bg-white shadow-xl rounded-xl">
              <form
                onSubmit={handleAddNew}
                className="space-y-4 bg-white p-2 md:p-6 rounded-lg shadow-sm"
              >
                <div className="space-y-4">
                  <label className="block text-sm mb-1 font-semibold xl:text-[18px]">
                    Home Address
                  </label>
                  <input
                    type="text"
                    name="homeAddress"
                    value={addressForm.homeAddress}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md outline-[#14b8a6]"
                    required
                  />
                  <div className="space-y-4">
                    <label className="block text-sm mb-1 font-semibold xl:text-[18px]">
                      Street
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={addressForm.street}
                      onChange={handleInputChange}
                      placeholder="Enter address"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md outline-[#14b8a6]"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm mb-1 font-semibold xl:text-[18px]">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={addressForm.city}
                      onChange={handleInputChange}
                      placeholder="Enter address"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md outline-[#14b8a6]"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm mb-1 font-semibold xl:text-[18px]">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={addressForm.country}
                      onChange={handleInputChange}
                      placeholder="Enter address"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md outline-[#14b8a6]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isDefault"
                      name="isDefault"
                      checked={addressForm.isDefault}
                      onChange={(e) =>
                        setAddressForm((prev) => ({
                          ...prev,
                          isDefault: e.target.checked,
                        }))
                      }
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                    <label
                      htmlFor="isDefault"
                      className="text-[17px] text-gray-700"
                    >
                      Set as default address
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                  >
                    Add Address
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingAddress(null);
                      resetForm();
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className="pt-7 flex justify-between items-center mb-6 ">
              <h2 className="text-2xl font-bold">Manage Addresses</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                <FaPlus />{" "}
                <span className="hidden md:block">Add New Address</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 md:px-5">
              {userInfo?.addresses?.map((address, i) => (
                <div key={i} className="border rounded-lg p-4 shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-bold text-gray-700 xl:text-xl">
                        Address {i + 1}
                        {address?.isDefault && (
                          <span className="ml-2 text-xs bg-teal-100 text-teal-600 px-2 py-1 rounded">
                            DEFAULT
                          </span>
                        )}
                      </h4>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(address)}
                        className="text-teal-600 hover:text-teal-800"
                      >
                        <FaEdit className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleDelete(address._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaRegTrashCan className="text-xl" />
                      </button>
                    </div>
                  </div>

                  {editingAddress === address._id ? (
                    // Edit Form
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Home Address
                        </label>
                        <input
                          type="text"
                          name="homeAddress"
                          value={addressForm.homeAddress}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Street
                        </label>
                        <input
                          type="text"
                          name="street"
                          value={addressForm.street}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={addressForm.city}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={addressForm.country}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md focus:ring-teal-500 focus:border-teal-500"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isDefault"
                          name="isDefault"
                          checked={addressForm.isDefault}
                          onChange={(e) =>
                            setAddressForm((prev) => ({
                              ...prev,
                              isDefault: e.target.checked,
                            }))
                          }
                          className="rounded text-teal-600 focus:ring-teal-500"
                        />
                        <label
                          htmlFor="isDefault"
                          className="text-sm text-gray-700"
                        >
                          Set as default address
                        </label>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                        >
                          Save Changes
                        </button>
                        <div
                          onClick={() => setEditingAddress(null)}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </div>
                      </div>
                    </form>
                  ) : (
                    // Address Display
                    <div className="text-gray-600 space-y-1">
                      <p>
                        <span className="font-medium">Home Address:</span>{" "}
                        {address.homeAddress}
                      </p>
                      <p>
                        <span className="font-medium">Street:</span>{" "}
                        {address.street}
                      </p>
                      <p>
                        <span className="font-medium">City:</span>{" "}
                        {address.city}
                      </p>
                      <p>
                        <span className="font-medium">Country:</span>{" "}
                        {address.country}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
        {userInfo?.addresses?.length === 0 && (
          <h4 className="font-bold text-gray-700 xl:text-xl ">
            No Address Available to show
          </h4>
        )}
      </div>
    </div>
  );
};

export default AddOrUpdateAddress;
