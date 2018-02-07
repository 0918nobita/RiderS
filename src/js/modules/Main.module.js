// @flow
import type { Config } from "../types/Config.type";
import DOMController from "./DOMController.module";

/**
 * @access public
 * @extends {DOMController}
 * @desc the main class
 */
export default class Main extends DOMController {
	/**
	 * @access private
	 * @type {Config}
	 */
	_config: Config;

	/**
	 * @access public
	 * @param {!Config} config - unpublicized settings
	 * @desc create Main instance.
	 */
	constructor(config: Config) {
		super();
		this._config = config;
	}

	/**
	 * @access public
	 * @desc execute the main procedure.
	 */
	main(): void {
		const alpha: ?Node = document.createElement("p");
		const beta: ?Node = document.createElement("p");
		const gamma: ?Node = document.createElement("p");

		if (alpha instanceof Node) this.body.appendChild(alpha);
		if (beta instanceof Node) this.body.appendChild(beta);
		if (gamma instanceof Node) this.body.appendChild(gamma);

		this.window.addEventListener("deviceorientation", (e: DeviceOrientationEvent) => {
			if (alpha instanceof HTMLElement && beta instanceof HTMLElement && gamma instanceof HTMLElement) {
				alpha.textContent = "alpha: " + e.alpha;
				beta.textContent = "beta: " + e.beta;
				gamma.textContent = "gamma: " + e.gamma;
			}
		});
	}
}
