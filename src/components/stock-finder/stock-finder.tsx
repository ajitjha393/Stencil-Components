import { Component, h, State, Event, EventEmitter } from '@stencil/core'
import { API_KEY } from '../../global/global'

@Component({
	tag: 'bisu-stock-finder',
	styleUrl: './stock-finder.css',
	shadow: true,
})
export class StockFinder {
	stockNameInput: HTMLInputElement

	@State() searchResults: { symbol: string; name: string }[] = []

	@Event({
		composed: true,
		bubbles: true,
	})
	bisuStockSymbolSelected: EventEmitter<string>

	onSelectSymbol = (symbol: string) => {
		this.bisuStockSymbolSelected.emit(symbol)
	}

	onFindStocks = (event: Event) => {
		event.preventDefault()
		const stockName = this.stockNameInput.value
		fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${API_KEY}`)
			.then(res => res.json())
			.then(resData => {
				console.log(resData)
				this.searchResults = resData['bestMatches'].map(result => ({
					symbol: result['1. symbol'],
					name: result['2. name'],
				}))
			})
			.catch(err => console.log(err))
	}

	render() {
		return [
			<form onSubmit={this.onFindStocks}>
				<input type="text" id="stock-symbol" ref={el => (this.stockNameInput = el)} />
				<button type="submit">Find</button>
			</form>,
			<ul>
				{this.searchResults.map(({ name, symbol }) => {
					return (
						<li>
							<strong onClick={() => this.onSelectSymbol(symbol)}>{symbol} </strong>- {name}
						</li>
					)
				})}
			</ul>,
		]
	}
}
