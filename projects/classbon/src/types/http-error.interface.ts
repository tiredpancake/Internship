interface Problem{
    title:string;
    status:number;
    detail?:string;
    errors?:Record <string,string[]>

}

interface BadRequestError extends Problem {}
interface UnathorizedError extends Problem {}
interface ValidationError extends Problem {}
interface NotFoundError extends Problem {}
interface UnhandledException extends Problem {}
interface NetworkError extends Problem {}

type ApiError =BadRequestError | NetworkError | NotFoundError | UnathorizedError | UnhandledException | ValidationError;


export type {
    Problem,
    BadRequestError,
    UnathorizedError,
    ValidationError,
    NotFoundError,
    UnhandledException,
    NetworkError,
    ApiError
};