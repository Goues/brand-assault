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
			<div className={css.heading}>How to defend your precious brand?</div>
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

function CreateBrandStep({ onCreate, onTutorial }) {
	const [playerName, setPlayerName] = useState('')
	const [hasError, setHasError] = useState(false)
	const changePlayerName = useCallback(
		(name) => {
			setPlayerName(name)
			setHasError(name === '')
		},
		[setPlayerName]
	)

	const handleSkipAndPlay = () => {
		// If input is empty and error is not set change the color (input not used before)
		if (!playerName) {
			setHasError(true)
		} else {
			onCreate(playerName)
		}
	}

	return (
		<div>
			<img src='logo.png' className={css.logo} />
			<div className={css.heading}>Welcome to the Brand Defenders!</div>
			<input
				placeholder='Create a name for your brand'
				type='text'
				className={`${css.brandNameInput} ${hasError ? css.inputError : ''}`}
				value={playerName}
				onChange={(event) => changePlayerName(event.target.value)}
				maxLength='32'
			/>
			<div className={css.inputCounter}>{playerName.length}/32</div>
			<Button
				onClick={() => {
					changePlayerName(`${faker.commerce.productAdjective()} ${faker.commerce.department()}`)
				}}
				isSecondary
				className={css.generateButton}
			>
				Generate random name
			</Button>
			<div className={css.startButtons}>
				<Button onClick={onTutorial}>Show me how to play</Button>
				<button className={css.buttonLink} onClick={handleSkipAndPlay}>
					Skip tutorial and play
				</button>
			</div>
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
							onTutorial={() => setStep(0)}
						/>
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
