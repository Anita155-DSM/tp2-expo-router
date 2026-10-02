import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { ARTICULOS_AYUDA } from '@/data/ayuda';

export default function AyudaIndice() {
  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>¿En qué te podemos ayudar?</Text>

      {Object.entries(ARTICULOS_AYUDA).map(([slug, articulo]) => (
        // slug puede tener varios segmentos (ej. "pagos/tarjeta"): se arma
        // la URL completa como string, el catch-all de abajo la recibe
        // ya partida en un array.
        <Link key={slug} href={`/ayuda/${slug}`} asChild>
          <Pressable style={estilos.fila}>
            <Text style={estilos.nombre}>{articulo.titulo}</Text>
          </Pressable>
        </Link>
      ))}

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
    marginBottom: 16,
  },
  fila: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  nombre: {
    fontSize: 16,
  },
});
