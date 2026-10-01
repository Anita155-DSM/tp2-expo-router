import { Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { buscarPlato } from '@/data/platos';
import { useApp } from '@/context/app-context';

export default function DetallePlato() {
  // useLocalSearchParams siempre devuelve texto, aunque los ids de platos.ts
  // sean numéricos (ver E1): por eso buscarPlato ya espera un string y
  // convierte internamente antes de comparar.
  const { id } = useLocalSearchParams<{ id: string }>();
  const { agregarAlCarrito } = useApp();

  const plato = buscarPlato(id);

  // Validación del parámetro (G2.6): si el id no corresponde a ningún plato,
  // mostramos un mensaje en vez de romper la pantalla.
  if (!plato) {
    return (
      <View style={estilos.contenedor}>
        <Stack.Screen options={{ title: 'No encontrado' }} />
        <Text style={estilos.mensajeError}>No existe el plato {id}.</Text>
        <DondeEstoy />
      </View>
    );
  }

  return (
    <View style={estilos.contenedor}>
      {/* Título del header = nombre del plato (G1), recién acá lo sabemos. */}
      <Stack.Screen options={{ title: plato.nombre }} />

      <Text style={estilos.nombre}>{plato.nombre}</Text>
      <Text style={estilos.precio}>${plato.precio}</Text>
      <Text style={estilos.descripcion}>{plato.descripcion}</Text>

      <Pressable
        style={estilos.boton}
        onPress={() => agregarAlCarrito(plato)}
      >
        <Text style={estilos.botonTexto}>Agregar al carrito</Text>
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
  nombre: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  precio: {
    fontSize: 20,
    color: '#4F46E5',
    marginTop: 4,
  },
  descripcion: {
    fontSize: 15,
    color: '#444',
    marginTop: 12,
  },
  boton: {
    marginTop: 24,
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
  mensajeError: {
    fontSize: 16,
    color: '#b00020',
  },
});
