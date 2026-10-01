import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { CATEGORIAS, platosPorCategoria, type Plato } from '@/data/platos';

export default function Menu() {
  return (
    <ScrollView style={estilos.contenedor} contentContainerStyle={{ padding: 16 }}>
      {CATEGORIAS.map((categoria) => (
        <View key={categoria.clave} style={estilos.seccion}>
          <Text style={estilos.tituloSeccion}>{categoria.etiqueta}</Text>

          {platosPorCategoria(categoria.clave).map((plato) => (
            <FilaPlato key={plato.id} plato={plato} />
          ))}
        </View>
      ))}

      <DondeEstoy />
    </ScrollView>
  );
}

function FilaPlato({ plato }: { plato: Plato }) {
  return (
    <Link
      href={{ pathname: '/menu/[id]', params: { id: String(plato.id) } }}
      asChild
    >
      <Pressable style={estilos.fila}>
        <View style={{ flex: 1 }}>
          <Text style={estilos.nombre}>{plato.nombre}</Text>
          <Text style={estilos.descripcion} numberOfLines={1}>
            {plato.descripcion}
          </Text>
        </View>
        <Text style={estilos.precio}>${plato.precio}</Text>
      </Pressable>
    </Link>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  seccion: {
    marginBottom: 20,
  },
  tituloSeccion: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  nombre: {
    fontSize: 16,
    fontWeight: '600',
  },
  descripcion: {
    fontSize: 13,
    color: '#666',
  },
  precio: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});
