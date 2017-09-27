'use strict';

/*
 * Based on the tutorial from deathmood on medium.com
 * https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060
 */

/*
 * creates an object, which represents a dom element
 */
function vdomElement(type, props = {}, children = []) {
    return {type, props, children};
};

// v-dom object (will be loaded from server later), represents the dom
var vdom = vdomElement('div', {className: 'wrapper grid-column'}, [
    vdomElement('header', {className: 'grid'}, [
        vdomElement('div', {className: 'cell'}, [
            vdomElement('label', {className: 'button', for: 'formtoggler'}, ['create new note']),
        ]),
        vdomElement('div', {className: 'cell-shrink'}, [
            vdomElement('span', {className: 'select'}, [
                vdomElement('select', {name: 'theme', id: 'themeselector'}, [
                    vdomElement('option', {value: 1}, ['White-Black-Style']),
                    vdomElement('option', {value: 2}, ['Black-Orange-Style']),
                    vdomElement('option', {value: 3}, ['White-Blue-Style']),
                ]),
            ]),
        ]),
    ]),
    vdomElement('nav', {className: 'grid'}, [
        vdomElement('div', {className: 'cell'}, [
            vdomElement('button', {}, ['By finish Date']),
            vdomElement('button', {}, ['By created Date']),
            vdomElement('button', {}, ['By Importance']),
        ]),
        vdomElement('div', {className: 'cell-srink'}, [
            vdomElement('button', {}, ['Show finished']),
        ]),
    ]),
    vdomElement('main', {className: 'cell-grow'}, [
        vdomElement('section', {}, [
            vdomElement('input', {type: 'checkbox', id: 'entry_1'}, []),
            vdomElement('label', {className: 'button round', for: 'entry_1'}, ['✔']),
            vdomElement('div', {className: 'duetodate'}, ['Nächsten Mittwoch']),
            vdomElement('div', {'data-rating': '3'}, [
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
            ]),
            vdomElement('details', {}, [
                vdomElement('summary', {}, ['CAS FEE Selbststudium / Projekt Aufgabe erledigen']),
                vdomElement('p', {}, ['HTML für die note App erstellen']),
                vdomElement('p', {}, ['CSS erstellen für die note App.']),
            ]),
            vdomElement('label', {className: 'button round edit', for: 'formtoggler'}, ['✎']),
        ]),
        vdomElement('section', {}, [
            vdomElement('input', {type: 'checkbox', id: 'entry_2'}, []),
            vdomElement('label', {className: 'button round', for: 'entry_2'}, ['✔']),
            vdomElement('div', {className: 'duetodate'}, ['Heute']),
            vdomElement('div', {'data-rating': '1'}, [
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
            ]),
            vdomElement('details', {}, [
                vdomElement('summary', {}, ['Einkaufen']),
                vdomElement('p', {}, ['Butter']),
                vdomElement('p', {}, ['Eier']),
            ]),
            vdomElement('label', {className: 'button round edit', for: 'formtoggler'}, ['✎']),
        ]),
        vdomElement('section', {}, [
            vdomElement('input', {type: 'checkbox', id: 'entry_3'}, []),
            vdomElement('label', {className: 'button round', for: 'entry_3'}, ['✔']),
            vdomElement('div', {className: 'duetodate'}, ['Nächsten Mittwoch']),
            vdomElement('div', {'data-rating': '3'}, [
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
            ]),
            vdomElement('details', {}, [
                vdomElement('summary', {}, ['CAS FEE Selbststudium / Projekt Aufgabe erledigen']),
                vdomElement('p', {}, ['HTML für die note App erstellen']),
                vdomElement('p', {}, ['CSS erstellen für die note App.']),
            ]),
            vdomElement('label', {className: 'button round edit', for: 'formtoggler'}, ['✎']),
        ]),
        vdomElement('section', {}, [
            vdomElement('input', {type: 'checkbox', id: 'entry_4'}, []),
            vdomElement('label', {className: 'button round', for: 'entry_4'}, ['✔']),
            vdomElement('div', {className: 'duetodate'}, ['Heute']),
            vdomElement('div', {'data-rating': '1'}, [
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
            ]),
            vdomElement('details', {}, [
                vdomElement('summary', {}, ['Einkaufen']),
                vdomElement('p', {}, ['Butter']),
                vdomElement('p', {}, ['Eier']),
            ]),
            vdomElement('label', {className: 'button round edit', for: 'formtoggler'}, ['✎']),
        ]),
        vdomElement('section', {}, [
            vdomElement('input', {type: 'checkbox', id: 'entry_5'}, []),
            vdomElement('label', {className: 'button round', for: 'entry_5'}, ['✔']),
            vdomElement('div', {className: 'duetodate'}, ['Nächsten Mittwoch']),
            vdomElement('div', {'data-rating': '3'}, [
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
            ]),
            vdomElement('details', {}, [
                vdomElement('summary', {}, ['CAS FEE Selbststudium / Projekt Aufgabe erledigen']),
                vdomElement('p', {}, ['HTML für die note App erstellen']),
                vdomElement('p', {}, ['CSS erstellen für die note App.']),
            ]),
            vdomElement('label', {className: 'button round edit', for: 'formtoggler'}, ['✎']),
        ]),
        vdomElement('section', {}, [
            vdomElement('input', {type: 'checkbox', id: 'entry_6'}, []),
            vdomElement('label', {className: 'button round', for: 'entry_6'}, ['✔']),
            vdomElement('div', {className: 'duetodate'}, ['Heute']),
            vdomElement('div', {'data-rating': '1'}, [
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
                vdomElement('span', {}, ['★']),
            ]),
            vdomElement('details', {}, [
                vdomElement('summary', {}, ['Einkaufen']),
                vdomElement('p', {}, ['Butter']),
                vdomElement('p', {}, ['Eier']),
            ]),
            vdomElement('label', {className: 'button round edit', for: 'formtoggler'}, ['✎']),
        ]),
    ]),
    vdomElement('footer', {}, [
        vdomElement('label', {className: 'button round', for: 'formtoggler'}, ['+']),
    ]),

    vdomElement('input', {type: 'checkbox', id: 'formtoggler'}, []),
    vdomElement('section', {className: 'form'}, [
        vdomElement('form', {action: '#', method: 'post'}, [
            vdomElement('div', {}, [
                vdomElement('h1', {}, ['Hinzufügen / Bearbeiten']),
                vdomElement('div', {className: 'material inputgroup'}, [
                    vdomElement('input', {type: 'text', name: 'title', required: true}, []),
                    vdomElement('span', {className: 'highlight'}, []),
                    vdomElement('span', {className: 'bar'}, []),
                    vdomElement('label', {}, ['Titel']),
                ]),
                vdomElement('div', {className: 'material inputgroup'}, [
                    vdomElement('textarea', {name: 'description', required: true}, []),
                    vdomElement('span', {className: 'highlight'}, []),
                    vdomElement('span', {className: 'bar'}, []),
                    vdomElement('label', {}, ['Beschreibung']),
                ]),
                vdomElement('div', {className: 'material inputgroup'}, [
                    vdomElement('input', {type: 'hidden'}, []),
                    vdomElement('label', {}, ['Wichtigkeit']),
                ]),
                vdomElement('div', {className: 'rating'}, [
                    vdomElement('label', {for: 'rating_0'}, ['⊘']),
                    vdomElement('input', {type: 'radio', name: 'rating', value: '0', id: 'rating_0', checked: true}, ['']),
                    vdomElement('label', {for: 'rating_1'}, ['★']),
                    vdomElement('input', {type: 'radio', name: 'rating', value: '0', id: 'rating_1'}, ['']),
                    vdomElement('label', {for: 'rating_2'}, ['★']),
                    vdomElement('input', {type: 'radio', name: 'rating', value: '0', id: 'rating_2'}, ['']),
                    vdomElement('label', {for: 'rating_3'}, ['★']),
                    vdomElement('input', {type: 'radio', name: 'rating', value: '0', id: 'rating_3'}, ['']),
                    vdomElement('label', {for: 'rating_4'}, ['★']),
                    vdomElement('input', {type: 'radio', name: 'rating', value: '0', id: 'rating_4'}, ['']),
                    vdomElement('label', {for: 'rating_5'}, ['★']),
                    vdomElement('input', {type: 'radio', name: 'rating', value: '0', id: 'rating_5'}, ['']),
                ]),
                vdomElement('div', {className: 'material inputgroup'}, [
                    vdomElement('input', {type: 'date', name: 'dueto', required: true}, []),
                    vdomElement('span', {className: 'highlight'}, []),
                    vdomElement('span', {className: 'bar'}, []),
                    vdomElement('label', {}, ['Erledigen bis:']),
                ]),
                vdomElement('button', {type: 'submit'}, ['speichern']),
                vdomElement('label', {className: 'button', for: 'formtoggler'}, ['abbrechen']),
            ]),
        ]),
    ]),
]);

