import {useState} from 'react'
import { PRODUCTS_GET_COST } from '../config'


export default function IdleApp() {
  // TODO have shared state
  const [credits, setCredits] = useState(0n)
  return <div style={{ display: 'flex', flexDirection: 'column' }}>
  Credits: {credits.toString()}
    <button onClick={() => setCredits(c => c+1n)}>
      Engage
    </button>
    <button>
      Community
      <br />
      cost: {PRODUCTS_GET_COST('COMMUNITY', 1n).toString()}
    </button>
    <button disabled>Influencers</button>
    <button>Audiences</button>
    <button>Analytics</button>
  </div>
}
