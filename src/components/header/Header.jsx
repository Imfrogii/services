import { Link, useHistory } from "react-router-dom";
import { routes } from "../../constants/routes";
import styles from "./header.module.css";

export default function Header({ benefitsRef, howWorksRef }) {
  const history = useHistory();
  const executeScroll = (ref) => {
    if (window.location.pathname !== routes.home) {
      history.push(routes.home);
    } else {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
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
            <button
              onClick={() => executeScroll(benefitsRef)}
              to={routes.aboutUs}
            >
              Преимущества
            </button>
          </li>
          <li>
            <button
              onClick={() => executeScroll(howWorksRef)}
              to={routes.aboutUs}
            >
              Как мы работаем?
            </button>
          </li>
          <li>
            <Link to={routes.aboutUs}>Мастера и Условия</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
