import { Component, h } from '@stencil/core'
import { API_KEY } from '../../global/global'

@Component({
	tag: 'bisu-stock-finder',
	styleUrl: './stock-finder.css',
	shadow: true,
})
export class StockFinder {
	stockNameInput: HTMLInputElement

	onFindStocks = (event: Event) => {
		event.preventDefault()
		const stockName = this.stockNameInput.value
		fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${API_KEY}`)
			.then(res => res.json())
			.then(resData => console.log(resData))
			.catch(err => console.log(err))
	}

	render() {
		return [
			<form onSubmit={this.onFindStocks}>
				<input type="text" id="stock-symbol" ref={el => (this.stockNameInput = el)} />
				<button type="submit">Find</button>
			</form>,
		]
	}
}
