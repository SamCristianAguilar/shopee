import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/cart.service';
import { Venta } from 'src/app/shared/interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  carrito: Venta[] = [];

  constructor(public carritoService: CarritoService, private router: Router) {}

  ionViewWillEnter() {
    this.carrito = this.carritoService.getCarrito();
    if (this.carrito.length === 0) {
      this.router.navigate(['/tabs/productos']); // Redirige a la página de productos si el carrito está vacío
    }
  }

  eliminarDelCarrito(index: number): void {
    this.carritoService.eliminarProducto(index);
    // Verifica si el carrito está vacío después de eliminar el producto
    if (this.carritoService.getCarrito().length === 0) {
      this.router.navigate(['/tabs/productos']); // Redirige al listado de productos
    }
  }

  efectuarCompra() {
    this.router.navigate(['/tabs/factura']);
  }
}
