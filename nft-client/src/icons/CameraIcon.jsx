import lightMoodCamera from "../assets/user-profile/dark-cam.png";
import PropTypes from "prop-types";

const CameraIcon = ({ theme }) => {
  return (
    <div
      className={`${
        theme === "light" ? "bg-[#efefef]" : "bg-[#3e4246]"
      } absolute top-12 -right-2 md:top-20 lg:top-20  md:-right-[18px] lg:-right-[3px] xl:-right-[4px] 2xl:right-[0px] 3xl:top-20 3xl:-right-[14px] 5xl:right-[0px]  rounded-full`}
    >
      {theme === "light" ? (
        <svg
          className=" w-4 md:h-4 md:w-4 lg:h-5 lg:w-5 m-1 md:m-2 lg:m-[9px]"
          viewBox="0 0 13 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.255 1.78809H10.1241L9.74719 1.03418C9.52517 0.595783 9.40944 0.280273 8.99329 0.280273H4.46985C4.05369 0.280273 3.91573 0.639887 3.71594 1.03418L3.33899 1.78809H2.20813C1.37544 1.78809 0.700317 2.46321 0.700317 3.2959V9.32715C0.700317 10.1598 1.37544 10.835 2.20813 10.835H11.255C12.0877 10.835 12.7628 10.1598 12.7628 9.32715V3.2959C12.7628 2.46321 12.0877 1.78809 11.255 1.78809ZM6.73157 9.32715C5.06619 9.32715 3.71594 7.9769 3.71594 6.31152C3.71594 4.64614 5.06619 3.2959 6.73157 3.2959C8.39695 3.2959 9.74719 4.64614 9.74719 6.31152C9.74719 7.9769 8.39695 9.32715 6.73157 9.32715ZM6.73157 4.0498C5.48272 4.0498 4.46985 5.06268 4.46985 6.31152C4.46985 7.56037 5.48272 8.57324 6.73157 8.57324C7.98041 8.57324 8.99329 7.56037 8.99329 6.31152C8.99329 5.06268 7.98041 4.0498 6.73157 4.0498Z"
            fill="#838DAA"
          />
        </svg>
      ) : (
        <img
          src={lightMoodCamera}
          className="h-4 lg:h-5 lg:w-5 m-1 lg:m-[9px]"
          loading="lazy"
          alt="camera"
        />
      )}
    </div>
  );
};

export default CameraIcon;
CameraIcon.propTypes = {
  theme: PropTypes.string.isRequired,
};
