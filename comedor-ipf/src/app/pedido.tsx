import { Redirect } from 'expo-router';

// URL vieja de la versión anterior de la app (G1): /pedido ya no existe,
// pero no queremos romper links guardados de esa época, así que redirige.
export default function PedidoViejo() {
  return <Redirect href="/carrito" />;
}
