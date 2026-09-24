import { createContext, useCallback, useContext, useRef, useState } from 'react';
import type { ReactNode } from 'react';

import { Cola } from '@/estructuras/cola';
import { Pila } from '@/estructuras/pila';
import type { Plato } from '@/data/platos';

// ---------- tipos ----------

type ItemCarrito = {
  /** id único de esta línea del carrito (por si se agrega el mismo plato dos veces) */
  clave: string;
  plato: Plato;
};

type AccionCarrito = {
  tipo: 'agregar';
  item: ItemCarrito;
};

export type Pedido = {
  numero: number;
  items: ItemCarrito[];
  nota: string;
};

type SesionUsuario = { usuario: string } | null;

type AppContextValue = {
  // sesión (personal de cocina)
  usuario: SesionUsuario;
  conSesion: boolean;
  iniciarSesion: (usuario: string, clave: string) => boolean;
  cerrarSesion: () => void;

  // carrito + pila de deshacer
  carrito: ItemCarrito[];
  notaCarrito: string;
  setNotaCarrito: (nota: string) => void;
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => void;
  puedeDeshacer: boolean;

  // cola de pedidos + pila de atendidos
  confirmarPedido: () => number;
  pedidosEnEspera: Pedido[];
  buscarPedido: (numero: number) => { pedido: Pedido; posicion: number } | undefined;
  atenderSiguiente: () => void;
  atendidos: Pedido[];
};

const AppContext = createContext<AppContextValue | null>(null);

// credenciales fijas del personal de cocina (a propósito, según la consigna)
const USUARIO_COCINA = 'cocina';
const CLAVE_COCINA = '1234';

// contadores simples para asignar ids/turnos únicos durante la sesión de uso
let siguienteNumeroTurno = 1;
let siguienteClaveItem = 1;

export function AppProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<SesionUsuario>(null);

  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [notaCarrito, setNotaCarrito] = useState('');
  const pilaDeshacer = useRef(new Pila<AccionCarrito>());
  const [puedeDeshacer, setPuedeDeshacer] = useState(false);

  const colaPedidos = useRef(new Cola<Pedido>());
  const pilaAtendidos = useRef(new Pila<Pedido>());
  const [pedidosEnEspera, setPedidosEnEspera] = useState<Pedido[]>([]);
  const [atendidos, setAtendidos] = useState<Pedido[]>([]);

  // ---- sesión ----

  const iniciarSesion = useCallback((u: string, c: string) => {
    if (u === USUARIO_COCINA && c === CLAVE_COCINA) {
      setUsuario({ usuario: u });
      return true;
    }
    return false;
  }, []);

  const cerrarSesion = useCallback(() => setUsuario(null), []);

  // ---- carrito + pila de deshacer ----

  const agregarAlCarrito = useCallback((plato: Plato) => {
    const item: ItemCarrito = { clave: `item-${siguienteClaveItem++}`, plato };
    setCarrito((actual) => [...actual, item]);
    // cada vez que se agrega algo, se apila la acción para poder deshacerla después
    pilaDeshacer.current.push({ tipo: 'agregar', item });
    setPuedeDeshacer(!pilaDeshacer.current.vacia);
  }, []);

  const deshacerUltimo = useCallback(() => {
    const accion = pilaDeshacer.current.pop(); // saca la última acción (LIFO)
    setPuedeDeshacer(!pilaDeshacer.current.vacia);
    if (!accion) return;
    setCarrito((actual) => actual.filter((i) => i.clave !== accion.item.clave));
  }, []);

  const vaciarCarrito = useCallback(() => {
    setCarrito([]);
    setNotaCarrito('');
    pilaDeshacer.current = new Pila<AccionCarrito>();
    setPuedeDeshacer(false);
  }, []);

  // ---- cola de pedidos + pila de atendidos ----

  const confirmarPedido = useCallback(() => {
    const numero = siguienteNumeroTurno++;
    const pedido: Pedido = { numero, items: carrito, nota: notaCarrito };
    colaPedidos.current.encolar(pedido); // nadie puede "colarse": solo entra por acá
    setPedidosEnEspera(colaPedidos.current.aArray());
    vaciarCarrito();
    return numero;
  }, [carrito, notaCarrito, vaciarCarrito]);

  const buscarPedido = useCallback((numero: number) => {
    const lista = colaPedidos.current.aArray();
    const posicion = lista.findIndex((p) => p.numero === numero);
    if (posicion === -1) return undefined;
    return { pedido: lista[posicion], posicion }; // posicion 0 = el que sigue
  }, []);

  const atenderSiguiente = useCallback(() => {
    const pedido = colaPedidos.current.desencolar(); // FIFO: el que llegó primero
    setPedidosEnEspera(colaPedidos.current.aArray());
    if (!pedido) return;
    pilaAtendidos.current.push(pedido);
    // "del más reciente al más antiguo" -> el tope de la pila va primero
    setAtendidos([...pilaAtendidos.current.aArray()].reverse());
  }, []);

  const value: AppContextValue = {
    usuario,
    conSesion: usuario !== null,
    iniciarSesion,
    cerrarSesion,
    carrito,
    notaCarrito,
    setNotaCarrito,
    agregarAlCarrito,
    deshacerUltimo,
    puedeDeshacer,
    confirmarPedido,
    pedidosEnEspera,
    buscarPedido,
    atenderSiguiente,
    atendidos,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/** Hook para consumir el contexto desde cualquier pantalla. */
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp debe usarse dentro de <AppProvider>');
  return ctx;
}
