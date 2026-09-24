/**
 * teniendo en cuenta la teoria de pila(lifo), el último en entrar es el primero en salir
 *
 * #items es un campo privado: nadie desde afuera de la clase puede tocar
 * el array directamente, solo a través de estos métodos
 */
export class Pila<T> {
  #items: T[] = [];

  /** agrega un elemento arriba de todo (al tope) */
  push(x: T): void {
    this.#items.push(x);
  }

  pop(): T | undefined {   /** scca y devuelve el elemento del tope, es undefined si está vacía. */
    return this.#items.pop();
  }

  /** Ddevuelve el elemento del tope sin sacarlo y es undefined si está vacía. */
  tope(): T | undefined {
    return this.#items.at(-1);
  }

  get vacia(): boolean {   /** true si no hay ningún elemento. */
    return this.#items.length === 0;
  }

  /** cantidad de elementos actuales */
  get tamanio(): number {
    return this.#items.length;
  }

  aArray(): T[] { /** copia del contenido, de base a tope, sin exponer el array real*/
    return [...this.#items];
  }
}
