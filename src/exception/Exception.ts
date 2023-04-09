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

export default abstract class Exception extends Error {
	/**
	 * Create exception
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param errorMessage Message of exception
	 * @param exceptionName Name of exception
	 */
	public constructor(errorMessage: string, exceptionName: string) {
		super(errorMessage);
		this.name = exceptionName;
	}

	public abstract getName(): string;
	public abstract getMetadata(): any;
}
