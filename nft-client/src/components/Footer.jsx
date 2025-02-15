import PropTypes from "prop-types";
import styles from "./Footer.module.css";

const Footer = ({ className = "" }) => {
  return (
    <div className={[styles.last, className].join(" ")}>
      <img className={styles.lastChild} alt="" src="/vector-101.svg" />
      <div className={styles.privicy}>
        <div className={styles.text}>
          <div className={styles.textInner}>
            <div className={styles.ellipseParent}>
              <div className={styles.groupChild} />
              <div className={styles.c}>c</div>
            </div>
          </div>
          <div className={styles.nftClosetX}>2023 NFT Closet X</div>
        </div>
        <div className={styles.privicyPolicy}>{`privicy & policy`}</div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
