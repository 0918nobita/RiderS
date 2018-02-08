// @flow
/**
 * @access public
 * @desc XML Node
 */
export default class XMLNode {
	/**
	 * @access private
	 * @desc child nodes
	 */
	_children: XMLNode[];

	/**
	 * @access public
	 * @param {XMLNode[]} [children] - child nodes
	 */
	constructor(children?: XMLNode[]) {
		if (children !== undefined) this._children = children;
		else this._children = [];
	}
}
