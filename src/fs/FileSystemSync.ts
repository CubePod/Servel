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

import FileSystemException from '../exception/Exceptions/FileSystemException';
import { FileFlag, ReadOption } from './FileMetadata';
import * as fs from 'node:fs';

export default class FileSystemSync {
	/**
	 * Create FileSystem in `sync` mode
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	public constructor() {}

	/**
	 * Read a specific file or directory
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param path Path you want to  read
	 * @param options Extra options
	 * @returns Content of a file or a list of a directory
	 */
	public read(path: string, options?: ReadOption): string | string[] {
		function readFile(
			p: string,
			options: ReadOption,
			fileStat: fs.Stats
		): string {
			let file: number = fs.openSync(p, options.flag, options.mode);
			let position: number = 0;
			let cache: string = '';
			let highWatermark: number = options.highWatermark ?? 64 * 1014;
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
				cache = cache.concat(usedBuffer.toString(options.encoding));
				position += bytesRead;
			}
			return cache;
		}
		function readDirectory(p: string): string[] {
			return fs.readdirSync(p);
		}
		try {
			let stat: fs.Stats = fs.statSync(path);
			if (stat.isFile()) {
				return readFile(
					path,
					options ?? {
						encoding: 'utf-8',
						flag: FileFlag.READ_STRICT,
						mode: 0o666,
					},
					stat
				);
			} else if (stat.isDirectory()) {
				return readDirectory(path);
			} else {
				throw new FileSystemException(
					'read',
					'This method does not support thing except `FILE` or `DIRECTORY`'
				);
			}
		} catch (e) {
			throw e;
		}
	}
}
