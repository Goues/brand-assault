import { ReactComponent as CreditCardIcon } from './credit-card.svg'
import SocialCreditIcon from '../../IdleApp/Icons/SocialCredit'
import css from './social-credit.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addCredits } from '../../credits'

export default function SocialCredit({ credits }) {
	const dispatch = useDispatch()
	const isRunning = useSelector((state) => state.controls.running)

	const handleClick = () => {
		if (!isRunning) return
		dispatch(addCredits(0.1))
	}

	return (
		<div className={css.socialCreditBox}>
			<div
				disabled={!isRunning}
				className={`${css.socialCredit} ${!isRunning ? css.socialCreditDisabled : ''}`}
				onClick={handleClick}
			>
				<CreditCardIcon />
				<div className={css.socialCreditText}>
					<span className={css.socialCreditText}>
						Social credit: <SocialCreditIcon /> {credits}
					</span>
				</div>
			</div>
			<div className={css.socialCreditHint}>(Click to gain small amount of credit)</div>
		</div>
	)
}
