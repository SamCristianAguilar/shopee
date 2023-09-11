import { Injectable } from '@angular/core';
import { Venta } from '../shared/interface';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private carrito: Venta[] = [];

  constructor() {}

  getCarrito(): Venta[] {
    return this.carrito;
  }
  eliminarProducto(index: number): void {
    this.carrito.splice(index, 1);
  }

  addProducto(venta: Venta): void {
    // Busca si el producto ya está en el carrito
    const itemExistente = this.carrito.find(
      (item) => item.productoId === venta.productoId
    );

    if (itemExistente) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      itemExistente.cantidad += venta.cantidad;
    } else {
      // Si no está en el carrito, añade la venta al carrito
      this.carrito.push(venta);
    }
  }

  vaciarCarrito(): void {
    this.carrito = [];
  }

  getSubtotal(): number {
    return this.carrito.reduce(
      (acc, venta) => acc + venta.precio * venta.cantidad,
      0
    );
  }

  getIVA(): number {
    return this.getSubtotal() * 0.19;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getIVA();
  }

  getNumeroDeItems(): number {
    return this.carrito.reduce((total, item) => total + item.cantidad, 0);
  }
}
