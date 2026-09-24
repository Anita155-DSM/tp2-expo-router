# RESPUESTAS — TP2 Expo Router: rutas, navegación, pilas y colas

## Parte A · Estructuras de datos: la pila y la cola

### A1. Conceptos

**a) ¿Qué significan LIFO y FIFO? ¿Cuál corresponde a la pila y cuál a la cola?**

Lifo significa -> el último en entrar es el primero en salir, esta es la pila. Fifo significa -> el primero en entrar es el primero en salir, esta la cola.

**b) ¿Por qué extremo entra y por qué extremo sale un elemento en cada estructura?**

Pila entra y sale por el mismo extremo (llamado tope, o sea, por ejemplo, cuando apilamos platos vamos sacando desde arriba hacia abajo porque si sacamos el último plato podemos desarmar, o se rompen todos). Cola entra por un extremo (el final) y sale por el otro (el frente, como por ejemplo la fila del comedor, uno se suma atrás y el que se retira es el del frente, y sucesivamente).

**c) Dá un ejemplo de la vida real y otro de una aplicación móvil para cada una.**

Ejemplos de vida real (Cola y Pila)
- Pila - ejemplo "ctrl + Z", este deshace la última acción que hicimos.
- Cola - ejemplo fila de comedor (anteriormente mencionado), atienden y dan comida al que llegó primero.

Ejemplos de App móvil (Cola y Pila)
- Pila - ejemplo historial de pantallas, si uno toca "atrás", volvés a la última pantalla que se abrió.
- Cola - ejemplo cola de notificaciones o mensajes pendientes, se procesan o muestran según el orden que llegaron (11pm llega primero - 12pm llega segundo).

### A2. Seguimiento de una pila

```js
const p = new Pila();
p.push('Inicio');
p.push('Productos');
p.push('Detalle 3');
p.pop();
p.push('Perfil');

console.log(p.tope()); // (1)
console.log(p.pop());  // (2)
console.log(p.tope()); // (3)
console.log(p.vacia);  // (4)
```

**Instrucción → cómo queda la pila:**

1. `push('Inicio')` → `[Inicio]`
2. `push('Productos')` → `[Inicio, Productos]`
3. `push('Detalle 3')` → `[Inicio, Productos, Detalle 3]`
4. `pop()` → quita 'Detalle 3' y queda `[Inicio, Productos]`
5. `push('Perfil')` → `[Inicio, Productos, Perfil]`

**Console.log:**

1. `p.tope()` → `'Perfil'` el último que entró sin sacarlo
2. `p.pop()` → `'Perfil'` lo saca, pila queda `[Inicio, Productos]`
3. `p.tope()` → `false` todavía queda Inicio y Productos

**Estado final de base a tope es:** `[Inicio, Productos]`

### A3. Seguimiento de una cola

```js
// seguimiento-cola.js
const c = new Cola();
c.encolar('Ana');
c.encolar('Beto');
c.desencolar();
c.encolar('Caro');
c.encolar('Dani');

console.log(c.frente());     // (1)
console.log(c.desencolar()); // (2)
console.log(c.vacia);        // (3)
```

**Instrucción → cómo queda la cola:**

1. `encolar('Ana')` → `[Ana]`
2. `encolar('Beto')` → `[Ana, Beto]`
3. `desencolar()` → sale 'Ana' queda `[Beto]`
4. `encolar('Caro')` → `[Beto, Caro]`
5. `encolar('Dani')` → `[Beto, Caro, Dani]`

**Console.log:**

1. `c.frente()` → `'Beto'`
2. `c.desencolar()` → `'Beto'` sale y cola queda `[Caro, Dani]`
3. `c.vacia` → `false`

**Estado final: frente → final →** `[Caro, Dani]`

### A4. Análisis de la implementación

**a) En las clases de clase, el array se declara como #items. ¿Qué significa el # y qué problema evita?**

Es la sintaxis de campo privado de las clases de Javascript (ES2022). `#items` solo se puede leer o modificar desde dentro de la clase, si alguien hace `miPila.#items` desde afuera, es un error de sintaxis. Con eso se evita que alguien se meta desde afuera y toque el array directo, saltándose los métodos (por ejemplo se podría "colar" en la fila si no fuera privado).

**b) La cola usa array.shift() para desencolar. ¿Qué problema de rendimiento tiene con colas muy grandes? ¿Cómo lo resuelven las colas "serias"?**

