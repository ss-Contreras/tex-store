'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { FormType, UserFormData, ProductFormData, PedidoFormData } from '@/types/form'

interface ModalFormProps {
  isOpen: boolean
  onClose: () => void
  type: FormType
  onSubmit: (data: any) => void
  initialData?: any
}

export default function ModalForm({
  isOpen,
  onClose,
  type,
  onSubmit,
  initialData
}: ModalFormProps) {
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    setFormData(initialData || {})
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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

        {/* FORMULARIOS DIFERENTES SEGÚN type */}

        {type === 'usuario' && (
          <>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre || ''}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              type="text"
              name="email"
              placeholder="Correo"
              value={formData.email || ''}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              type="text"
              name="rol"
              placeholder="Rol"
              value={formData.rol || ''}
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
              value={formData.nombre || ''}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              type="number"
              name="precio"
              placeholder="Precio"
              value={formData.precio || ''}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock || ''}
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
              value={formData.fecha || ''}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              type="number"
              name="total"
              placeholder="Total"
              value={formData.total || ''}
              onChange={handleChange}
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              type="text"
              name="estado"
              placeholder="Estado"
              value={formData.estado || ''}
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
