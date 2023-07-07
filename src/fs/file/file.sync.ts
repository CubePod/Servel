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

export default class FileSync {
	private path: string;

	/**
	 * Create file operator in `sync` mode
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param path Path refers to a file
	 */
	public constructor(path: string) {
		this.path = path;
	}

	/**
	 * Read a file in `sync` mode
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param options Read options
	 * @returns File content
	 */
	public read(options?: ReadOption): string {
		let option: ReadOption = options ?? {
			flag: FileFlag.READ_STRICT,
			mode: 0o666,
			encoding: 'utf-8',
		};
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
		return cache;
	}
}
