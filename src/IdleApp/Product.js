import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Button from "../Button";
import { toFixedRound } from "../utils";
import * as clock from "../clock";
import css from "./Product.module.css";

export default function Product({
  name,
  rate,
  owned,
  product,
  nextCost,
  credits,
  onClick,
  income
}) {
  const dispatch = useDispatch();
  const isOwned = owned > 0;
  const lastTick = useRef(clock.getStart() || 0);
  useEffect(() => {
    if (!isOwned || !rate) return;

    return clock.addListener(frame => {
      if (lastTick.current + rate / 10 <= frame) {
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
  }, [rate, product, income, isOwned, dispatch]);

  return (
    <div>
      <div className="flex items-center space-between">
        <h2 className={css.name}>{name}</h2>
        {owned > 0 && <span className={css.level}>Level {owned}</span>}
      </div>
      <Button disabled={nextCost > credits} onClick={onClick}>
        Upgrade for {toFixedRound(nextCost, 1)} SC
      </Button>
    </div>
  );
}
