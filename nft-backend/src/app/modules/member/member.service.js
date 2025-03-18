import httpStatus from "http-status";
import { ApiError } from "../../../handleError/apiError.js";
import { Member } from "./member.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendEmail } from "../../../utils/emaillService.js";
import { sendPasswordResetEmail } from "../../../utils/forgetPassword.js";

// create user / signUp user
// export const createMemberService = async (userInfo) => {
//   const result = (await Member.create(userInfo)).toObject();
//   if (!result) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
//   }
//   const {password, ...newUser} = result;
//   return newUser;
// };

export const generateUniqueId = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit number
};

export const createMemberService = async (userInfo) => {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  userInfo.verificationToken = verificationToken;
  userInfo.uniqueId = generateUniqueId();

  //console.log("user", userInfo);
  const result = (await Member.create(userInfo)).toObject();
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create user");
  }
  const { password, ...newUser } = result;
  //console.log("result", result);
  //console.log("userinfo", userInfo);

  // const verificationUrl = `https://researchbdy.com/verified-email/${verificationToken}`;

  // // Send verification email
  // await sendEmail({
  //   to: newUser.email,
  //   subject: "Verify Your Email Address",
  //   html: `
  //    <div style="font-family: Arial, sans-serif;">
  //     <img src=" https://i.ibb.co.com/jkSbtgQc/nft-logo.png" alt="Research Buddy" style="width: 50px; height: auto;"/>
  //     <p style="padding-top: 10px;">Dear ${newUser.name.firstName} ${newUser.name.lastName},</p>
  //     <p>Thank you for signing up with us! We're excited to have you on board. To ensure the security and activation of your account, please verify your email address.</p>
  //     <p>To get started, click the link below:</p>
  //     <p><a className='font-semibold' href="${verificationUrl}">Verify Your Email</a></p>
  //     <p>If you did not sign up for this account, please ignore this email.</p>
  //     <p>Best regards,</p>
  //     <p>The Research Buddy Team</p>
  //     </div>
  //   `,
  // });

  return newUser;
};

//------------ verify email

export const verifyEmailService = async (token) => {
  const user = await Member.findOne({ verificationToken: token });
  if (!user) {
    throw new Error("Invalid or expired verification token");
  }

  user.emailVerified = true;
  user.verificationToken = undefined;
  await user.save();

  const userDetails = {
    firstName: user.name.firstName,
    lastName: user.name.lastName,
    phoneNumber: user.phoneNumber,
    email: user.email,
    uniqueId: user.uniqueId,
  };

  return userDetails;
};

// ----------- resent email
export const resendEmailService = async (email) => {
  const member = await Member.findOne({ email });

  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
  }

  if (member.emailVerified === true) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is already verified");
  }

  const verificationToken = member.verificationToken;

  //member.verificationToken = verificationToken;
  await member.save();

  const verificationLink = `https://researchbdy.com/verified-email/${verificationToken}`;
  await sendEmail({
    to: email,
    subject: "Verify Your Email Address",
    html: `
     <div style="font-family: Arial, sans-serif;">
      <img src=" https://i.ibb.co.com/jkSbtgQc/nft-logo.png" alt="Research Buddy" style="width: 50px; height: auto;"/>
      <p style="padding-top: 10px;">Dear ${member.name.firstName} ${member.name.lastName},</p>
      <p>Thank you for signing up with us! We're excited to have you on board. To ensure the security and activation of your account, please verify your email address.</p>
      <p>To get started, click the link below:</p>
      <p><a className='font-semibold' href="${verificationLink}">Verify Your Email</a></p>
      <p>If you did not sign up for this account, please ignore this email.</p>
      <p>Best regards,</p>
      <p>The Research Buddy Team</p>
      </div>
    `,
  });

  return { message: "Verification email sent" };
};

///--------- get all users

