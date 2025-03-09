import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/UserContext";

const AddDeliveryArea = () => {
  const { userId, singleUser } = useContext(AuthContext);
  const userInfo = singleUser?.data;
  console.log(userInfo);

  const { name, phoneNumber, email, profilePic, addresses } = userInfo || {};
  const [focusedAddress, setFocusedAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: {
      firstName: name?.firstName || "",
      lastName: name?.lastName || "",
    },
    profilePic: profilePic || "https://i.ibb.co.com/z8tdMWp/girl.png",
    phoneNumber: phoneNumber || "",
    email: email || "",
    addresses:
      addresses ||
      [
      ],
  });



  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryList = response.data
          .map((country) => ({
            name: country.name.common,
            code: country.name.common, // Updated to use country names instead of ISO codes
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(countryList);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);
  console.log(countries?.length);
  const fetchCities = async (countryName) => {
    try {
      const response = await axios.post(
        `https://countriesnow.space/api/v0.1/countries/cities`,
        {
          country: countryName,
        }
      );
      setCities(response.data.data || []);
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  };


  const handleEditAddress = (index) => {
    setFocusedAddress(index);
  };

  const handleInputChange = (e, field, subField) => {
    if (subField) {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subField]: e.target.value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    }
  };

  const handleAddressChange = async (index, field, value) => {
    const updatedAddresses = formData.addresses.map((address, i) => {
      if (field === "isDefault" && value) {
        return { ...address, isDefault: i === index };
      }
      return i === index ? { ...address, [field]: value } : address;
    });
    setFormData((prev) => ({ ...prev, addresses: updatedAddresses }));

    if (field === "country") {
      const cities = await fetchCities(value); //01933749111 Fetch city options for the selected country
      setFormData((prev) => {
        const updatedAddresses = [...prev.addresses];
        updatedAddresses[index].cityOptions = cities; // Save city options in the corresponding address
        return { ...prev, addresses: updatedAddresses };
      });
    }
  };

  const handleAddAddress = () => {
    setFormData((prev) => ({
      ...prev,
      addresses: [
        ...prev.addresses,
        {
          homeAddress: "",
          country: "",
          city: "",
          street: "",
          isDefault: false,
        },
      ],
    }));
  };

 

  const handleDeleteAddress = (index) => {
    const updatedAddresses = formData.addresses.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, addresses: updatedAddresses }));
  };

  const handleSubmit = () => {
    console.log("Updated Profile Data:", formData);
    const id = userId;

  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">


      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Address</h2>
        {formData.addresses.map((address, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4 shadow-sm">
            <input
              type="text"
              placeholder="Home Address"
              value={address.homeAddress}
              onChange={(e) =>
                handleAddressChange(index, "homeAddress", e.target.value)
              }
              className={`p-2 border rounded-lg w-full mb-2 ${
                focusedAddress === index ? "border-blue-500 bg-[#e9f4fd]" : ""
              }`}
            />
           
            <select
              value={address.country}
              onChange={(e) =>
                handleAddressChange(index, "country", e.target.value)
              }
              className={`p-2 border rounded-lg w-full mb-2 ${
                focusedAddress === index ? "border-blue-500 bg-[#e9f4fd]" : ""
              }`}
            >
              <option value="">Country</option>
              {countries.length > 0 ? (
                countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))
              ) : (
                <option disabled>Loading countries...</option>
              )}
            </select>
            <select
              value={address.city}
              onChange={(e) =>
                handleAddressChange(index, "city", e.target.value)
              }
              className={`p-2 border rounded-lg w-full mb-2 ${
                focusedAddress === index ? "border-blue-500 bg-[#e9f4fd]" : ""
              }`}
            >
              <option value="">Select City</option>
              {address?.cityOptions?.length > 0 ? (
                address?.cityOptions?.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))
              ) : (
                <option disabled>Loading cities...</option>
              )}
              {/* {address.cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))} */}
            </select>
            <input
              type="text"
              placeholder="Street"
              value={address.street}
              onChange={(e) =>
                handleAddressChange(index, "street", e.target.value)
              }
              className={`p-2 border rounded-lg w-full mb-2 ${
                focusedAddress === index ? "border-blue-500 bg-[#e9f4fd]" : ""
              }`}
            />
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={address.isDefault}
                  onChange={(e) =>
                    handleAddressChange(index, "isDefault", e.target.checked)
                  }
                  className="h-4 w-4"
                />
                <span>Set As Default</span>
              </label>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded shadow-md"
                onClick={() => handleEditAddress(index)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded shadow-md"
                onClick={() => handleDeleteAddress(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md"
          onClick={handleAddAddress}
        >
          Add Address
        </button>
      </div>
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded shadow-md"
        onClick={handleSubmit}
      >
        Update Information
      </button>
    </div>
  );
};

export default AddDeliveryArea;


