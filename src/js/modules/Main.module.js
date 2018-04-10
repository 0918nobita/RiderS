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
			edgesTo: Array<_Node>
			edgesCost: Array<number>
			done: boolean
			cost: number
			id: number
			previousNode: ?_Node

			constructor(id: number) {
				this.edgesTo = [];
				this.edgesCost = [];
				this.done = false;
				this.cost = -1;
				this.id = id;
				this.previousNode = null;
			}
			addNode(node: _Node, cost: number) {
				this.edgesTo.push(node);
				this.edgesCost.push(cost);
				return this;
			}
		}

		function createNodes() {
			const node1: _Node = new _Node(1)  // start
				, node2: _Node = new _Node(2)  // top
				, node3: _Node = new _Node(3)  // center
				, node4: _Node = new _Node(4)  // bottom-left
				, node5: _Node = new _Node(5)  // bottom-right
				, node6: _Node = new _Node(6); // goal

			node1.addNode(node2, 5)
				.addNode(node3, 4)
				.addNode(node4, 2);

			node2.addNode(node1, 5)
				.addNode(node6, 6)
				.addNode(node3, 2);

			node3.addNode(node2, 2)
				.addNode(node1, 4)
				.addNode(node4, 3)
				.addNode(node5, 2);

			node4.addNode(node1, 2)
				.addNode(node3, 3)
				.addNode(node5, 6);

			node5.addNode(node4, 6)
				.addNode(node3, 2)
				.addNode(node6, 4);

			node6.addNode(node2, 6)
				.addNode(node5, 4);

			return [node1, node2, node3, node4, node5, node6];
		}

		const nodes = createNodes();
		nodes[0].cost = 0;

		while (true) {
			let processNode: ?_Node = null;

			for (let i = 0; i < nodes.length; i++) {
				let node = nodes[i];

				if (node.done || node.cost < 0) continue;
			}

			if (!processNode) break;

			processNode.done = true;
			
			for (let i = 0; i < processNode.edgesTo.length; i++) {
				let node = processNode.edgesTo[i];
				let cost = processNode.cost + processNode.edgesCost[i];
				let needsUpdate = (node.cost < 0) || (node.cost > cost);
				
				if (needsUpdate) {
					node.cost = cost;
					node.previousNode = processNode;
				}
			}

			const goalNode = nodes[5];
			let path = 'Goal -> ';
			let currentNode = goalNode;
			while (true) {
				let nextNode = currentNode.previousNode;
				if (!nextNode) {
					path += ' Start';
					break;
				}
				path += nextNode.id + ' -> ';
				currentNode = nextNode;
			}
			
			console.log(path);
		}
		
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
