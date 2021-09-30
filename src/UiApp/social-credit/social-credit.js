import {ReactComponent as CreditCardIcon} from './credit-card.svg';

import css from "./social-credit.module.css";

export default function SocialCredit({credits}) {
    return <div className={css.socialCredit}>
        <CreditCardIcon />
        <div class={css.socialCreditText}>Social credit: {credits}</div>
    </div>
}
