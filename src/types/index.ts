import { Application } from 'express';
import { Response, Request, NextFunction } from 'express';

export type AppProps = { app: Application; port: number };

export type LoggerProps = { message: string; fileName: string };

export type HandledFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

export type { Response as IRes, Request as IReq, NextFunction as INext };

export type QueryOptions = {
  sort: Array<string>;
  limit: number | undefined;
  offset: number | undefined;
};

export type DecodedPayload = { id: string } | null | undefined;
