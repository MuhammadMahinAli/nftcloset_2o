import PropTypes from "prop-types";
import styles from "./Location2.module.css";

const Location2 = ({ className = "" }) => {
  return (
    <div className={[styles.location1, className].join(" ")}>
      <div className={styles.content}>
        <div className={styles.headingNIcon}>
          <div className={styles.txtNIcon}>
            <div className={styles.cicle} />
            <div className={styles.home}>
              <img className={styles.homeChild} alt="" src="/group-106.svg" />
              <div className={styles.kualaLumper}>Kuala lumper</div>
            </div>
          </div>
          <div className={styles.icons}>
            <img className={styles.page1Icon} alt="" src="/page1@2x.png" />
            <img className={styles.vectorIcon} alt="" src="/vector2.svg" />
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
  );
};

Location2.propTypes = {
  className: PropTypes.string,
};

export default Location2;