`shift()` en la cola, el problema de rendimiento: `array.shift()` saca el primer elemento del array y para hacerlo Javascript tiene que recorrer y desplazar todos los demás elementos a una posición atrás (índice i pasa a ser i-1), con una cola pequeña no se nota, pero con miles de elementos, cada `desencolar()` cuesta O(n) en vez de O(1), se vuelve super lento. Las colas serias en vez de mover todo el array, guardan un índice que marca dónde está el frente real y solo van avanzando ese número, sin tocar el resto.

**c) ¿Qué método de array usa la pila para sacar y cuál usa la cola? ¿Por qué no pueden usar el mismo?**

Métodos usados:
- La pila usa `pop()` saca del final del array.
- La cola usa `shift()` saca del principio del array.

No pueden usar el mismo porque cada estructura saca por un extremo distinto: la pila necesita el último que entró (final del array = pop), la cola necesita el primero que entró (principio del array = shift).

### A5. Programación: una cola eficiente

```ts
class ColaEficiente<T> {
  #items: T[] = [];
  #frente = 0;

  encolar(x: T) {
    this.#items.push(x);
  }

  desencolar(): T | undefined {
    if (this.vacia) return undefined;
    const valor = this.#items[this.#frente];
    this.#frente++;
    return valor;
  }

  frente(): T | undefined {
    return this.#items[this.#frente];
  }

  get vacia(): boolean {
    return this.#frente >= this.#items.length;
  }

  get tamanio(): number {
    return this.#items.length - this.#frente;
  }
}
```

En vez de usar `shift()`, esta cola guarda un índice `#frente` que va avanzando cada vez que se desencola algo, sin mover el resto del array. Así todos los métodos quedan en O(1).

### A6. Pila y cola dentro de Expo Router

**a) ¿Qué estructura describe el historial de pantallas de un Stack? ¿Qué pantalla es la visible y qué operación hace "atrás"?**

Cuando navegamos con un Stack, que es un navegador básico de Expo Router, cada pantalla nueva que abrimos se apila arriba de la anterior, la pantalla visible es siempre la que está al tope (la última) de esa pila, nunca vemos lo que está anterior, mientras esté apilado. La operación "atrás" hace un `pop()`, saca la pantalla del tope y nos visualiza la que quedó debajo.

**b) ¿Qué estructura usa Expo Router para las acciones de navegación? ¿Qué pasa si el usuario toca dos links muy rápido?**

Por debajo Expo Router no ejecuta nada, `router.push()` o cada toque de `<Link>` al instante y de cualquier manera los va metiendo en una cola de acciones, las procesa en orden, una por una. Si el usuario toca dos links muy rápido, las dos acciones quedan encoladas en el orden en que se tocaron y se ejecutan en ese mismo orden, no se pisan ni se procesan al revés.

---

## Parte B · Rutas basadas en archivos

### B1. Del archivo a la URL

| Archivo | URL que genera / función |
| --- | --- |
| `src/app/(tabs)/index.tsx` | `/` -> es el índice, y como `(tabs)` está entre paréntesis no aparece en la URL |
| `src/app/acerca.tsx` | `/acerca` |
| `src/app/(tabs)/perfil.tsx` | `/perfil` (de nuevo, el grupo no cuenta) |
| `src/app/(tabs)/productos/index.tsx` | `/productos` |
| `src/app/(tabs)/productos/[id].tsx` | `/productos/:id`, ejemplo `/productos/3` (ruta dinámica) |
| `src/app/docs/[...slug].tsx` | `/docs/lo-que-sea` -> catch-all, agarra uno o más segmentos después de `/docs` |
| `src/app/_layout.tsx` | no genera pantalla, es el archivo que define el navegador (Stack/Tabs/Drawer) de esa carpeta |
| `src/app/+not-found.tsx` | pantalla especial de 404, aparece cuando la URL no existe |
| `src/app/Boton.tsx` | problema -> cualquier archivo adentro de `src/app` se convierte en ruta, no importa el nombre, entonces esto genera sin querer la ruta `/Boton`. Un componente para reusar no debería estar en `src/app`, va en `src/components` |

### B2. De la URL al archivo

| URL | Archivo |
| --- | --- |
| `/categorias/bebidas` (y cualquier categoría) | `src/app/categorias/[categoria].tsx` |
| `/buscar?q=mate&categoria=kiosco` | `src/app/buscar.tsx` -> los query params no forman parte del nombre del archivo |
| `/ayuda/pagos/tarjeta` y `/ayuda/horarios` | `src/app/ayuda/[...slug].tsx` -> con un catch-all alcanza para cualquier profundidad |
| `/ayuda` (con pantalla propia) | `src/app/ayuda/index.tsx` |

