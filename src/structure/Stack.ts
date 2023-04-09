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

export default class Stack<T> {
	private stack: { [keys: number]: T };
	private position: number;

	/**
	 * Create a stack
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	public constructor() {
		this.stack = {};
		this.position = 0;
	}

	/**
	 * Add data
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @param data Data you want to add into stack
	 * @returns
	 */
	public add(data: T): T {
		this.stack[this.getPosition()] = data;
		this.position++;
		return data;
	}

	/**
	 * Delete the first element in the stack
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @returns `true` means success, `false` the opposite
	 */
	public delete(): boolean {
		if (this.getPosition() === 0) return false;
		this.position--;
		return true;
	}

	/**
	 * See the first element in the stack
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @returns The first element in the stack
	 */
	public seek(): T | undefined {
		return this.stack[this.getPosition()];
	}

	/**
	 * Clear whole stack
	 * @author SuiBian9516
	 * @since v0.0.1
	 */
	public clear(): void {
		this.stack = {};
		this.position = 0;
	}

	/**
	 * Get position of pointer
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @returns Position of pointer in stack
	 */
	public getPosition(): number {
		return this.position;
	}

	/**
	 * Check if stack is empty
	 * @author SuiBian9516
	 * @since v0.0.1
	 * @returns `true` means the stack is empty, `false` the opposite
	 */
	public isEmpty(): boolean {
		return this.getPosition() === 0;
	}
}
