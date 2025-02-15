import PropTypes from "prop-types";
import styles from "./Descrption.module.css";

const Descrption = ({ className = "" }) => {
  return (
    <div className={[styles.descrption, className].join(" ")}>
      <div className={styles.color}>
        <div className={styles.color1}>color</div>
        <div className={styles.tab}>
          <div className={styles.red}>red</div>
        </div>
      </div>
      <div className={styles.materil}>
        <div className={styles.material}>Material</div>
        <div className={styles.selection}>
          <div className={styles.tab1}>
            <div className={styles.red}>Cotton</div>
          </div>
          <div className={styles.tab2}>
            <div className={styles.red}>Cotton-Polyester Blend</div>
          </div>
        </div>
      </div>
      <div className={styles.sizeCart}>
        <div className={styles.txtNIcon}>
          <div className={styles.red}>size - size chart</div>
          <img className={styles.txtNIconChild} alt="" src="/group-104.svg" />
        </div>
        <div className={styles.sizes}>
          <div className={styles.selected}>
            <div className={styles.red}>x-small</div>
          </div>
          <div className={styles.siz}>
            <div className={styles.s}>
              <div className={styles.small}>small</div>
              <img className={styles.sChild} alt="" src="/vector-80.svg" />
            </div>
            <div className={styles.m}>
              <div className={styles.medium}>Medium</div>
              <img className={styles.sChild} alt="" src="/vector-801.svg" />
            </div>
            <div className={styles.l}>
              <div className={styles.large}>large</div>
              <img className={styles.sChild} alt="" src="/vector-802.svg" />
            </div>
            <div className={styles.m}>
              <div className={styles.xLarge}>X-large</div>
              <img className={styles.sChild} alt="" src="/vector-801.svg" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.stock}>
        <div className={styles.circle}>
          <div className={styles.circleChild} />
        </div>
        <div className={styles.red}>{`in stock `}</div>
      </div>
    </div>
  );
};

Descrption.propTypes = {
  className: PropTypes.string,
};

export default Descrption;
