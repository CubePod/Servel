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
import { ContextType, FileFlag, ReadOption, WriteOption } from './FileMetadata';
import RuntimeException from '../exception/Exceptions/RuntimeException';
import ParameterException from '../exception/Exceptions/ParameterException';

export default class FileAsync {
	/**
	 * Read a specific file
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param context FileSystem Context
	 * @returns Content of a specific file
	 */
	public static async read(context: {
		path: string;
		type: ContextType.FILE;
	}): Promise<string>;

	/**
	 * Read a specific file
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param context FileSystem Context
	 * @param options Extra options
	 * @returns Content of a specific file
	 */
	public static async read(
		context: {
			path: string;
			type: ContextType.FILE;
		},
		options: ReadOption
	): Promise<string>;

	/**
	 * Read a specific directory
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param context FileSystem Context
	 * @returns List of a specific directory
	 */
	public static async read(context: {
		path: string;
		type: ContextType.DIRECTORY;
	}): Promise<string[]>;

	public static async read(
		context: { path: string; type: ContextType },
		...args: any[]
	): Promise<string | string[]> {
		if (context.type === ContextType.FILE) {
			let options: ReadOption = args[0] ?? {
				flag: FileFlag.READ_STRICT,
				mode: 0o666,
				highWatermark: 64 * 1024,
				encoding: 'utf-8',
			};
			try {
				let stat: fs.Stats = await fs.promises.stat(context.path);
				let position: number = 0;
				let highWatermark: number = options.highWatermark ?? 64 * 1024;
				let data: string = '';
				let file: fs.promises.FileHandle = await fs.promises.open(
					context.path,
					options.flag,
					options.mode
				);
				while (true) {
					let buffer: Buffer = Buffer.alloc(highWatermark);
					let result: fs.promises.FileReadResult<Buffer> =
						await file.read(
							buffer,
							0,
							Math.min(highWatermark, stat.size - position),
							position
						);
					if (result.bytesRead > 0) {
						let usedBuffer: Buffer = buffer.subarray(
							0,
							result.bytesRead
						);
						data = data.concat(
							usedBuffer.toString(options.encoding)
						);
					} else {
						break;
					}
				}
				await file.close();
				return data;
			} catch (e) {
				throw new RuntimeException('ENV', (e as Error).message);
			}
		} else if (context.type === ContextType.DIRECTORY) {
			try {
				return await fs.promises.readdir(context.path);
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

	/**
	 * Write specific content to a specific file
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param context FileSystem Context
	 * @param content Content you want to write
	 */
	public static async write(
		context: { path: string; type: ContextType.FILE },
		content: string
	): Promise<void>;

	/**
	 * Write specific content to a specific file
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param context FileSystem Context
	 * @param content Content you want to write
	 * @param options Extra options
	 */
	public static async write(
		context: { path: string; type: ContextType.FILE },
		content: string,
		options: WriteOption
	): Promise<void>;

	/**
	 * Make a directory by specific path
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param context FileSystem Context
	 */
	public static async write(context: {
		path: string;
		type: ContextType.DIRECTORY;
	}): Promise<void>;

	/**
	 * Make a directory by specific path
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param context FileSystem Context
	 * @param options Extra options
	 */
	public static async write(
		context: {
			path: string;
			type: ContextType.DIRECTORY;
		},
		options: WriteOption
	): Promise<void>;

	public static async write(
		context: { path: string; type: ContextType },
		...args: any[]
	): Promise<void> {
		if (context.type === ContextType.FILE) {
			try {
				let content: string = args[0];
				let options: WriteOption = args[1] ?? {
					flag: FileFlag.WRITE,
					mode: 0o666,
					encoding: 'utf-8',
				};
				let file: fs.promises.FileHandle = await fs.promises.open(
					context.path,
					options.flag ?? FileFlag.WRITE,
					options.mode
				);
				await file.write(content, null, options.encoding);
				await file.close();
			} catch (e) {
				throw new RuntimeException('ENV', (e as Error).message);
			}
		} else if (context.type === ContextType.DIRECTORY) {
			try {
				let options: WriteOption = args[0] ?? { recursive: true };
				await fs.promises.mkdir(context.path, {
					recursive: options.recursive,
				});
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
