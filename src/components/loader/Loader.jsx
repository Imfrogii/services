import reactDom from "react-dom";
import { Link } from "react-router-dom";
import { routes } from "../../constants/routes";
import { MoneyIcon, OkIcon, SecurityIcon, TimeIcon } from "../../images/images";
import styles from "./loader.module.css";
const domNode = document.getElementById("root");

export default function Loader(params) {
  return reactDom.createPortal(
    <div className={styles.containerFluid}>
      <div className={styles.wrapper}>
        <div className={styles.clock}></div>
        <div className={styles.clock}></div>
      </div>
    </div>,
    domNode
  );
}
