import css from "./Button.module.css";

export default function Button({ className = "", isSecondary, ...props }) {
  return <button {...props} className={`${css.button} ${className} ${isSecondary ? css.secondary : ''}`} />;
}
