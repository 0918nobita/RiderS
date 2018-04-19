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

		class _Node {
			id: number
			constructor(id: number) {
				this.id = id;
			}
		}

		let nodes: Array<_Node> = [];

		for (let i = 1; i <= 10; i++) nodes.push(new _Node(i));

		console.log(nodes);

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
