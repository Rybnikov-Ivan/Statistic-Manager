export class ServiceResponse <T> {
    public responseCode: string | undefined;
    public responseMessage: string | undefined;
    public responseObject: T | undefined;
}