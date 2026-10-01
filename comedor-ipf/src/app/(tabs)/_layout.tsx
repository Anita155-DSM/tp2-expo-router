import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router/js-tabs';

import { useApp } from '@/context/app-context';

export default function LayoutTabs() {
  const { carrito } = useApp();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#4F46E5' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* menu/ tiene su propio _layout.tsx (Stack) adentro, por eso headerShown: false
          acá: si no, quedaría el header de esta tab Y el del Stack interno, duplicados. */}
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menú',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" size={size} color={color} />
          ),
        }}
      />

      {/* Lo mismo para carrito/: Stack propio adentro. El badge muestra
          la cantidad de ítems, y se oculta solo si el carrito está vacío. */}
      <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          headerShown: false,
          tabBarBadge: carrito.length > 0 ? carrito.length : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
