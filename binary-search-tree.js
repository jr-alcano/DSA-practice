class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  insertRecursively(val, current = this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }

    if (val < current.val) {
      if (!current.left) {
        current.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.left);
    } else {
      if (!current.right) {
        current.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.right);
    }
  }

  find(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return current;
      current = val < current.val ? current.left : current.right;
    }
    return undefined;
  }

  findRecursively(val, current = this.root) {
    if (!current) return undefined;
    if (val === current.val) return current;
    if (val < current.val) return this.findRecursively(val, current.left);
    return this.findRecursively(val, current.right);
  }

  dfsPreOrder() {
    let result = [];
    function traverse(node) {
      if (!node) return;
      result.push(node.val);
      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  dfsInOrder() {
    let result = [];
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      result.push(node.val);
      traverse(node.right);
    }
    traverse(this.root);
    return result;
  }

  dfsPostOrder() {
    let result = [];
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      result.push(node.val);
    }
    traverse(this.root);
    return result;
  }

  bfs() {
    let result = [];
    let queue = [this.root];
    while (queue.length) {
      let current = queue.shift();
      if (current) {
        result.push(current.val);
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
    }
    return result;
  }

  remove(val, node = this.root, parent = null) {
    while (node) {
      if (val < node.val) {
        parent = node;
        node = node.left;
      } else if (val > node.val) {
        parent = node;
        node = node.right;
      } else {
        // Node found
        if (node.left && node.right) {
          // Two children: find successor
          let successor = node.right;
          let successorParent = node;
          while (successor.left) {
            successorParent = successor;
            successor = successor.left;
          }
          node.val = successor.val;
          node = successor;
          parent = successorParent;
          val = successor.val;
        } else {
          let child = node.left || node.right;
          if (!parent) {
            this.root = child;
          } else if (parent.left === node) {
            parent.left = child;
          } else {
            parent.right = child;
          }
          return node;
        }
      }
    }
    return undefined;
  }

  isBalanced() {
    function height(node) {
      if (!node) return 0;
      return 1 + Math.max(height(node.left), height(node.right));
    }

    function check(node) {
      if (!node) return true;
      let leftHeight = height(node.left);
      let rightHeight = height(node.right);
      let balanced = Math.abs(leftHeight - rightHeight) <= 1;
      return balanced && check(node.left) && check(node.right);
    }

    return check(this.root);
  }

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) return undefined;

    let current = this.root;
    let parent = null;

    while (current.right) {
      parent = current;
      current = current.right;
    }

    if (current.left) {
      current = current.left;
      while (current.right) {
        current = current.right;
      }
      return current.val;
    }

    return parent.val;
  }
}

module.exports = BinarySearchTree;
