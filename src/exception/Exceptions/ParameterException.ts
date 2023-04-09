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

export default class ParameterException extends Exception {
	private metadata: { param: string; message: string };

	/**
	 * Create ParameterException
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param param Name of parameter
	 * @param message Extra message
	 */
	public constructor(param: string, message: string) {
		super(`${message}\n[Parameter] ${param}\n`, 'ParameterException');
		this.metadata = { param: param, message: message };
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
	public getMetadata(): { param: string; message: string } {
		return this.metadata;
	}
}
