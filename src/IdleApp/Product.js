import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Button'
import { toFixedRound } from '../utils'
import * as clock from '../clock'
import css from './Product.module.css'
import Publisher from './Icons/Publisher'
import Community from './Icons/Community'
import Influencers from './Icons/Influencers'
import Analytics from './Icons/Analytics'
import Audiences from './Icons/Audiences'
import Info from './Icons/Info'
import { PRODUCTS, PRODUCTS_GET_COST } from '../config'
import { addCredits, subtractCredits } from '../credits'
import Tippy from '@tippyjs/react'
import Increase from './Icons/Increase'
import SocialCredit from './Icons/SocialCredit'

const COMPONENTS = {
  COMMUNITY: {
    Icon: <Community className={css.icon} />,
    BonusDescription: ({ product }) => {
      const level = useSelector((state) => state.products[product])
      const bonus = useMemo(() => PRODUCTS[product].GET_BONUS(level), [product, level])

      return (
        <div className={css.bonusCurrent}>
          <span className={css.bonusPrefix}>Current</span>
          <strong>+{bonus}</strong>
          <SocialCredit width="10" />
          <span>per second</span>
        </div>
      )
    },
    NextBonusDescription: ({ product }) => {
      const level = useSelector((state) => state.products[product])
      const bonus = useMemo(() => PRODUCTS[product].GET_BONUS(level + 1), [product, level])

      return (
        <div className={css.dialogBonusIncrease}>
          <Increase />
          <span className={css.dialogBonusValue}>
            +{bonus} <SocialCredit width="10" /> per second
          </span>
        </div>
      )
    },
  },
  PUBLISHER: {
    Icon: <Publisher className={css.icon} />,
    BonusDescription: ({ product }) => {
      const level = useSelector((state) => state.products[product])
      const bonus = useMemo(() => PRODUCTS[product].GET_BONUS(level), [product, level])

      return (
        <div className={css.bonusCurrent}>
          <span className={css.bonusPrefix}>Current</span>
          <strong>+{bonus} %</strong> HP
        </div>
      )
    },
    NextBonusDescription: ({ product }) => {
      const level = useSelector((state) => state.products[product])
      const bonus = useMemo(() => PRODUCTS[product].GET_BONUS(level + 1), [product, level])

      return (
        <div className={css.dialogBonusIncrease}>
          <Increase />
          <span className={css.dialogBonusValue}>+{bonus} % HP</span>
        </div>
      )
    },
  },
  INFLUENCERS: {
    Icon: <Influencers className={css.icon} />,
    BonusDescription: ({ product }) => {
      const level = useSelector((state) => state.products[product])
      const bonus = useMemo(() => PRODUCTS[product].GET_BONUS(level), [product, level])

      return (
        <div className={css.bonusCurrent}>
          <span className={css.bonusPrefix}>Current</span>
          <strong>+{bonus}</strong> <SocialCredit width="10" /> per minute
        </div>
      )
    },
    NextBonusDescription: ({ product }) => {
      const level = useSelector((state) => state.products[product])
      const bonus = useMemo(() => PRODUCTS[product].GET_BONUS(level + 1), [product, level])

      return (
        <div className={css.dialogBonusIncrease}>
          <Increase />
          <span className={css.dialogBonusValue}>
            +{bonus} <SocialCredit width="10" /> per minute
          </span>
        </div>
      )
    },
  },
  ANALYTICS: {
    Icon: <Analytics className={css.icon} />,
    BonusDescription: ({ product }) => {
      const level = useSelector((state) => state.products[product])
      const bonus = useMemo(() => PRODUCTS[product].GET_BONUS(level), [product, level])

      return (
        <div className={css.bonusCurrent}>
          <span className={css.bonusPrefix}>Current</span>
          <strong>+{bonus}</strong> DMG
        </div>
      )
    },
    NextBonusDescription: ({ product }) => {
      const level = useSelector((state) => state.products[product])
      const bonus = useMemo(() => PRODUCTS[product].GET_BONUS(level + 1), [product, level])

      return (
        <div className={css.dialogBonusIncrease}>
          <Increase />
          <span className={css.dialogBonusValue}>+{bonus} DMG</span>
        </div>
      )
    },
  },
  AUDIENCES: {
    Icon: <Audiences className={css.icon} />,
    BonusDescription: ({ product }) => {
      const level = useSelector((state) => state.products[product])
      const bonus = useMemo(() => PRODUCTS[product].GET_BONUS(level), [product, level])

      return (
        <div className={css.bonusCurrent}>
          <span className={css.bonusPrefix}>Current</span>
          <strong>+{bonus} %</strong> Chance
        </div>
      )
    },
    NextBonusDescription: ({ product }) => {
      const level = useSelector((state) => state.products[product])
      const bonus = useMemo(() => PRODUCTS[product].GET_BONUS(level + 1), [product, level])

      return (
        <div className={css.dialogBonusIncrease}>
          <Increase />
          <span className={css.dialogBonusValue}>+{bonus} % Chance</span>
        </div>
      )
    },
  },
}

const Dialog = ({ product }) => {
  return (
    <div className={css.dialog}>
      <div className={css.dialogHeader}>Perks on next level</div>
      <div className={css.dialogBonus}>
        <span className={css.dialogBonusIncrease}></span>
        {COMPONENTS[product].NextBonusDescription({ product })}
        {COMPONENTS[product].BonusDescription({ product })}
      </div>
    </div>
  )
}

export default function Product({ name, product, credits, onClick }) {
  const owned = useSelector((state) => state.products[product])
  const dispatch = useDispatch()
  const isOwned = owned > 0
  const lastTick = useRef()
  const nextCost = PRODUCTS_GET_COST(product, owned + 1)
  const { DESCRIPTION: description } = PRODUCTS[product]

  const onUpgrade = () => {
    dispatch(subtractCredits(nextCost))
    dispatch({
      type: 'BUY_PRODUCT',
      payload: product,
    })
  }

  useEffect(() => {
    const { RATE: rate, INCOME: income } = PRODUCTS[product]
    if (!isOwned || !rate) return

    lastTick.current = clock.getStart()
    return clock.addListener((frame, delta) => {
      if (lastTick.current + rate <= frame) {
        dispatch((dispatch, getState) => {
          const owned = getState().products[product]
          dispatch(addCredits(owned * income))
        })
        lastTick.current = frame
      }
    })
  }, [product, isOwned, dispatch])

  return (
    <div className={css.product}>
      <div className={css.header}>
        {COMPONENTS[product].Icon}
        <div className={css.nameContainer}>
          <h2 className={css.name}>{PRODUCTS[product].NAME}</h2>
          {owned > 0 && <span className={css.level}>Level {owned}</span>}
        </div>
      </div>
      <div className={css.descriptionContainer}>
        <div className={css.descriptionText}>
          {description}
          {COMPONENTS[product].BonusDescription({ product })}
        </div>
      </div>
      <div className={css.actions}>
        <Button disabled={nextCost > credits} onClick={onUpgrade}>
          Upgrade for {toFixedRound(nextCost, 1)} SC
        </Button>
        <Tippy content={<Dialog product={product} />}>
          <Info className={css.descriptionInfo} />
        </Tippy>
      </div>
    </div>
  )
}
