import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { useApp } from '@/context/app-context';

export default function NotaCarrito() {
  const { notaCarrito, setNotaCarrito } = useApp();

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.etiqueta}>Aclaración para la cocina</Text>
      <Text style={estilos.ayuda}>Ej.: "sin sal", "la milanesa bien cocida"...</Text>

      <TextInput
        style={estilos.input}
        value={notaCarrito}
        onChangeText={setNotaCarrito}
        placeholder="Escribí la aclaración acá"
        multiline
      />

      {/* Ya se guardó en el Context con cada onChangeText; "Listo" solo vuelve
          al carrito, no hace falta un guardado explícito aparte. */}
      <Pressable style={estilos.boton} onPress={() => router.back()}>
        <Text style={estilos.botonTexto}>Listo</Text>
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
  etiqueta: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ayuda: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 15,
  },
  boton: {
    marginTop: 16,
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
});
