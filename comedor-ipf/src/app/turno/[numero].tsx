import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { useApp } from '@/context/app-context';

export default function Turno() {
  // Mismo cuidado que en menu/[id].tsx: numero llega como string (E1).
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { buscarPedido } = useApp();

  const resultado = buscarPedido(Number(numero));

  // Validación del parámetro (G2.6): si ese turno ya fue atendido (o nunca
  // existió), no mostramos una posición inventada.
  if (!resultado) {
    return (
      <View style={estilos.contenedor}>
        <Stack.Screen options={{ title: 'Turno' }} />
        <Text style={estilos.mensaje}>
          El turno {numero} ya fue atendido o no existe.
        </Text>
        <DondeEstoy />
      </View>
    );
  }

  const { posicion } = resultado;
  // Desafío opcional (G4): tiempo estimado = posición en la cola x 3 minutos.
  const minutosEstimados = posicion * 3;

  return (
    <View style={estilos.contenedor}>
      <Stack.Screen options={{ title: `Turno ${numero}` }} />

      <Text style={estilos.numero}>Tu número es el {numero}</Text>

      {posicion === 0 ? (
        <Text style={estilos.info}>¡Sos el siguiente en la cola!</Text>
      ) : (
        <Text style={estilos.info}>
          Hay {posicion} {posicion === 1 ? 'pedido' : 'pedidos'} delante tuyo.
        </Text>
      )}

      <Text style={estilos.estimado}>Espera estimada: ~{minutosEstimados} min</Text>

      <DondeEstoy />
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
  numero: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 17,
    marginTop: 12,
    textAlign: 'center',
  },
  estimado: {
    fontSize: 15,
    color: '#666',
    marginTop: 8,
  },
  mensaje: {
    fontSize: 16,
    textAlign: 'center',
  },
});
