'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  FormType,
  UserFormData,
  ProductFormData,
  PedidoFormData
} from '@/types/form'

// Tipo por cada formulario
type FormDataMap = {
  usuario: UserFormData
  producto: ProductFormData
  pedido: PedidoFormData
}

interface ModalFormProps<T extends FormType> {
  isOpen: boolean
  onClose: () => void
  type: T
  onSubmit: (data: FormDataMap[T]) => void
  initialData?: FormDataMap[T]
}

export default function ModalForm<T extends FormType>({
  isOpen,
  onClose,
  type,
  onSubmit,
  initialData
}: ModalFormProps<T>) {

  const [formData, setFormData] = useState<FormDataMap[T]>({} as FormDataMap[T])

  useEffect(() => {
    setFormData((initialData ?? {}) as FormDataMap[T])
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    onSubmit(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">

        <h2 className="text-xl font-bold mb-4">
          {initialData ? 'Editar' : 'Crear'} {type}
        </h2>

        {/* FORMULARIOS */}

        {type === 'usuario' && (
          <>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={(formData as UserFormData).nombre || ''}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="text"
              name="correo"
              placeholder="Correo"
              // value={(formData as UserFormData).correo || ''}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="text"
              name="estado"
              placeholder="Estado"
              // value={(formData as UserFormData).estado || ''}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="number"
              name="compras"
              placeholder="Compras"
              // value={(formData as UserFormData).compras || ''}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
          </>
        )}

        {type === 'producto' && (
          <>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre del producto"
              value={(formData as ProductFormData).nombre || ''}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="number"
              name="precio"
              placeholder="Precio"
              value={(formData as ProductFormData).precio || ''}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={(formData as ProductFormData).stock || ''}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
          </>
        )}

        {type === 'pedido' && (
          <>
            <input
              type="date"
              name="fecha"
              value={(formData as PedidoFormData).fecha || ''}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="number"
              name="total"
              placeholder="Total"
              value={(formData as PedidoFormData).total || ''}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="text"
              name="estado"
              placeholder="Estado"
              value={(formData as PedidoFormData).estado || ''}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />
          </>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button variant="default" onClick={handleSubmit}>Guardar</Button>
        </div>

      </div>
    </div>
  )
}
