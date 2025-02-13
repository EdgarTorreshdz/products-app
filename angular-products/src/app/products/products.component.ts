import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/product.model';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MenuComponent } from '../layout/menu/menu.component';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFormComponent, MenuComponent, MaterialModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  showForm = false;
  productToEdit: Product | null = null;
  userId: number | null = null;
  isViewMode = false;

  constructor(private productService: ProductService, private authService: AuthService) {}

  ngOnInit() {
    this.loadUser();
    this.loadProducts();
  }

  loadUser() {
    const user = this.authService.getUserFromToken();
    if (user) {
      this.userId = user.id;
    }
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      (error) => {
        if (error.status === 401 || error.status === 403) {
          alert('No autorizado. Por favor, inicie sesión nuevamente.');
        } else {
          alert('Error al cargar productos. Inténtelo más tarde.');
        }
      }
    );
  }

  addProduct() {
    this.productToEdit = {
      id: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      usuario_creador: { id: 0, nombre: '', email: '', password: '', rol: '' }
    };
    this.isViewMode = false;
    this.showForm = true;
  }

  editProduct(product: Product) {
    this.productToEdit = { ...product };
    this.isViewMode = false;
    this.showForm = true;
  }

  viewProduct(product: Product) {
    this.productToEdit = { ...product };
    this.isViewMode = true;
    this.showForm = true;
  }

  deleteProduct(id: number) {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe(
        () => {
          this.products = this.products.filter(product => product.id !== id);
        },
        (error) => {
          alert('Error al eliminar el producto. Inténtelo más tarde.');
        }
      );
    }
  }

  closeForm() {
    this.showForm = false;
    this.loadProducts();
  }

  isProductOwner(product: Product): boolean {
    return this.userId !== null && product.usuario_creador && product.usuario_creador.id === this.userId;
  }
}
