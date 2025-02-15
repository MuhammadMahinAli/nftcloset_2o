import Location1 from "./Location1";
import PropTypes from "prop-types";
import styles from "./DeliveyAddres.module.css";

const DeliveyAddres = ({ className = "" }) => {
  return (
    <div className={[styles.deliveyAddres, className].join(" ")}>
      <div className={styles.heading}>
        <div className={styles.deliveryAddress}>delivery address</div>
        <div className={styles.button}>
          <div className={styles.addNewAddress}>Add new address</div>
        </div>
      </div>
      <div className={styles.savedAddreses}>
        <div className={styles.savedAddresses}>saved addresses</div>
        <div className={styles.home}>
          <div className={styles.content}>
            <div className={styles.headingNIcon}>
              <div className={styles.txtNIcon}>
                <div className={styles.cicle}>
                  <div className={styles.cicleChild} />
                </div>
                <div className={styles.home1}>
                  <img className={styles.icon} alt="" src="/icon.svg" />
                  <div className={styles.home2}>home</div>
                </div>
              </div>
              <div className={styles.icons}>
                <img className={styles.page1Icon} alt="" src="/page1@2x.png" />
                <img className={styles.vectorIcon} alt="" src="/vector1.svg" />
              </div>
            </div>
            <div className={styles.streetCt06196thContainer}>
              <p className={styles.streetCt06196th}>
                street :Ct-06-19 6Th Floor Subang Square Jln Ss 15/4G Ss15
              </p>
              <p className={styles.city}>City :   Petaling Jaya</p>
              <p className={styles.city}>area :   Selangor</p>
            </div>
          </div>
        </div>
        <Location1 />
        <Location1 />
      </div>
    </div>
  );
};

DeliveyAddres.propTypes = {
  className: PropTypes.string,
};

export default DeliveyAddres;
