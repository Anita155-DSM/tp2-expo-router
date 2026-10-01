import { Stack } from 'expo-router';

export default function LayoutCarrito() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Carrito' }} />
      {/* Desafío opcional (G4): podría presentarse como formSheet en vez de
          pantalla normal. La dejamos como card por ahora; es un simple cambio
          de "presentation" acá el día que lo encaremos. */}
      <Stack.Screen name="nota" options={{ title: 'Nota para la cocina' }} />
    </Stack>
  );
}
