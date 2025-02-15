import PropTypes from "prop-types";
import styles from "./HeaderTop.module.css";

const HeaderTop = ({ className = "" }) => {
  return (
    <div className={[styles.navBar, className].join(" ")}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img
            className={styles.nftClogetlogo2}
            alt=""
            src="/nft-clogetlogo-23@2x.png"
          />
          <div className={styles.nftCloset}>
            <span>NFT</span>
            <span className={styles.span}>{` `}</span>
            <span className={styles.closet}>CLOSET</span>
          </div>
        </div>
        <div className={styles.navBarTxt}>
          <div className={styles.home}>home</div>
          <div className={styles.btn}>
            <div className={styles.market}>market</div>
          </div>
          <div className={styles.collections}>collections</div>
          <div className={styles.marketX}>market X</div>
        </div>
        <div className={styles.btonAndIcons}>
          <div className={styles.lightSvgrepocom}>
            <img className={styles.vectorIcon} alt="" src="/vector3.svg" />
          </div>
          <div className={styles.buton}>
            <div className={styles.connectWallet}>
              <span className={styles.connect}>{`connect `}</span>
              <span className={styles.wallet}>wallet</span>
            </div>
          </div>
          <div className={styles.btuon}>
            <div className={styles.becomeASeller}>become a seller</div>
          </div>
          <div className={styles.profileCircleSvgrepocom}>
            <img className={styles.vectorIcon1} alt="" src="/vector4.svg" />
            <img className={styles.vectorIcon2} alt="" src="/vector5.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};

HeaderTop.propTypes = {
  className: PropTypes.string,
};

export default HeaderTop;
