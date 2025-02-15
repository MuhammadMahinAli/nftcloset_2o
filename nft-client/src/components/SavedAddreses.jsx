import Home from "./Home";
import PropTypes from "prop-types";
import styles from "./SavedAddreses.module.css";

const SavedAddreses = ({ className = "" }) => {
  return (
    <div className={[styles.savedAddreses, className].join(" ")}>
      <div className={styles.savedAddresses}>saved addresses</div>
      <Home icon="/icon.svg" home="home" />
      <Home
        cicleBackgroundColor="unset"
        cicleBorder="1px solid #272727"
        icon="/group-106.svg"
        iconWidth="12.3px"
        home="Kuala lumper"
      />
      <Home
        cicleBackgroundColor="unset"
        cicleBorder="1px solid #272727"
        icon="/group-106.svg"
        iconWidth="12.3px"
        home="Kuala lumper"
      />
    </div>
  );
};

SavedAddreses.propTypes = {
  className: PropTypes.string,
};

export default SavedAddreses;
