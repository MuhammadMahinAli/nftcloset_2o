import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./Home.module.css";

const Home = ({
  className = "",
  cicleBackgroundColor,
  cicleBorder,
  icon,
  iconWidth,
  home,
}) => {
  const cicleStyle = useMemo(() => {
    return {
      backgroundColor: cicleBackgroundColor,
      border: cicleBorder,
    };
  }, [cicleBackgroundColor, cicleBorder]);

  const iconStyle = useMemo(() => {
    return {
      width: iconWidth,
    };
  }, [iconWidth]);

  return (
    <div className={[styles.home, className].join(" ")}>
      <div className={styles.content}>
        <div className={styles.headingNIcon}>
          <div className={styles.icons}>
            <img className={styles.page1Icon} alt="" src="/page11@2x.png" />
            <img className={styles.vectorIcon} alt="" src="/vector11.svg" />
          </div>
          <div className={styles.txtNIcon}>
            <div className={styles.cicle} style={cicleStyle}>
              <div className={styles.cicleChild} />
            </div>
            <div className={styles.home1}>
              <img
                className={styles.icon}
                alt=""
                src={icon}
                style={iconStyle}
              />
              <div className={styles.home2}>{home}</div>
            </div>
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

Home.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  home: PropTypes.string,

  /** Style props */
  cicleBackgroundColor: PropTypes.string,
  cicleBorder: PropTypes.string,
  iconWidth: PropTypes.string,
};

export default Home;
