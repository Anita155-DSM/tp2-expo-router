import { Link, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function NoEncontrado() {
  // Mostramos la URL exacta a la que se intentó entrar (G1: "que muestre
  // la URL inexistente"), no un mensaje genérico.
  const pathname = usePathname();

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Página no encontrada</Text>
      <Text style={estilos.ruta}>{pathname}</Text>

      <Link href="/" asChild>
        <Pressable style={estilos.boton}>
          <Text style={estilos.botonTexto}>Volver al inicio</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ruta: {
    fontFamily: 'monospace',
    color: '#666',
    marginTop: 8,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#4F46E5',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
});
