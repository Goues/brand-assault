import {
  useSelector,
  // useDispatch
} from "react-redux";
import { run, stop } from "../clock";
import { toFixedRound } from "../utils";
// import css from "./index.module.css";

import PauseContinue from "./pause-continue/pause-continue";
import SocialCredit from "./social-credit/social-credit";
import DefendTowers from "./defend-towers/defend-towers";
import WavesSurvived from "./waves-survived/waves-survived";

export default function UiApp() {
  const credits = useSelector((state) => state.credits);
  const towers = useSelector((state) => state.towers.length);
  const communityLevel = useSelector((state) => state.products.COMMUNITY);
  const wavesSurvived = useSelector((state) => state.waves.survived);
  const isRunning = useSelector((state) => state.controls.running);
  // const dispatch = useDispatch();

  return (
    <div>
      <PauseContinue isRunning={isRunning} onPause={stop} onContinue={run}/>
      <SocialCredit credits={toFixedRound(credits, 1)}/>
      <DefendTowers towers={towers} maxTowers={communityLevel}/>
      <WavesSurvived survived={wavesSurvived} />
      <div>Incoming Comments</div>
      <div>Legend</div>
    </div>
  );
}
