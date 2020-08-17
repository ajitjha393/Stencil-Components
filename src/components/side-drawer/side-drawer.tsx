import { Component, h, Prop, State } from '@stencil/core'

@Component({
	tag: 'bisu-side-drawer',
	styleUrl: './side-drawer.css',
	shadow: true,
})
export class SideDrawer {
	@State() showContactInfo = false

	@Prop({
		reflect: true,
	})
	title: string

	@Prop({
		reflect: true,
		mutable: true,
	})
	open: boolean

	onCloseDrawer = () => {
		this.open = false
	}

	onContentChange = (content: 'nav' | 'contact') => {
		switch (content) {
			case 'nav':
				this.showContactInfo = false
				break
			case 'contact':
				this.showContactInfo = true
				break
		}
	}

	render() {
		let mainContent = <slot />
		if (this.showContactInfo) {
			mainContent = (
				<div id="contact-info">
					<h2> Contact Information </h2>
					<p>You can reach us via Phone or email!</p>
					<ul>
						<li>Phone: 4899986858</li>
						<li>
							<a href="mailto:test@test.com">test@test.com</a>
						</li>
					</ul>
				</div>
			)
		}

		return (
			<aside>
				<header>
					<h1>{this.title}</h1>
					<button onClick={this.onCloseDrawer}>X</button>
				</header>
				<section id="tabs">
					<button class={this.showContactInfo ? '' : 'active'} onClick={() => this.onContentChange('nav')}>
						Navigation
					</button>
					<button onClick={() => this.onContentChange('contact')} class={this.showContactInfo ? 'active' : ''}>
						Contact
					</button>
				</section>
				<main>{mainContent}</main>
			</aside>
		)
	}
}
