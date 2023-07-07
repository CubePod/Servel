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

import { FileFlag, ReadOption } from '../filesystem.metadata';
import * as fs from 'node:fs';
import Utils from '../../utils/utils';

export default class FileCallback {
	private path: string;

	/**
	 * Create file operator in `callback` mode
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param path Path refers to a file
	 */
	public constructor(path: string) {
		this.path = path;
	}

	/**
	 * Read a file in `callback` mode
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param options Read options
	 */
	public read(options: ReadOption): void;

	/**
	 * Read a file in `callback` mode
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param options Read options
	 * @param callback Handling function
	 */
	public read(
		options: ReadOption,
		callback: (err: any, data: string | null) => void
	): void;

	/**
	 * Read a file in `callback` mode
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param callback Handling function
	 */
	public read(callback: (err: any, data: string | null) => void): void;

	public read(...args: any[]): void {
		//TODO: When error occurs, returns data that had been read
		let option: ReadOption = Utils.isFunction(args[0])
			? { highWatermark: 1024 * 64, encoding: 'utf-8', useCache: true }
			: args[0];
		let callback: (err: any, data: string | null) => void =
			Utils.isFunction(args[0]) ? args[0] : args[1];
		try {
			let file: number = fs.openSync(this.path, option.flag, option.mode);
			let position: number = 0;
			let cache: string = '';
			let highWatermark: number = option.highWatermark ?? 64 * 1014;
			let fileStat: fs.Stats = fs.statSync(this.path);
			const fileSize: number = fileStat.size;
			while (fileSize !== position) {
				let buffer: Buffer = Buffer.alloc(highWatermark);
				let bytesRead: number = fs.readSync(
					file,
					buffer,
					0,
					Math.min(fileSize - position, highWatermark),
					position
				);
				let usedBuffer: Buffer = buffer.subarray(0, bytesRead);
				cache = cache.concat(usedBuffer.toString(option.encoding));
				position += bytesRead;
			}
			callback.call(null, null, cache);
		} catch (e) {
			callback.call(null, e, null);
		}
	}
}
