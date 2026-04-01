// =====================================================
// Structure de donnees : Binary Heap (tas binaire)
// Utilise pour la file de priorite des patients.
// Le patient avec le score le plus eleve sort en premier
// => max-heap.
// Complexite : insertion O(log n), extraction O(log n).
// =====================================================

class MaxHeap {
  constructor() {
    this.heap = []; // tableau d'objets { score, data }
  }

  size() { return this.heap.length; }

  peek() { return this.heap[0] || null; }

  // Ajoute un element et remonte (sift-up)
  insert(item) {
    this.heap.push(item);
    this._siftUp(this.heap.length - 1);
  }

  // Extrait le patient le plus prioritaire (racine)
  extractMax() {
    if (this.heap.length === 0) return null;
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._siftDown(0);
    }
    return top;
  }

  toArray() {
    // Renvoie la liste triee par priorite decroissante (copie)
    const copy = new MaxHeap();
    copy.heap = [...this.heap];
    const result = [];
    while (copy.size() > 0) result.push(copy.extractMax());
    return result;
  }

  _siftUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[i].score > this.heap[parent].score) {
        [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
        i = parent;
      } else break;
    }
  }

  _siftDown(i) {
    const n = this.heap.length;
    while (true) {
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      let largest = i;
      if (l < n && this.heap[l].score > this.heap[largest].score) largest = l;
      if (r < n && this.heap[r].score > this.heap[largest].score) largest = r;
      if (largest !== i) {
        [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
        i = largest;
      } else break;
    }
  }
}

module.exports = MaxHeap;
