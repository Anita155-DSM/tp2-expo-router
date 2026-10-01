import { FlatList, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { useApp } from '@/context/app-context';

export default function CocinaAtendidos() {
  // atendidos ya viene ordenado del más reciente al más antiguo
  // (lo invertimos una sola vez, adentro del Context, al atenderSiguiente()).
  const { atendidos } = useApp();

  return (
    <View style={estilos.contenedor}>
      <FlatList
        data={atendidos}
        keyExtractor={(pedido) => String(pedido.numero)}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <Text style={estilos.vacio}>Todavía no se atendió ningún pedido.</Text>
        }
        renderItem={({ item: pedido }) => (
          <View style={estilos.tarjeta}>
            <Text style={estilos.numero}>Turno {pedido.numero}</Text>
            {pedido.items.map((item) => (
              <Text key={item.clave} style={estilos.item}>
                • {item.plato.nombre}
              </Text>
            ))}
            {pedido.nota ? (
              <Text style={estilos.nota}>Nota: {pedido.nota}</Text>
            ) : null}
          </View>
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
  tarjeta: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  numero: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  item: {
    fontSize: 14,
  },
  nota: {
    marginTop: 6,
    fontStyle: 'italic',
    color: '#444',
  },
  vacio: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});
