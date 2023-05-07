var __defProp = Object.defineProperty;
var __publicField = (obj, key, value) => {
  if (typeof key !== "symbol")
    key += "";
  if (key in obj)
    return __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value});
  return obj[key] = value;
};
class Node {
  constructor(value) {
    this.value = value;
    this.next = this.prev = null;
  }
  remove() {
    this.prev.next = this.next;
    this.next.prev = this.prev;
  }
  insertBetween(prev, next) {
    this.next = next;
    this.prev = prev;
    prev.next = next.prev = this;
  }
}
class Circularray {
  constructor(values = []) {
    __publicField(this, "size", 0);
    __publicField(this, "pointer", null);
    if (Array.isArray(values))
      values.forEach((value) => this.push(value));
    else
      this.push(values);
  }
  set length(length) {
    if (length < 0) {
      throw new Error(`Invalid negative length ${length} for Circularr.`);
    }
    if (length === 0) {
      this.pointer = null;
      this.size = 0;
    } else {
      if (length < this.size / 2) {
        let curr = this.pointer;
        for (let i = 0; i < length - 1; i++)
          curr = curr.next;
        curr.next = this.pointer;
        this.pointer.prev = curr;
        this.size = length;
      } else {
        let diff = this.size - length;
        while (diff--)
          this.pop();
      }
    }
  }
  get length() {
    return this.size;
  }
  push(value) {
    const node = new Node(value);
    this.size++;
    if (!this.pointer) {
      this.pointer = node.next = node.prev = node;
    } else {
      node.insertBetween(this.pointer.prev, this.pointer);
    }
    return this;
  }
  unshift(value) {
    return this.push(value).rotate(1);
  }
  pop() {
    if (!this.pointer)
      return void 0;
    const value = this.pointer.prev.value;
    this.size--;
    if (this.size === 0) {
      this.pointer = null;
    } else {
      this.pointer.prev.remove();
    }
    return value;
  }
  shift() {
    if (!this.pointer)
      return void 0;
    const value = this.pointer.value;
    this.size--;
    if (this.size === 0) {
      this.pointer = null;
    } else {
      this.pointer.remove();
      this.pointer = this.pointer.next;
    }
    return value;
  }
  rotate(offset) {
    offset %= this.size;
    if (offset > 0)
      while (offset--)
        this.pointer = this.pointer.prev;
    else
      while (offset++)
        this.pointer = this.pointer.next;
    return this;
  }
  toArray(direction = "next") {
    const items = [];
    if (!this.size)
      return items;
    let node = this.pointer;
    do {
      items.push(node.value);
      node = node[direction];
    } while (!Object.is(node, this.pointer));
    return items;
  }
}
var circularray = Circularray;
//export default circularray;
