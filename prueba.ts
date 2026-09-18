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