import Contn from "./Contn";
import Footer from "./Footer";
import PropTypes from "prop-types";
import styles from "./Footer2.module.css";

const Footer2 = ({ className = "" }) => {
  return (
    <div className={[styles.footer, className].join(" ")}>
      <div className={styles.content}>
        <Contn />
        <Footer />
      </div>
    </div>
  );
};

Footer2.propTypes = {
  className: PropTypes.string,
};

export default Footer2;
