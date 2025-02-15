import PropTypes from "prop-types";
import styles from "./Footer1.module.css";

const Footer1 = ({ className = "" }) => {
  return (
    <div className={[styles.footer, className].join(" ")}>
      <div className={styles.footerContent}>
        <div className={styles.section}>
          <div className={styles.content}>
            <div className={styles.text}>
              <div className={styles.logo}>
                <img
                  className={styles.nftClogetlogo2}
                  alt=""
                  src="/nft-clogetlogo-2@2x.png"
                />
                <div className={styles.nftCloset}>
                  <span>NFT</span>
                  <span className={styles.span}>{` `}</span>
                  <span className={styles.closet}>CLOSET</span>
                </div>
              </div>
              <div className={styles.nftClosetIs}>
                NFT Closet is the go-to marketplace for digital fashion. Mint,
                buy, and sell fashion NFTs with AR, VR, and virtual try-on
                features. Upgrade your e-commerce site to Web3 with our API.
                Partnered with AWS for seamless supply chain management.
              </div>
            </div>
            <div className={styles.links}>
              <div className={styles.aboutUs}>
                <div className={styles.virtualTryOn}>About Us</div>
                <div className={styles.virtualTryOn}>Virtual Try-On</div>
              </div>
              <div className={styles.market}>
                <div className={styles.virtualTryOn}>Market</div>
                <div className={styles.virtualTryOn}>Collections</div>
              </div>
              <div className={styles.contact}>
                <div className={styles.virtualTryOn}>contact us</div>
                <div className={styles.virtualTryOn}>Market X</div>
              </div>
            </div>
          </div>
          <div className={styles.followUs}>
            <div className={styles.followUs1}>Follow Us</div>
            <div className={styles.icons}>
              <div className={styles.eng}>
                <div className={styles.contnt}>
                  <img
                    className={styles.unitedKingdom8363562Icon}
                    alt=""
                    src="/unitedkingdom-8363562@2x.png"
                  />
                  <div className={styles.virtualTryOn}>english</div>
                </div>
              </div>
              <div className={styles.dicord}>
                <img className={styles.vectorIcon} alt="" src="/vector.svg" />
              </div>
              <div className={styles.twitter}>
                <img
                  className={styles.icons8Twitterx1001}
                  alt=""
                  src="/icons8twitterx100-1@2x.png"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.last}>
          <img className={styles.lastChild} alt="" src="/vector-32.svg" />
          <div className={styles.privicy}>
            <div className={styles.logo}>
              <div className={styles.textInner}>
                <div className={styles.ellipseParent}>
                  <div className={styles.groupChild} />
                  <div className={styles.c}>c</div>
                </div>
              </div>
              <div className={styles.nftClosetX}>2023 NFT Closet X</div>
            </div>
            <div className={styles.nftClosetX}>{`privicy & policy`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Footer1.propTypes = {
  className: PropTypes.string,
};

export default Footer1;
