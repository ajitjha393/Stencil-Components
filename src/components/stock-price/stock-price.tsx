import { Component, h, State, Element, Prop, Watch, Listen } from '@stencil/core'
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

	@State() Loading = false

	@Prop({ mutable: true, reflectToAttr: true }) stockSymbol: string

	@Watch('stockSymbol')
	stockSymbolChangedHandler(newValue: string, oldValue: string) {
		if (newValue !== oldValue) {
			this.stockUserInputValue = newValue
			this.fetchStockPrice(newValue)
		}
	}

	// Listen to the custom event emitted from outside
	@Listen('body:bisuStockSymbolSelected')
	onStockSymbolSelected(event: CustomEvent) {
		console.log('Custom Event Catched ' + event.detail)
		if (event.detail && event.detail !== this.stockSymbol) {
			this.stockSymbol = event.detail
		}
	}

	componentWillLoad() {
		if (this.stockSymbol) {
			this.stockUserInputValue = this.stockSymbol
			this.stockInputValid = true
		}
	}

	componentDidLoad() {
		if (this.stockSymbol) {
			this.fetchStockPrice(this.stockSymbol)
		}
	}

	onFetchStockPrice = async (event: Event) => {
		event.preventDefault()
		this.stockSymbol = this.stockUserInputValue
	}

	onUserInputChange = (event: Event) => {
		this.stockUserInputValue = (event.target as HTMLInputElement).value
		this.stockInputValid = this.stockUserInputValue.trim() !== ''
	}

	// Utility function for fetching Stocks

	fetchStockPrice = (stockSymbol: string) => {
		this.Loading = true
		fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`)
			.then(res => res.json())
			.then(resData => {
				this.Loading = false
				if (!resData['Global Quote']['05. price']) {
					throw new Error('Invalid Symbol Passed!')
				}

				this.errorMessage = ''
				return (this.Price = +resData['Global Quote']['05. price'])
			})
			.catch((err: Error) => {
				console.log(err)
				this.errorMessage = err.message
				this.Loading = false
			})
	}

	// Executed every time render is executing
	hostData() {
		return {
			class: this.errorMessage ? 'error' : '',
		}
	}

	render() {
		let dataContent = <p>Please Add a Symbol</p>
		if (this.errorMessage) {
			dataContent = <p>{this.errorMessage}</p>
		} else if (this.Price) {
			dataContent = <p>Price : $ {this.Price}</p>
		}

		if (this.Loading) {
			dataContent = (
				<div class="lds-ellipsis">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			)
		}

		return [
			<form onSubmit={this.onFetchStockPrice}>
				<input type="text" id="stock-symbol" ref={el => (this.stockInput = el)} value={this.stockUserInputValue} onInput={this.onUserInputChange} />
				<button type="submit" disabled={!this.stockInputValid || this.Loading}>
					Fetch
				</button>
			</form>,

			<div>{dataContent}</div>,
		]
	}
}
