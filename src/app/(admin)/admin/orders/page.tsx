'use client'

import React, { useState } from 'react'
import { Pencil, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ModalForm from '@/components/admin/Admin-modal-add'

interface Pedido {
  id: string
  fecha: string
  total: number
  estado: string
}

interface PedidoFormData {
  fecha: string
  total: number | string
  estado: string
  id?: string
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([
    {
      id: '#1234',
      fecha: '2024-03-15',
      total: 150,
      estado: 'Completado',
    },
    {
      id: '#1235',
      fecha: '2024-03-16',
      total: 85,
      estado: 'Pendiente',
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPedido, setEditingPedido] = useState<Pedido | null>(null)

  const handleAddPedido = (): void => {
    setEditingPedido(null)
    setIsModalOpen(true)
  }

  const handleEditPedido = (pedido: Pedido): void => {
    setEditingPedido(pedido)
    setIsModalOpen(true)
  }

  const handleDeletePedido = (id: string): void => {
    setPedidos(prev => prev.filter(p => p.id !== id))
  }

  const handleSubmit = (data: PedidoFormData): void => {
    if (editingPedido) {
      setPedidos(prev =>
        prev.map(p =>
          p.id === editingPedido.id
            ? { ...p, ...data, total: Number(data.total) }
            : p
        )
      )
    } else {
      const newPedido: Pedido = {
        id: data.id ?? `#${Math.floor(Math.random() * 10000)}`,
        fecha: data.fecha,
        total: Number(data.total),
        estado: data.estado,
      }
      setPedidos(prev => [...prev, newPedido])
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Pedidos</h1>
        <Button variant="default" onClick={handleAddPedido}>
          Añadir Pedido
        </Button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase">ID</th>
              <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase">Fecha</th>
              <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase">Total</th>
              <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase">Estado</th>
              <th className="px-6 py-3 text-left font-bold text-gray-700 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pedidos.map(pedido => (
              <tr key={pedido.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{pedido.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pedido.fecha}</td>
                <td className="px-6 py-4 whitespace-nowrap">${pedido.total}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {pedido.estado === 'Completado' ? (
                    <span className="text-green-600 font-semibold">Completado</span>
                  ) : (
                    <span className="text-orange-600 font-semibold">Pendiente</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditPedido(pedido)}
                      aria-label="Editar"
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeletePedido(pedido.id)}
                      aria-label="Eliminar"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="pedido"
        onSubmit={handleSubmit}
        initialData={editingPedido}
      />
    </div>
  )
}
