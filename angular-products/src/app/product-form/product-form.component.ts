import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  @Input() product: Product = { id: 0, nombre: '', descripcion: '', precio: 0, stock: 0, usuario_creador: { id: 0, nombre: '', email: '', password: '', rol: '' } };
  @Input() isViewMode: boolean = false;
  @Output() closeForm = new EventEmitter<void>();
  @Output() productUpdated = new EventEmitter<void>();

  constructor(private productService: ProductService) {}

  saveProduct() {
    if (this.product.id) {
      this.productService.updateProduct(this.product.id, this.product).subscribe(() => {
        alert('✅ Producto actualizado exitosamente.');
        this.productUpdated.emit();
        this.closeForm.emit();
      });
    } else {
      this.productService.createProduct(this.product).subscribe(() => {
        alert('✅ Producto creado exitosamente.');
        this.productUpdated.emit();
        this.closeForm.emit();
      });
    }
  }

  deleteProduct() {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(this.product.id).subscribe(() => {
        alert('🗑️ Producto eliminado correctamente.');
        this.productUpdated.emit();
        this.closeForm.emit();
      });
    }
  }
}
