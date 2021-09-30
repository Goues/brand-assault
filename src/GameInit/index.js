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
import SocialCredit from '../IdleApp/Icons/SocialCredit'
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
function SocialCreditsStep({ next }) {
	return (
		<div>
			<div className={css.heading}>
				<SocialCredit /> You need Social Credits!
			</div>
			<div>You need Social Credits to buy products.</div>
			<div>
				You can gain little amount of Social Credits by clicking on the <SocialCredit />
				on the top of the screen.
			</div>
			<div>Also bought products give you some Social Credits automatically.</div>
			<Button onClick={next}>Next</Button>
		</div>
	)
}
function AgentsStep({ next }) {
	return (
		<div>
			<div className={css.heading}>Hire agents!</div>
			<div>You don't have to fight with enemies only by yourself.</div>
			<div>
				If you buy {PRODUCTS.COMMUNITY.NAME} <Community /> you can hire agents.
			</div>
			<div>Agents will help you to deal with your enemies.</div>
			<div>
				You can hire 1 agent with every upgrade of <Community />.
			</div>
			<div>Hire new agent by click on any field around the wire.</div>
			<Button onClick={next}>Next</Button>
		</div>
	)
}

const STEPS = [FirstStep, SecondStep, ThirdStep, FourthStep, SocialCreditsStep, AgentsStep]

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
	const Step = STEPS[step]
	return (
		<div className={css.wrapper}>
			<div className={css.modal}>
				{Step && <Step next={() => setStep(step + 1)} />}
				{!Step && (
					<LastStep
						next={(playerName) => {
							dispatch(setPlayerName(playerName))
							run()
						}}
					/>
				)}
				{step !== STEPS.length && <Button onClick={() => setStep(STEPS.length)}>Skip</Button>}
			</div>
		</div>
	)
}

export default GameOver
