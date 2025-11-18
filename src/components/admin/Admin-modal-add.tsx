import React, { useState, useEffect } from 'react';

type UserFormData = {
  nombre: string;
  correo: string;
  estado: string;
  compras: number | string;
};

type PedidoFormData = {
  id: string;
  fecha: string;
  total: number | string;
  estado: string;
};

type ProductoFormData = {
  id: string;
  nombre: string;
  precio: number | string;
  stock: number | string;
  estado: string;
};

type FormDataType = UserFormData | PedidoFormData | ProductoFormData;

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'usuario' | 'pedido' | 'producto';
  onSubmit: (data: FormDataType) => void;
  initialData?: FormDataType;
}

const ModalForm: React.FC<ModalFormProps> = ({
  isOpen,
  onClose,
  type,
  onSubmit,
  initialData
}) => {
  const [formData, setFormData] = useState<FormDataType>({} as FormDataType);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({} as FormDataType);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const renderFields = () => {
    switch (type) {
      case 'usuario':
        return (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Nombre:</label>
              <input
                name="nombre"
                value={(formData as UserFormData).nombre || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Correo:</label>
              <input
                name="correo"
                value={(formData as UserFormData).correo || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Estado:</label>
              <select
                name="estado"
                value={(formData as UserFormData).estado || 'Activo'}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Compras:</label>
              <input
                type="number"
                name="compras"
                value={(formData as UserFormData).compras || 0}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>
          </>
        );

      case 'pedido':
        return (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">ID:</label>
              <input
                name="id"
                value={(formData as PedidoFormData).id || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Fecha:</label>
              <input
                type="date"
                name="fecha"
                value={(formData as PedidoFormData).fecha || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Total:</label>
              <input
                type="number"
                name="total"
                value={(formData as PedidoFormData).total || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Estado:</label>
              <select
                name="estado"
                value={(formData as PedidoFormData).estado || 'Pendiente'}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Completado">Completado</option>
              </select>
            </div>
          </>
        );

      case 'producto':
        return (
          <>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">ID:</label>
              <input
                name="id"
                value={(formData as ProductoFormData).id || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Nombre Producto:</label>
              <input
                name="nombre"
                value={(formData as ProductoFormData).nombre || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Precio:</label>
              <input
                type="number"
                name="precio"
                value={(formData as ProductoFormData).precio || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Stock:</label>
              <input
                type="number"
                name="stock"
                value={(formData as ProductoFormData).stock || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Estado:</label>
              <select
                name="estado"
                value={(formData as ProductoFormData).estado || 'Disponible'}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
              >
                <option value="Disponible">Disponible</option>
                <option value="Agotado">Agotado</option>
              </select>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md mx-4 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? 'Editar' : 'Añadir'} {type}
        </h2>

        <form onSubmit={handleSubmit}>
          {renderFields()}

          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Guardar
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ModalForm;
