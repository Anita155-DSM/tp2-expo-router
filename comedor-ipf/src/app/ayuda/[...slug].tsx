import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { ARTICULOS_AYUDA } from '@/data/ayuda';

export default function AyudaArticulo() {
  // Con [...slug], slug siempre llega como ARRAY de segmentos (E2):
  // /ayuda/horarios        -> slug = ['horarios']
  // /ayuda/pagos/tarjeta   -> slug = ['pagos', 'tarjeta']
  const { slug } = useLocalSearchParams<{ slug: string[] }>();

  const clave = slug.join('/');
  const articulo = ARTICULOS_AYUDA[clave];

  if (!articulo) {
    return (
      <View style={estilos.contenedor}>
        <Stack.Screen options={{ title: 'Ayuda' }} />
        <Text style={estilos.mensaje}>No encontramos ayuda sobre "{clave}".</Text>
        <DondeEstoy />
      </View>
    );
  }

  return (
    <View style={estilos.contenedor}>
      <Stack.Screen options={{ title: articulo.titulo }} />
      <Text style={estilos.titulo}>{articulo.titulo}</Text>
      <Text style={estilos.contenido}>{articulo.contenido}</Text>
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
    marginBottom: 8,
  },
  contenido: {
    fontSize: 15,
    color: '#444',
  },
  mensaje: {
    fontSize: 15,
    color: '#666',
  },
});
