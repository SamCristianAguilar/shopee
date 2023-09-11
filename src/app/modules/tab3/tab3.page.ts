import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CarritoService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  carrito: any[] = [];
  subtotal!: number;
  iva!: number;
  total!: number;

  constructor(
    public carritoService: CarritoService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async ionViewWillEnter() {
    this.carrito = this.carritoService.getCarrito();

    if (this.carrito.length === 0) {
      this.router.navigate(['/tabs/productos']); // Redirige a la página de productos si el carrito está vacío
      return;
    } else {
      const toast = await this.toastController.create({
        message: 'Compra existosa',
        duration: 2000, // Duración en milisegundos. Puedes ajustar este valor.
        color: 'success', // Color verde para indicar éxito.
        position: 'bottom', // Ubicación del toast. Puedes cambiarlo a 'top' si prefieres.
      });

      toast.present();
    }

    // Usa los métodos del servicio para obtener los valores
    this.subtotal = this.carritoService.getSubtotal();
    this.iva = this.carritoService.getIVA();
    this.total = this.carritoService.getTotal();
  }

  regresarInicio(): void {
    this.carritoService.vaciarCarrito();
    this.router.navigate(['/tabs/productos']); // Asumiendo que '/tabs/tab1' es la ruta de tus productos
  }
}
