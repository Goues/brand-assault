import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Button'
import { run } from '../clock'
import { PRODUCTS } from '../config'
import { setPlayerName } from '../controls'
import Analytics from '../IdleApp/Icons/Analytics'
import Audiences from '../IdleApp/Icons/Audiences'
import Community from '../IdleApp/Icons/Community'
import Influencers from '../IdleApp/Icons/Influencers'
import Publisher from '../IdleApp/Icons/Publisher'
import EnemiesList from './EnemiesListDialog'
import Enemy from './Enemy'
import faker from 'faker'
// import { isGameOver } from "../credits";
import css from './index.module.css'

function FirstStep({ next }) {
	return (
		<div>
			<div className={css.heading}>Welcome to the Brand Defenders</div>
			<div>The main goal of the game is to defend your brand from negative comments</div>
			<Button onClick={next}>Show me how to play</Button>
		</div>
	)
}

function SecondStep({ next }) {
	return (
		<div>
			<div className={css.heading}>There are several types of your enemies</div>
			<EnemiesList />
			<div>
				<strong>TIP</strong>
				<br />
				You can deal tiny amount of damage to the enemies by clicking on them
			</div>
			<Button onClick={next}>Next</Button>
		</div>
	)
}
function ThirdStep({ next }) {
	return (
		<div>
			<div className={css.heading}>There are also good guys</div>
			<div>Don't kill them</div>
			<Enemy
				name={'positive comments'}
				description={
					'Gives you credit when it reaches your Brand, so make sure to not have too many "splash damage" that can kill it'
				}
				icon='./comment_positive.png'
			/>
			<Button onClick={next}>Next</Button>
		</div>
	)
}
function FourthStep({ next }) {
	return (
		<div>
			<div className={css.heading}>Buy products!</div>
			<div>They give you passive bonuses.</div>
			<div>
				<div>
					<div>
						<Community /> {PRODUCTS.COMMUNITY.NAME}
					</div>
					<div>{PRODUCTS.COMMUNITY.DESCRIPTION}</div>
				</div>
				<div>
					<div>
						<Publisher /> {PRODUCTS.PUBLISHER.NAME}
					</div>
					<div>{PRODUCTS.PUBLISHER.DESCRIPTION}</div>
				</div>
				<div>
					<div>
						<Influencers /> {PRODUCTS.INFLUENCERS.NAME}
					</div>
					<div>{PRODUCTS.INFLUENCERS.DESCRIPTION}</div>
				</div>
				<div>
					<div>
						<Audiences /> {PRODUCTS.AUDIENCES.NAME}
					</div>
					<div>{PRODUCTS.AUDIENCES.DESCRIPTION}</div>
				</div>
				<div>
					<div>
						<Analytics /> {PRODUCTS.ANALYTICS.NAME}
					</div>
					<div>{PRODUCTS.ANALYTICS.DESCRIPTION}</div>
				</div>
			</div>
			<Button onClick={next}>Next</Button>
		</div>
	)
}

// function Enemy ({icon, name}) {
//   return <img className={css.enemyIcon} src={icon} alt={name}/>
// }

function LastStep({ next }) {
	const [playerName, setPlayerName] = useState('')
	const changePlayerName = useCallback(
		(event) => {
			setPlayerName(event.target.value.slice(0, 15))
		},
		[setPlayerName]
	)

	return (
		<div>
			<input
				placeholder='Create a name for your brand'
				type='text'
				className={css.heading}
				value={playerName}
				onChange={changePlayerName}
			/>
			<Button disabled={!playerName} onClick={() => next(playerName)}>
				Let's create your brand!
			</Button>
			<Button
				onClick={() => {
					next(faker.commerce.department())
				}}
			>
				Generate random name!
			</Button>
		</div>
	)
}

function GameOver() {
	const gameStarted = useSelector((state) => state.controls.started)
	const dispatch = useDispatch()
	const [step, setStep] = useState(0)

	if (gameStarted) return ''

	return (
		<div className={css.wrapper}>
			<div className={css.modal}>
				{step === 0 && <FirstStep next={() => setStep(1)} />}
				{step === 1 && <SecondStep next={() => setStep(2)} />}
				{step === 2 && <ThirdStep next={() => setStep(3)} />}
				{step === 3 && <FourthStep next={() => setStep(4)} />}
				{step === 4 && (
					<LastStep
						next={(playerName) => {
							dispatch(setPlayerName(playerName))
							run()
						}}
					/>
				)}
				{step !== 4 && <Button onClick={() => setStep(4)}>Skip</Button>}
			</div>
		</div>
	)
}

export default GameOver
