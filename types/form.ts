// src/types/form.ts

// Tipos individuales
export interface UserFormData {
  id?: string
  nombre: string
  email: string
  rol: string
}

export interface ProductFormData {
  id?: string
  nombre: string
  precio: number | string
  stock: number | string
}

export interface PedidoFormData {
  id?: string
  fecha: string
  total: number | string
  estado: string
}

// Tipo para la unión general
export type FormDataType = UserFormData | ProductFormData | PedidoFormData

// Tipo de formulario según el nombre
export type FormType = 'usuario' | 'producto' | 'pedido'

// Mapa para elegir qué tipo corresponde a cada nombre
export interface FormDataMap {
  usuario: UserFormData
  producto: ProductFormData
  pedido: PedidoFormData
}
