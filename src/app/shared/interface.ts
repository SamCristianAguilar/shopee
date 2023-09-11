export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}
export interface Venta {
  productoId: number;
  nombreProducto: string;
  precio: number;
  cantidad: number;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}
