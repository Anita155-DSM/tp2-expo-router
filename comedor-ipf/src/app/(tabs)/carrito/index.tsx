import { Link, router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { useApp } from '@/context/app-context';

export default function Carrito() {
  const { carrito, puedeDeshacer, deshacerUltimo } = useApp();

  const total = carrito.reduce((acumulado, item) => acumulado + item.plato.precio, 0);
  const hayItems = carrito.length > 0;

  return (
    <View style={estilos.contenedor}>
      {hayItems ? (
        <FlatList
          data={carrito}
          keyExtractor={(item) => item.clave}
          renderItem={({ item }) => (
            <View style={estilos.fila}>
              <Text style={estilos.nombre}>{item.plato.nombre}</Text>
              <Text style={estilos.precio}>${item.plato.precio}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={estilos.vacio}>Todavía no agregaste nada al carrito.</Text>
      )}

      <View style={estilos.resumen}>
        <Text style={estilos.total}>Total: ${total}</Text>

        {/* Deshabilitado cuando la pila de deshacer está vacía (G2.3). */}
        <Pressable
          style={[estilos.boton, estilos.botonSecundario, !puedeDeshacer && estilos.botonDeshabilitado]}
          onPress={deshacerUltimo}
          disabled={!puedeDeshacer}
        >
          <Text style={estilos.botonSecundarioTexto}>Deshacer último</Text>
        </Pressable>

        <Link href="/carrito/nota" asChild>
          <Pressable style={[estilos.boton, estilos.botonSecundario]}>
            <Text style={estilos.botonSecundarioTexto}>Agregar nota para la cocina</Text>
          </Pressable>
        </Link>

        {/* Confirmar pedido abre el modal de confirmación (/confirmar);
            la confirmación real (y el router.replace a /turno/:numero)
            pasa ahí, no acá. */}
        <Pressable
          style={[estilos.boton, !hayItems && estilos.botonDeshabilitado]}
          onPress={() => router.push('/confirmar')}
          disabled={!hayItems}
        >
          <Text style={estilos.botonTexto}>Confirmar pedido</Text>
        </Pressable>
      </View>

      <DondeEstoy />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 16,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  nombre: {
    fontSize: 16,
  },
  precio: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  vacio: {
    fontSize: 15,
    color: '#666',
    marginTop: 24,
    textAlign: 'center',
  },
  resumen: {
    marginTop: 16,
    gap: 10,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  boton: {
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
  botonSecundario: {
    backgroundColor: '#e5e5ea',
  },
  botonSecundarioTexto: {
    color: '#222',
    fontWeight: '600',
  },
  botonDeshabilitado: {
    opacity: 0.4,
  },
});
