import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import { toFixedRound } from "../utils";
import * as clock from "../clock";
import css from "./Product.module.css";
import Publisher from "./Icons/Publisher"
import Community from "./Icons/Community"
import Influencers from "./Icons/Influencers";
import Analytics from "./Icons/Analytics";
import Audiences from "./Icons/Audiences";
import { PRODUCTS, PRODUCTS_GET_COST } from "../config";
import { addCredits, subtractCredits } from "../credits";

const ICONS = {
  COMMUNITY: <Community className={css.icon} />,
  PUBLISHER: <Publisher className={css.icon} />,
  INFLUENCERS: <Influencers className={css.icon} />,
  ANALYTICS: <Analytics className={css.icon} />,
  AUDIENCES: <Audiences className={css.icon} />,
}

export default function Product({ name, product, credits, onClick }) {
  const owned = useSelector(state => state.products[product]);
  const dispatch = useDispatch();
  const isOwned = owned > 0;
  const lastTick = useRef();
  const nextCost = PRODUCTS_GET_COST(product, owned + 1);
  const { DESCRIPTION: description } = PRODUCTS[product];

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

    lastTick.current = clock.getStart();
    return clock.addListener((frame, delta) => {
      if (lastTick.current + rate <= frame) {
        dispatch((dispatch, getState) => {
          const owned = getState().products[product];
          dispatch(addCredits(owned * income));
        });
        lastTick.current = frame;
      }
    });
  }, [product, isOwned, dispatch]);

  return (
    <div className={css.product}>
      <div className={css.header}>
        {ICONS[product]}
        <div className={css.nameContainer}>
          <h2 className={css.name}>{PRODUCTS[product].NAME}</h2>
          {owned > 0 && <span className={css.level}>Level {owned}</span>}
        </div>
      </div>
      <p className={css.description}>{description}</p>
      <Button disabled={nextCost > credits} onClick={onUpgrade}>
        Upgrade for {toFixedRound(nextCost, 1)} SC
      </Button>
    </div>
  );
}