// export const getAllMemberService = async () => {
//   const users = await Member.find({ email: { $ne: "nftclosetx@gmail.com" } }); // Exclude "nftclosetx@gmail.com"
//   return users;
// };
export const getAllMemberService = async (filter, page = 1) => {
  const pageSize = 10; // 10 members per page
  const skip = (page - 1) * pageSize;

  const query = {
    email: { $ne: "nftclosetx@gmail.com" }, // Exclude "nftclosetx@gmail.com"
    ...filter, // Add dynamic filtering based on the request
  };

  const members = await Member.find(query).skip(skip).limit(pageSize);

  const totalMembers = await Member.countDocuments(query);

  return {
    members,
    totalMembers,
    totalPages: Math.ceil(totalMembers / pageSize),
    currentPage: page,
  };
};

export const getSingleMember = async (id) => {
  const user = await Member.findOne({ _id: id });
  return user;
};

//----------Update user
export const updateMemberService = async (id, updateData) => {
  console.log(id, updateData);
  const updatedMember = await Member.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!updatedMember) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  return updatedMember;
};

//------------- update profile pic

export const updateMemberProfilePicService = async (userId, data) => {
  try {
    const member = await Member.findById(userId);
    if (!member) {
      throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
    }
    const updatedMember = await Member.findByIdAndUpdate(
      userId,
      { $set: { profilePic: data.profilePic } },
      { new: true }
    );

    if (!updatedMember) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Failed to update profile pic"
      );
    }

    return updatedMember;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

//-----update address

export const updateMemberAddressService = async (id, addressId, data) => {
  try {
    const member = await Member.findById(id);
    if (!member) {
      throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
    }

    // If setting as default, unset any existing default address
    if (data.isDefault) {
      await Member.updateOne(
        { _id: id },
        { $set: { "addresses.$[].isDefault": false } }
      );
    }

    const updatedMember = await Member.findOneAndUpdate(
      {
        _id: id,
        "addresses._id": addressId,
      },
      {
        $set: {
          "addresses.$": {
            ...data,
            _id: addressId, // Preserve the original address ID
          },
        },
      },
      { new: true }
    );

    if (!updatedMember) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to update address");
    }

    return updatedMember;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};
// Add new address
export const addMemberAddressService = async (id, addressData) => {
  try {
    // If setting as default, unset any existing default
    if (addressData.isDefault) {
      await Member.updateOne(
        { _id: id },
        { $set: { "addresses.$[].isDefault": false } }
      );
    }

    const updatedMember = await Member.findByIdAndUpdate(
      id,
      {
        $push: { addresses: addressData },
      },
      { new: true }
    );

    if (!updatedMember) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to add address");
    }

    return updatedMember;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

// Delete address
export const deleteMemberAddressService = async (id, addressId) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      id,
      {
        $pull: { addresses: { _id: addressId } },
      },
      { new: true }
    );

    if (!updatedMember) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to delete address");
    }

    return updatedMember;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};


//--------------- update cover pic
export const updateMemberCoverPicService = async (userId, data) => {
  try {
    const member = await Member.findById(userId);
    if (!member) {
      throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
    }
    const updatedMember = await Member.findByIdAndUpdate(
      userId,
      { $set: { coverPic: data.coverPic } },
      { new: true }
    );

    if (!updatedMember) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to update cover pic");
    }

    return updatedMember;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

//--------------- update user info

export const updateMemberInfoService = async (userId, data) => {
  console.log(userId, data);
  try {
    const member = await Member.findById(userId);
    if (!member) {
      throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
    }

    const updatedData = {
      name: {
        firstName: data.name.firstName,
        lastName: data.name.lastName,
      },
      profilePic: data.profilePic,
      phoneNumber: data.phoneNumber,
      email: data.email,
      addresses: data.addresses,
    };

    const updatedMember = await Member.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true }
    );

    if (!updatedMember) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Failed to update user information"
      );
    }

    return updatedMember;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

// -------- send reset password email

export const sendForgetPasswordEmailService = async (email) => {
  const user = await Member.findOne({ email });
  if (!user) {
    throw new Error("Member not found");
  }

  console.log("Member not found", email);

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetPasswordExpires = Date.now() + 5 * 60 * 1000; // 5 minutes

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = resetPasswordExpires;
  await user.save();

  const timeRemaining = resetPasswordExpires - Date.now();

  console.log(user?._id, resetToken, timeRemaining);

  // Create the reset URL with token
  const resetUrl = `https://www.nftclosetx.com/reset-password?id=${user._id}&token=${resetToken}&timeRemaining=${timeRemaining}`;

  // Send email using utility function
  await sendPasswordResetEmail(user.email, user, resetUrl);

  return {
    message: "Password reset email sent successfully. Please check your inbox.",
    timeRemaining,
  };
};

