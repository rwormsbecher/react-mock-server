export interface IHttpResponse {
    status: number;
    error: {message: string}
    data: { content: any};
}