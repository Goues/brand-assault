import Button from "../Button";
import { toFixedRound } from "../utils";
import css from './Product.module.css'

export default function Product({ name, owned, nextCost, credits, onClick }) {
  return (
    <div>
    <div className="flex items-center space-between">
      <h2 className={css.name}>{name}</h2>
      {owned > 0 && <span className={css.level}>Level {owned}</span>}
    </div>
    <Button disabled={nextCost > credits} onClick={onClick}>
      Upgrade for {toFixedRound(nextCost, 1)} SC
    </Button>
    </div>
  );
}
