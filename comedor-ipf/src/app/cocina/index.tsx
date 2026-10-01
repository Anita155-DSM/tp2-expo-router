import { Pressable, StyleSheet, Text, View } from 'react-native';

import DondeEstoy from '@/components/DondeEstoy';
import { useApp } from '@/context/app-context';

export default function Cocina() {
  const { pedidosEnEspera, atenderSiguiente, cerrarSesion } = useApp();

  const frente = pedidosEnEspera[0];
  const cantidadEnEspera = pedidosEnEspera.length;

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>Cocina</Text>
      <Text style={estilos.contador}>{cantidadEnEspera} pedido(s) en espera</Text>

      {frente ? (
        <View style={estilos.tarjeta}>
          <Text style={estilos.numeroTurno}>Turno {frente.numero}</Text>
          {frente.items.map((item) => (
            <Text key={item.clave} style={estilos.item}>
              • {item.plato.nombre}
            </Text>
          ))}
          {frente.nota ? (
            <Text style={estilos.nota}>Nota: {frente.nota}</Text>
          ) : null}
        </View>
      ) : (
        <Text style={estilos.vacio}>No hay pedidos en espera.</Text>
      )}

      <Pressable
        style={[estilos.boton, !frente && estilos.botonDeshabilitado]}
        onPress={atenderSiguiente}
        disabled={!frente}
      >
        <Text style={estilos.botonTexto}>Atender siguiente</Text>
      </Pressable>

      {/* Al cerrar sesión, conSesion pasa a false en el Context, el guard
          de Stack.Protected de "cocina" en el layout raíz cambia, y toda
          esta sección desaparece sola del historial (misma idea que F2b
          con login, pero al revés). No hace falta llamar a router.back()
          ni redirigir a mano. */}
      <Pressable style={estilos.botonCerrarSesion} onPress={cerrarSesion}>
        <Text style={estilos.botonCerrarSesionTexto}>Cerrar sesión</Text>
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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  contador: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
    marginBottom: 16,
  },
  tarjeta: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
  },
  numeroTurno: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    fontSize: 15,
  },
  nota: {
    marginTop: 8,
    fontStyle: 'italic',
    color: '#444',
  },
  vacio: {
    fontSize: 15,
    color: '#666',
  },
  boton: {
    marginTop: 20,
    backgroundColor: '#4F46E5',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  botonDeshabilitado: {
    opacity: 0.4,
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botonCerrarSesion: {
    marginTop: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  botonCerrarSesionTexto: {
    color: '#b00020',
    fontWeight: '600',
  },
});
