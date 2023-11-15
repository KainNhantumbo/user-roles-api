import { join } from 'node:path';
import { format } from 'node:util';
import { existsSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { appendFile, mkdir } from 'node:fs/promises';
import type { LoggerProps, IRes, IReq, INext } from '../types';
import { pino } from 'pino';
import {} from 'pino-pretty';

export default class Logger {
  private readonly date: string = new Date().toISOString();
  private readonly fileName: string;
  private readonly message: string;

  constructor(props: LoggerProps) {
    this.fileName = props.fileName;
    this.message = props.message;
  }

  public async register() {
    const LOGFILE = `${this.date}\t${randomUUID()}\t${this.message}\n\n\n`;
    try {
      if (!existsSync(join(__dirname, '..', 'logs'))) {
        await mkdir(join(__dirname, '..', 'logs'));
      }
      await appendFile(join(__dirname, '..', 'logs', this.fileName), LOGFILE);
    } catch (error) {
      console.error(error);
    }
  }

  public logger(req: IReq, res: IRes, next: INext) {
    this.register();
    console.info(`${req.method}\t${req.path}\t${req.url} `);
    next();
  }

  static info(message: string) {
    console.debug(`[${format(new Date().toISOString())}]`, message);
  }
}