### B3. Verdadero o falso

- **a) F.** No hay ninguna tabla de configuración, el archivo mismo dentro de `src/app` ya es la ruta.
- **b) F.** Los `_layout.tsx` no son pantallas que uno visita, solo organizan cómo se navega entre las pantallas de esa carpeta.
- **c) V.** Una carpeta entre paréntesis como `(tabs)` es un grupo, no aparece en la URL.
- **d) F.** `npm install` puede traer una versión que no es compatible con el SDK de Expo que se está usando, por eso conviene `npx expo install`.
- **e) V.** `"main": "expo-router/entry"` en el `package.json` reemplaza al `App.tsx` de toda la vida como punto de entrada.
- **f) V.** `/_sitemap` lista todas las rutas que detectó, sirve para ver rápido qué está generando el sistema de archivos.
- **g) V.** Si hay coincidencia exacta (`docs/index.tsx`) y también un catch-all (`docs/[...slug].tsx`), gana la exacta, entonces `/docs` muestra `docs/index.tsx`.
- **h) V.** Lo chequeé en el `package.json` del proyecto de ejemplo: con SDK 57 el `expo-router` queda en `~57.0.20`, o sea que sí, desde hace un tiempo usan el mismo número mayor que el SDK.

---

## Parte C · Navegar: `<Link>`, `router` y la pila

### C1. Métodos de router

| Método | Qué le hace a la pila |
| --- | --- |
| `router.push(href)` | apila una pantalla nueva, siempre |
| `router.navigate(href)` | apila, excepto si el destino ya es la pantalla visible, ahí solo le cambia los params |
| `router.replace(href)` | cambia la pantalla del tope por otra, la pila no crece |
| `router.back()` | hace pop, saca la del tope |
| `router.dismissTo(href)` | desapila hasta llegar a esa ruta (salta varias de golpe) |
| `router.dismissAll()` | vuelve directo a la primera pantalla de la pila |
| `router.canGoBack()` | devuelve true o false según si hay algo debajo para volver |
| `router.setParams({...})` | cambia los params de la pantalla en la que estoy, sin apilar nada nuevo |

### C2. Simulación de la pila

La pila arranca en `[ /productos ]`.

| # | Instrucción | Pila resultante |
| --- | --- | --- |
| 1 | `router.push("/productos/1")` | `[/productos, /productos/1]` |
| 2 | `router.push("/productos/2")` | `[/productos, /productos/1, /productos/2]` |
| 3 | `router.navigate("/productos/5")` | `[/productos, /productos/1, /productos/2, /productos/5]` -> apila porque el tope actual (`/productos/2`) no es la misma ruta que estoy pidiendo |
| 4 | `router.push("/perfil")` | `[/productos, /productos/1, /productos/2, /productos/5, /perfil]` |
| 5 | `router.replace("/buscar")` | `[/productos, /productos/1, /productos/2, /productos/5, /buscar]` -> reemplaza `/perfil` por `/buscar`, no crece |
| 6 | `router.back()` | `[/productos, /productos/1, /productos/2, /productos/5]` -> pop, saca `/buscar` |
| 7 | `router.dismissTo("/productos")` | `[/productos]` -> desapila todo hasta encontrar `/productos` |
| 8 | `router.canGoBack()` | `false`, porque `/productos` está en la base y no hay nada debajo |

### C3. ¿Link o router?

**a) El usuario toca la tarjeta de un producto en una lista.**
`<Link>`, porque el usuario está tocando algo directamente. Sería un `href` a `/productos/[id]`.

**b) Se guarda un formulario, la API responde OK y hay que mostrar la pantalla de éxito.**
`router` (`router.replace`), porque no es algo que el usuario toca, sino algo que pasa después de una lógica async (esperar la respuesta de la API). Uso `replace` para que si el usuario toca "atrás" no vuelva al formulario ya enviado.

**c) Botón "Cancelar" dentro de un modal.**
`router.back()`, cierra el modal y vuelve a donde estaba antes.

**d) Después de un login exitoso hay que ir a la pantalla principal.**
`router.replace('/')`, para que "atrás" no vuelva al login.

**e) Volver desde el detalle de un pedido directamente a la lista de pedidos, que quedó tres pantallas más abajo.**
`router.dismissTo('/pedidos')`, salta directo hasta esa pantalla sin tener que hacer `back()` tres veces.

### C4. Escribí el código

