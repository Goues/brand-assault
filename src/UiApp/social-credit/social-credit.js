import SocialCreditIcon from '../../IdleApp/Icons/SocialCredit'
import css from './social-credit.module.css'

export default function SocialCredit({ credits }) {
  return (
    <div className={css.socialCredit}>
      <SocialCreditIcon />
      <div className={css.socialCreditText}>Social credit: {credits}</div>
    </div>
  )
}
