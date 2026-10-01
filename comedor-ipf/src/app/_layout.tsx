import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AppProvider, useApp } from '@/context/app-context';

/**
 * Ancla (tabs) debajo en la pila cuando se entra por un deep link a una ruta
 * del Stack raíz (ej. /categorias/bebidas), en vez de que esa ruta quede sola
 * sin nada debajo. Así "atrás" siempre puede volver a las tabs.
 */
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function LayoutRaiz() {
  return (
    // Envuelve toda la app: lo necesitan los gestos del Drawer (deslizar para abrirlo).
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <NavegacionRaiz />
      </AppProvider>
    </GestureHandlerRootView>
  );
}

function NavegacionRaiz() {
  // conSesion viene del Context: decide qué pantallas existen (login vs cocina).
  const { conSesion } = useApp();

  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
      {/* Las tabs manejan su propio header (o cada pantalla el suyo);
          sin este headerShown: false quedaría un header duplicado arriba. */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen name="categorias/[categoria]" options={{ title: 'Categoría' }} />
      <Stack.Screen name="buscar" options={{ title: 'Buscar' }} />
      <Stack.Screen name="turno/[numero]" options={{ title: 'Tu turno' }} />

      {/* Modal: confirmar tapa las tabs, como pide G1. */}
      <Stack.Screen
        name="confirmar"
        options={{ presentation: 'modal', title: 'Confirmar pedido' }}
      />

      {/* Protegida: solo existe SIN sesión. Al loguearse, conSesion pasa a true
          y esta pantalla deja de existir para el navegador -> se cierra sola,
          sin necesitar router.back() (F2b). */}
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen
          name="login"
          options={{ presentation: 'modal', title: 'Ingreso cocina' }}
        />
      </Stack.Protected>

      {/* Protegida: solo existe CON sesión. Tiene su propio _layout (Drawer)
          adentro de src/app/cocina/. */}
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="cocina" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
