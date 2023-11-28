export interface mailConfigs{
    service: string,
    host: string,
    port: number,
    requireTLS: boolean,
    auth: {
        user: string,
        pass: string
    }
}