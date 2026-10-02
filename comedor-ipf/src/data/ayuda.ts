/**
 * Contenido de ayuda, indexado por el "slug" (la parte de la URL después
 * de /ayuda/). Profundidad variable a propósito, para probar el catch-all:
 * "horarios" tiene un solo segmento, "pagos/efectivo" tiene dos.
 */
export const ARTICULOS_AYUDA: Record<string, { titulo: string; contenido: string }> = {
  horarios: {
    titulo: 'Horarios de atención',
    contenido: 'El comedor atiende de lunes a viernes, de 8 a 20 hs.',
  },
  'pagos/efectivo': {
    titulo: 'Pago en efectivo',
    contenido: 'Se paga directo en la caja del comedor al retirar el pedido.',
  },
  'pagos/tarjeta': {
    titulo: 'Pago con tarjeta',
    contenido: 'Aceptamos débito y crédito en la caja, con el lector de la cocina.',
  },
};
