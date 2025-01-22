import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { MenuLateralComponent } from './componentes/menu-lateral/menu-lateral.component';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './componentes/toolbar/toolbar.component';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, MenuLateralComponent, ToolbarComponent, CommonModule],
})
export class AppComponent implements OnInit {
  constructor(
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute
  ) {}
  isLogin = true;
  title = 'LABMedical';
  ngOnInit() {
    this.route.params.subscribe(() => {
      if (this.localStorageService.getItem('token')) {
        this.isLogin = false;
      }
    })
    
  }
}
