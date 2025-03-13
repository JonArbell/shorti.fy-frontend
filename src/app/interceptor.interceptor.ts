import { HttpInterceptorFn } from '@angular/common/http';

export const interceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('jwtToken');

  if(token){

    const newReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    
    return next(newReq);
  }
  

  return next(req);
};
