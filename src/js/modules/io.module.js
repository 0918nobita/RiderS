// @flow
export default class IO {
	body: ?HTMLElement;
	first: ?HTMLElement;
	constructor(): void {
		this.body = document.body;
	}
	output(str : string): void {
		const p : ?HTMLElement = document.createElement("p");
		if (p instanceof HTMLElement) {
			p.textContent = str;
			if (this.body instanceof HTMLElement) {
				if (this.first instanceof HTMLElement)
					this.body.insertBefore(p, this.first);
				else this.first = this.body.appendChild(p);
			}
		}
	}
}
