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

import FileSystemSync from './FileSystemSync';

export default class FileSystem {
	/**
	 * Get FileSystem in sync mode
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @returns FileSystem in sync mode
	 */
	public static synchronous(): FileSystemSync {
		return new FileSystemSync();
	}
}
