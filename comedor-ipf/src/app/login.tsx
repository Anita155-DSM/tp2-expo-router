import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { useApp } from '@/context/app-context';

export default function Login() {
  const { iniciarSesion } = useApp();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState(false);

  function handleIngresar() {
    const ok = iniciarSesion(usuario, clave);
    setError(!ok);
    // Si ok es true, conSesion pasa a true en el Context, el guard de
    // Stack.Protected cambia, y este modal se cierra solo (F2b) -> no hace
    // falta llamar a router.back() ni router.replace acá.
  }

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Ingreso de cocina</Text>

      <TextInput
        style={estilos.input}
        value={usuario}
        onChangeText={setUsuario}
        placeholder="Usuario"
        autoCapitalize="none"
      />

      <TextInput
        style={estilos.input}
        value={clave}
        onChangeText={setClave}
        placeholder="Clave"
        secureTextEntry
      />

      {error && (
        <Text style={estilos.error}>Usuario o clave incorrectos.</Text>
      )}

      <Pressable style={estilos.boton} onPress={handleIngresar}>
        <Text style={estilos.botonTexto}>Ingresar</Text>
      </Pressable>

      <DondeEstoy />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    marginBottom: 12,
  },
  error: {
    color: '#b00020',
    marginBottom: 12,
    textAlign: 'center',
  },
  boton: {
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
