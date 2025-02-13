import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { MaterialModule } from '../../material.module';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  user: User | null = null;
  userName: string = 'Usuario';

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.user = this.authService.getUserFromToken();
    this.userName = this.user ? this.user.nombre : 'Usuario';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
