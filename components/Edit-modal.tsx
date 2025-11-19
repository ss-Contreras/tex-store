import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';

interface ProductFormData {
  nombre: string;
  precio: number | string;
  stock: number | string;
  estado: string;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  initialData?: ProductFormData;
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    nombre: '',
    precio: '',
    stock: '',
    estado: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        nombre: '',
        precio: '',
        stock: '',
        estado: '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Producto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label>Nombre</Label>
              <Input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Precio</Label>
              <Input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Stock</Label>
              <Input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Estado</Label>
              <Input
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Guardar</Button>
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
