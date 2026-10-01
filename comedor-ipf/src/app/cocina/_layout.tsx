import { Drawer } from 'expo-router/drawer';

export default function LayoutCocina() {
  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: 'Pedidos' }} />
      <Drawer.Screen name="atendidos" options={{ title: 'Atendidos' }} />
    </Drawer>
  );
}
