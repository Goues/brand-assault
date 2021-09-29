import { useSelector, useDispatch } from "react-redux";
import { PRODUCTS_GET_COST } from "../config";
import { toFixedRound } from "../utils";
import Product from "./Product";
import Button from "../Button";
import { addCredits, subtractCredits } from "../credits";
import css from "./index.module.css";
const LIST = [
  "COMMUNITY",
  "PUBLISHER",
  "INFLUENCERS",
  "ANALYTICS",
  "AUDIENCES"
];

// cached store, TODO move
const NEXT_COST = LIST.map((product, index) => PRODUCTS_GET_COST(product, 1));

export default function IdleApp() {
  const credits = useSelector(state => state.credits);
  const owned = useSelector(state => state.products);
  const dispatch = useDispatch();

  return (
    <div className={css.wrapper}>
      Credits: {toFixedRound(credits, 1)}
      <Button onClick={() => dispatch(addCredits(0.1))}>Engage</Button>
      <div className={css.products}>
        {LIST.map((product, index) => (
          <Product
            key={product}
            product={product}
            nextCost={NEXT_COST[index]}
            credits={credits}
            onClick={() => {
              const nextCost = NEXT_COST[index];
              dispatch(subtractCredits(nextCost));
              dispatch({
                type: "BUY_PRODUCT",
                payload: product
              });
              NEXT_COST[index] = PRODUCTS_GET_COST(product, owned[product] + 1);
            }}
          />
        ))}
      </div>
    </div>
  );
}
