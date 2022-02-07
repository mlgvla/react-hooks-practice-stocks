import React, { useState, useEffect } from "react"
import StockContainer from "./StockContainer"
import PortfolioContainer from "./PortfolioContainer"
import SearchBar from "./SearchBar"

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [sortBy, setSortBy] = useState("Alphabetically")
  const [filterBy, setFilterBy] = useState("Tech")

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then(res => res.json())
      .then(data => setStocks(data))
  }, [])

  function handleAddStock(stockToAddToPF) {
    setPortfolio([...portfolio, stockToAddToPF])
    console.log(portfolio)
  }

  function handleRemoveStock(stockToRemoveFromPF) {
    setPortfolio(portfolio =>
      portfolio.filter(stock => stock.id !== stockToRemoveFromPF.id)
    )
  }

  const sortedStocks = [...stocks].sort((stock1, stock2) => {
    if (sortBy === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name)
    } else {
      return stock1.price - stock2.price
    }
  })

  const filteredStocks = sortedStocks.filter(stock => stock.type === filterBy)

  return (
    <div>
      <SearchBar
        onSortByChange={setSortBy}
        sortBy={sortBy}
        filterBy={filterBy}
        onChangeFilter={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer
            stocks={filteredStocks}
            onStockClick={handleAddStock}
          />
        </div>
        <div className="col-4">
          <PortfolioContainer
            stocks={portfolio}
            onStockClick={handleRemoveStock}
          />
        </div>
      </div>
    </div>
  )
}

export default MainContainer
