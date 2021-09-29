import css from "./Button.module.css";

export default function Button({ className = "", ...props }) {
  return <button {...props} className={`${css.button} ${className}`} />;
}
