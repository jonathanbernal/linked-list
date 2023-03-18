const Node = (value = null, next = null) => {
    const getValue = () => value;
    const setValue = (newValue) => value = newValue;

    return {getValue, setValue, next};
}

const LinkedList = () => {
    let head = null;
    let tail = null;

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
            return;
        }
        let newNode = Node(value);
        newNode.next = head;
        head = newNode;
    }

    /**
     * This function returns the number of items in the list.
     * @returns The size of the list
     */
    const size = () => {
        let current = head;
        let listSize = 0;

        // In this implementation, our method takes O(N) to get
        // the size of the list. This was done for experimentation
        // purposes. The best approach to getting the size of the
        // list is to declare a counter and update it every time
        // an item is added or removed from the list.
        while(current !== null) {
            listSize += 1;
            current = current.next;
        }

        return listSize;
    }

    /**
     * This function returns the Node value at the listed index.
     * @param {*} index the index of the linked list to retrieve
     * @returns the node value at the specified index.
     */
    const at = (index) => {
        let current = head;
        let currentIndex = 0;

        if(index > size()) {
            throw Error('Error on LinkedList.at(). Provided index argument exceeds list size.');
        }

        while(current !== null) {
            if(currentIndex === index) {
                return current.getValue();
            } else {
                currentIndex += 1;
                current = current.next;
            }
        }
    }

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
console.log(`Contains Disney? ${linkedList.contains('disney')}`);
linkedList.append('Yoshi');
console.log(linkedList.toString());
console.log(`Find World: ${linkedList.find('World')}`);