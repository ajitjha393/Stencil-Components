import { Component, h, State } from '@stencil/core'

@Component({
	tag: 'bisu-stock-price',
	styleUrl: './stock-price.css',
	shadow: true,
})
export class StockPrice {
	@State() Price = 0

	onFetchStockPrice = async (event: Event) => {
		event.preventDefault()
		fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo')
			.then(res => res.json())
			.then(resData => {
				console.log(resData)
				return (this.Price = +resData['Global Quote']['05. price'])
			})
			.catch(err => console.log(err))
	}

	render() {
		return [
			<form onSubmit={this.onFetchStockPrice}>
				<input type="text" id="stock-symbol" />
				<button type="submit">Fetch</button>
			</form>,

			<div>
				<p>Price : $ {this.Price}</p>
			</div>,
		]
	}
}
