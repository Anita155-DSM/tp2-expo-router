import { Stack } from 'expo-router';

export default function LayoutMenu() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Menú' }} />
      {/* El título real ("nombre del plato") lo pone la propia pantalla
          [id].tsx con su <Stack.Screen options={{ title: ... }} /> interno,
          una vez que sabe qué plato es. Acá solo dejamos un título genérico
          de arranque. */}
      <Stack.Screen name="[id]" options={{ title: 'Detalle' }} />
    </Stack>
  );
}
