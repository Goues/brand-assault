import { useSelector, useDispatch } from "react-redux";
import { toFixedRound } from "../utils";
import Product from "./Product";
import Button from "../Button";
import { addCredits } from "../credits";
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
  const dispatch = useDispatch();

  return (
    <div className={css.wrapper}>
      Credits: {toFixedRound(credits, 1)}
      <Button onClick={() => dispatch(addCredits(0.1))}>Engage</Button>
      <div className={css.products}>
        {LIST.map((product, index) => (
          <Product key={product} product={product} credits={credits} />
        ))}
      </div>
    </div>
  );
}
