import { useState } from "react";
import { PRODUCTS, PRODUCTS_GET_COST } from "../config";
import { toFixedRound } from "../utils";
import Product from "./Product";
import Button from "../Button";
import css from "./index.module.css";

const LIST = [
  "COMMUNITY",
  "PUBLISHER",
  "INFLUENCERS",
  "ANALYTICS",
  "AUDIENCES"
];

// cached store, TODO move
const OWNED = [0, 0, 0, 0, 0];
const NEXT_COST = LIST.map((product, index) =>
  PRODUCTS_GET_COST(product, OWNED[index] + 1)
);

export default function IdleApp() {
  // TODO have shared state
  const [credits, setCredits] = useState(0);

  return (
    <div className={css.wrapper}>
      Credits: {toFixedRound(credits, 1)}
      <Button onClick={() => setCredits(c => c + 0.1)}>Engage</Button>
      {LIST.map((product, index) => (
        <Product
          key={product}
          name={PRODUCTS[product].NAME}
          nextCost={NEXT_COST[index]}
          owned={OWNED[index]}
          credits={credits}
          onClick={() => {
            const nextCost = NEXT_COST[index];
            setCredits(c => c - nextCost);
            OWNED[index] += 1;
            NEXT_COST[index] = PRODUCTS_GET_COST(product, OWNED[index] + 1);
          }}
        />
      ))}
    </div>
  );
}
