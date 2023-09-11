import { Injectable } from '@angular/core';
import { Producto } from '../shared/interface';
import { PRODUCTOS_BASE } from '../shared/data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private productos: Producto[] = PRODUCTOS_BASE;

  constructor() {}

  getProductos(): Producto[] {
    return this.productos;
  }
}
