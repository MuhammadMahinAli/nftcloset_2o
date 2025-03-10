import { useContext, useEffect, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../../Context/UserContext";
import {
  useGetAllDeliveryAreaQuery, // e.g., to fetch areas from your DB
  useAddDeliveryAreaMutation,
  useDeleteDeliveryAreaMutation,
  useUpdateDeliveryAreaMutation,
} from "../../features/deliveryArea/deliveryAreaApi";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";

const AddDeliveryArea = () => {
  // If your user logic is relevant:
  const { userId } = useContext(AuthContext);

  // ------------------------------
  // 1) Manage filters (country / city) for front-end filtering
  // ------------------------------
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [page, setPage] = useState(1);
  const limit = 4;

  // ------------------------------
  // 2) RTK Query: fetch existing delivery areas from DB
  //    e.g., if your endpoint is "getAllDeliveryArea" returning a list
  // ------------------------------
  const {
    data: deliveryAreasData,

    isLoading,
    error,
    refetch,
  } = useGetAllDeliveryAreaQuery({
    page,
    limit,
  });

  // The actual list of areas from your backend
  const deliveryAreas = deliveryAreasData?.data || [];

  const total = deliveryAreasData?.meta?.total || 0;
  const currentPage = deliveryAreasData?.meta?.page || 1;
  const perPage = deliveryAreasData?.meta?.limit || 4;

  console.log("page", deliveryAreas, total, currentPage, perPage);

  // Calculate how many pages in total
  const totalPages = Math.ceil(total / perPage);

  // Example: Using a local variable
  const startIndex = (currentPage - 1) * limit; // This is skip
  let globalIndex = startIndex;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setPage(currentPage + 1);
    }
  };

  // ------------------------------
  // 3) Additional states
  // ------------------------------
  const [showAddForm, setShowAddForm] = useState(false);
  const [isOpenEditArea, setIsOpenEditArea] = useState(false);
  const [editingAreaId, setEditingAreaId] = useState(null);

  const [deliveryAreaForm, setDeliveryAreaForm] = useState({
    country: "",
    city: "",
    cityOptions: [],
    deliveryType: "",
    deliveryFee: 0,
    featured: [],
    deliveryDay: "",
  });
  const [newFeature, setNewFeature] = useState("");

  // RTK Query mutations
  const [addDeliveryArea] = useAddDeliveryAreaMutation();
  const [updateDeliveryArea] = useUpdateDeliveryAreaMutation();
  const [deleteDeliveryArea] = useDeleteDeliveryAreaMutation();

  // ------------------------------
  // 4) Fetch countries for both filtering & forms
  // ------------------------------
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryList = response.data
          .map((c) => ({
            name: c.name.common,
            code: c.name.common, // or use c.cca2
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countryList);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  // ------------------------------
  // 5) For front-end filtering only:
  //    if the user picks a country, fetch city list for filtering
  // ------------------------------
  useEffect(() => {
    if (!selectedCountry) {
      setCityOptions([]);
      setSelectedCity("");
      return;
    }
    const fetchCities = async () => {
      try {
        const response = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/cities",
          { country: selectedCountry }
        );
        const c = response.data.data || [];
        setCityOptions(c);
        setSelectedCity("");
      } catch (err) {
        console.error("Error fetching city list:", err);
        setCityOptions([]);
      }
    };
    fetchCities();
  }, [selectedCountry]);

  // ------------------------------
  // 6) Filter the fetched areas by selectedCountry / selectedCity
  // ------------------------------
  const getFilteredAreas = () => {
    return deliveryAreas.filter((area) => {
      if (selectedCountry && area.country !== selectedCountry) return false;
      if (selectedCity && area.city !== selectedCity) return false;
      return true;
    });
  };
  const filteredAreas = getFilteredAreas();

  // ------------------------------
  // 7) Handlers for Add/Edit/Delete
  // ------------------------------
  const resetForm = () => {
    setDeliveryAreaForm({
      country: "",
      city: "",
      cityOptions: [],
      deliveryType: "",
      deliveryFee: 0,
      featured: [],
      deliveryDay: "",
    });
    setNewFeature("");
  };

  // Show add form
  const handleShowAddForm = () => {
    resetForm();
    setShowAddForm(true);
    setIsOpenEditArea(false);
  };

  // CREATE


  const handleAddNew = async (e) => {
    e.preventDefault();

     const { country, city, deliveryType, deliveryFee, deliveryDay, featured } = deliveryAreaForm;

  // 2) Array to store names of missing fields
  const missingFields = [];

  if (!country) missingFields.push("Country");
  if (!city) missingFields.push("City");
  if (!deliveryType) missingFields.push("Delivery Type");
  if (!deliveryFee) missingFields.push("Delivery Fee");
  if (!deliveryDay) missingFields.push("Delivery Day");
  if (!featured || featured.length === 0) missingFields.push("Featured");

  // 3) If any fields are missing, show a SweetAlert message and return
  if (missingFields.length > 0) {
    Swal.fire(
      "Missing Field(s)",
      `Please fill out: ${missingFields.join(", ")}`,
      "error"
    );
    return;
  }
    try {
      // Call RTK Query
      const response = await addDeliveryArea(deliveryAreaForm).unwrap();
  

      if (response.success) {
    
        Swal.fire("Success!", response.message, "success");
        setShowAddForm(false);
        resetForm();
        refetch();
      } else {
  
        Swal.fire("Error", response.message || "Failed to add delivery area", "error");
      }
    } catch (err) {

      const errorMessage = err?.data?.message || "Something went wrong!";
      Swal.fire("Error", errorMessage, "error");
    }
  };
  

  // EDIT
  const handleEdit = (area) => {
    setShowAddForm(false);
    setIsOpenEditArea(true);
    setEditingAreaId(area._id);
    setDeliveryAreaForm({
      country: area.country,
      city: area.city,
      cityOptions: [],
      deliveryType: area.deliveryType,
      deliveryFee: area.deliveryFee,
      featured: area.featured || [],
      deliveryDay: area.deliveryDay,
    });
  };

  // SAVE EDIT


  const handleUpdateDeliveryArea = async (e) => {
    e.preventDefault();

     const { country, city, deliveryType, deliveryFee, deliveryDay, featured } = deliveryAreaForm;

  // 2) Array to store names of missing fields
  const missingFields = [];

  if (!country) missingFields.push("Country");
  if (!city) missingFields.push("City");
  if (!deliveryType) missingFields.push("Delivery Type");
  if (!deliveryFee) missingFields.push("Delivery Fee");
  if (!deliveryDay) missingFields.push("Delivery Day");
  if (!featured || featured.length === 0) missingFields.push("Featured");

  // 3) If any fields are missing, show a SweetAlert message and return
  if (missingFields.length > 0) {
    Swal.fire(
      "Missing Field(s)",
      `Please fill out: ${missingFields.join(", ")}`,
      "error"
    );
    return;
  }

    try {
      const response = await updateDeliveryArea({
        id: editingAreaId,
        data: deliveryAreaForm,
      }).unwrap();
  
      if (response.success) {
        Swal.fire("Success!", response.message, "success");
        setIsOpenEditArea(false);
        setEditingAreaId(null);
        resetForm();
        refetch();
      } else {
        Swal.fire("Error", response.message || "Failed to update delivery area", "error");
      }
    } catch (err) {
      const errorMessage = err?.data?.message || "Something went wrong!";
      Swal.fire("Error", errorMessage, "error");
    }
  };
  

  // DELETE
  const handleDelete = async (areaId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (!result.isConfirmed) return;

    try {
      await deleteDeliveryArea(areaId).unwrap();
      Swal.fire("Deleted!", "Delivery area has been deleted.", "success");
      refetch();
    } catch (err) {
      Swal.fire("Error", "Failed to delete delivery area", "error");
    }
  };

  // ------------------------------
  // 8) Form handling for Add/Edit
  // ------------------------------
  const handleFormChange = async (e) => {
    const { name, value } = e.target;
    // If user picks a new country in the form, fetch city list
    if (name === "country") {
      const c = await fetchFormCities(value);
      setDeliveryAreaForm((prev) => ({
        ...prev,
        country: value,
        city: "",
        cityOptions: c,
      }));
    } else {
      setDeliveryAreaForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // fetch city list for the form's dropdown
  const fetchFormCities = async (countryName) => {
    try {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/cities",
        { country: countryName }
      );
      return response.data.data || [];
    } catch (err) {
      console.error("Error fetching form city list:", err);
      return [];
    }
  };

  // "featured" array (add/remove)
  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    setDeliveryAreaForm((prev) => ({
      ...prev,
      featured: [...prev.featured, newFeature.trim()],
    }));
    setNewFeature("");
  };
  const handleRemoveFeature = (featIndex) => {
    setDeliveryAreaForm((prev) => ({
      ...prev,
      featured: prev.featured.filter((_, i) => i !== featIndex),
    }));
  };

  useEffect(() => {
    // If the user is editing an area with a known country, auto-fetch the city list
    if (isOpenEditArea && deliveryAreaForm.country) {
      (async () => {
        const fetchedCities = await fetchFormCities(deliveryAreaForm.country);
        setDeliveryAreaForm((prev) => ({
          ...prev,
          cityOptions: fetchedCities,
        }));
      })();
    }
  }, [isOpenEditArea, deliveryAreaForm.country]);

  // ------------------------------
  // 9) Render
  // ------------------------------
  // Loading / Error states from RTK Query
  if (isLoading) return <p>Loading delivery areas...</p>;
  if (error) return <p>Error fetching delivery areas.</p>;

  return (
    <div className="bg-white   mt-16 rounded-lg p-5">
      {/* Filter country/city (front-end) */}
      <div className="mb-4 flex gap-4">
        {/* COUNTRY filter */}
        <div>
          <label className="block  text-[20px] md:text-[24px] font-bold text-gray-800 mb-1">
            Filter by Country
          </label>
          <select
            className="p-2 border rounded-lg text-[17px] md:text-[22px]"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* CITY filter */}
        <div>
          <label className="block  text-[20px] md:text-[24px] font-bold text-gray-800 mb-1">
            Filter by City
          </label>
          <select
            className="p-2 border rounded-lg text-[17px] md:text-[22px]"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedCountry}
          >
            <option value="">All Cities</option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Add Form toggle */}
      {showAddForm ? (
        <div className="pt-5">
          <h2 className="text-[19px] xl:text-[24px] text-gray-700 font-bold mb-6 text-center">
            Add New Delivery Area
          </h2>
          <div className="md:mx-10 mb-6 border bg-white shadow-xl rounded-xl">
            <form
              onSubmit={handleAddNew}
              className="space-y-4 bg-white p-2 md:p-6 rounded-lg shadow-sm"
            >
              {/* Country */}
              <div>
                <label className="block text-[17px] md:text-[22px] mb-1 font-semibold ">
                  Country
                </label>
                <select
                  name="country"
                  className="p-2 border rounded-lg w-full mb-2 text-[17px] md:text-[22px]"
                  value={deliveryAreaForm.country}
                  onChange={handleFormChange}
                >
                  <option value="">Select Country</option>
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-[17px] md:text-[22px] mb-1 font-semibold ">
                  City
                </label>
                <select
                  name="city"
                  className="p-2 border rounded-lg w-full mb-2 text-[17px] md:text-[22px]"
                  value={deliveryAreaForm.city}
                  onChange={handleFormChange}
                >
                  <option value="">Select City</option>
                  {deliveryAreaForm.cityOptions.map((cityName) => (
                    <option key={cityName} value={cityName}>
                      {cityName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Delivery Type */}
              <div>
                <label className="block text-[17px] md:text-[22px] mb-1 font-semibold ">
                  Delivery Type
                </label>
                <input
                  type="text"
                  name="deliveryType"
                  placeholder="e.g. Ali Express"
                  className="p-2 border rounded-lg w-full mb-2 text-[17px] md:text-[22px]"
                  value={deliveryAreaForm.deliveryType}
                  onChange={handleFormChange}
                />
              </div>

              {/* Delivery Fee */}
              <div>
                <label className="block text-[17px] md:text-[22px] mb-1 font-semibold ">
                  Delivery Fee
                </label>
                <input
                  type="number"
                  name="deliveryFee"
                  placeholder="e.g. 45"
                  className="p-2 border rounded-lg w-full mb-2 text-[17px] md:text-[22px]"
                  value={deliveryAreaForm.deliveryFee}
                  onChange={handleFormChange}
                />
              </div>

              {/* Delivery Day */}
              <div>
                <label className="block text-[17px] md:text-[22px] mb-1 font-semibold ">
                  Delivery Day
                </label>
                <input
                  type="text"
                  name="deliveryDay"
                  placeholder="e.g. 2-3 days"
                  className="p-2 border rounded-lg w-full mb-2 text-[17px] md:text-[22px]"
                  value={deliveryAreaForm.deliveryDay}
                  onChange={handleFormChange}
                />
              </div>

              {/* Featured */}
              <div>
                <label className="block text-[17px] md:text-[22px] mb-1 font-semibold ">
                  Features
                </label>
                {deliveryAreaForm.featured.map((feat, idx) => (
                  <div key={idx} className="flex items-center mb-1 space-x-2">
                    <input
                      type="text"
                      className="p-2 border rounded-lg text-[17px] md:text-[22px]"
                      value={feat}
                      readOnly
                    />
                    <button
                      type="button"
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() =>
                        setDeliveryAreaForm((prev) => ({
                          ...prev,
                          featured: prev.featured.filter((_, i) => i !== idx),
                        }))
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="flex items-center mt-2 space-x-2">
                  <input
                    type="text"
                    className="p-2 border rounded-lg flex-grow text-[17px] md:text-[22px]"
                    placeholder="Add a new feature..."
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                  />
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-3 py-2 rounded"
                    onClick={handleAddFeature}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="text-[17px] md:text-[22px] px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                >
                  Add Delivery Area
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    resetForm();
                  }}
                  className="text-[17px] md:text-[22px] px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        // ---------------------------------------------
        // If not showing the add form, show the listing
        // ---------------------------------------------
        <>
          <div className="pt-7 flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Manage Delivery Areas</h2>
            <button
              onClick={handleShowAddForm}
              className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              <FaPlus />
              <span className="hidden md:block">Add New Delivery Area</span>
            </button>
          </div>

          {/* Filtered Delivery Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 md:px-5">
            {filteredAreas.map((area, i) => {
              globalIndex++;
              return (
                <div key={area._id} className="border rounded-lg p-4 shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="text-[20px] md:text-[24px] font-bold text-gray-800">
                        Delivery Area {globalIndex}
                      </h4>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(area)}
                        className="text-teal-600 hover:text-teal-800"
                      >
                        <FaEdit className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleDelete(area._id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <FaRegTrashCan className="text-xl" />
                      </button>
                    </div>
                  </div>

                  {/* If editing this area, show inline edit form */}
                  {isOpenEditArea && editingAreaId === area._id ? (
                    <form
                      onSubmit={handleUpdateDeliveryArea}
                      className="space-y-4"
                    >
                      {/* Country */}
                      <div>
                        <label className="block text-[14px] md:text-[19px]  font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <select
                          name="country"
                          className="p-2 border rounded-lg w-full text-[14px] md:text-[19px]"
                          value={deliveryAreaForm.country}
                          onChange={handleFormChange}
                        >
                          <option value="">Select Country</option>
                          {countries.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* City */}
                      <div>
                        <label className="block text-[14px] md:text-[19px] font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <select
                          name="city"
                          className="p-2 border rounded-lg w-full text-[14px] md:text-[19px]"
                          value={deliveryAreaForm.city}
                          onChange={handleFormChange}
                        >
                          <option value="">Select City</option>
                          {deliveryAreaForm.cityOptions.map((cityName) => (
                            <option key={cityName} value={cityName}>
                              {cityName}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Delivery Type */}
                      <div>
                        <label className="block text-[14px] md:text-[19px] font-medium text-gray-700 mb-1">
                          Delivery Type
                        </label>
                        <input
                          type="text"
                          name="deliveryType"
                          className="w-full p-2 border rounded-md text-[14px] md:text-[19px]"
                          value={deliveryAreaForm.deliveryType}
                          onChange={handleFormChange}
                        />
                      </div>

                      {/* Delivery Fee */}
                      <div>
                        <label className="block text-[14px] md:text-[19px] font-medium text-gray-700 mb-1">
                          Delivery Fee
                        </label>
                        <input
                          type="number"
                          name="deliveryFee"
                          className="w-full p-2 border rounded-md text-[14px] md:text-[19px]"
                          value={deliveryAreaForm.deliveryFee}
                          onChange={handleFormChange}
                        />
                      </div>

                      {/* Delivery Day */}
                      <div>
                        <label className="block text-[14px] md:text-[19px] font-medium text-gray-700 mb-1">
                          Delivery Day
                        </label>
                        <input
                          type="text"
                          name="deliveryDay"
                          className="w-full p-2 border rounded-md text-[14px] md:text-[19px]"
                          value={deliveryAreaForm.deliveryDay}
                          onChange={handleFormChange}
                        />
                      </div>

                      {/* Featured */}
                      <div>
                        <label className="block text-[14px] md:text-[19px] font-medium text-gray-700 mb-1">
                          Featured
                        </label>
                        {deliveryAreaForm.featured.map((feat, featIndex) => (
                          <div
                            key={featIndex}
                            className="flex items-center mb-1 space-x-2"
                          >
                            <input
                              type="text"
                              className="p-2 border rounded-lg text-[14px] md:text-[19px]"
                              value={feat}
                              readOnly
                            />
                            <button
                              type="button"
                              className="bg-red-500 text-white px-2 py-1 rounded"
                              onClick={() => handleRemoveFeature(featIndex)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        {/* Add a new feature */}
                        <div className="flex items-center mt-2 space-x-2">
                          <input
                            type="text"
                            className="p-2 border rounded-lg flex-grow text-[14px] md:text-[19px]"
                            placeholder="Add a new feature..."
                            value={newFeature}
                            onChange={(e) => setNewFeature(e.target.value)}
                          />
                          <button
                            type="button"
                            className="bg-blue-500 text-white px-3 py-2 rounded"
                            onClick={handleAddFeature}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Save / Cancel */}
                      <div className="flex gap-3 pt-2">
                        <button
                          type="submit"
                          className="text-[14px] md:text-[19px] px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                        >
                          Save Changes
                        </button>
                        <div
                          onClick={() => {
                            setIsOpenEditArea(false);
                            setEditingAreaId(null);
                            resetForm();
                          }}
                          className=" text-[14px] md:text-[19px] px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
                        >
                          Cancel
                        </div>
                      </div>
                    </form>
                  ) : (
                    // Otherwise show read-only data
                    <div className="text-gray-600 space-y-1">
                      <p className="text-[17px] md:text-[22px]">
                        <span className="font-medium">Country:</span>{" "}
                        {area.country}
                      </p>
                      <p className="text-[17px] md:text-[22px]">
                        <span className="font-medium">City:</span> {area.city}
                      </p>
                      <p className="text-[17px] md:text-[22px]">
                        <span className="font-medium">Delivery Type:</span>{" "}
                        {area.deliveryType}
                      </p>
                      <p className="text-[17px] md:text-[22px]">
                        <span className="font-medium">Delivery Fee:</span> ${" "}
                        {area.deliveryFee}
                      </p>
                      <p className="text-[17px] md:text-[22px]">
                        <span className="font-medium">Delivery Day:</span>{" "}
                        {area.deliveryDay}
                      </p>
                      <div>
                        <span className="font-medium text-[17px] md:text-[22px]">
                          Featured:
                        </span>
                        <ul className="list-disc list-inside">
                          {area.featured.map((f, idx) => (
                            <li
                              className="text-[17px] md:text-[22px] pl-2 md:pl-5 capitalize"
                              key={idx}
                            >
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-center items-center gap-4 my-14">
          <IoArrowBackCircleOutline
  className={`text-5xl rounded
    ${currentPage <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
  `}
  onClick={() => {
    if (currentPage > 1) {
      handlePrevPage();
    }
  }}
/>


            {/* <span>
              Page <strong>{currentPage}</strong> of{" "}
              <strong>{totalPages}</strong>
            </span> */}

            <IoArrowForwardCircleOutline
              className={`text-5xl rounded 
                ${currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              `}
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AddDeliveryArea;

// import { useContext, useEffect, useState } from "react";
// import { FaEdit, FaPlus } from "react-icons/fa";
// import Swal from "sweetalert2";
// import { FaRegTrashCan } from "react-icons/fa6";
// import { AuthContext } from "../../Context/UserContext";
// import { IoIosCloseCircle } from "react-icons/io";
// import axios from "axios";
// import { useAddDeliveryAreaMutation, useDeleteDeliveryAreaMutation, useUpdateDeliveryAreaMutation } from "../../features/deliveryArea/deliveryAreaApi";

// const AddDeliveryArea = () => {
//   // Grab your userId as before
//   const { userId } = useContext(AuthContext);
//   const [selectedCountry, setSelectedCountry] = useState(""); // Currently selected country
//   const [cityOptions, setCityOptions] = useState([]); // Possible cities for the selected country
//   const [selectedCity, setSelectedCity] = useState(""); // Currently selected city

//   // If you’re retrieving user data from your API, do it similarly:
//   // const { data: getSingleUser, refetch } = useGetSingleUserQuery(userId);
//   // const userInfo = getSingleUser?.data;

//   // The array of existing delivery areas might come from userInfo?.deliveryAreas
//   // For demo purposes, we’ll imagine we have them in userInfo?.deliveryAreas
//   const userInfo = {
//     deliveryAreas: [
//       {
//         country: "US",
//         city: "Florida",
//         deliveryType: "Ali express",
//         deliveryFee: 45,
//         featured: ["Cash on delivery", "Tracking available"],
//         deliveryDay: "2-3 days",
//         _id: "area123", // Example ID if stored in DB
//       },
//     ],
//   };

//   // Local states for controlling UI
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [isOpenEditArea, setIsOpenEditArea] = useState(false);
//   const [editingAreaId, setEditingAreaId] = useState(null);

//   // This form holds the info for creating *or* editing a delivery area
//   const [deliveryAreaForm, setDeliveryAreaForm] = useState({
//     country: "",
//     city: "",
//     // cityOptions is how we track the available cities for the chosen country
//     cityOptions: [],
//     deliveryType: "",
//     deliveryFee: 0,
//     featured: [],
//     deliveryDay: "",
//   });

//   // For adding new "featured" items (like “Cash on delivery”)
//   const [newFeature, setNewFeature] = useState("");

//   // Reset the form fields back to blank or defaults
//   const resetForm = () => {
//     setDeliveryAreaForm({
//       country: "",
//       city: "",
//       cityOptions: [],
//       deliveryType: "",
//       deliveryFee: 0,
//       featured: [],
//       deliveryDay: "",
//     });
//     setNewFeature("");
//   };

//   // ---------------------------------
//   // Fake or real mutations from your API
//   // ---------------------------------
//   const [addDeliveryArea] = useAddDeliveryAreaMutation();
//   const [updateDeliveryArea] = useUpdateDeliveryAreaMutation();
//   const [deleteDeliveryArea] = useDeleteDeliveryAreaMutation();

//   // ---------------------------------
//   // Fetching country list for dropdown
//   // ---------------------------------
//   const [countries, setCountries] = useState([]);
//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get("https://restcountries.com/v3.1/all");
//         const countryList = response.data
//           .map((country) => ({
//             name: country.name.common,
//             code: country.name.common, // or use country.cca2 if you prefer real ISO codes
//           }))
//           .sort((a, b) => a.name.localeCompare(b.name));
//         setCountries(countryList);
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//       }
//     };
//     fetchCountries();
//   }, []);

//   // Re-usable function to fetch city list for a given country
//   const fetchCitiesForCountry = async (countryName) => {
//     try {
//       const response = await axios.post(
//         `https://countriesnow.space/api/v0.1/countries/cities`,
//         { country: countryName }
//       );
//       return response.data.data || [];
//     } catch (error) {
//       console.error("Error fetching cities:", error);
//       return [];
//     }
//   };

//   // ---------------------------------
//   // Handlers for Add, Edit, Delete
//   // ---------------------------------

//   // Show the empty form to add a new delivery area
//   const handleShowAddForm = () => {
//     resetForm();
//     setEditingAreaId(null);
//     setShowAddForm(true);
//   };

//   // Actually add the new delivery area (submit button)
//   const handleAddNew = async (e) => {
//     e.preventDefault();
//     try {
//       // If using RTK Query:
//       const response = await addDeliveryArea(deliveryAreaForm).unwrap();
//       // if (response.success) { ... }
//       // For now we’ll just pretend:
//       console.log("New Delivery Area to add:", deliveryAreaForm);

//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "New delivery area added successfully",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       setShowAddForm(false);
//       resetForm();
//       // refetch();
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Failed to add delivery area",
//       });
//     }
//   };

//   // Edit button: load existing data into the form
//   const handleEdit = (area) => {
//     setEditingAreaId(area._id);
//     setShowAddForm(false); // Hide add form if open
//     setIsOpenEditArea(true);

//     setDeliveryAreaForm({
//       country: area.country,
//       city: area.city,
//       cityOptions: [], // We’ll fetch fresh city list if user chooses a new country
//       deliveryType: area.deliveryType,
//       deliveryFee: area.deliveryFee,
//       featured: area.featured || [],
//       deliveryDay: area.deliveryDay,
//     });
//   };

//   // Save an edit
//   const handleUpdateDeliveryArea = async (e) => {
//     e.preventDefault();
//     try {
//       // if using RTK Query:
//       const response = await updateDeliveryArea({
//         id: editingAreaId,
//         data: deliveryAreaForm,
//       }).unwrap();
//       // if (response.success) { ... }
//       console.log("Updated Delivery Area data:", deliveryAreaForm);

//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Delivery area updated successfully",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       setIsOpenEditArea(false);
//       setEditingAreaId(null);
//       resetForm();
//       // refetch();
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Failed to update delivery area",
//       });
//     }
//   };

//   // Deleting an existing area
//   const handleDelete = async (areaId) => {
//     try {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, delete it!",
//       });

//       if (result.isConfirmed) {
//         // If using RTK Query:
//         const response = await deleteDeliveryArea(areaId).unwrap();
//         // if (response.success) { ... }
//         console.log("Deleting area with ID:", areaId);

//         Swal.fire("Deleted!", "Delivery area has been deleted.", "success");
//         // refetch();
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Failed to delete delivery area",
//       });
//     }
//   };

//   // ---------------------------------
//   // Handlers for form input changes
//   // ---------------------------------
//   const handleFormChange = async (e) => {
//     const { name, value } = e.target;

//     // If user changes the country, fetch the fresh city list
//     if (name === "country") {
//       const cityList = await fetchCitiesForCountry(value);
//       setDeliveryAreaForm((prev) => ({
//         ...prev,
//         country: value,
//         city: "",
//         cityOptions: cityList,
//       }));
//     }
//     // If user changes some other field (like city, type, fee, etc.)
//     else {
//       setDeliveryAreaForm((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   // ---------------------------------
//   // Handlers for "featured" array
//   // ---------------------------------
//   const handleAddFeature = () => {
//     if (!newFeature.trim()) return;
//     setDeliveryAreaForm((prev) => ({
//       ...prev,
//       featured: [...prev.featured, newFeature.trim()],
//     }));
//     setNewFeature("");
//   };

//   const handleRemoveFeature = (index) => {
//     setDeliveryAreaForm((prev) => ({
//       ...prev,
//       featured: prev.featured.filter((_, i) => i !== index),
//     }));
//   };

//   // ---------------------------------
//   // Render
//   // ---------------------------------
//   return (
//     <div className="bg-white md:w-11/12 overflow-y-auto min-h-[300px] max-h-screen mt-16 rounded-lg p-5">
//       {/* Close button for overall modal */}

//       {/* If "showAddForm" is true, display the add form */}
//       {showAddForm ? (
//         <div className="pt-5">
//           <h1 className="text-[19px] xl:text-[24px] text-gray-700 font-bold mb-6 text-center">
//             Add New Delivery Area
//           </h1>
//           <div className="md:mx-10 mb-6 border bg-white shadow-xl rounded-xl">
//             <form
//               onSubmit={handleAddNew}
//               className="space-y-4 bg-white p-2 md:p-6 rounded-lg shadow-sm"
//             >
//               {/* Country */}
//               <div>
//                 <label className="block text-sm mb-1 font-semibold ">
//                   Country
//                 </label>
//                 <select
//                   name="country"
//                   className="p-2 border rounded-lg w-full mb-2 text-[17px] md:text-[22px]"
//                   value={deliveryAreaForm.country}
//                   onChange={handleFormChange}
//                 >
//                   <option value="">Select Country</option>
//                   {countries.map((c) => (
//                     <option key={c.code} value={c.code}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* City */}
//               <div>
//                 <label className="block text-sm mb-1 font-semibold xl:text-[18px]">
//                   City
//                 </label>
//                 <select
//                   name="city"
//                   className="p-2 border rounded-lg w-full mb-2"
//                   value={deliveryAreaForm.city}
//                   onChange={handleFormChange}
//                 >
//                   <option value="">Select City</option>
//                   {deliveryAreaForm.cityOptions.map((cityName) => (
//                     <option key={cityName} value={cityName}>
//                       {cityName}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Delivery Type */}
//               <div>
//                 <label className="block text-sm mb-1 font-semibold xl:text-[18px]">
//                   Delivery Type
//                 </label>
//                 <input
//                   type="text"
//                   name="deliveryType"
//                   placeholder="e.g. Ali Express"
//                   className="p-2 border rounded-lg w-full mb-2"
//                   value={deliveryAreaForm.deliveryType}
//                   onChange={handleFormChange}
//                 />
//               </div>

//               {/* Delivery Fee */}
//               <div>
//                 <label className="block text-sm mb-1 font-semibold xl:text-[18px]">
//                   Delivery Fee
//                 </label>
//                 <input
//                   type="number"
//                   name="deliveryFee"
//                   placeholder="e.g. 45"
//                   className="p-2 border rounded-lg w-full mb-2"
//                   value={deliveryAreaForm.deliveryFee}
//                   onChange={handleFormChange}
//                 />
//               </div>

//               {/* Delivery Day */}
//               <div>
//                 <label className="block text-sm mb-1 font-semibold xl:text-[18px]">
//                   Delivery Day
//                 </label>
//                 <input
//                   type="text"
//                   name="deliveryDay"
//                   placeholder="e.g. 2-3 days"
//                   className="p-2 border rounded-lg w-full mb-2"
//                   value={deliveryAreaForm.deliveryDay}
//                   onChange={handleFormChange}
//                 />
//               </div>

//               {/* Featured Array */}
//               <div>
//                 <label className="block text-sm mb-1 font-semibold xl:text-[18px]">
//                   Featured
//                 </label>
//                 {deliveryAreaForm.featured.map((feat, featIndex) => (
//                   <div
//                     key={featIndex}
//                     className="flex items-center mb-1 space-x-2"
//                   >
//                     <input
//                       type="text"
//                       className="p-2 border rounded-lg"
//                       value={feat}
//                       readOnly
//                     />
//                     <button
//                       type="button"
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                       onClick={() => handleRemoveFeature(featIndex)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}

//                 {/* Input + Add button for new feature */}
//                 <div className="flex items-center mt-2 space-x-2">
//                   <input
//                     type="text"
//                     className="p-2 border rounded-lg flex-grow"
//                     placeholder="Add a new feature..."
//                     value={newFeature}
//                     onChange={(e) => setNewFeature(e.target.value)}
//                   />
//                   <button
//                     type="button"
//                     className="bg-blue-500 text-white px-3 py-2 rounded"
//                     onClick={handleAddFeature}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="flex gap-3 pt-2">
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
//                 >
//                   Add Delivery Area
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowAddForm(false);
//                     resetForm();
//                   }}
//                   className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       ) : (
//         // If not showing the add form, show the listing
//         <>
//           <div className="pt-7 flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold">Manage Delivery Areas</h2>
//             <button
//               onClick={handleShowAddForm}
//               className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
//             >
//               <FaPlus />
//               <span className="hidden md:block">Add New Delivery Area</span>
//             </button>
//           </div>

//           {/* Display existing delivery areas (from userInfo) */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 md:px-5">
//             {userInfo?.deliveryAreas?.map((area, i) => (
//               <div key={area._id} className="border rounded-lg p-4 shadow-lg">
//                 <div className="flex justify-between items-center mb-4">
//                   <div>
//                     <h4 className="font-bold text-gray-700 xl:text-xl">
//                       Delivery Area {i + 1}
//                     </h4>
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => handleEdit(area)}
//                       className="text-teal-600 hover:text-teal-800"
//                     >
//                       <FaEdit className="text-xl" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(area._id)}
//                       className="text-red-500 hover:text-red-600"
//                     >
//                       <FaRegTrashCan className="text-xl" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* If we're editing THIS area, show an edit form */}
//                 {isOpenEditArea && editingAreaId === area._id ? (
//                   <form
//                     onSubmit={handleUpdateDeliveryArea}
//                     className="space-y-4"
//                   >
//                     {/* Country */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Country
//                       </label>
//                       <select
//                         name="country"
//                         className="p-2 border rounded-lg w-full"
//                         value={deliveryAreaForm.country}
//                         onChange={handleFormChange}
//                       >
//                         <option value="">Select Country</option>
//                         {countries.map((c) => (
//                           <option key={c.code} value={c.code}>
//                             {c.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* City */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         City
//                       </label>
//                       <select
//                         name="city"
//                         className="p-2 border rounded-lg w-full"
//                         value={deliveryAreaForm.city}
//                         onChange={handleFormChange}
//                       >
//                         <option value="">Select City</option>
//                         {deliveryAreaForm.cityOptions.map((cityName) => (
//                           <option key={cityName} value={cityName}>
//                             {cityName}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Delivery Type */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Delivery Type
//                       </label>
//                       <input
//                         type="text"
//                         name="deliveryType"
//                         className="w-full p-2 border rounded-md"
//                         value={deliveryAreaForm.deliveryType}
//                         onChange={handleFormChange}
//                       />
//                     </div>

//                     {/* Delivery Fee */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Delivery Fee
//                       </label>
//                       <input
//                         type="number"
//                         name="deliveryFee"
//                         className="w-full p-2 border rounded-md"
//                         value={deliveryAreaForm.deliveryFee}
//                         onChange={handleFormChange}
//                       />
//                     </div>

//                     {/* Delivery Day */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Delivery Day
//                       </label>
//                       <input
//                         type="text"
//                         name="deliveryDay"
//                         className="w-full p-2 border rounded-md"
//                         value={deliveryAreaForm.deliveryDay}
//                         onChange={handleFormChange}
//                       />
//                     </div>

//                     {/* Featured */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">
//                         Featured
//                       </label>
//                       {deliveryAreaForm.featured.map((feat, featIndex) => (
//                         <div
//                           key={featIndex}
//                           className="flex items-center mb-1 space-x-2"
//                         >
//                           <input
//                             type="text"
//                             className="p-2 border rounded-lg"
//                             value={feat}
//                             readOnly
//                           />
//                           <button
//                             type="button"
//                             className="bg-red-500 text-white px-2 py-1 rounded"
//                             onClick={() => handleRemoveFeature(featIndex)}
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       ))}

//                       {/* Add a new feature */}
//                       <div className="flex items-center mt-2 space-x-2">
//                         <input
//                           type="text"
//                           className="p-2 border rounded-lg flex-grow"
//                           placeholder="Add a new feature..."
//                           value={newFeature}
//                           onChange={(e) => setNewFeature(e.target.value)}
//                         />
//                         <button
//                           type="button"
//                           className="bg-blue-500 text-white px-3 py-2 rounded"
//                           onClick={handleAddFeature}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>

//                     {/* Save / Cancel */}
//                     <div className="flex gap-3 pt-2">
//                       <button
//                         type="submit"
//                         className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
//                       >
//                         Save Changes
//                       </button>
//                       <div
//                         onClick={() => {
//                           setIsOpenEditArea(false);
//                           setEditingAreaId(null);
//                           resetForm();
//                         }}
//                         className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors cursor-pointer"
//                       >
//                         Cancel
//                       </div>
//                     </div>
//                   </form>
//                 ) : (
//                   // Otherwise show the existing data
//                   <div className="text-gray-600 space-y-1">
//                     <p>
//                       <span className="font-medium">Country:</span> {area.country}
//                     </p>
//                     <p>
//                       <span className="font-medium">City:</span> {area.city}
//                     </p>
//                     <p>
//                       <span className="font-medium">Delivery Type:</span> {area.deliveryType}
//                     </p>
//                     <p>
//                       <span className="font-medium">Delivery Fee:</span> {area.deliveryFee}
//                     </p>
//                     <p>
//                       <span className="font-medium">Delivery Day:</span> {area.deliveryDay}
//                     </p>
//                     <div>
//                       <span className="font-medium">Featured:</span>
//                       <ul className="list-disc list-inside">
//                         {area.featured.map((f, idx) => (
//                           <li key={idx}>{f}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default AddDeliveryArea;

// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../../Context/UserContext";

// const AddDeliveryArea = () => {
//   const { userId, singleUser } = useContext(AuthContext);
//   const userInfo = singleUser?.data;
//   const [focusedAddress, setFocusedAddress] = useState(null);

//   // 1. Example user form data (including addresses)
//   const [formData, setFormData] = useState({
//     name: {
//       firstName: userInfo?.name?.firstName || "",
//       lastName: userInfo?.name?.lastName || "",
//     },
//     profilePic: userInfo?.profilePic || "https://i.ibb.co.com/z8tdMWp/girl.png",
//     phoneNumber: userInfo?.phoneNumber || "",
//     email: userInfo?.email || "",
//     addresses: userInfo?.addresses || [],
//   });

//   // 2. Delivery area data
//   const [deliveryAreas, setDeliveryAreas] = useState([
//     {
//       country: "US",
//       city: "Florida",
//       cityOptions: [], // Will store array of city names (strings)
//       deliveryType: "Ali express",
//       deliveryFee: 45,
//       featured: ["Cash on delivery", "Tracking available"],
//       deliveryDay: "2-3 days",
//     },
//   ]);

//   // 3. Full list of countries for dropdown
// const [countries, setCountries] = useState([]);

// // --- Fetch all countries from restcountries.com ---
// useEffect(() => {
//   const fetchCountries = async () => {
//     try {
//       const response = await axios.get("https://restcountries.com/v3.1/all");
//       const countryList = response.data
//         .map((country) => ({
//           name: country.name.common,
//           code: country.name.common, // or something else if you prefer
//         }))
//         .sort((a, b) => a.name.localeCompare(b.name));
//       setCountries(countryList);
//     } catch (error) {
//       console.error("Error fetching countries:", error);
//     }
//   };
//   fetchCountries();
// }, []);

// // --- Re-usable function to fetch cities for a given country name ---
// const fetchCitiesForCountry = async (countryName) => {
//   try {
//     const response = await axios.post(
//       `https://countriesnow.space/api/v0.1/countries/cities`,
//       { country: countryName }
//     );
//     return response.data.data || [];
//   } catch (error) {
//     console.error("Error fetching cities:", error);
//     return [];
//   }
// };

//   // -------------------------------------------------------
//   // Existing address handlers (trimmed for brevity) -------
//   // -------------------------------------------------------

//   const handleAddAddress = () => {
//     // ...
//   };

//   const handleDeleteAddress = (index) => {
//     // ...
//   };

//   // -------------------------------------------------------
//   // Delivery Areas Handlers
//   // -------------------------------------------------------

//   // 4. Update fields in each delivery area, including city dropdown
//   const handleDeliveryAreaChange = async (index, field, value) => {
//     // If changing the country, fetch new city options
//     if (field === "country") {
//       const newCities = await fetchCitiesForCountry(value);

//       setDeliveryAreas((prev) =>
//         prev.map((item, i) =>
//           i === index
//             ? {
//                 ...item,
//                 country: value,
//                 city: "",           // Reset city when country changes
//                 cityOptions: newCities, // Populate with new options
//               }
//             : item
//         )
//       );
//     }
//     // If changing city or other fields
//     else {
//       setDeliveryAreas((prev) =>
//         prev.map((item, i) =>
//           i === index
//             ? {
//                 ...item,
//                 [field]: value,
//               }
//             : item
//         )
//       );
//     }
//   };

//   // Add a new blank delivery area
//   const handleAddDeliveryArea = () => {
//     setDeliveryAreas((prev) => [
//       ...prev,
//       {
//         country: "",
//         city: "",
//         cityOptions: [],
//         deliveryType: "",
//         deliveryFee: 0,
//         featured: [],
//         deliveryDay: "",
//       },
//     ]);
//   };

//   // Remove an existing delivery area
//   const handleRemoveDeliveryArea = (index) => {
//     setDeliveryAreas((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Manage the “featured” array
//   const handleAddFeatured = (index, newFeature) => {
//     if (!newFeature) return;
//     setDeliveryAreas((prev) =>
//       prev.map((item, i) =>
//         i === index
//           ? { ...item, featured: [...item.featured, newFeature] }
//           : item
//       )
//     );
//   };

//   const handleRemoveFeatured = (areaIndex, featureIndex) => {
//     setDeliveryAreas((prev) =>
//       prev.map((item, i) => {
//         if (i === areaIndex) {
//           const updatedFeatures = item.featured.filter(
//             (_, fIdx) => fIdx !== featureIndex
//           );
//           return { ...item, featured: updatedFeatures };
//         }
//         return item;
//       })
//     );
//   };

//   // Final submit
//   const handleSubmit = () => {
//     console.log("Updated Profile Data:", formData);
//     console.log("Delivery Areas:", deliveryAreas);
//     // Use your API calls here to update data on the server
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">

//       {/* -------- Delivery Areas Section -------- */}

//       <div className="mt-8">
//         <h2 className="text-lg font-semibold mb-4">Delivery Areas</h2>
//         {deliveryAreas.map((area, index) => (
//           <div key={index} className="border rounded-lg p-4 mb-4 shadow-sm">
//             {/* --- Country dropdown --- */}
// <select
//   className="p-2 border rounded-lg w-full mb-2"
//   value={formData.country}
//   onChange={(e) =>
//     handleDeliveryAreaChange(index, "country", e.target.value)
//   }
// >
//   <option value="">Select Country</option>
//   {countries.map((c) => (
//     <option key={c.code} value={c.code}>
//       {c.name}
//     </option>
//   ))}
// </select>

//             {/* --- City dropdown --- */}
// <select
//   className="p-2 border rounded-lg w-full mb-2"
//   value={area.city}
//   onChange={(e) =>
//     handleDeliveryAreaChange(index, "city", e.target.value)
//   }
// >
//   <option value="">Select City</option>
//   {area.cityOptions.map((cityName) => (
//     <option key={cityName} value={cityName}>
//       {cityName}
//     </option>
//   ))}
// </select>

//             {/* --- Delivery Type --- */}
// <input
//   type="text"
//   placeholder="Delivery Type (e.g. Ali Express)"
//   className="p-2 border rounded-lg w-full mb-2"
//   value={area.deliveryType}
//   onChange={(e) =>
//     handleDeliveryAreaChange(index, "deliveryType", e.target.value)
//   }
// />

//             {/* --- Delivery Fee --- */}
// <input
//   type="number"
//   placeholder="Delivery Fee"
//   className="p-2 border rounded-lg w-full mb-2"
//   value={area.deliveryFee}
//   onChange={(e) =>
//     handleDeliveryAreaChange(index, "deliveryFee", e.target.value)
//   }
// />

//             {/* --- Delivery Day --- */}
//             <input
//               type="text"
//               placeholder="Delivery Day (e.g. 2-3 days)"
//               className="p-2 border rounded-lg w-full mb-2"
//               value={area.deliveryDay}
//               onChange={(e) =>
//                 handleDeliveryAreaChange(index, "deliveryDay", e.target.value)
//               }
//             />

//             {/* --- Featured Items (dynamic list) --- */}
//             <div className="mb-2">
//               <h3 className="font-semibold">Featured</h3>
// {area.featured.map((feat, featIndex) => (
//   <div key={featIndex} className="flex items-center mb-1 space-x-2">
//     <input
//       type="text"
//       className="p-2 border rounded-lg"
//       value={feat}
//       readOnly
//     />
//     <button
//       type="button"
//       className="bg-red-500 text-white px-2 py-1 rounded"
//       onClick={() => handleRemoveFeatured(index, featIndex)}
//     >
//       Remove
//     </button>
//   </div>
// ))}
//               <AddFeaturedItem
//                 onAdd={(newFeature) => handleAddFeatured(index, newFeature)}
//               />
//             </div>

//             {/* --- Remove this Delivery Area --- */}
//             <button
//               className="bg-red-500 text-white px-4 py-2 rounded shadow-md mt-2"
//               onClick={() => handleRemoveDeliveryArea(index)}
//             >
//               Remove Delivery Area
//             </button>
//           </div>
//         ))}
//         <button
//           className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md"
//           onClick={handleAddDeliveryArea}
//         >
//           Add Delivery Area
//         </button>
//       </div>

//       {/* --- Final Submit Button --- */}
//       <button
//         className="mt-4 bg-green-500 text-white px-4 py-2 rounded shadow-md"
//         onClick={handleSubmit}
//       >
//         Update Information
//       </button>
//     </div>
//   );
// };

// // Simple helper component for adding a new featured item
// const AddFeaturedItem = ({ onAdd }) => {
//   const [inputValue, setInputValue] = useState("");

//   const handleAddClick = () => {
//     if (inputValue.trim()) {
//       onAdd(inputValue.trim());
//       setInputValue("");
//     }
//   };

//   return (
//     <div className="flex items-center space-x-2 mt-2">
//       <input
//         type="text"
//         placeholder="Add a new featured item"
//         className="p-2 border rounded-lg"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//       />
//       <button
//         type="button"
//         className="bg-blue-500 text-white px-2 py-1 rounded"
//         onClick={handleAddClick}
//       >
//         +
//       </button>
//     </div>
//   );
// };

// export default AddDeliveryArea;

// const deliveryArea = [

// {
//   country:"US",
//   city:"Florida",
//   deliveryType:"Ali express",
//   deliveryFee: 45,
//   featured:["Cash on delivery", "Tracking availavle"],
//   deliveryDay:"2-3 days"
// }

// ]

// {
//   "_id": {
//     "$oid": "67cdec3d3d22379108381089"
//   },
//   "orderID": "334659",
//   "productID": {
//     "$oid": "67bea2c29005802b06ea94ff"
//   },
//   "productInfo": {
//     "material": "cotton",
//     "size": "XS",
//     "color": "brown"
//   },
//   "deliveryAddress": {
//     "homeAddress": "dsf",
//     "country": "US",
//     "city": "Florida",
//     "street": "sdf"
//   },
//   "orderedBy": {
//     "$oid": "67cdebff3d22379108381030"
//   },
//   "crossMintOrderId": "fghfghf",
//   "trackingLink": "",
//   "status": "approved",
//   "digitalAsset": "notClaimed",
//   "isConfirmRecipt": false,
//   "createdAt": {
//     "$date": "2025-03-09T19:30:05.649Z"
//   },
//   "updatedAt": {
//     "$date": "2025-03-09T19:30:40.983Z"
//   },
//   "__v": 0
// }
