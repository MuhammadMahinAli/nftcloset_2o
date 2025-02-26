import React, { useState } from "react";
import { useAddOrderMutation } from "../../../features/order/orderApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProductDescription = () => {
  const [addOrder] = useAddOrderMutation();
  const [formData, setFormData] = useState({
    productID: "67970a1c3d9461faa1500886",
    orderedBy: "6794b209d1044a5a308bb62a",
    productInfo: {},
    crossMintOrderId: "",
    trackingLink: "https://track.me",
    status: "pending",
    digitalAsset: "notClaimed",
  });
  const data = {
    _id: "67970a1c3d9461faa1500886",
    productName: "Black Jacket",
    productDescription:
      "Elevate your style with our Men’s Corduroy Jacket in Black by Gorur Ghash, a striking and fashionable addition to your wardrobe that seamlessly merges classic design with a modern twist. Crafted with meticulous attention to detail and exceptional craftsmanship, this jacket is a true standout piece that will redefine your sense of style.",
    displayImage:
      "https://res.cloudinary.com/dv51da0o9/image/upload/v1737951598/iofkn2cviuxpedwus7uk.png",
    colors: ["#0a0a0a", "#3b3a3a", "#413939"],
    price: 499,
    stock: 100,
    buyingLink: "crossmintlink",
    extraVideos: [
      "https://res.cloudinary.com/dv51da0o9/video/upload/v1737951562/zdbssje4cut4hf8n7l7u.mp4",
    ],
    extraImages: [
      "https://res.cloudinary.com/dv51da0o9/image/upload/v1737951584/yqovmxp3adnehv7hkrq0.jpg",
      "https://res.cloudinary.com/dv51da0o9/image/upload/v1737951591/gtuarmopxj8ysnrs5gey.jpg",
    ],
    digitalAssets: {
      _id: "67970a1c3d9461faa1500887",
    },
    tokenDetails: {
      blockchain: "Blockchain",
      _id: "67970a1c3d9461faa1500888",
    },
    sizeChart:
      "https://res.cloudinary.com/dv51da0o9/image/upload/v1737951709/omuy5ple7i9w7xnohzty.pdf",
    sizeWithMaterial: [
      {
        material: "Corduroy",
        sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
        _id: "67970a1c3d9461faa1500889",
      },
      {
        material: "Ribbed",
        sizes: ["3XL", "2XL", "XL", "L", "M", "S", "XS"],
        _id: "67970a1c3d9461faa150088a",
      },
    ],
    isFeatured: false,
    isBestProduct: false,
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const {
    productName,
    productDescription,
    displayImage,
    colors,
    price,
    buyingLink,
    extraVideos,
    extraImages,
    sizeChart,
    sizeWithMaterial,
    tokenDetails,
  } = data;

  const handleSizeSelection = (metarial, size) => {
    setFormData((prev) => ({
      ...prev,
      productInfo: {
        ...prev.productInfo,
        metarial: metarial,
        size: size,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // Send formData to your backend or further processing here

    try {
      const response = await addOrder(formData).unwrap();
  
        if (response.success) {
          Swal.fire({
            icon: "success",
            title: "Hurry !",
            text: "Your order has been  placed!",
          });
          setTimeout(() => {
            window.location.reload();
          }, 2500);
        }
      
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    // Swal.fire({
    //   icon: "success",
    //   title: "Hurry !",
    //   text: "Your post has been published !",
    // });
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2500);
  };

  return (
    <div>
      <Link
        to="/allOrder" >
          <button
        className="px-3 py-3 bg-green-500 text-white rounded-xl m-6"
      >
        View All Order
        </button>
      </Link>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
        }}
      >
        {/* Left Section */}
        <div style={{ flex: 1 }}>
          <img
            src={displayImage}
            alt={productName}
            style={{ borderRadius: "10px", width: "30%" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            {colors.map((color, index) => (
              <div
                key={index}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: color,
                  border: "1px solid black",
                }}
              ></div>
            ))}
          </div>
          <div>
            <h3>Extra Images</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {extraImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Extra Image ${index + 1}`}
                  style={{ borderRadius: "10px", width: "30%" }}
                />
              ))}
            </div>
          </div>
          <div>
            <h3>Videos</h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {extraVideos.map((video, index) => (
                <video
                  key={index}
                  src={video}
                  controls
                  style={{ borderRadius: "10px", width: "100%" }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
            {productName}
          </h1>
          <p>{productDescription}</p>

          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>${price}</div>
          </div>

          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
          >
            <h2 style={{ fontWeight: "bold" }}>Sizes & Materials</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {sizeWithMaterial.map((item, index) => (
                <div key={index}>
                  <button style={{ fontWeight: "500" }}>{item.material}</button>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      marginTop: "5px",
                    }}
                  >
                    {item.sizes.map((size, idx) => (
                      <span
                        key={idx}
                        style={{
                          display: "inline-block",
                          padding: "5px 10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          backgroundColor: "#f9f9f9",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSizeSelection(item.material, size)}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <a
              href={sizeChart}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#007bff",
                textDecoration: "underline",
                marginTop: "10px",
                display: "block",
              }}
            >
              View Size Chart
            </a>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Cross Mint Order Id
            </label>
            <input
              name="crossMintOrderId"
              value={formData.crossMintOrderId}
              onChange={onInputChange}
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter ID"
            />
          </div>

          <div
            style={{
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
            }}
          >
            <h2 style={{ fontWeight: "bold" }}>Token Details</h2>
            <p>Blockchain: {tokenDetails.blockchain}</p>
          </div>
          {/* <a href={buyingLink} target="_blank" rel="noopener noreferrer"> */}
          <button
            onClick={handleSubmit}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Buy Now
          </button>
          {/* </a> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