// add elements to body
const rootElement = document.getElementsByTagName('body')[0];
rootElement.appendChild(createElement(vdom));


// ---------------------- properties ----------------------

/*
 * setting a boolean property (like 'checked')
 */
function setBooleanProp(targetElement, name, value) {
    if (value) {
        targetElement.setAttribute(name, value);
        targetElement[name] = true;
    } else {
        targetElement[name] = false;
    }
}

/*
 * remove boolean property (like 'checked')
 */
function removeBooleanProp(targetElement, name) {
    targetElement.removeAttribute(name);
    targetElement[name] = false;
}

/*
 * returns true, if property is an event or 'forceUpdate'
 */
function isCustomProp(name) {
    return isEventProp(name) || name === 'forceUpdate';
}

/*
 * set property to the target element
 */
function setProp(targetElement, name, value) {
    if (isCustomProp(name)) { // if it is a custom prop, do nothing
        return;
    } else if (name === 'className') { // set 'className' as class-property
        targetElement.setAttribute('class', value);
    } else if (typeof value === 'boolean') { // set boolean-property
        setBooleanProp(targetElement, name, value);
    } else { // set property to target element (change 'data_' to 'data-')
        targetElement.setAttribute(name.replace('data_', 'data-'), value);
    }
}

/*
 * remove property from target element
 */