**a)**
```tsx
<Link href={{ pathname: '/productos/[id]', params: { id: '8' } }}>
  Ver producto 8
</Link>
```

**b)**
```tsx
<Link href="/perfil" push>
  Ir al perfil
</Link>
```

**c)**
```tsx
<Link href="/carrito" asChild>
  <Pressable style={styles.boton}>
    <Text>Ir al carrito</Text>
  </Pressable>
</Link>
```

### C5. Pensar

En la web, cada `<Link>` es un `<a href>` real, entonces el usuario puede abrirlo en otra pestaña con click derecho o ctrl+click, copiar el link para mandárselo a alguien, y el navegador lo guarda en su propio historial (con los botones de atrás/adelante del navegador funcionando bien). En el celular no hay barra de direcciones para ver ni copiar nada de eso, pero el sistema de rutas sigue funcionando por dentro igual: sirve para deep links (por ejemplo, si te mandan un link por WhatsApp, se abre justo esa pantalla) y el gesto nativo de "atrás" hace lo mismo que el pop de la pila.

---

## Parte D · Navegadores: Stack, Tabs y Drawer

### D1. Comparación

| | Stack | Tabs | Drawer |
| --- | --- | --- | --- |
| ¿Apila pantallas? | Sí | No, cada pestaña cambia sin apilar (aunque adentro puede tener su propio Stack) | No, cambia de sección sin apilar |
| ¿Cómo cambia de pantalla el usuario? | Navegando (Link o router), la nueva se apila arriba | Tocando una pestaña de la barra | Abriendo el menú lateral (ícono ☰ o deslizando) y tocando una opción |
| ¿Desde dónde se importa en SDK 57? | `expo-router` | `expo-router/js-tabs` | `expo-router/drawer` |
| Caso de uso típico | Lista -> detalle -> checkout | Secciones principales de la app (Inicio, Productos, Perfil) | Muchas secciones que no entran en una barra (bandeja, favoritos, papelera, etc.) |

### D2. Cada tab tiene su pila

El usuario ve el detalle del producto 4 todavía. Esto pasa porque cambiar de tab no resetea ni cierra el Stack que tiene esa tab adentro, cada tab guarda su propia pila por separado. Entonces cuando vuelve a la tab Productos, esa pila sigue exactamente como la dejó (con el detalle del producto 4 arriba). Una app que hace esto todos los días es Instagram: si estás viendo un perfil en una pestaña, cambiás a otra y volvés, seguís en ese mismo perfil.

### D3. ¿Dónde va cada pantalla?

**a) El detalle de un producto, que debe mantener visible la barra de pestañas.** -> dentro de la tab (en el Stack anidado de esa tab).

**b) Un modal para confirmar una compra, que debe tapar la barra de pestañas.** -> en el Stack raíz, con `presentation: 'modal'`.

**c) La pantalla de login que se abre como modal.** -> en el Stack raíz también, como modal.

**d) La pantalla "Mis pedidos anteriores" dentro de la sección Perfil.** -> dentro de la tab Perfil, para que las pestañas sigan visibles.

### D4. Configurar el Stack

**a)** `screenOptions` se aplica a todas las pantallas del Stack de una, y las `options` de un `Stack.Screen` puntual configuran solo esa pantalla (y pisan lo de `screenOptions` si hay algo repetido).

**b)** `(tabs)` tiene `headerShown: false` porque adentro ya hay su propio layout de Tabs, que va a manejar su propio header o dejar que cada pantalla ponga el suyo. Si no lo ponemos en false, quedaría un header del Stack raíz duplicado arriba de todo.

**c)** Sí, la pantalla existe igual aunque no esté declarada en el Stack (Expo Router la agrega sola por el archivo). Declararla sirve para poder darle opciones particulares, como el título o el tipo de `presentation`.

**d)** Cuatro valores de `presentation`: `'card'` (la normal), `'modal'`, `'formSheet'`, `'transparentModal'`. Para una hoja que se abre al 50% uso `'formSheet'` con `sheetAllowedDetents: [0.5]`.

**e)** Poniendo dentro de esa misma pantalla algo como:
```tsx
<Stack.Screen options={{ title: `Producto ${id}` }} />
```
justo junto al resto del JSX que devuelve la pantalla.

### D5. Tabs y Drawer en SDK 57

**a)** Ahora hay que importar `Tabs` desde `'expo-router/js-tabs'` en vez de `'expo-router'` directo (eso quedó deprecado). Hay una alternativa experimental que se llama `NativeTabs`, desde `'expo-router/unstable-native-tabs'`, que usa la barra nativa del sistema en vez de una hecha en JS.

