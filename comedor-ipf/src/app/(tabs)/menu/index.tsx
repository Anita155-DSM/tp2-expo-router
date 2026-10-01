import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { useApp } from '@/context/app-context';

export default function Inicio() {
  const { conSesion } = useApp();

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.saludo}>¡Hola! ¿Qué pedimos hoy?</Text>

      <View style={estilos.tarjetas}>
        <Tarjeta href="/menu" etiqueta="Menú" />
        <Tarjeta href="/buscar" etiqueta="Buscar" />
        <Tarjeta href="/ayuda" etiqueta="Ayuda" />

        {/* Mostramos la tarjeta de Cocina solo si ya hay sesión iniciada:
            si no, el link llevaría a una ruta que ni existe para el navegador
            (ver F2a), mejor ni ofrecerla. */}
        {conSesion && <Tarjeta href="/cocina" etiqueta="Cocina" />}
      </View>

      <DondeEstoy />
    </View>
  );
}

function Tarjeta({ href, etiqueta }: { href: string; etiqueta: string }) {
  return (
    // asChild: el Pressable recibe las props del Link (onPress, etc.)
    // directo, sin que Link agregue su propio elemento envolvente.
    <Link href={href} asChild>
      <Pressable style={estilos.tarjeta}>
        <Text style={estilos.tarjetaTexto}>{etiqueta}</Text>
      </Pressable>
    </Link>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 16,
  },
  saludo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tarjetas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tarjeta: {
    width: 120,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tarjetaTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
});
