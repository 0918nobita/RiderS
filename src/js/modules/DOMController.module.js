// @flow
/**
 * @access public
 * @desc the utils in charge of editing the DOM
 */
export default class DOMController {
	/**
	 * @access public
	 * @type {Node}
	 * @desc document.body element
	 */
	body: Node;

	/**
	 * @access public
	 * @type {EventTarget}
	 * @desc window object
	 */
	window: EventTarget;

	/**
	 * @access public
	 * @desc create DOMController instance
	 */
	constructor() {
		if (document.body instanceof Node) this.body = document.body;
		else throw new Error("document.body cannnot be found.");
		if (window instanceof EventTarget) this.window = window;
		else throw new Error("window object cannot be found.");
	}
}