**b)** Necesita `react-native-gesture-handler` y `react-native-reanimated`. En el layout raíz conviene poner un `GestureHandlerRootView` envolviendo todo, para que los gestos (como deslizar para abrir el menú) funcionen bien.

**c)** No hace falta instalarlo aparte, porque en SDK 57 el Drawer ya viene integrado dentro de `expo-router` (se importa de `expo-router/drawer`), no hace falta el paquete viejo de `@react-navigation/drawer`.

**d)** Actúa en el navegador más cercano (el más interno) que tenga algo para sacar. Si estoy en un Stack metido adentro de una tab, `back()` primero hace pop ahí, no en el Stack raíz.

---

## Parte E · Rutas dinámicas, parámetros y hooks

### E1. Encontrá el error

El error es que `useLocalSearchParams` siempre devuelve los params como texto (string), entonces `id` vale `"3"` y no `3`. Cuando se compara `p.id === id`, se está comparando un número (`p.id`) contra un string (`id`), y con `===` (comparación estricta) eso nunca da true, por eso nunca encuentra el producto. Lo mismo pasa con el `if (id === 3)`.

Se corrige convirtiendo el id a número antes de comparar:
```tsx
const producto = productos.find((p) => p.id === Number(id));
if (Number(id) === 3) console.log('Es el chipá');
```

### E2. Catch-all

| URL | slug |
| --- | --- |
| `/docs/react` | `['react']` |
| `/docs/react/hooks/useState` | `['react', 'hooks', 'useState']` |
| `/docs` | no matchea, un catch-all normal (`[...slug]`) necesita al menos un segmento después de `/docs`. Para que `/docs` sola también funcione haría falta un `docs/index.tsx` aparte, o un catch-all opcional con doble corchete `[[...slug]]` |

### E3. Anatomía de una URL

Dada `rutasipf://buscar?q=mate&categoria=bebidas`:

**a)** Scheme: `rutasipf://`. Ruta: `buscar`. Parámetros de búsqueda: `q=mate` y `categoria=bebidas`.

**b)** `useLocalSearchParams()` en `buscar.tsx` devuelve `{ q: 'mate', categoria: 'bebidas' }`.

**c)** No hacen falta corchetes en el archivo, porque los query params no forman parte del nombre del archivo/path, `buscar.tsx` recibe cualquier `?clave=valor` sin tener que declarar cada uno.

**d)** Dos razones para usar `router.setParams({ q: texto })` en vez de `router.push`: primero, `setParams` no apila una pantalla nueva cada vez (si usara `push` en cada letra que el usuario escribe, se armaría una pila enorme de pantallas de búsqueda). Segundo, es más rápido porque solo actualiza los params de la pantalla actual sin volver a montarla entera.

### E4. ¿Dónde estoy?

| Hook | En `/productos/3` | En `/buscar?q=chipa` |
| --- | --- | --- |
| `usePathname()` | `"/productos/3"` | `"/buscar"` |
| `useSegments()` | `["(tabs)", "productos", "[id]"]` | `["buscar"]` |
| `useLocalSearchParams()` | `{ id: "3" }` | `{ q: "chipa" }` |

### E5. Local vs global

**a)** `useLocalSearchParams` da los params de esta pantalla puntual, y no se actualiza si esta pantalla queda tapada por otra abajo en la pila y cambia la URL de arriba. `useGlobalSearchParams` sí se actualiza siempre, aunque la pantalla no esté visible, lo cual puede generar renders de más. Por defecto se usa el local porque es más eficiente.

**b)** `useFocusEffect` corre código cada vez que la pantalla vuelve a tener foco (por ejemplo cuando volvés a ella después de estar en otra). Ejemplo: recargar la lista de "Mis pedidos" cada vez que se vuelve a esa pantalla, por si cambió algo mientras el usuario estaba en otro lado.

**c)** No es un error de Expo Router, es responsabilidad nuestra. Expo Router solo matchea que la URL tenga la forma correcta (`/productos/algo`), pero no sabe si ese producto existe de verdad, eso hay que validarlo adentro de la pantalla.

---

## Parte F · Redirecciones, rutas protegidas y deep links

### F1. Redirect

**a)** `<Redirect href="/productos" />` navega apenas se renderiza esa pantalla, mandando directo a `/productos`. Es lo mismo que hacer `router.replace('/productos')` pero escrito como componente.

