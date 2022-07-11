/* tslint:disable */
/* eslint-disable */
/**
* カード(ASCII文字、`$\d^`)5枚を引数に取り、
* 最大のスコアを与える等式を';'区切りで出力します。
* @param {string} a
* @param {string} b
* @param {string} c
* @param {string} d
* @param {string} e
* @returns {string}
*/
export function best_equations(a: string, b: string, c: string, d: string, e: string): string;
/**
* 数雀文字列を計算します。
* 数雀文字列が正しくないときはエラーがスローされます。
* @param {string} equation
* @returns {number}
*/
export function calc_equation(equation: string): number;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly best_equations: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly calc_equation: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
}

/**
* Synchronously compiles the given `bytes` and instantiates the WebAssembly module.
*
* @param {BufferSource} bytes
*
* @returns {InitOutput}
*/
export function initSync(bytes: BufferSource): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
