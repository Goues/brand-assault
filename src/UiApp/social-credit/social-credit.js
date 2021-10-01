import { ReactComponent as CreditCardIcon } from './credit-card.svg'
import { sound } from '@pixi/sound'
import SocialCreditIcon from '../../IdleApp/Icons/SocialCredit'
import css from './social-credit.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addCredits } from '../../credits'
import { SOUNDS } from '../../config'
import { useCallback, useEffect } from 'react'
import { KEYCODE_BINDINGS } from '../../config'

export default function SocialCredit({ credits }) {
	const dispatch = useDispatch()
	const isRunning = useSelector((state) => state.controls.running)

	const handleClick = useCallback(() => {
		if (!isRunning) return
		sound.play(SOUNDS.COINS)
		dispatch(addCredits(0.1))
	}, [isRunning, dispatch])

	useEffect(() => {
		const listener = (e) => {
			if (e.keyCode === KEYCODE_BINDINGS.SOCIAL_CREDITS) {
				handleClick()
			}
		}
		document.addEventListener('keyup', listener)
		return () => document.removeEventListener('keyup', listener)
	}, [handleClick])

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
