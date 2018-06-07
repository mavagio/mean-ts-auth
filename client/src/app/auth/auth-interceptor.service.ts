import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements  HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token =  localStorage.getItem('token');
    const authRequest =  req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
    return next.handle(authRequest);
  }
}
