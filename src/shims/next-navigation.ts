export class NotFoundError extends Error {
  constructor() {
    super('NEXT_NOT_FOUND');
  }
}

export function notFound(): never {
  throw new NotFoundError();
}
