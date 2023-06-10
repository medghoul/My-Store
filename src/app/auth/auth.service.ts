import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {User} from "./user.model";

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean

}

@Injectable({providedIn: 'root'})
export class AuthService {
    user =new BehaviorSubject<User>(null);
    constructor(private http: HttpClient) {
    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAOr0HYPS4mVsfoH8KGmtqYN8AUMdDBqeQ', {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(errorRes => {
            return this.handleErrorResponse(errorRes)
        }
        ),tap(resData=>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)}))
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAOr0HYPS4mVsfoH8KGmtqYN8AUMdDBqeQ', {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleErrorResponse),tap(resData=>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn)
        }))
    }
    private handleAuthentication(email:string,userId:string,token:string,expiresIn:number) {
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user=new User(email,userId,token,expirationDate);
        this.user.next(user)
    }

    private handleErrorResponse(errorRes) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email not found';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Invalid password';
                break;
            case 'USER_DISABLED':
                errorMessage = 'User disabled';
                break;
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'OPERATION_NOT_ALLOWED' :
                errorMessage = 'Operation not allowed'

        }
        return throwError(errorMessage);
    }
}
