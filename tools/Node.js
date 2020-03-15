// 实现一个链表
class Node {
	constructor(item, next, prev) {
		this.item = item;
		this.next = next;
		this.prev = prev
	}
}

class LinkList {
	constructor(list = []) {
    let _it = list.length - 1
    let _nx = null
    while (_it >= 0) {
      let n = new Node(list[_it], _nx)
      console.log(n, ' _n')
      if (_nx) {
        _nx.prev = n
      }
      _nx = n
      --_it
    }
    this._head = new Node(null, _nx)
  }

  get head() {
    return this._head
  }
}

new LinkList([{a:1,b:2},{m:4,k:5},{g:13,j:12}])