function removeProp(targetElement, name, value) {
    if (isCustomProp(name)) { // if property is custom, do nothing
        return;
    } else if (name === 'className') { // remove class
        targetElement.removeAttribute('class');
    } else if (typeof value === 'boolean') { // remove boolean property
        removeBooleanProp(targetElement, name);
    } else { // remove every other property
        targetElement.removeAttribute(name);
    }
}

/*
 * set properties on target element
 */
function setProps(targetElement, props) {
    Object.keys(props).forEach(name => {
        setProp(targetElement, name, props[name]);
    });
}

/*
 * update a proptery on target element
 */
function updateProp(targetElement, name, newVal, oldVal) {
    if (!newVal) { // if the property is not existing anymore, remove it
        removeProp(targetElement, name, oldVal);
    } else if (!oldVal || newVal !== oldVal) { // if the property is new or updated, set it
        setProp(targetElement, name, newVal);
    }
}

/*
 * update properties
 */
function updateProps(targetElement, newProps, oldProps = {}) {
    // create an object with all property names from both objects
    const props = Object.assign({}, newProps, oldProps);
    Object.keys(props).forEach(name => {
        // update every property
        updateProp(targetElement, name, newProps[name], oldProps[name]);
    });
}

// ---------------------- events ----------------------

/*
 * check, if property is an event
 */
function isEventProp(name) {
    return /^on/.test(name);
}

/*
 * return event name (remove 'on' and return in lowercase)
 */
function extractEventName(name) {
    return name.slice(2).toLowerCase();
}

/*
 * adds an event listener
 */
function addEventListeners(targetElement, props) {
    Object.keys(props).forEach(name => {
        if (isEventProp(name)) {
            targetElement.addEventListener(
                extractEventName(name),
                props[name]
            );
        }
    });
}

// ---------------------- elements ----------------------

/*
 * creates and returns a dom element
 */
function createElement(node) {
    // if node is a string, return the node as text
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }

    // otherwise create an element
    const nodeElement = document.createElement(node.type);
    setProps(nodeElement, node.props);
    addEventListeners(nodeElement, node.props);

    // add children to the element (recursively)
    node.children
        .map(createElement)
        .forEach(nodeElement.appendChild.bind(nodeElement));

    // return element
    return nodeElement;
}

/*
 * returns if both elements are equal
 * or 'forceUpdate' is set
 */
function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
        (typeof node1 === 'string' && node1 !== node2) ||
        node1.type !== node2.type ||
        (node1.props && node1.props.forceUpdate);
}

/*
 * updates an existing element (add, remove, update)
 */
function updateElement(parentElement, newNode, oldNode, index = 0) {

    if (!oldNode) { // if there is no old element, just add a new one
        parentElement.appendChild(createElement(newNode));

    } else if (!newNode) { // if there is no new element, just remove the old one
        parentElement.removeChild(parentElement.childNodes[index]);

    } else if (changed(newNode, oldNode)) { // change if both are existing and not equal
        parentElement.replaceChild(createElement(newNode), parentElement.childNodes[index]);

    } else if (newNode.type) { // if the new node is an element, update all children
        updateProps(parentElement.childNodes[index], newNode.props, oldNode.props);

        const newLength = newNode.children.length;
        const oldLength = oldNode.children.length;

        for (let i = 0; i < newLength || i < oldLength; i++) {
            updateElement(parentElement.childNodes[index], newNode.children[i], oldNode.children[i], i);
        }
    }
}
