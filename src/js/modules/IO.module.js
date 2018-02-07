// @flow
import DOMController from "./DOMController.module";

/**
 * @access public
 * @extends {DOMController}
 * @desc the class in charge of Input/Output
 */
export default class IO extends DOMController {
	/**
	 * @access private
	 * @type {?Node}
	 * @desc the last added node
	 */
	_first : ?Node;

	/**
	 * @access public
	 * @desc create IO instance.
	 */
	constructor() {
		super();
		this._first = null;
	}

	/**
	 * @desc output passed string.
	 * @param {!string} str - the output string
	 */
	output(str : string): void {
		const p : ?Node = document.createElement("p");
		if (p == null) return;
		
		p.textContent = str;
		
		this._first = (this._first != null) ?
			this.body.insertBefore(p, this._first) :
			this.body.appendChild(p);
	}
}
