import styles from "./HorizontalScroll.module.css";
import leftArrow from "../../assets/left-arrow.svg";
import { useRef } from "react";

export default function HorizontalScroll({ elementos }) {
  const myRef = useRef();
  function scrollRight() {
    myRef.current.scrollBy(300, 0);
  }

  function scrollLeft() {
    myRef.current.scrollBy(-300, 0);
  }

  return (
    <div className={styles.container}>
      <button className={styles.arrowBtn} onClick={scrollLeft}>
        <img className={styles.leftArrowImg} src={leftArrow} alt="arrow" />
      </button>

      <div className={styles.flexContainer} ref={myRef}>
        {/* here goes scroll items */}
        {elementos}
      </div>
      <button className={styles.arrowBtn} onClick={scrollRight}>
        <img className={styles.rightArrowImg} src={leftArrow} alt="arrow" />
      </button>
    </div>
  );
}
