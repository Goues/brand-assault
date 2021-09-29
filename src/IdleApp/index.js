import {useState} from 'react'
import { PRODUCTS_GET_COST } from '../config'

const LIST = ['COMMUNITY', 'PUBLISHER', 'INFLUENCERS', 'ANALYTICS', 'AUDIENCES']

const toFixedRound = (n, d) => n.toFixed(d).replace(/.?0+$/, '')

// cached store, TODO move
const OWNED = [0, 0, 0, 0, 0]
const NEXT_COST = LIST.map((product, index) => PRODUCTS_GET_COST(product, OWNED[index] + 1))

export default function IdleApp() {
  // TODO have shared state
  const [credits, setCredits] = useState(0)
  
  return <div style={{ display: 'flex', flexDirection: 'column' }}>
    Credits: {toFixedRound(credits, 1)}
    <button onClick={() => setCredits(c => c + 0.1)}>
      Engage
    </button>
    {LIST.map((product, index) => (
      <button key={product} disabled={NEXT_COST[index] > credits} onClick={() => {
        const nextCost = NEXT_COST[index]
        setCredits(c => c - nextCost)
        OWNED[index] += 1
        NEXT_COST[index] = PRODUCTS_GET_COST(product, OWNED[index] + 1)
      }}>
        {product}
        <br />
        owned: {OWNED[index]}
        <br />
        cost: {toFixedRound(NEXT_COST[index], 1)}
      </button>
    ))}
  </div>
}
