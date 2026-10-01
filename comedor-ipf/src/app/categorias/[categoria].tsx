import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { CATEGORIAS, platosPorCategoria } from '@/data/platos';

export default function Categoria() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();

  // Validación del parámetro (G2.6): "categoria" llega como texto libre
  // desde la URL, puede ser cualquier cosa (ej. /categorias/no-existe).
  const info = CATEGORIAS.find((c) => c.clave === categoria);

  if (!info) {
    return (
      <View style={estilos.contenedor}>
        <Stack.Screen options={{ title: 'Categoría' }} />
        <Text style={estilos.mensaje}>
          "{categoria}" no es una categoría válida.
        </Text>
        <DondeEstoy />
      </View>
    );
  }

  const platos = platosPorCategoria(categoria);

  return (
    <View style={estilos.contenedor}>
      <Stack.Screen options={{ title: info.etiqueta }} />

      <FlatList
        data={platos}
        keyExtractor={(plato) => String(plato.id)}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <Text style={estilos.mensaje}>Todavía no hay platos cargados acá.</Text>
        }
        renderItem={({ item: plato }) => (
          <Link
            href={{ pathname: '/menu/[id]', params: { id: String(plato.id) } }}
            asChild
          >
            <Pressable style={estilos.fila}>
              <Text style={estilos.nombre}>{plato.nombre}</Text>
              <Text style={estilos.precio}>${plato.precio}</Text>
            </Pressable>
          </Link>
        )}
      />

      <DondeEstoy />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
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
  mensaje: {
    padding: 16,
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
  },
});
