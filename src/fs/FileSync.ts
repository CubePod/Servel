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

import * as fs from 'fs';
import { ContextType, FileFlag, ReadOption } from './FileMetadata';
import RuntimeException from '../exception/Exceptions/RuntimeException';
import ParameterException from '../exception/Exceptions/ParameterException';

export default class FileSync {
	/**
	 * Read a specific file
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param context FileSystem Context
	 * @returns Content of a specific file
	 */
	public static read(context: {
		path: string;
		type: ContextType.FILE;
	}): string;

	/**
	 * Read a specific file
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param context FileSystem Context
	 * @param options Extra options
	 * @returns Content of a specific file
	 */
	public static read(
		context: {
			path: string;
			type: ContextType.FILE;
		},
		options: ReadOption
	): string;

	/**
	 * Read a specific directory
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param context FileSystem Context
	 * @returns List of a specific directory
	 */
	public static read(context: {
		path: string;
		type: ContextType.DIRECTORY;
	}): string[];

	public static read(
		context: { path: string; type: ContextType },
		...args: any[]
	): string | string[] {
		if (context.type === ContextType.FILE) {
			let options: ReadOption = args[0] ?? {
				flag: FileFlag.READ_STRICT,
				mode: 0o666,
				highWatermark: 64 * 1024,
				encoding: 'utf-8',
			};
			try {
				let stat: fs.Stats = fs.statSync(context.path);
				let position: number = 0;
				let highWatermark: number = options.highWatermark ?? 64 * 1024;
				let data: string = '';
				let file: number = fs.openSync(
					context.path,
					options.flag,
					options.mode
				);
				while (true) {
					let buffer: Buffer = Buffer.alloc(highWatermark);
					let bytesRead: number = fs.readSync(
						file,
						buffer,
						0,
						Math.min(highWatermark, stat.size - position),
						position
					);
					if (bytesRead > 0) {
						let usedBuffer: Buffer = buffer.subarray(0, bytesRead);
						data = data.concat(
							usedBuffer.toString(options.encoding)
						);
					} else {
						break;
					}
				}
				fs.closeSync(file);
				return data;
			} catch (e) {
				throw new RuntimeException('ENV', (e as Error).message);
			}
		} else if (context.type === ContextType.DIRECTORY) {
			try {
				return fs.readdirSync(context.path);
			} catch (e) {
				throw new RuntimeException('ENV', (e as Error).message);
			}
		} else {
			throw new ParameterException(
				'context.type',
				'Unexpected context type'
			);
		}
	}
}
