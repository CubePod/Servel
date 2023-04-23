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

import Exception from '../Exception';

export default class FileSystemException extends Exception {
	private metadata: { method: string; message: string };

	/**
	 * Create FileException
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param path Path to file or directory
	 * @param method Name of method
	 * @param message Extra message
	 */
	public constructor(method: string, message: string) {
		super(`${message}\n[Method] ${method}`, 'FileException');
		this.metadata = { method: method, message: message };
	}

	/**
	 * Get name of exception
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @returns Name of exception
	 */
	public getName(): string {
		return this.name;
	}

	/**
	 * Get metadata of exception
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @returns Metadata of exception
	 */
	public getMetadata(): { method: string; message: string } {
		return this.metadata;
	}
}
