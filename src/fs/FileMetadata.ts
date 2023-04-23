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
	/**
	 * Refers to file
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	FILE,
	/**
	 * Refers to directory
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	DIRECTORY,
	/**
	 * Refers to symbolic link
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	LINK,
}

//Flag Enum
export enum FileFlag {
	/**
	 * Open file for appending. The file is created if it does not exist
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	APPENDING = 'a',
	/**
	 * It is like `APPENDING`, but fails if the path exists
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	APPENDING_STRICT = 'ax',
	/**
	 * Open file for reading and appending. The file is created if it does not exist
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	APPENDING_READ = 'a+',
	/**
	 * It is like `APPENDING_READ`, but fail if the path exists
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	APPENDING_READ_STRICT = 'ax+',
	/**
	 * Open file for appending in synchronous mode. The file is created if it does not exist
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	APPENDING_SYNC = 'as',
	/**
	 * Open file for reading and appending in synchronous mode. The file is created if it does not exist
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	APPENDING_READ_SYNC = 'as+',
	/**
	 * Open file for reading. An exception occurs if the file does not exist
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	READ_STRICT = 'r',
	/**
	 * Open file for reading and writing. An exception occurs if the file does not exist
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	READ_WRITE_STRICT = 'r+',
	/**
	 * Open file for reading and writing in synchronous mode. Instructs the operating system to bypass the local file system cache
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	READ_WRITE_SYNC = 'rs+',
	/**
	 * Open file for writing. The file is created (if it does not exist) or truncated (if it exists)
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	WRITE = 'w',
	/**
	 * It is like `WRITE`, but fail if the path exists
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	WRITE_STRICT = 'wx',
	/**
	 * Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists)
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	WRITE_READ = 'w+',
	/**
	 * It is like `WRITE_READ`, but fails if the path exists
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	WRITE_READ_STRICT = 'wx+',
}

//Method Interface
export interface OpenOption {
	/**
	 * File flags
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	flag: FileFlag;
	/**
	 * Open mode
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	mode?: string | number;
}

export interface ReadOption extends OpenOption {
	/**
	 * One-time read length
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	highWatermark?: number;
	/**
	 * Buffer encoding
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	encoding?: BufferEncoding;
	/**
	 * Whether return data from cache that has already pushed before read real file or directory
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @deprecated Since v0.0.1, this attribute is deprecated, it will be added some day
	 */
	useCache?: boolean;
}

export interface WriteOption {
	/**
	 * File flag
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	flag?: FileFlag;
	/**
	 * Open mode
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	mode?: string | number;
	/**
	 * Buffer encoding
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	encoding?: BufferEncoding;
	/**
	 * Whether to use recursion
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	recursive?: boolean;
}

export interface CopyOption {
	/**
	 * Buffer encoding
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	encoding?: BufferEncoding;
	/**
	 * If `target` refers to a directory and `source` refers to a file, this attribute will work
	 * This can rename copied file into specific name
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	rename?: string;
	/**
	 * If `target` and `source` both refer to directory, this attribute will work
	 * `CIRCULATION` means circular replication, `RECURSION` means recursive replication
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	method?: 'CIRCULATION' | 'RECURSION';
	/**
	 * Whether copied file should be copied all attributes
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	complete?: boolean;
	/**
	 * Whether overwrite a specific file
	 * If this is `true`, `copy` method may throw an exception if the file already exists
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	overwrite?: boolean;
}
