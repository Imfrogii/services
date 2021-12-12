import { useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../constants/routes";
import RequestStore from "../../store/RequestStore";
import styles from "./selectWithSearch.module.css";

export default function SelectWithSearch({ options }) {
  let { workSphere } = RequestStore;
  const [error, setError] = useState(false);
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleCheck = (option) => {
    return () => {
      console.log(option);
      if (workSphere !== option) {
        workSphere = option;
        setValue(workSphere);
      }
    };
  };

  const handleFocus = (isFocus) => {
    return () => {
      setIsOpen(isFocus);
    };
  };

  return (
    <div
      className={styles.select_with_search}
      tabIndex="0"
      onFocus={handleFocus(true)}
      onBlur={handleFocus(false)}
    >
      <input type="text" value={value} onChange={handleChange} />
      {isOpen ? (
        <div className={styles.options}>
          {options
            .filter((option) => option.includes(value))
            .map((option) => (
              <div className={styles.option} key={option} onClick={e => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={workSphere === option}
                  onChange={handleCheck(option)}
                  id={option}
                  
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
