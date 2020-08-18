import { Component, h, State, Element } from '@stencil/core'
import { API_KEY } from '../../global/global'

@Component({
	tag: 'bisu-stock-price',
	styleUrl: './stock-price.css',
	shadow: true,
})
export class StockPrice {
	stockInput: HTMLInputElement

	/**
	 * Another Alternative by using 2way binding
	 */
	@State() stockUserInputValue: string

	@Element() el: HTMLElement

	@State() Price = 0

	onFetchStockPrice = async (event: Event) => {
		event.preventDefault()

		// Alternative to this
		// const stockSymbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value

		// const stockSymbol = this.stockInput.value

		const stockSymbol = this.stockUserInputValue
		console.log(stockSymbol)
		fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`)
			.then(res => res.json())
			.then(resData => {
				console.log(resData)
				return (this.Price = +resData['Global Quote']['05. price'])
			})
			.catch(err => console.log(err))
	}

	onUserInputChange = (event: Event) => (this.stockUserInputValue = (event.target as HTMLInputElement).value)

	render() {
		return [
			<form onSubmit={this.onFetchStockPrice}>
				<input type="text" id="stock-symbol" ref={el => (this.stockInput = el)} value={this.stockUserInputValue} onInput={this.onUserInputChange} />
				<button type="submit">Fetch</button>
			</form>,

			<div>
				<p>Price : $ {this.Price}</p>
			</div>,
		]
	}
}
