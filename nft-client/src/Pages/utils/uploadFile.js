import axios from "axios";
import FormData from "form-data";
import {apiFetch} from "./apiFetch";
// import {apiFetch} from "./apiFetch";
// import fetch from "node-fetch";
export const pinFileToIPFS = async (file) => {
  let data = new FormData();
  data.append("file", file);

  try {
    const result = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
      maxContentLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
        pinata_secret_api_key: import.meta.env.VITE_PINATA_API_SECRET_KEY,
      },
    });

    return result?.data?.IpfsHash;
  } catch (error) {
    console.log(error);
  }
};

export const uploadMetadata = async (name, description, external_url, CID) => {
  try {
    const data = JSON.stringify({
      pinataContent: {
        name: `${name}`,
        description: `${description}`,
        external_url: `${external_url}`,
        image: `ipfs://${CID}`,
      },
      pinataMetadata: {
        name: "Pinnie NFT Metadata",
      },
    });

    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_JWT}`,
      },
      body: data,
    });
    const resData = await res.json();
    console.log("Metadata uploaded, CID:", resData.IpfsHash);
    return resData?.IpfsHash;
  } catch (error) {
    console.log(error);
  }
};
export const mintNft = async (CID, wallet, supply) => {
  try {
    const res = await apiFetch("http://localhost:3000/api/v1/mintNFT/crossmint", "POST", {CID, wallet, supply});
    console.log(res?.data);
    const contractAddress = res?.data?.onChain.contractAddress;
    console.log("NFT Minted, smart contract:", contractAddress);
    console.log(`View NFT at https://testnets.opensea.io/assets/mumbai/${contractAddress}`);
    return contractAddress;
  } catch (error) {
    console.log(error);
  }
};
