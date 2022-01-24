
export interface LoginDetails{
    [index: string]: any;
    emailOrPhone: string | number | undefined;
    password: string | undefined;
}