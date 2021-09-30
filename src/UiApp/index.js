import {
  useSelector,
  // useDispatch
} from "react-redux";
import { run, stop } from "../clock";
import { toFixedRound } from "../utils";
// import css from "./index.module.css";

import SocialCredit from "./social-credit/social-credit";
import DefendTowers from "./defend-towers/defend-towers";

export default function UiApp() {
  const credits = useSelector((state) => state.credits);
  const towers = useSelector((state) => state.towers.length);
  const communityLevel = useSelector((state) => state.products.COMMUNITY);
  const wavesSurvived = useSelector((state) => state.waves.survived);
  const isRunning = useSelector((state) => state.controls.running);
  // const dispatch = useDispatch();

  return (
    <div>
      <button disabled={!isRunning} onClick={stop}>Pause</button>
      <button disabled={isRunning} onClick={run}>Run</button>
      <SocialCredit credits={toFixedRound(credits, 1)}/>
      <DefendTowers towers={towers} maxTowers={communityLevel}/>
      <div>Waves Survived: {wavesSurvived}</div>
      <div>Incoming Comments</div>
      <div>Legend</div>
    </div>
  );
}
