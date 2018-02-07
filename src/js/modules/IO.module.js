// @flow
/**
 * @access public
 * @desc the class in charge of Input/Output
 */
export default class IO {
	/**
	 * @access private
	 * @type {?Node}
	 * @desc the last added node
	 */
	_first : ?Node;

	/**
	 * @access private
	 * @type {Node}
	 * @desc body element
	 */
	_body : Node;

	/**
	 * @access public
	 * @desc create IO instance
	 * @throws {Error} throw error when document.body object cannot be found.
	 */
	constructor() {
		this._first = null;
		if (document.body instanceof Node) this._body = document.body;
		else throw new Error("document.body cannnot be found.");
	}

	/**
	 * @desc output passed string
	 * @param {string} str - the output string
	 */
	output(str : string): void {
		const p : ?Node = document.createElement("p");
		if (p == null) return;
		
		p.textContent = str;
		
		this._first = (this._first != null) ?
			this._body.insertBefore(p, this._first) :
			this._body.appendChild(p);
	}
}
