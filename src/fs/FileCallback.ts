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
import Exception from '../exception/Exception';

export default class FileSync {
	/**
	 * Read a specific file
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param context FileSystem Context
	 * @param callback Handling function
	 */
	public static read(
		context: {
			path: string;
			type: ContextType.FILE;
		},
		callback: (err: Exception | null, data: string | null) => void
	): void;

	/**
	 * Read a specific file
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param context FileSystem Context
	 * @param options Extra options
	 * @param callback Handling function
	 */
	public static read(
		context: {
			path: string;
			type: ContextType.FILE;
		},
		options: ReadOption,
		callback: (err: Exception | null, data: string | null) => void
	): void;

	/**
	 * Read a specific directory
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param context FileSystem Context
	 * @param callback Handling function
	 */
	public static read(
		context: {
			path: string;
			type: ContextType.DIRECTORY;
		},
		callback: (err: Exception | null, data: string[] | null) => void
	): void;

	public static read(
		context: { path: string; type: ContextType },
		...args: any[]
	): void {
		if (context.type === ContextType.FILE) {
			let options: ReadOption = args[0] ?? {
				flag: FileFlag.READ_STRICT,
				mode: 0o666,
				highWatermark: 64 * 1024,
				encoding: 'utf-8',
			};
			let callback: (
				err: Exception | null,
				data: string | null
			) => void | undefined;
			if (args.length === 2) {
				callback = args[1];
			} else {
				callback = args[0];
			}
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
				(
					callback as (
						err: Exception | null,
						data: string | null
					) => void
				).call(null, null, data);
			} catch (e) {
				(
					callback as (
						err: Exception | null,
						data: string | null
					) => void
				).call(
					null,
					new RuntimeException('ENV', (e as Error).message),
					null
				);
			}
		} else if (context.type === ContextType.DIRECTORY) {
			let callback: (
				err: Exception | null,
				data: string[] | null
			) => void = args[0];
			try {
				(
					callback as (
						err: Exception | null,
						data: string[] | null
					) => void
				).call(null, null, fs.readdirSync(context.path));
			} catch (e) {
				(
					callback as (
						err: Exception | null,
						data: string[] | null
					) => void
				).call(
					null,
					new RuntimeException('ENV', (e as Error).message),
					null
				);
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
	 * @param callback Handling function
	 */
	public static write(
		context: { path: string; type: ContextType.FILE },
		content: string,
		callback: (err: Exception | null) => void
	): void;

	/**
	 * Write specific content to a specific file
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param context FileSystem Context
	 * @param content Content you want to write
	 * @param options Extra options
	 * @param callback Handling function
	 */
	public static write(
		context: { path: string; type: ContextType.FILE },
		content: string,
		options: WriteOption,
		callback: (err: Exception | null) => void
	): void;

	/**
	 * Make a directory by specific path
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param context FileSystem Context
	 * @param callback Handling function
	 */
	public static write(
		context: {
			path: string;
			type: ContextType.DIRECTORY;
		},
		callback: (err: Exception | null) => void
	): void;

	/**
	 * Make a directory by specific path
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param context FileSystem Context
	 * @param options Extra options
	 * @param callback Handling function
	 */
	public static write(
		context: {
			path: string;
			type: ContextType.DIRECTORY;
		},
		options: WriteOption,
		callback: (err: Exception | null) => void
	): void;

	public static write(
		context: { path: string; type: ContextType },
		...args: any[]
	): void {
		if (context.type === ContextType.FILE) {
			let content: string = args[0];
			let options: WriteOption | undefined = undefined;
			let callback: (err: Exception | null) => void | undefined;
			if (typeof args[1] === 'function') {
				callback = args[1];
				options = {
					flag: FileFlag.WRITE,
					mode: 0o666,
					encoding: 'utf-8',
				};
			} else {
				options = args[1];
				callback = args[2];
			}
			try {
				let file: number = fs.openSync(
					context.path,
					(options as WriteOption).flag ?? FileFlag.WRITE,
					(options as WriteOption).mode
				);
				fs.writeSync(
					file,
					content,
					null,
					(options as WriteOption).encoding
				);
				fs.closeSync(file);
				(callback as (err: Exception | null) => void).call(null, null);
			} catch (e) {
				(callback as (err: Exception | null) => void).call(
					null,
					new RuntimeException('ENV', (e as Error).message)
				);
			}
		} else if (context.type === ContextType.DIRECTORY) {
			let options: WriteOption | undefined;
			let callback: (err: Exception | null) => void | undefined;
			if (typeof args[0] === 'function') {
				callback = args[0];
				options = { recursive: true };
			} else {
				options = args[0];
				callback = args[1];
			}
			try {
				fs.mkdirSync(context.path, {
					recursive: (options as WriteOption).recursive,
				});
				(callback as (err: Exception | null) => void).call(null, null);
			} catch (e) {
				(callback as (err: Exception | null) => void).call(
					null,
					new RuntimeException('ENV', (e as Error).message)
				);
			}
		} else {
			throw new ParameterException(
				'context.type',
				'Unexpected context type'
			);
		}
	}
}
