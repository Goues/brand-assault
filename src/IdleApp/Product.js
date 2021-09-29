import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import { toFixedRound } from "../utils";
import * as clock from "../clock";
import css from "./Product.module.css";
import { PRODUCTS, PRODUCTS_GET_COST } from "../config";
import { addCredits, subtractCredits } from "../credits";

export default function Product({ name, product, credits, onClick, income }) {
  const owned = useSelector(state => state.products[product]);
  const dispatch = useDispatch();
  const isOwned = owned > 0;
  const lastTick = useRef(clock.getStart() || 0);
  const nextCost = PRODUCTS_GET_COST(product, owned + 1);

  const onUpgrade = () => {
    dispatch(subtractCredits(nextCost));
    dispatch({
      type: "BUY_PRODUCT",
      payload: product
    });
  };

  useEffect(() => {
    const { RATE: rate, INCOME: income } = PRODUCTS[product];
    if (!isOwned || !rate) return;

    return clock.addListener(frame => {
      if (lastTick.current + rate <= frame) {
        dispatch((dispatch, getState) => {
          const owned = getState().products[product];
          dispatch(addCredits(owned * income));
        });
        lastTick.current = frame;
      }
    });
  }, [product, income, isOwned, dispatch]);

  return (
    <div>
      <div className="flex items-center space-between">
        <h2 className={css.name}>{PRODUCTS[product].NAME}</h2>
        {owned > 0 && <span className={css.level}>Level {owned}</span>}
      </div>
      <Button disabled={nextCost > credits} onClick={onUpgrade}>
        Upgrade for {toFixedRound(nextCost, 1)} SC
      </Button>
    </div>
  );
}
