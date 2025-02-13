import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterRequest } from '../models/auth.model';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MaterialModule],
  encapsulation: ViewEncapsulation.None

})
export class RegisterComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  register(): void {
    if (this.registerForm.valid) {
      const userData: RegisterRequest = this.registerForm.value;
      this.authService.register(userData).subscribe(
        () => {
          alert('Registro exitoso. Ahora puedes iniciar sesión.');
          this.router.navigate(['/login']);
        },
        (error) => {
          alert('Error en el registro');
          console.error(error);
        }
      );
    }
  }
}
