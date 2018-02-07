// @flow
import type { Config } from "../types/Config.type";

class PrivateFields {
	config: Config;
	
	constructor(param: {config: Config}) {
		this.config = param.config;
	}
}

const privates : WeakMap<Object, PrivateFields> = new WeakMap();

export default class Main {
	constructor(param: {config: Config}) {
		privates.set(this, new PrivateFields(param));
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