//--------------  resetting the password

export const resetPasswordService = async (id, token, newPassword) => {
  const user = await Member.findOne({
    _id: id,
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  console.log("user 377", user);
  if (!user) {
    throw new Error(
      "Invalid or expired reset token. Please generate a new one."
    );
  }
  // Hash the new password before saving
  //user.password = await bcrypt.hash(newPassword, 10);
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  console.log("Hashed password:", hashedPassword);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  console.log("Password updated successfully");
  return { message: "Password has been reset successfully." };
};

// // Modified service function to get members with pagination and uniqueId filter
export const getAllMemberByFilterService = async (page, limit, uniqueId) => {
  const skip = (page - 1) * limit;

  // If uniqueId is provided, search for that specific project/member
  if (uniqueId) {
    const user = await Member.findOne({ uniqueId });
    if (!user) {
      return { message: "No project matched with the provided uniqueId." };
    }
    return { users: [user], totalPages: 1, currentPage: page };
  }

  // If no uniqueId, fetch paginated results
  const users = await Member.find().skip(skip).limit(limit);
  const totalUsers = await Member.countDocuments();

  return {
    users,
    totalPages: Math.ceil(totalUsers / limit),
    currentPage: page,
  };
};


export const sendDigitalAssetsEmailService = async (
  email,
  orderID,
  digitalAssets = {}
) => {
  // 1. Find the member by email
  const member = await Member.findOne({ email });
  if (!member) {
    throw new ApiError(httpStatus.NOT_FOUND, "Member not found");
  }

  console.log("email check",email,orderID ,member);

  // 2. Map your asset keys to human-readable labels
  const assetLabels = {
    arversion: "AR Version",
    vrversion: "VR Version",
    dfile: "3D File",
    technicaldesignbook: "Technical Design Book",
    virtuallobbyaccesskey: "Virtual Lobby Access Key",
    ownershipofstory: "Ownership of Story",
    certification: "Certification",
    sandboxwearable: "Sandbox Wearable",
    vrchatwearable: "VRChat Wearable",
    animated: "Animated",
    recroom: "Rec Room",
  };

  // 3. Filter out empty fields
  //    For instance, if "arversion" is "", skip it.
  //    We'll build an array of "<li>...</li>" strings for the non-empty ones.
  const filteredAssetsList = Object.entries(digitalAssets)
    .filter(([key, value]) => !!value) // keep only fields where value is truthy
    .map(([key, value]) => {
      const label = assetLabels[key] ?? key;
      return `<li><strong>${label}:</strong> ${value}</li>`;
    });

  // If there are no non-empty assets, show a placeholder message
  const digitalAssetsHTML =
    filteredAssetsList.length > 0
      ? `<ul>${filteredAssetsList.join("")}</ul>`
      : "<p>No digital assets available.</p>";

  // 4. Compose and send the email
  await sendEmail({
    to: email,
    subject: "Regarding Digital Assets from NFT Closet X",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
        </head>
        <body style="font-family: Arial, sans-serif;">
          <div>
          <div style="text-align: center;">
            <img 
              src=" https://i.ibb.co.com/jkSbtgQc/nft-logo.png"
              alt="NFT Closet X"
              style="width:200px; height:auto;"
            />
            </div>
            <br />
            <p style="text-transform: capitalize;">Dear ${member.name.firstName} ${member.name.lastName},</p>
            <p>
             You've requested digital assets.
            </p>
            <p>
              Below are your digital assets for Order ID: <strong>${orderID}</strong>
            </p> <br />
            ${digitalAssetsHTML}
            <p>
              If you have any questions, feel free to contact us.
            </p>
            <br />
            <p>
              Best regards,<br />
              NFT Closet X Team
            </p>
          </div>
        </body>
      </html>
    `,
  });

  return { message: "Digital assets email sent" };
};
