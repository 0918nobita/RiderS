// @flow
import DOMController from './DOMController.module';

/**
 * @access public
 * @extends {DOMController}
 * @desc the main class
 */
export default class Main extends DOMController {

	/**
	 * @access public
	 * @desc create Main instance.
	 */
	constructor() {
		super();
	}

	/**
	 * @access public
	 * @desc execute the main procedure.
	 */
	main(): void {
		const alpha: Node = this.createElement('p');
		const beta: Node = this.createElement('p');
		const gamma: Node = this.createElement('p');
		const geolocation: Node = this.createElement('p');

		this.body.appendChild(alpha);
		this.body.appendChild(beta);
		this.body.appendChild(gamma);
		this.body.appendChild(geolocation);

		this.window.addEventListener('deviceorientation', (e: any) => {
			alpha.textContent = 'alpha: ' + e.alpha;
			beta.textContent = 'beta: ' + e.beta;
			gamma.textContent = 'gamma: ' + e.gamma;
		});

		const task: Promise<void> = new Promise(
			function(resolve: (Promise<void> | void) => void, reject: any => void) {
				navigator.geolocation.getCurrentPosition(
					/*success*/ (position: Position) => {
						geolocation.textContent = 'latitude: ' + position.coords.latitude;
						resolve();
					},
					/*error*/ (error: PositionError) => {
						geolocation.textContent = 'failed: error code is ' + error.code;
						reject();
					}
				);
			}
		);

		task.then();
	}
}
