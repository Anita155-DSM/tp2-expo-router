/**
 * tomando los datos de ejemplo del comedor, 12 platos repartidos en 4 categorías
 * datos puros
 */

export type Categoria = 'desayuno' | 'almuerzo' | 'bebidas' | 'kiosco';

export type Plato = {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
};

/** lista de categorías con una etiqueta bonita para mostrar en pantalla:) */
export const CATEGORIAS: { clave: Categoria; etiqueta: string }[] = [
  { clave: 'desayuno', etiqueta: 'Desayuno' },
  { clave: 'almuerzo', etiqueta: 'Almuerzo' },
  { clave: 'bebidas', etiqueta: 'Bebidas' },
  { clave: 'kiosco', etiqueta: 'Kiosco' },
];

export const platos: Plato[] = [
  // todo lo q es desayuno
  {
    id: 1,
    nombre: 'Chipá',
    precio: 800,
    descripcion: 'Chipá casero recién horneado, la especialidad de la casa.',
    categoria: 'desayuno',
  },
  {
    id: 2,
    nombre: 'Tostadas con dulce de leche',
    precio: 700,
    descripcion: 'Dos tostadas de pan casero con dulce de leche.',
    categoria: 'desayuno',
  },
  {
    id: 3,
    nombre: 'Café con leche',
    precio: 500,
    descripcion: 'Café con leche caliente, tamaño grande.',
    categoria: 'desayuno',
  },

  // todo lo que es almuerzo
  {
    id: 4,
    nombre: 'Milanesa con puré',
    precio: 2200,
    descripcion: 'Milanesa de carne con puré de papas casero.',
    categoria: 'almuerzo',
  },
  {
    id: 5,
    nombre: 'Guiso de lentejas',
    precio: 1800,
    descripcion: 'Guiso casero de lentejas con verduras.',
    categoria: 'almuerzo',
  },
  {
    id: 6,
    nombre: 'Empanadas (x3)',
    precio: 1500,
    descripcion: 'Tres empanadas de carne cortadas a cuchillo.',
    categoria: 'almuerzo',
  },
  {
    id: 7,
    nombre: 'Tarta de verdura',
    precio: 1600,
    descripcion: 'Porción de tarta de acelga y queso.',
    categoria: 'almuerzo',
  },

  // todo lo que es bebidas
  {
    id: 8,
    nombre: 'Agua mineral',
    precio: 500,
    descripcion: 'Botella de agua mineral 500 ml.',
    categoria: 'bebidas',
  },
  {
    id: 9,
    nombre: 'Gaseosa',
    precio: 600,
    descripcion: 'Gaseosa línea Coca-Cola, 500 ml.',
    categoria: 'bebidas',
  },
  {
    id: 10,
    nombre: 'Jugo exprimido',
    precio: 700,
    descripcion: 'Jugo de naranja exprimido en el momento.',
    categoria: 'bebidas',
  },

  // todo lo de kiosco
  {
    id: 11,
    nombre: 'Alfajor',
    precio: 400,
    descripcion: 'Alfajor de chocolate relleno de dulce de leche.',
    categoria: 'kiosco',
  },
  {
    id: 12,
    nombre: 'Barrita de cereal',
    precio: 350,
    descripcion: 'Barrita de cereal con frutos secos.',
    categoria: 'kiosco',
  },
];

/** esta funcion devueve un plato por id, o undefined si no existe (el id llega como texto desde la URL) */
export function buscarPlato(id: string): Plato | undefined {
  return platos.find((p) => p.id === Number(id));
}

/**esta funcion devuelve todos los platos de una categoría dada */
export function platosPorCategoria(categoria: string): Plato[] {
  return platos.filter((p) => p.categoria === categoria);
}
