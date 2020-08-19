import { Component, h } from '@stencil/core'

@Component({
	tag: 'bisu-spinner',
	styleUrl: './Spinner.css',
	shadow: true,
})
export class Spinner {
	render() {
		return (
			<div class="lds-ellipsis">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		)
	}
}
