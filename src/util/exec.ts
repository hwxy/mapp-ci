import { exec, ExecOptions } from 'shelljs';
import createDebug from './debug';
const debug = createDebug('utils/exec');


export interface IExecAsyncOptions extends ExecOptions {
  async?: true
}

const defaultExecAsyncOptions: IExecAsyncOptions = {
  async: true
};

export const execAsync = async (
  command: string,
  options: IExecAsyncOptions = {}
) => {
  console.log('execAsync', { command });
  const _options: any = {
    ...options,
    ...defaultExecAsyncOptions
  };
  return new Promise((resolve, reject) => {
    exec(command, _options, (code: number, stdout: string, stderr: string) => {
      if (code !== 0) {
        const err: Error = new Error();
        err.message = stderr;
        err.name = String(code);
        debug('execAsync error.', { command, code, err });
        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
};
