import { Link, router, useLocalSearchParams } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { CATEGORIAS, platos } from '@/data/platos';

export default function Buscar() {
  // q y categoria viven en la URL, no en un useState local: así la búsqueda
  // se puede compartir con un link (G2.7) y volver atrás no la pierde.
  const { q = '', categoria = '' } = useLocalSearchParams<{
    q?: string;
    categoria?: string;
  }>();

  const resultados = platos.filter((plato) => {
    const coincideTexto = plato.nombre.toLowerCase().includes(q.toLowerCase());
    const coincideCategoria = categoria === '' || plato.categoria === categoria;
    return coincideTexto && coincideCategoria;
  });

  return (
    <View style={estilos.contenedor}>
      <TextInput
        style={estilos.input}
        value={q}
        onChangeText={(texto) => router.setParams({ q: texto })}
        placeholder="Buscar un plato..."
      />

      <View style={estilos.filtros}>
        <Chip
          etiqueta="Todas"
          activo={categoria === ''}
          onPress={() => router.setParams({ categoria: '' })}
        />
        {CATEGORIAS.map((c) => (
          <Chip
            key={c.clave}
            etiqueta={c.etiqueta}
            activo={categoria === c.clave}
            onPress={() => router.setParams({ categoria: c.clave })}
          />
        ))}
      </View>

      <FlatList
        data={resultados}
        keyExtractor={(plato) => String(plato.id)}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <Text style={estilos.mensaje}>No encontramos ningún plato así.</Text>
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

function Chip({
  etiqueta,
  activo,
  onPress,
}: {
  etiqueta: string;
  activo: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[estilos.chip, activo && estilos.chipActivo]}
      onPress={onPress}
    >
      <Text style={[estilos.chipTexto, activo && estilos.chipTextoActivo]}>
        {etiqueta}
      </Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
  },
  input: {
    margin: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#e5e5ea',
  },
  chipActivo: {
    backgroundColor: '#4F46E5',
  },
  chipTexto: {
    fontSize: 13,
    color: '#222',
  },
  chipTextoActivo: {
    color: 'white',
    fontWeight: '600',
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
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
  },
});
