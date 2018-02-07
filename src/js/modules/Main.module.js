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
	 * @desc create Main instance.
	 * @param {!Config} config - unpublicized settings
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
		const alpha: Node = this.createElement("p");
		const beta: Node = this.createElement("p");
		const gamma: Node = this.createElement("p");

		this.body.appendChild(alpha);
		this.body.appendChild(beta);
		this.body.appendChild(gamma);

		this.window.addEventListener("deviceorientation", (e: any) => {
			alpha.textContent = "alpha: " + e.alpha;
			beta.textContent = "beta: " + e.beta;
			gamma.textContent = "gamma: " + e.gamma;
		});
	}
}