**b)** Tiene que reemplazar y no apilar porque si usara push, al tocar "atrás" el usuario volvería justo a la ruta que lo redirige, y esa ruta lo mandaría de nuevo para el mismo lado -> quedaría en un bucle infinito de ida y vuelta.

### F2. Stack.Protected

```tsx
function NavegacionRaiz() {
  const { usuario } = useAuth();
  const conSesion = usuario !== null;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="privado" />
      </Stack.Protected>
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ presentation: 'modal' }} />
      </Stack.Protected>
    </Stack>
  );
}
```

**a)** Si el guard da false, esa pantalla directamente no existe para el navegador, es como si nunca hubiera estado declarada.

**b)** Porque apenas el usuario inicia sesión, `conSesion` pasa a true y el guard de `login` (`!conSesion`) pasa a false automáticamente, entonces esa pantalla deja de existir en el Stack y se cierra sola, sin necesidad de llamar a `router.back()`.

**c)** Ese aviso aparece cuando se intenta navegar a una ruta cuyo guard está en false en ese momento (para el navegador, esa pantalla no existe). Se evita revisando la condición antes de intentar navegar ahí, o armando el flujo para que no se llegue a pedir esa ruta mientras el guard la bloquea.

**d)** La ventaja es que todo el control queda en un solo lugar (el layout raíz), en vez de repetir la misma lógica de "si no hay sesión, redirigir" en cada pantalla protegida por separado. Además con `Stack.Protected` la pantalla ni siquiera llega a existir en el navegador si el guard es false, en cambio con un `<Redirect>` la pantalla sí se renderiza un instante y recién ahí redirige.

### F3. 404, anchor y rutas tipadas

**a)** `+not-found.tsx` es la pantalla que se muestra cuando ninguna ruta coincide con la URL (el 404). Se define en `src/app/+not-found.tsx`.

**b)** `export const unstable_settings = { anchor: "(tabs)" }` define qué pantalla queda "debajo" en la pila cuando alguien entra directo a otra ruta por un deep link. Por ejemplo, si alguien entra directo a `/categorias/bebidas` desde afuera, con este anchor la pantalla `(tabs)` queda debajo en la pila en vez de que `/categorias/bebidas` quede sola. Se define en el `_layout.tsx` correspondiente.

**c)** Con `typedRoutes` activo, escribir `<Link href="/prodcutos" />` (mal escrito) tira un error de TypeScript en el editor/compilación, porque `"/prodcutos"` no coincide con ninguna ruta real de la app. Los tipos se generan solos en `.expo/types` al correr `npx expo start`.

### F4. Deep links

Con `"scheme": "comedoripf"` y la compu en `192.168.1.20`, para abrir `/menu/7`:

| Dónde | URL |
| --- | --- |
| App instalada (build propia) | `comedoripf://menu/7` |
| Expo Go en desarrollo | `exp://192.168.1.20:8081/--/menu/7` |
| Web (`npx expo start --web`) | `http://localhost:8081/menu/7` |

El `/--/` es el separador que usa Expo Go entre la dirección del servidor de desarrollo y la ruta real de la app. El scheme propio (`comedoripf://`) no funciona dentro de Expo Go porque Expo Go es una app genérica que corre un montón de proyectos distintos, no tiene registrado nuestro scheme personalizado — eso solo funciona en una build propia (de desarrollo o producción).

### F5. Errores comunes

**a)** El error "you are passing an array of styles to a child of `<Slot>`" pasa porque `Link asChild` le pasa las props (entre ellas `onPress`) directo al hijo a través de un `Slot`, y ese mecanismo no soporta bien que el hijo reciba un array de estilos directamente. Se soluciona envolviendo el `Pressable` en un componente propio que resuelva el array de estilos adentro.

**b)** Como cualquier archivo dentro de `src/app` se convierte en ruta automáticamente sin importar el nombre, sin querer creó la ruta `/TarjetaProducto`. Se soluciona moviendo ese archivo a `src/components`, ahí afuera no genera ninguna ruta.

**c)** Pasa porque `router.push("/")` apila la pantalla principal arriba de `login`, entonces `login` sigue quedando debajo en el historial. Se soluciona usando `router.replace("/")` en vez de `push`, así el login no queda guardado en la pila.

**d)** Pasa porque `npm install` puede traer una versión de esa librería nativa que no es compatible con la versión del SDK de Expo (ni con la de Expo Go instalada). Se soluciona reinstalando ese paquete con `npx expo install <paquete>`, que elige automáticamente la versión correcta para el SDK del proyecto.
