import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateCoverPicMutation,
  useUpdateProfilePicMutation,
  useUpdateUserInfoMutation,
} from "../features/auth/authApi";
import { useSelector } from "react-redux";

export const AuthContext = createContext();

const UserContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  //console.log(user);
console.log(useSelector((state) => state.auth.user));
  //************************************************************************************************************** */
  //********************************************     GET   ******************************************************* */
  //************************************************************************************************************** */

  //-------------- get each user info
  const {
    data: singleUser,
    isLoading: isFetchingUser,
    error: userError,
  } = useGetSingleUserQuery(userId, { skip: !userId });

  //-------------- get all user
  const {
    data: getAllUsers,
    isLoading: isFetchingAllUsers,
    error: allUserError,
  } = useGetAllUsersQuery(userId, { skip: !userId });
  

  //************************************************************************************************************** */
  //********************************************     POST   ******************************************************* */
  //************************************************************************************************************** */

  //************************************************************************************************************** */
  //********************************************     PUT   ******************************************************* */
  //************************************************************************************************************** */

  // ---------- update user cover pic
  const [
    updateCoverPic,
    { isUpdateCoverPicLoading, error: responseUpdateCoverPicError },
  ] = useUpdateCoverPicMutation();

  // ---------- update user cover pic
  const [
    updateProfilePic,
    { isUpdateProfilePicLoading, error: responseUpdateProfilePicError },
  ] = useUpdateProfilePicMutation();

  // ---------- update user INFO
  const [
    updateUserInfo,
    { isUpdateUserInfoLoading, error: responseUpdateUserInfoError },
  ] = useUpdateUserInfoMutation();

  //************************************************************************************************************** */
  //********************************************     DELETE   ******************************************************* */
  //************************************************************************************************************** */

  //************************************************************************************************************** */
  //********************************************    FETCH DATA   ************************************************* */
  //************************************************************************************************************** */

  useEffect(() => {
    if (
      isFetchingUser ||
      isFetchingAllUsers ||
      isUpdateCoverPicLoading ||
      isUpdateUserInfoLoading ||
      isUpdateProfilePicLoading
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [
    isFetchingUser,
    isFetchingAllUsers,
    isUpdateCoverPicLoading,
    isUpdateProfilePicLoading,
    isUpdateUserInfoLoading,
  ]);

  //************************************************************************************************************** */
  //********************************************    FETCH ERROR   ************************************************* */
  //************************************************************************************************************** */

  useEffect(() => {
    if (
      userError ||
      allUserError ||
      responseUpdateCoverPicError ||
      responseUpdateProfilePicError ||
      responseUpdateUserInfoError
    ) {
      console.error("Error fetching user data:", {
        userError,
        allUserError,
        responseUpdateCoverPicError,
        responseUpdateProfilePicError,
        responseUpdateUserInfoError,
      });
    }
  }, [
    userError,
    allUserError,
    responseUpdateCoverPicError,
    responseUpdateProfilePicError,
    responseUpdateUserInfoError,
  ]);

  //************************************************************************************************************** */
  //********************************************    EXPORT DATA   ************************************************* */
  //************************************************************************************************************** */



  const shareableData = {
    userId,
    loading,
    user,
    getAllUsers,
    setLoading,
    darkMode,
    setDarkMode,
    singleUser,
    updateCoverPic,
    updateProfilePic,
    updateUserInfo,
  };

  return (
    <AuthContext.Provider value={shareableData}>
      {children}
    </AuthContext.Provider>
  );
};

UserContext.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
