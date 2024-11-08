import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ServiciosTokenService } from '../servicios/servicios-token.service';

@Injectable({
  providedIn: 'root'
})
export class GuardsPostService implements CanActivate{
  realRol!: string;
  constructor(private tokenService: ServiciosTokenService,
    private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const expectedRol = route.data['expectedRol'];//posible error
      const roles = this.tokenService.getAuthorities();
      this.realRol = 'user';
      roles.forEach(rol => {
        if (rol === 'ROLE_ADMIN') {
          this.realRol = 'admin';
        }
      });
      if (!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
}
