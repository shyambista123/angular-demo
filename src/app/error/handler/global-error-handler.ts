import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{
    handleError(error: any): void {
        console.log('Global Error Handler : ', error);
        throw new Error("Method not implemented.");
    }
}