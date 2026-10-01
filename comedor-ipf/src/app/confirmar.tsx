import { Redirect, router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { useApp } from '@/context/app-context';

export default function Confirmar() {
  const { carrito, notaCarrito, confirmarPedido } = useApp();

  // Si alguien llega acá con el carrito vacío (por ejemplo, volviendo y
  // reabriendo el modal), no hay nada para confirmar: lo mandamos de
  // vuelta. Redirect equivale a router.replace (F1a), así "atrás" no
  // vuelve a este modal vacío (misma razón que F1b).
  if (carrito.length === 0) {
    return <Redirect href="/carrito" />;
  }

  const total = carrito.reduce((acumulado, item) => acumulado + item.plato.precio, 0);

  function handleConfirmar() {
    const numero = confirmarPedido(); // encola el pedido y vacía el carrito
    // replace, no push: si el usuario confirmó, no tiene sentido que
    // "atrás" lo lleve de nuevo a este modal (que ya quedó sin carrito
    // detrás). Se justifica en el README (G5.3).
    router.replace(`/turno/${numero}`);
  }

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Resumen del pedido</Text>

      <ScrollView style={estilos.lista}>
        {carrito.map((item) => (
          <View key={item.clave} style={estilos.fila}>
            <Text style={estilos.nombre}>{item.plato.nombre}</Text>
            <Text style={estilos.precio}>${item.plato.precio}</Text>
          </View>
        ))}
      </ScrollView>

      {notaCarrito ? <Text style={estilos.nota}>Nota: {notaCarrito}</Text> : null}

      <Text style={estilos.total}>Total: ${total}</Text>

      <Pressable style={estilos.boton} onPress={handleConfirmar}>
        <Text style={estilos.botonTexto}>Confirmar</Text>
      </Pressable>

      <DondeEstoy />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  lista: {
    flexGrow: 0,
    maxHeight: 260,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  nombre: {
    fontSize: 15,
  },
  precio: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  nota: {
    marginTop: 12,
    fontStyle: 'italic',
    color: '#444',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  boton: {
    marginTop: 20,
    backgroundColor: '#4F46E5',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
