import { useSelector } from "react-redux";
import Product from "./Product";
import css from "./index.module.css";

const LIST = [
  "COMMUNITY",
  "PUBLISHER",
  "INFLUENCERS",
  "ANALYTICS",
  "AUDIENCES"
];

export default function IdleApp() {
  const credits = useSelector(state => state.credits);

  return (
    <div className={css.wrapper}>
      <h1 className={css.header}>HQ status</h1>
      <div className={css.products}>
        {LIST.map((product, index) => (
          <Product key={product} product={product} credits={credits} />
        ))}
      </div>
    </div>
  );
}
