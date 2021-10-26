import { Link } from "react-router-dom";
import { routes } from "../../constants/routes";
import styles from "./header.module.css";

export default function Header(params) {
  return (
    <div className={styles.containerFluid}>
      <div className={styles.container}>
        <Link to={routes.home}>
          <button type="button" className={styles.logo}>
            Ommy
          </button>
        </Link>
        <ul className={styles.navbar}>
          <li>
            <Link to={routes.aboutUs}>Преимущества</Link>
          </li>
          <li>
            <Link to={routes.aboutUs}>Как мы работаем?</Link>
          </li>
          <li>
            <Link to={routes.aboutUs}>Мастера и Условия</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
