import {
  useSelector,
  // useDispatch
} from "react-redux";
import { stop } from "../clock";
import { toFixedRound } from "../utils";
import css from "./index.module.css";

import Pause from "./pause/pause";
import SocialCredit from "./social-credit/social-credit";
import DefendTowers from "./defend-towers/defend-towers";
import WavesSurvived from "./waves-survived/waves-survived";
import Enemies from "./enemies/enemies";

export default function UiApp() {
  const credits = useSelector((state) => state.credits);
  const towers = useSelector((state) => state.towers.length);
  const communityLevel = useSelector((state) => state.products.COMMUNITY);
  const wavesSurvived = useSelector((state) => state.waves.survived);
  const isRunning = useSelector((state) => state.controls.running);
  // const dispatch = useDispatch();

  return (
    <div>
      <Pause isRunning={isRunning} onPause={stop} />
      <div className={css.creditsTowers}>
        <SocialCredit credits={toFixedRound(credits, 1)}/>
        <DefendTowers towers={towers} maxTowers={communityLevel}/>
      </div>
      <WavesSurvived survived={wavesSurvived} />
      <Enemies />
      {/* <div>Incoming Comments</div>*/}
    </div>
  );
}
