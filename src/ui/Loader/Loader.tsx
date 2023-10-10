import { BounceLoader } from 'react-spinners'
import './Loader.scss'

export function Loader() {
  return (
    <div className="loader">
      <BounceLoader color="#36d7b7" />
    </div>
  )
}
