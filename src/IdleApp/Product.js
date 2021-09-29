import Button from "../Button";
import { toFixedRound } from "../utils";

export default function Product({ name, owned, nextCost, credits, onClick }) {
  return (
    <div>
    <h2>{name}</h2>
    <Button disabled={nextCost > credits} onClick={onClick}>
      Upgrade for {toFixedRound(nextCost, 1)} SC
    </Button>
    <br />
    owned: {owned}
    </div>
  );
}
