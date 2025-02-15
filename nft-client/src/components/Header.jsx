import PropTypes from "prop-types";
import styles from "./Header.module.css";

const Header = ({ className = "" }) => {
  return (
    <div className={[styles.navBar, className].join(" ")}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img
            className={styles.nftClogetlogo2}
            alt=""
            src="/nft-clogetlogo-21@2x.png"
          />
          <div className={styles.nftCloset}>
            <span>NFT</span>
            <span className={styles.span}>{` `}</span>
            <span className={styles.closet}>CLOSET</span>
          </div>
        </div>
        <div className={styles.icons}>
          <img
            className={styles.searchSvgrepocomIcon}
            alt=""
            src="/search-svgrepocom.svg"
          />
          <img
            className={styles.hamburgerMenuSvgrepocomIcon}
            alt=""
            src="/hamburgermenu-svgrepocom1.svg"
          />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
