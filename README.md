# Comedor IPF

App del comedor del Instituto Politécnico Formosa para pedir comida desde el celular,
hecha con **Expo Router (SDK 57)** + TypeScript, como parte del TP2 de Expo Router
(Taller Complementario · React Native II).

> Las respuestas teóricas y de ejercicios cortos (Partes A a F) están en
> [`RESPUESTAS.md`](./RESPUESTAS.md), no en este archivo.

## Instalación y arranque

```bash
cd comedor-ipf
npm install
npx expo start
```

Si aparece un error de `ERESOLVE` al instalar (choque de versiones `react`/`react-dom`,
conocido en esta versión del SDK 57), correr:

```bash
npm install --legacy-peer-deps
```

## Árbol de rutas de `src/app` y navegador de cada `_layout`

```
src/app/
├── _layout.tsx                  → Stack (raíz)
│     Envuelve toda la app. Acá vive el AppProvider (sesión, carrito, cola de
│     pedidos, pila de atendidos) y el GestureHandlerRootView que necesita el
│     Drawer. Protege /login (solo sin sesión) y /cocina (solo con sesión)
│     con <Stack.Protected>. unstable_settings.anchor = "(tabs)" para que un
│     deep link a una ruta del Stack raíz deje las tabs ancladas debajo.
│
├── +not-found.tsx               → pantalla 404, muestra la URL exacta con usePathname()
├── pedido.tsx                   → <Redirect href="/carrito" /> (URL vieja de la app anterior)
├── login.tsx                    → modal, protegida: guard={!conSesion}
├── confirmar.tsx                → modal, resumen del pedido + confirmarPedido()
├── buscar.tsx                   → buscador, estado 100% en la URL (sin useState)
│
├── turno/
│   └── [numero].tsx             → posición en la cola + tiempo estimado
│
├── categorias/
│   └── [categoria].tsx          → platos filtrados por categoría
│
├── ayuda/
│   ├── index.tsx                → índice de artículos de ayuda
│   └── [...slug].tsx             → catch-all para cualquier profundidad (/ayuda/pagos/tarjeta, etc.)
│
├── cocina/
│   ├── _layout.tsx              → Drawer
│   │     Dos secciones: Pedidos (index) y Atendidos. Protegido desde el
│   │     Stack raíz, este layout no sabe nada de sesión, solo no se monta
│   │     si el guard de arriba es false.
│   ├── index.tsx                → frente de la cola + "Atender siguiente" + cerrar sesión
│   └── atendidos.tsx            → historial de atendidos, del más reciente al más antiguo
│
└── (tabs)/                      → grupo, no aparece en la URL
    ├── _layout.tsx              → Tabs (expo-router/js-tabs)
    │     3 pestañas: Inicio, Menú, Carrito. Badge con cantidad de ítems
    │     en la pestaña Carrito.
    ├── index.tsx                → Inicio: saludo + tarjetas de acceso rápido
    │
    ├── menu/
    │   ├── _layout.tsx          → Stack (anidado dentro de la tab Menú)
    │   ├── index.tsx            → lista de platos agrupados por categoría
    │   └── [id].tsx             → detalle de un plato, título dinámico = nombre del plato
    │
    └── carrito/
        ├── _layout.tsx          → Stack (anidado dentro de la tab Carrito)
        ├── index.tsx            → items, total, deshacer último, confirmar pedido
        └── nota.tsx             → aclaración para la cocina
```

## Justificación: `replace` vs `push` en el flujo de confirmación

El paso crítico es **`/confirmar` → `/turno/[numero]`**, dentro de `confirmar.tsx`:

```ts
function handleConfirmar() {
  const numero = confirmarPedido();
  router.replace(`/turno/${numero}`);
}
```

Se usa **`router.replace`** y no `router.push` a propósito. Si fuera `push`, la pila
quedaría `[..., carrito, confirmar, turno/7]`, y si el usuario tocara "atrás" desde
`/turno/7`, volvería a `/confirmar` — un modal que ya confirmó un pedido que **ya no
existe en el carrito** (porque `confirmarPedido()` lo vacía), mostrando un resumen en
blanco o roto. Con `replace`, `/confirmar` ni queda en la pila: la pila pasa a ser
`[..., carrito, turno/7]`, y "atrás" desde el turno vuelve directo al carrito (ya
vacío, lo cual sí tiene sentido).

Es la misma lógica que F1b de `RESPUESTAS.md`: una redirección después de una acción
que no tiene sentido deshacer debe reemplazar, no apilar.

## Capturas / video de funcionamiento

> **Completar:** reemplazar cada marcador por una captura de pantalla (o un GIF/video
> corto) de la app corriendo, mostrando el comportamiento descripto.

**Carrito con deshacer**
`<<CAPTURA: agregar 2-3 platos al carrito, tocar "Deshacer último", mostrar que el
último ítem agregado desaparece>>`

**Turno**
`<<CAPTURA: pantalla /turno/:numero después de confirmar un pedido, mostrando el
número de turno y cuántos pedidos hay adelante>>`

**Cocina atendiendo pedidos**
`<<CAPTURA o VIDEO: desde /cocina, tocar "Atender siguiente" y mostrar que el pedido
pasa de "en espera" a aparecer en /cocina/atendidos>>`

**Login / logout**
`<<CAPTURA: el modal de /login cerrándose solo al loguear con éxito, y la sección
cocina desapareciendo al cerrar sesión>>`

**Pantalla 404**
`<<CAPTURA: entrar a una URL inventada (ej. /esto-no-existe) y mostrar el +not-found.tsx
con la URL exacta>>`

## Deep link de prueba

Con `"scheme": "comedoripf"` configurado en `app.json`, este deep link abre directo
el detalle de un plato (plato con id `3`, el Chipá) en Expo Go:

```
exp://<<TU_IP_LOCAL>>:8081/--/menu/3
```

> **Completar `<<TU_IP_LOCAL>>`:** correr `ipconfig` en una terminal (buscar
> "Dirección IPv4", algo como `192.168.1.X`) y reemplazar. Tiene que ser la IP de
> la compu donde corre `npx expo start`, y el celular con Expo Go tiene que estar
> en la **misma red Wi-Fi**.

En una build propia (no Expo Go), el mismo link sería directo:

```
comedoripf://menu/3
```

(ver F4 en `RESPUESTAS.md` para la explicación completa de por qué cambia según
el entorno).
