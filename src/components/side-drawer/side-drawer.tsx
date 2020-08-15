import { Component, h, Prop } from '@stencil/core'

@Component({
	tag: 'bisu-side-drawer',
	styleUrl: './side-drawer.css',
	shadow: true,
})
export class SideDrawer {
	@Prop({
		reflect: true,
	})
	title: string

	// @Prop() open: boolean = true

	render() {
		return (
			<aside>
				<header>
					<h1>{this.title}</h1>
				</header>
				<main>
					<slot />
				</main>
			</aside>
		)
	}
}
