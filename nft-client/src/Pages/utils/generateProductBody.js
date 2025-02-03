import {apiFetch} from "./apiFetch";

export const generateProductBody = async ({selectNFT, formData, sku, isChecked, isRadioChecked, artistData, userId, artistDocument, items, arImage, width, height, vrImage, offPrintImage, productImage, collectionId, images}) => {
  const collection = await apiFetch(`http://localhost:3000/api/v1/collection/getsingle/${collectionId}`, "GET");
  const versionArray = await Promise.all(
    items.map(async (item) => {
      const version = await apiFetch(`http://localhost:3000/api/v1/version/getsingle/${item}`, "GET");

      let commonProperties = {
        name: item,
        versionID: version?.data?._id,
        price: selectNFT?.price,
      };

      if (item === "NFT") {
        return {
          ...commonProperties,
          stock: formData?.stock,
          image: selectNFT?.image,
        };
      } else if (item === "AR") {
        return {
          ...commonProperties,
          image: arImage,
        };
      } else if (item === "3D") {
        return {
          ...commonProperties,
          image: vrImage,
        };
      } else {
        return {
          ...commonProperties,
          width: width,
          dimension: `${width}X${height}`,
          image: offPrintImage,
        };
      }
    })
  );

  const data = {
    payload: {
      title: selectNFT?.title,
      description: selectNFT?.description,
      availability: formData?.availability,
      price: selectNFT?.price,
      recyclePrice: formData?.recyclePrice,
      reprintPrice: formData?.reprintPrice,
      collections: [
        {
          name: collection?.data?.title,
          collectionID: collectionId,
        },
      ],
      sku: sku,
      image: productImage,
      images,
      market_X: isChecked,
      certificateReq: isRadioChecked ? "pending" : "Not requested",
      addedBy: userId,
    },
    nft: selectNFT?._id,
    artist: {
      email: artistData?.artistEmail,
      name: artistData?.artistName,
      address: artistData?.artistAddress,
      createDateOfArt: artistData?.createDateOfArt,
      phoneNumber: artistData?.artistPhone,
      document: artistDocument,
    },
    versions: versionArray,
  };
  return data;
};
