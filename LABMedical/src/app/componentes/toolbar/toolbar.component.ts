import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  constructor(private tokenService: TokenService, private router: Router,private changeDetectorRef: ChangeDetectorRef) {}
  temPermissao: boolean = false;
  nomeUser: string = '';
  mostrar = false
  
  ngOnInit() {
    this.temPermissao = this.tokenService.temPermissao()
    this.nomeUser = this.tokenService.nomeMedico() || ''
    this.changeDetectorRef.detectChanges();

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      // Update properties and trigger change detection
      this.temPermissao = this.tokenService.temPermissao();
      this.nomeUser = this.tokenService.nomeMedico() || '';
      this.changeDetectorRef.detectChanges();
    });
  }


  sair() {
    this.tokenService.setLogado('false');
    this.tokenService.setMedico('');
    this.changeDetectorRef.detectChanges()
    this.router.navigate(['login'])
  }
}
