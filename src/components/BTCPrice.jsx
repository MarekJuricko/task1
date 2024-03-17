import BTCPriceContext from "./BTCPriceContext"
import { useContext, useMemo } from "react"

const BTCPrice = () => {

  const { bitcoinPrice} = useContext(BTCPriceContext)

  const bitcoinPriceUpdate = useMemo(() => {
    return <h3>Current Price: {bitcoinPrice} USD</h3>;
  }, [bitcoinPrice])

  return (
    <div className='footer'>
        <h2>Bitcoin</h2>
        <h3>{bitcoinPriceUpdate}</h3>
      </div>
  )
}

export default BTCPrice