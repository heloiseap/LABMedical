import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router,private changeDetectorRef: ChangeDetectorRef) {}
  temPermissao: boolean = false;
  nomeUser: string = '';
  mostrar = false
  
  ngOnInit() {
    this.temPermissao = this.authService.estaAutenticado()//this.tokenService.temPermissao()
    //todo fix
    this.nomeUser = this.authService.nomeUser()//this.tokenService.nomeMedico() || ''
    this.changeDetectorRef.detectChanges();

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      // Update properties and trigger change detection
      this.temPermissao = this.authService.estaAutenticado()
      this.nomeUser = this.authService.nomeUser();
      this.changeDetectorRef.detectChanges();
    });
  }


  sair() {
    this.authService.logout()
    this.router.navigate(['login'])

  }
}
