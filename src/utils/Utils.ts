/*
 *   _____                     _
 *  / ____|                   | |
 * | (___   ___ _ ____   _____| |
 *  \___ \ / _ \ '__\ \ / / _ \ |
 *  ____) |  __/ |   \ V /  __/ |
 * |_____/ \___|_|    \_/ \___|_|
 *
 * @link https://github.com/CubePod/Servel
 * @author Servel Team
 *
 * A weight-light, extendable server software, written in Typescript
 *
 * You can redistribute and/or modify this project
 *
 * Hope ypu can have fun
 */

export default class Utils {
	/**
	 * Check whether data is type of string
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param d Data you will pass
	 * @returns
	 */
	public static isString(d: unknown): boolean {
		return typeof d === 'string';
	}

	/**
	 * Check whether data is type of number
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param d Data you will pass
	 * @returns
	 */
	public static isNumber(d: unknown): boolean {
		return typeof d === 'number';
	}

	/**
	 * Check whether data is type of boolean
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param d Data you will pass
	 * @returns
	 */
	public static isBoolean(d: unknown): boolean {
		return typeof d === 'boolean';
	}

	/**
	 * Check whether data is type of undefined
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param d Data you will pass
	 * @returns
	 */
	public static isUndefined(d: unknown): boolean {
		return typeof d === 'undefined';
	}

	/**
	 * Check whether data is type of null
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param d Data you will pass
	 * @returns
	 */
	public static isNull(d: unknown): boolean {
		return d === null;
	}

	/**
	 * Check whether data is type of function
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param d Data you will pass
	 * @returns
	 */
	public static isFunction(d: unknown): boolean {
		return typeof d === 'function';
	}

	/**
	 * Check whether data is type of object
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param d Data you will pass
	 * @returns
	 */
	public static isObject(d: unknown): boolean {
		return d?.constructor === Object;
	}

	/**
	 * Check whether data is type of array
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param d Data you will pass
	 * @returns
	 */
	public static isArray(d: unknown): boolean {
		return d?.constructor === Array;
	}

	/**
	 * Check whether data is type of symbol
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param d Data you will pass
	 * @returns
	 */
	public static isSymbol(d: unknown): boolean {
		return typeof d === 'symbol';
	}
}
