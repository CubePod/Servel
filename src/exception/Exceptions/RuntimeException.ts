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

export default class RuntimeException extends Exception {
	private metadata: { source: string; message: string };

	/**
	 * Create RuntimeException
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param source Source of causing exception
	 * @param message Extra message
	 */
	constructor(source: string, message: string) {
		super(`${message}\n[Source] ${source}`, 'RuntimeException');
		this.metadata = { source: source, message: message };
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
	public getMetadata(): { source: string; message: string } {
		return this.metadata;
	}
}
