import { useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../constants/routes";
import styles from "./input.module.css";

export default function InputWithLabel({
  value,
  onChange,
  id,
  isTextArea,
  labelText,
  setAllError,
  type,
  required,
  placeholder,
}) {
  const [error, setError] = useState(false);
  const handleChange = (val) => {
    if (!val && required) {
      setError("Это обязательное поле");
      setAllError(true);
      onChange(val);
    } else {
      setError(false);
      onChange(val);
    }
  };
  return (
    <div className={styles.inputWithLabel}>
      <label
        htmlFor={id}
        className={`${styles.label} ${error ? styles.erorredLabel : ""} `}
      >
        {labelText}
      </label>
      {isTextArea ? (
        <textarea
          type="text"
          id={id}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className={error ? styles.errored : styles.input}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type ? type : "text"}
          id={id}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className={error ? styles.errored : styles.input}
          placeholder={placeholder}
        />
      )}
      {error ? <span className={styles.error}>{error}</span> : null}
    </div>
  );
}
