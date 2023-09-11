import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CarritoService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';
import { Producto, Venta } from 'src/app/shared/interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  productos: Producto[] = [];
  carrito: Venta[] = [];

  constructor(
    private dataService: DataService,
    public carritoService: CarritoService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ionViewWillEnter() {
    this.productos = this.dataService.getProductos();
    this.carrito = this.carritoService.getCarrito();
  }
  async mostrarAlertaProductoAgregado() {
    const toast = await this.toastController.create({
      message: 'Producto agregado al carrito',
      duration: 2000, // Duración en milisegundos. Puedes ajustar este valor.
      color: 'success', // Color verde para indicar éxito.
      position: 'bottom', // Ubicación del toast. Puedes cambiarlo a 'top' si prefieres.
    });

    toast.present();
  }

  agregarAlCarrito(producto: Producto): void {
    const venta: Venta = {
      productoId: producto.id,
      nombreProducto: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    };

    this.carritoService.addProducto(venta);
    this.mostrarAlertaProductoAgregado();
  }

  comprarAhora(producto: Producto): void {
    // Lógica para agregar el producto al carrito y redirigir al usuario al proceso de pago o revisión
    this.router.navigate(['/tabs/carrito']);
    this.agregarAlCarrito(producto);
  }

  navegarACarrito(): void {
    this.router.navigate(['/tabs/carrito']);
    // Reemplaza 'ruta-del-carrito' con la ruta correspondiente en tu aplicación.
  }
}
