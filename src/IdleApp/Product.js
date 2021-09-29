import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import { toFixedRound } from "../utils";
import * as clock from "../clock";
import css from "./Product.module.css";
import { PRODUCTS } from "../config";

export default function Product({
  name,
  product,
  nextCost,
  credits,
  onClick,
  income
}) {
  const owned = useSelector(state => state.products[product]);
  const dispatch = useDispatch();
  const isOwned = owned > 0;
  const lastTick = useRef(clock.getStart() || 0);
  useEffect(() => {
    const { RATE: rate, INCOME: income } = PRODUCTS[product].RATE;
    if (!isOwned || !rate) return;

    return clock.addListener(frame => {
      if (lastTick.current + rate <= frame) {
        dispatch((dispatch, getState) => {
          const owned = getState().products[product];
          dispatch({
            type: "ADD_CREDITS",
            payload: owned * income
          });
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
      <Button disabled={nextCost > credits} onClick={onClick}>
        Upgrade for {toFixedRound(nextCost, 1)} SC
      </Button>
    </div>
  );
}
