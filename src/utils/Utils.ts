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
	 * Create a memorial function
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param fn Function that will have memory function
	 * @param index Cache name
	 * @returns A function with memorial function
	 */
	public static memorize(fn: Function, index: number): Function {
		const cache: any = Object.create(null);
		return function cachedFunction(...args: any[]): any {
			if (args[index] in cache) {
				return cache[args[index]];
			} else {
				cache[args[index]] = fn.apply(null, args);
			}
		};
	}
}
