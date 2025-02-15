import PropTypes from "prop-types";
import styles from "./ProductDetails.module.css";

const ProductDetails = ({ className = "" }) => {
  return (
    <div className={[styles.productDetails, className].join(" ")}>
      <div className={styles.imgSection}>
        <div className={styles.img}>
          <img
            className={styles.versatileTShirtMockupDesigIcon}
            alt=""
            src="/versatiletshirtmockupdesigngenerativeaifreephotoremovebgpreview-1@2x.png"
          />
        </div>
        <div className={styles.creater}>
          <img
            className={styles.createrChild}
            alt=""
            src="/rectangle-203@2x.png"
          />
          <div className={styles.txt}>
            <div className={styles.creator}>Creator</div>
            <div className={styles.bd479}>2bd479</div>
          </div>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.product}>
          <div className={styles.blackHoodie43}>Black Hoodie #43</div>
          <div className={styles.stRow}>
            <div className={styles.ar}>
              <div className={styles.txt1}>
                {/* <img
                  className={styles.txtChild}
                  alt=""
                  src="/group-1000002738.svg"
                /> */}
                <div className="h-5 w-5 bg-red-500"></div>
                <div className={styles.viewInAr}>View in AR</div>
              </div>
            </div>
            <div className={styles.vr}>
              <div className={styles.txt2}>
                {/* <img
                  className={styles.vrGlassesGogglesHeadsetUseIcon}
                  alt=""
                  src="/vrglassesgogglesheadsetusersvgrepocom.svg"
                /> */}
                  <div className="h-5 w-5 bg-red-500"></div>
                <div className={styles.viewInVr}>View in VR</div>
              </div>
            </div>
            <div className={styles.d}>
              <div className={styles.txt1}>
                <div className={styles.groupParent}>
                  {/* <img
                    className={styles.frameChild}
                    alt=""
                    src="/group-10000027381.svg"
                  />
                  <img
                    className={styles.diceD66627741Icon}
                    alt=""
                    src="/diced6-6627741.svg"
                  /> */}
                    <div className="h-5 w-5 bg-red-500"></div>
                </div>
                <div className={styles.viewInAr}>3D File</div>
              </div>
            </div>
          </div>
          <div className={styles.nd}>
            <div className={styles.book}>
              <div className={styles.txt1}>
                {/* <img
                  className={styles.book1SvgrepoCom1Icon}
                  alt=""
                  src="/book1svgrepocom-1.svg"
                /> */}
                  <div className="h-5 w-5 bg-red-500"></div>
                <div className={styles.technicalDesignBook}>
                  Technical design book
                </div>
              </div>
            </div>
            <div className={styles.dress}>
              <div className={styles.txt1}>
                {/* <img
                  className={styles.dress17588964Icon}
                  alt=""
                  src="/dress-17588964.svg"
                /> */}
                  <div className="h-5 w-5 bg-red-500"></div>
                <div className={styles.viewInAr}>Physical Dress</div>
              </div>
            </div>
          </div>
          <div className={styles.rd}>
            <div className={styles.nft}>
              <div className={styles.txt1}>
                {/* <img
                  className={styles.shoppingCartNft17525566Icon}
                  alt=""
                  src="/shoppingcartnft-17525566.svg"
                /> */}
                  <div className="h-5 w-5 bg-red-500"></div>
                <div className={styles.viewInAr}>NFT</div>
              </div>
            </div>
            <div className={styles.lobby}>
              <div className={styles.txt1}>
                {/* <img
                  className={styles.vrGlassesGogglesHeadsetUseIcon}
                  alt=""
                  src="/loveseat-11659856.svg"
                /> */}
                  <div className="h-5 w-5 bg-red-500"></div>
                <div className={styles.technicalDesignBook}>
                  Virtual lobby access key
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.descrption}>
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
              {/* <img
                className={styles.txtNIconChild}
                alt=""
                src="/group-104.svg"
              /> */}
                <div className="h-5 w-5 bg-red-500"></div>
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
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  className: PropTypes.string,
};

export default ProductDetails;
