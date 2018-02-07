// @flow
export default class Main {
	config: {};
	constructor(config: {}) {
		this.config = config;
	}
	main(): void {
		const w : ?EventTarget = window;
		const body : ?HTMLElement = document.body;
		const alpha: ?HTMLElement = document.createElement("p");
		const beta: ?HTMLElement = document.createElement("p");
		const gamma: ?HTMLElement = document.createElement("p");

		if (body instanceof HTMLElement) {
			if (alpha instanceof HTMLElement) body.appendChild(alpha);
			if (beta instanceof HTMLElement) body.appendChild(beta);
			if (gamma instanceof HTMLElement) body.appendChild(gamma);
		}

		if (w instanceof EventTarget) w.addEventListener("deviceorientation", (e: any) => {
			if (alpha instanceof HTMLElement && beta instanceof HTMLElement && gamma instanceof HTMLElement) {
				alpha.textContent = "alpha: " + e.alpha;
				beta.textContent = "beta: " + e.beta;
				gamma.textContent = "gamma: " + e.gamma;
			}
		});
	}
}
