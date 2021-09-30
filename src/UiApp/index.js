import {
  useSelector,
  // useDispatch
} from "react-redux";
import { toFixedRound } from "../utils";
// import css from "./index.module.css";

export default function UiApp() {
  const credits = useSelector((state) => state.credits);
  const towers = useSelector((state) => state.towers.length);
  const communityLevel = useSelector((state) => state.products.COMMUNITY);
  const wavesSurvived = useSelector((state) => state.waves.survived);
  // const dispatch = useDispatch();

  return (
    <div>
      <div>Controls</div>
      <div>Social Credit: {toFixedRound(credits, 1)}</div>
      <div>Defend Towers: {towers}/{communityLevel}</div>
      <div>Waves Survived: {wavesSurvived}</div>
      <div>Incoming Comments</div>
      <div>Legend</div>
    </div>
  );
}
