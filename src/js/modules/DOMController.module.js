// @flow
/**
 * @access public
 * @desc the utils in charge of editing the DOM
 */
export default class DOMController {
	/**
	 * @access public
	 * @type {!HTMLElement}
	 * @desc document.body object
	 */
	body: HTMLElement;

	/**
	 * @access public
	 * @type {!EventTarget}
	 * @desc window object
	 */
	window: EventTarget;

	/**
	 * @access public
	 * @desc create DOMController instance.
	 * @throws {Error} throw error when required DOM element cannot be found.
	 */
	constructor() {
		if (document.body instanceof HTMLElement) this.body = document.body;
		else throw new Error("document.body cannnot be found.");
		if (window instanceof EventTarget) this.window = window;
		else throw new Error("window object cannot be found.");
	}

	/**
	 * @access public
	 * @desc create new DOM element.
	 * @param {!string} tag_name - tag name
	 * @return {!HTMLElement} - new DOM element
	 * @throws {Error} throw error when failed to create new DOM element
	 */
	createElement(tag_name: string): HTMLElement {
		const elem: ?HTMLElement = document.createElement(tag_name);
		if (elem instanceof HTMLElement) return elem;
		else throw new Error("failed to create new DOM element.");
	}
}
