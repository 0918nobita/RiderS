// @flow
import XMLNode from "./XMLNode.module";

/**
 * @access public
 * @desc the class in charge of parsing XML string
 */
export default class XMLParser {
	/**
	 * @access private
	 * @type {string}
	 * @desc XML string
	 */
	_xml_str: string;
	
	/**
	 * @access public
	 * @param {string} xml_str - XML string 
	 */
	constructor(xml_str: string) {
		this._xml_str = xml_str;
	}

	/**
	 * @access public
	 * @desc parse the XML string
	 * @return {XMLNode[]} - XML AST
	 */
	parse(): XMLNode[] {
		return [];
	}
}
