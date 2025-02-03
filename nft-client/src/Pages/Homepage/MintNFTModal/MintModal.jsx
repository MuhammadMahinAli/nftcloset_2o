/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import {useContext, useEffect, useState} from "react";
import {AiOutlineCloseCircle} from "react-icons/ai";
import {mintNft, pinFileToIPFS, uploadMetadata} from "../../utils/uploadFile";
//import {useAuthCheck} from "../../hooks/useAuth";
import {apiFetch} from "../../utils/apiFetch";
import Swal from "sweetalert2";
import {AuthContext} from "../../../Context/UserContext";
//import {imageUpload} from "../../utils/cloudinary";
// import {NFTMarketplaceContext} from "../../../../Context/NFTMarketplaceContext";
const MintModal = ({setOpenMintModal, openMintModal}) => {
  const {localhost, vercelApi} = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [supply, setSupply] = useState(0);
  const [description, setDescription] = useState("");
  const [artist, setArtist] = useState("");
  // const {checkContract, checkWalletConnected, createNFT} = useContext(NFTMarketplaceContext);
  const [loading, setLoading] = useState(false);

  //get artist info
  //const {userEmail} = useAuthCheck();
  // useEffect(() => {
  //   fetch(`${vercelApi}/user/getsingle/${userEmail}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setArtist(data?.data?._id);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching products:", err);
  //     });
  // }, [userEmail]);
  //
  const [wallet, setWallet] = useState("");
  // useEffect(() => {
  //   const connectWallet = async () => {
  //     const wallet = await checkWalletConnected();
  //     setWallet(wallet);
  //   };
  //   connectWallet();
  // }, [userEmail, checkWalletConnected]);
  // view image before after select
  const [imageURL, setImageURL] = useState();
  // close pop up
  const closeModal = () => {
    setOpenMintModal(false);
    resetForm();
  };
  //nft minting
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!title || !price || !description || !imageURL) return;

  //   try {
  //     // const image = await imageUpload(imageURL);
  //     setLoading(true);
  //     const ipfsImage = await pinFileToIPFS(imageURL);
  //     // const metadataCID = await uploadMetadata(title, description, "https://pinata.cloud", ipfsImage);
  //     const nftImageURL = `https://gateway.pinata.cloud/ipfs/${ipfsImage}`;
  //     const mintData = await createNFT(title, description, price, nftImageURL);
  //     //saving data in backend
  //     console.log(mintData);
  //     if (mintData) {
  //       const mintedData = await apiFetch("http://localhost:3000/api/v1/mintNFT", "POST", {title, price, description, image: nftImageURL, artist, supply});
  //       // console.log(mintedData);
  //       if (!mintedData?.success) {
  //         Swal.fire("Oops!", `Something Went wrong`, "error");
  //       }
  //       if (mintedData?.success && mintedData?.data) {
  //         Swal.fire("Congratulations!", `NFT minted successfully!`, "success");
  //       }
  //     }
  //     setLoading(false);
  //     closeModal();
  //   } catch (err) {
  //     console.log("Error uploading file: ", err);
  //   }
  // };
  const resetForm = () => {
    setTitle("");
    setPrice("");
    setDescription("");
    setImageURL("");
  };
  //

  return (
    <div>
      <input type="checkbox" id="mint-popup" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white text-gray-500 w-[700px]">
          <div className="flex justify-between items-center pb-4">
            <h3 className="text-2xl font-bold">Add NFT</h3>
            <label onClick={closeModal} className=" cursor-pointer" htmlFor="mint-popup">
              <AiOutlineCloseCircle className="text-2xl cursor-pointer text-gray-600" />
            </label>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div onChange={imageURL} className="hover:scale-105 duration-300 mb-5">
              {imageURL ? <img className="h-52 w-52 rounded-lg" src={URL.createObjectURL(imageURL)} alt="" /> : <img className="h-52 w-52 rounded-lg" src="https://img.freepik.com/free-vector/gradient-isometric-nft-concept_52683-62009.jpg?w=740&t=st=1698907398~exp=1698907998~hmac=2f7803b3f75a4f1ae864db65c12b701ae024ee2d8fe48f3d38bbe2821a133aa4" alt="" />}{" "}
            </div>

            <form 
           // onSubmit={handleSubmit} 
            className="flex flex-col items-center space-y-4 border-2 border-dashed p-2 rounded-lg hover:shadow-gray-700  w-full">
              <label required htmlFor="mint" className="pr px-4 py-3 [border:none]  bg-gray  shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) backdrop-filter:blur(20px) text-lg font-semibold rounded-lg cursor-pointer">
                Upload an image
              </label>

              <input
                className=" px-3 py-2 rounded-lg shadow-sm border  border-none w-full
                                                            focus:outline-none  bg-white text-gray-900 hidden"
                type="file"
                name="file"
                id="mint"
                onChange={(e) => setImageURL(e.target.files[0])}
                accept="image/*"
                required
              />
              <input
                name="title"
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-16 px-2
                                                        text-lg md:text-xl border border-gray-200 rounded-md outline-none text-gray-900 bg-white"
                required
              />
              <input
                name="price"
                type="number"
                step="any"
                placeholder="Price (ETH)"
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="w-full h-16 px-2
                                                        text-lg md:text-xl border border-gray-200 rounded-md outline-none text-gray-900 bg-white"
                required
              />
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input
                  name="supply"
                  type="number"
                  placeholder="Supply"
                  onChange={(e) => setSupply(parseInt(e.target.value))}
                  className="w-full h-16 px-2
                                                        text-lg md:text-xl border border-gray-200 rounded-md outline-none text-gray-900 bg-white"
                  required
                />
              </div> */}
              <textarea
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full h-20 pt-3 px-2 text-lg md:text-xl border bg-white border-gray-200 rounded-md
                                                         outline-none text-gray-900 "
                required
              ></textarea>

              {/* button */}
              <button type="submit" className="block w-full rounded-lg bg-gray shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)] hover:shadow-[5px_5px_10px_5px_rgba(155,_155,_155,_0.3)_inset] filter:blur(2px) px-5 py-3 text-xl font-medium text-gray-700">
                Mint Now{loading && <span className="loading loading-spinner loading-xs"></span>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintModal;
