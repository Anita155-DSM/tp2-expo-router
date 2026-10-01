import { StyleSheet, Text, View } from 'react-native';
import { usePathname, useSegments, useLocalSearchParams } from 'expo-router';

/** Cambiar a false antes de entregar, si no se quiere ver este cartel en pantalla. */
const DEBUG = true;

/**
 * Cartel de depuración: muestra qué devuelven los tres hooks de ubicación
 * en la pantalla donde se lo coloque. Pensado para ir al final de cada
 * pantalla, como pide G2.10.
 */
export default function DondeEstoy() {
  const pathname = usePathname();
  const segments = useSegments();
  const params = useLocalSearchParams();

  if (!DEBUG) return null;

  return (
    <View style={estilos.caja}>
      <Text style={estilos.titulo}>¿Dónde estoy?</Text>
      <Text style={estilos.linea}>
        <Text style={estilos.etiqueta}>pathname: </Text>
        {pathname}
      </Text>
      <Text style={estilos.linea}>
        <Text style={estilos.etiqueta}>segments: </Text>
        {JSON.stringify(segments)}
      </Text>
      <Text style={estilos.linea}>
        <Text style={estilos.etiqueta}>params: </Text>
        {JSON.stringify(params)}
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  caja: {
    marginTop: 24,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  linea: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
  etiqueta: {
    fontWeight: 'bold',
  },
});
