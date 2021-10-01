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

import css from './index.module.css'

function SecondStep() {
	return (
		<div>
			<div className={css.heading}>Welcome to the Brand Defenders</div>
			<p>The main goal of the game is to defend your brand from negative comments</p>
			<p>There are several types of your enemies</p>
			<EnemiesList />
			<p>
				<strong>TIP</strong>
				<br />
				You can deal tiny amount of damage to the enemies by clicking on them
			</p>
		</div>
	)
}

function ThirdStep() {
	return (
		<div>
			<div className={css.heading}>There are also good guys</div>
			<p>Don't kill them!</p>
			<Enemy
				name={'positive comments'}
				description={
					'Gives you credit when it reaches your Brand, so make sure to not have too many "splash damage" that can kill it'
				}
				icon='./comment_positive.png'
			/>
		</div>
	)
}

function FourthStep() {
	return (
		<div>
			<div className={css.heading}>Buy products!</div>
			<p>They give you passive bonuses.</p>
			<div className={css.descriptions}>
				<div className={css.moduleDescription}>
					<div className={css.moduleName}>
						<Community /> {PRODUCTS.COMMUNITY.NAME}
					</div>
					<div>{PRODUCTS.COMMUNITY.DESCRIPTION}</div>
				</div>
				<div className={css.moduleDescription}>
					<div className={css.moduleName}>
						<Publisher /> {PRODUCTS.PUBLISHER.NAME}
					</div>
					<div>{PRODUCTS.PUBLISHER.DESCRIPTION}</div>
				</div>
				<div className={css.moduleDescription}>
					<div className={css.moduleName}>
						<Influencers /> {PRODUCTS.INFLUENCERS.NAME}
					</div>
					<div>{PRODUCTS.INFLUENCERS.DESCRIPTION}</div>
				</div>
				<div className={css.moduleDescription}>
					<div className={css.moduleName}>
						<Audiences /> {PRODUCTS.AUDIENCES.NAME}
					</div>
					<div>{PRODUCTS.AUDIENCES.DESCRIPTION}</div>
				</div>
				<div className={css.moduleDescription}>
					<div className={css.moduleName}>
						<Analytics /> {PRODUCTS.ANALYTICS.NAME}
					</div>
					<div>{PRODUCTS.ANALYTICS.DESCRIPTION}</div>
				</div>
			</div>
		</div>
	)
}

function SocialCreditsStep() {
	return (
		<div>
			<div className={css.heading}>
				<SocialCredit /> You need Social Credits!
			</div>
			<p>You need Social Credits to buy products.</p>
			<p className={css.stepDescription}>
				You can gain little amount of Social Credits by clicking on the <SocialCredit /> icon on the
				top of the screen.
			</p>
			<p>Also bought products give you some Social Credits automatically.</p>
		</div>
	)
}

function AgentsStep() {
	return (
		<div>
			<div className={css.heading}>Hire agents!</div>
			<p>You don't have to fight with enemies only by yourself.</p>
			<p className={css.stepDescription}>
				If you buy {PRODUCTS.COMMUNITY.NAME} <Community /> you can hire agents.
			</p>
			<p>Agents will help you to deal with your enemies.</p>
			<p className={css.stepDescription}>
				You can hire 1 agent with every upgrade of <Community /> module.
			</p>
			<p>Hire new agent by click on any field around the wire.</p>
		</div>
	)
}

function CreateBrandStep({ onCreate }) {
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
			<Button disabled={!playerName} onClick={() => onCreate(playerName)}>
				Let's create your brand!
			</Button>
			<Button
				onClick={() => {
					onCreate(faker.commerce.department())
				}}
			>
				Generate random name!
			</Button>
		</div>
	)
}

const TUTORIAL_STEPS = [SecondStep, ThirdStep, FourthStep, SocialCreditsStep, AgentsStep]

function GameInit() {
	const gameStarted = useSelector((state) => state.controls.started)
	const dispatch = useDispatch()
	const [step, setStep] = useState(null)

	if (gameStarted) return ''
	const Step = TUTORIAL_STEPS[step]
	return (
		<div className={css.wrapper}>
			<div className={css.modal}>
				{Step && <Step />}
				{!Step && (
					<div>
						<CreateBrandStep
							onCreate={(playerName) => {
								dispatch(setPlayerName(playerName))
								run()
							}}
						/>
						<Button onClick={() => setStep(0)}>Show me how to play</Button>
					</div>
				)}
				{Number.isInteger(step) && step < TUTORIAL_STEPS.length && (
					<div className={css.footerButtons}>
						<Button onClick={() => setStep(null)} isSecondary>
							Skip
						</Button>
						<Button onClick={() => setStep((currentStep) => currentStep + 1)}>Next</Button>
					</div>
				)}
			</div>
		</div>
	)
}

export default GameInit
