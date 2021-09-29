import { PRODUCTS_GET_COST } from '../config'

export default function IdleApp() {
  return <div style={{ display: 'flex', flexDirection: 'column' }}>
    <button>
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
