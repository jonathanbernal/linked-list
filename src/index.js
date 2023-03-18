const Node = (value = null, next = null) => {
    const getValue = () => value;
    const setValue = (newValue) => value = newValue;

    return {getValue, setValue, next};
}

const LinkedList = () => {
    let head = null;
    let tail = null;
    // We keep track of the size to avoid a costly
    // size() operation. This makes it O(1).
    let listSize = 0;

    const getHead = () => head;
    const getTail = () => tail;

    /**
     * This function adds a value to the end of the list
     * @param {*} value the value to add to the end of the list.
     */
    const append = (value) => {
        let newNode = Node(value);

        if(head === null) {
            head = newNode;
            tail = newNode;
        } else {
            tail.next = newNode;
            tail = newNode;
        }
        listSize += 1;
    }

    /**
     * This function inserts the requested value at the beginning of the list.
     * @param {*} value to add at the beginning of the list.
     */
    const prepend = (value) => {
        // This is a safety check in case the user tries to prepend
        // to an empty linked list.
        if(head === null) {
            append(value);
            listSize += 1;
            return;
        }
        let newNode = Node(value);
        newNode.next = head;
        head = newNode;
        listSize += 1;
    }

    /**
     * This function returns the number of items in the list.
     * @returns The size of the list
     */
    const size = () => listSize;

    // This internal function returns the node at the location.
    // Users should only be able to see the data in the node.
    // at() is used for that purpose.
    const nodeAt = (index) => {
        let current = head;
        let currentIndex = 0;

        if(index > size()) {
            throw Error('Error on LinkedList.at(). Provided index argument exceeds list size.');
        }

        while(current !== null) {
            if(currentIndex === index) {
                return current;
            } else {
                currentIndex += 1;
                current = current.next;
            }
        }
    }

    /**
     * This function returns the Node value at the listed index.
     * @param {*} index the index of the linked list to retrieve
     * @returns the node value at the specified index.
     */
    const at = (index) => nodeAt(index).getValue();

    /**
     * This function removes the last element in the list.
     * @returns the removed element from the list.
     */
    const pop = () => {
        if (!tail) {
            throw Error('Error on LinkedList.pop(). Attempt to remove an item from an empty list.');
        }

        let current = head;
        let nodeToPop = tail;

        while(current.next !== tail) {
            current = current.next;
        }

        tail = current;
        current.next = null;
        listSize -= 1;

        return nodeToPop.getValue();
    }

    /**
     * This function checks if a value exists in the list.
     * Strings are case sensitive.
     * @param {*} value the value to look for in the list.
     * @returns true if it exists, false otherwise.
     */
    const contains = (value) => {
        let current = head;

        while(current !== null) {
            if(current.getValue() === value) {
                return true;
            }
            current = current.next;
        }
        // The value is not contained in the list.
        return false;
    }

    /**
     * This function finds the position at which the provided
     * value is located (if it exists).
     * @param {*} value The value to find in the list.
     * @returns the index of the value in the list, null if not found.
     */
    const find = (value) => {
        let index = 0;
        let current = head;

        while(current !== null) {
            if(current.getValue() === value) {
                return index;
            }
            current = current.next;
            index += 1;
        }
        return null; // The value does not exist in the list.
    }

    const insertAt = (value, index) => {
        // Used by the last two cases since we need a reference
        // to the node before the index node.
        let previousNode = null;

        // insert at the start of the list.
        if (index === 0) {
            prepend(value);
            return;
        }

        let newNode = Node(value);

        // Appending at the tail location does not change the tail.
        if (index === size() - 1) {
            // Grab the node before the target node.
            previousNode = nodeAt(index);
            newNode.next = tail;
            previousNode.next = newNode;
        } else { // insert elsewhere based on index
            previousNode = nodeAt(index - 1);
            newNode.next = previousNode.next;
            previousNode.next = newNode;
        }
    }

    /**
     * This function returns a string representation of the linked list.
     * @returns the string representing the items in the linked list.
     */
    const toString = () => {
        let current = head;
        let outputString = "";
        while(current !== null) {
            outputString += `(${current.getValue()})->`;
            current = current.next;
        }
        outputString += "null";

        return outputString;
    }

    return {
        append,
        prepend,
        size,
        at,
        getHead,
        getTail,
        pop,
        contains,
        find,
        insertAt,
        toString,
    };
}

const linkedList = LinkedList();
linkedList.append("Hello");
linkedList.append("World");
linkedList.append("Disney");
linkedList.append("Daffy Duck");
linkedList.prepend("Patty");

console.log(linkedList.toString());
console.log(`Head: [${linkedList.getHead().getValue()}]`);
console.log(`Tail: [${linkedList.getTail().getValue()}]`);
console.log(`List size: ${linkedList.size()}`);
console.log(`At: (3): ${linkedList.at(3)}`);
console.log(`Popped value: ${linkedList.pop()}`);
console.log(linkedList.toString());
console.log(`Contains Disney? ${linkedList.contains('Disney')}`);
linkedList.append('Yoshi');
console.log(linkedList.toString());
console.log(`Find World: ${linkedList.find('World')}`);
linkedList.insertAt('Pocahontas',2);
console.log(`After inserting at 2: ${linkedList.toString()}`);