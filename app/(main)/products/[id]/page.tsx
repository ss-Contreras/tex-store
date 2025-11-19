'use client'

import { Button } from '../../../../components/ui/button';

export default function ProductDetailPage() {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="relative w-full md:w-1/2 h-96">
        {/* Imagen */}
      </div>
      <div className="md:w-1/2">
        {/* Texto */}
        <Button className="mt-4">Añadir al Carrito</Button>
      </div>
    </div>
  );
}
