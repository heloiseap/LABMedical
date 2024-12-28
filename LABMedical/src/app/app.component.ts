import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuLateralComponent } from './componentes/menu-lateral/menu-lateral.component';
import { ToolbarComponent } from './componentes/toolbar/toolbar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, MenuLateralComponent, ToolbarComponent]
})
export class AppComponent implements OnInit{
  title = 'LABMedical';
  ngOnInit(){
    localStorage.setItem("login", "heloise@email.com");
    localStorage.setItem("password", "123456");
    localStorage.setItem("permition", "doutor");
  
  }

}
