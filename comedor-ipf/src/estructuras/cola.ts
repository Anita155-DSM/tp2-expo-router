/**
 * teniendo en cuenta la teoria de cola (fifo) el primero en entrar es el primero en salir
 */
export class Cola<T> {
  #items: T[] = [];
  #frente = 0;

  /**agrega un elemento al final de la cola */
  encolar(x: T): void {
    this.#items.push(x);
  }

  desencolar(): T | undefined { /** este saca y devuelve el elemento del frente, y es udefined si está vacía */
    if (this.vacia) return undefined;
    const valor = this.#items[this.#frente];
    this.#frente++;
    return valor;
  }

  /** aca devuelve el elemento del frente sin sacarlo y otra vez, es undefined si está vacía */
  frente(): T | undefined {
    return this.#items[this.#frente];
  }

  /** true si no queda ningún elemento por atender */
  get vacia(): boolean {
    return this.#frente >= this.#items.length;
  }

  get tamanio(): number { 
  /** cantidad de elementos que quedan en la cola (no cuenta los ya sacados)*/
    return this.#items.length - this.#frente;
  }

  /** copia del contenido actual, de frente a final, sin exponer el array real*/
  aArray(): T[] {
    return this.#items.slice(this.#frente);
  }
}
