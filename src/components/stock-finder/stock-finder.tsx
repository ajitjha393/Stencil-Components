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
	@State() Loading = false

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
		this.Loading = true
		const stockName = this.stockNameInput.value
		fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${API_KEY}`)
			.then(res => res.json())
			.then(resData => {
				this.Loading = false
				console.log(resData)
				this.searchResults = resData['bestMatches'].map(result => ({
					symbol: result['1. symbol'],
					name: result['2. name'],
				}))
			})
			.catch(err => {
				console.log(err)
				this.Loading = false
			})
	}

	render() {
		let content = (
			<ul>
				{this.searchResults.map(({ name, symbol }) => {
					return (
						<li onClick={() => this.onSelectSymbol(symbol)}>
							<strong>{symbol} </strong>- {name}
						</li>
					)
				})}
			</ul>
		)

		if (this.Loading) {
			content = <bisu-spinner />
		}

		return [
			<form onSubmit={this.onFindStocks}>
				<input type="text" id="stock-symbol" ref={el => (this.stockNameInput = el)} />
				<button type="submit">Find</button>
			</form>,
			content,
		]
	}
}
