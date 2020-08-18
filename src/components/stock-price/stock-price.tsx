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

	@Element() el: HTMLElement

	@State() stockUserInputValue: string

	@State() stockInputValid = false

	@State() Price = 0

	@State() errorMessage: string

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
				if (!resData['Global Quote']['05. price']) {
					throw new Error('Invalid Symbol Passed!')
				}

				this.errorMessage = ''
				return (this.Price = +resData['Global Quote']['05. price'])
			})
			.catch((err: Error) => {
				console.log(err)
				this.errorMessage = err.message
			})
	}

	onUserInputChange = (event: Event) => {
		this.stockUserInputValue = (event.target as HTMLInputElement).value
		this.stockInputValid = this.stockUserInputValue.trim() !== ''
	}

	render() {
		let dataContent = <p>Please Add a Symbol</p>
		if (this.errorMessage) {
			dataContent = <p>{this.errorMessage}</p>
		} else if (this.Price) {
			dataContent = <p>Price : $ {this.Price}</p>
		}

		return [
			<form onSubmit={this.onFetchStockPrice}>
				<input type="text" id="stock-symbol" ref={el => (this.stockInput = el)} value={this.stockUserInputValue} onInput={this.onUserInputChange} />
				<button type="submit" disabled={!this.stockInputValid}>
					Fetch
				</button>
			</form>,

			<div>{dataContent}</div>,
		]
	}
}
