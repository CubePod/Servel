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

//Descriptor Enum
export enum ContextType {
	FILE,
	DIRECTORY,
}

//Flag Enum
export enum FileFlag {
	APPENDING = 'a',
	APPENDING_STRICT = 'ax',
	APPENDING_READ = 'a+',
	APPENDING_READ_STRICT = 'ax+',
	APPENDING_SYNC = 'as',
	APPENDING_READ_SYNC = 'as+',
	READ_STRICT = 'r',
	READ_WRITE_STRICT = 'r+',
	READ_WRITE_SYNC = 'rs+',
	WRITE = 'w',
	WRITE_STRICT = 'wx',
	WRITE_READ = 'w+',
	WRITE_READ_STRICT = 'wx+',
}

//Method Interface
export interface OpenOption {
	flag: FileFlag;
	mode?: string | number;
}

export interface ReadOption extends OpenOption {
	highWatermark?: number;
	encoding?: BufferEncoding;
}

export interface WriteOption extends OpenOption {
	encoding?: BufferEncoding;
	recursive?: boolean;
}

export interface CopyOption {
	encoding?: BufferEncoding;
	rename?: string;
}
