import styles from "./brand.module.css";

export function Brand() {
  return (
    <span
      className={styles["brand"]}
      aria-label="sovanreach in, home"
      data-ui="brand"
    >
      sovanreach{" "}
      <span className={styles["brand-surname"]}>
        in<span className={styles["brand-dot"]}>.</span>
      </span>
    </span>
  );
}
