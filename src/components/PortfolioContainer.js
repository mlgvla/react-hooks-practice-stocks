import React from "react"
import Stock from "./Stock"
import { v4 as uuid } from 'uuid'

function PortfolioContainer({ stocks, onStockClick }) {
  const portfolioStockList = stocks.map(stock => (
    <Stock key={uuid()} stock={stock} onStockClick={onStockClick} />
  ))

  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolioStockList}
    </div>
  )
}

export default PortfolioContainer
