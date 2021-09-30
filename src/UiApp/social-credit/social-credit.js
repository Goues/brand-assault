import { ReactComponent as CreditCardIcon } from './credit-card.svg'
import SocialCreditIcon from '../../IdleApp/Icons/SocialCredit'
import css from './social-credit.module.css'
import { useDispatch } from 'react-redux'
import { addCredits } from '../../credits'

export default function SocialCredit({ credits }) {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(addCredits(0.1))
  }

  return (
    <div className={css.socialCreditBox}>
      <div className={css.socialCredit} onClick={handleClick}>
        <CreditCardIcon />
        <div className={css.socialCreditText}>
          <span className={css.socialCreditText}>Social credit:</span>
          {credits}
          <SocialCreditIcon />
        </div>
      </div>
      <div className={css.socialCreditHint}>(Click to gain small amount of credit)</div>
    </div>
  )
}
