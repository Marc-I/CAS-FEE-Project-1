'use strict';

/*
 * Based on the tutorial from deathmood on medium.com
 * https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060
 */
class vDom {

// ---------------------- properties ----------------------

    /*
     * setting a boolean property (like 'checked')
     */
    static _setBooleanProp(targetElement, name, value) {
        if (value) {
            targetElement.setAttribute(name, '');
            targetElement[name] = true;
        } else {
            targetElement[name] = false;
        }
    }

    /*
     * remove boolean property (like 'checked')
     */
    static _removeBooleanProp(targetElement, name) {
        targetElement.removeAttribute(name);
        targetElement[name] = false;
    }

    /*
     * returns true, if property is an event or 'forceUpdate'
     */
    static _isCustomProp(name) {
        return vDom._isEventProp(name) || name === 'forceUpdate';
    }

    /*
     * set property to the target element
     */
    static _setProp(targetElement, name, value) {
        if (vDom._isCustomProp(name)) { // if it is a custom prop, do nothing
            //return;
        } else if (name === 'className') { // set 'className' as class-property
            targetElement.setAttribute('class', value);
        } else if (typeof value === 'boolean') { // set boolean-property
            vDom._setBooleanProp(targetElement, name, value);
        } else { // set property to target element
            targetElement.setAttribute(name, value);
        }
    }

    /*
     * remove property from target element
     */
    static _removeProp(targetElement, name, value) {
        if (vDom._isCustomProp(name)) { // if property is custom, do nothing
            //return;
        } else if (name === 'className') { // remove class
            targetElement.removeAttribute('class');
        } else if (typeof value === 'boolean') { // remove boolean property
            vDom._removeBooleanProp(targetElement, name);
        } else { // remove every other property
            targetElement.removeAttribute(name);
        }
    }

    /*
     * set properties on target element
     */
    static _setProps(targetElement, props) {
        Object.keys(props).forEach(name => {
            vDom._setProp(targetElement, name, props[name]);
        });
    }

    /*
     * update a proptery on target element
     */
    static _updateProp(targetElement, name, newVal, oldVal) {
        if (!newVal) { // if the property is not existing anymore, remove it
            vDom._removeProp(targetElement, name, oldVal);
        } else if (!oldVal || newVal !== oldVal) { // if the property is new or updated, set it
            vDom._setProp(targetElement, name, newVal);
        }
    }

    /*
     * update properties
     */
    static _updateProps(targetElement, newProps, oldProps = {}) {
        // create an object with all property names from both objects
        const props = Object.assign({}, newProps, oldProps);
        Object.keys(props).forEach(name => {
            // update every property
            vDom._updateProp(targetElement, name, newProps[name], oldProps[name]);
        });
    }

// ---------------------- events ----------------------

    /*
     * check, if property is an event
     */
    static _isEventProp(name) {
        return /^on/.test(name);
    }

    /*
     * return event name (remove 'on' and return in lowercase)
     */
    static _extractEventName(name) {
        return name.slice(2).toLowerCase();
    }

    /*
     * adds an event listener
     */
    static _addEventListeners(targetElement, props) {
        Object.keys(props).forEach(name => {
            if (vDom._isEventProp(name)) {
                targetElement.addEventListener(
                    vDom._extractEventName(name),
                    props[name]
                );
            }
        });
    }

// ---------------------- elements ----------------------

    /*
     * creates and returns a dom element
     */
    static _createElement(node) {
        // if node is a string, return the node as text
        if (typeof node === 'string') {
            return document.createTextNode(node);
        }

        // otherwise create an element
        const nodeElement = document.createElement(node.type);
        vDom._setProps(nodeElement, node.props);
        vDom._addEventListeners(nodeElement, node.props);

        // add children to the element (recursively)
        node.children
            .map(vDom._createElement)
            .forEach(nodeElement.appendChild.bind(nodeElement));

        // return element
        return nodeElement;
    }

    /*
     * returns if both elements are equal
     * or 'forceUpdate' is set
     */
    static _changed(node1, node2) {
        return typeof node1 !== typeof node2 ||
            typeof node1 === 'string' && node1 !== node2 ||
            node1.type !== node2.type ||
            node1.props && node1.props['forceUpdate'];
    }

    /*
     * updates an existing element (add, remove, update)
     */
    static _updateElement(parentElement, newNode, oldNode, index = 0) {

        if (!oldNode) { // if there is no old element, just add a new one
            parentElement.appendChild(vDom._createElement(newNode));

        } else if (!newNode) { // if there is no new element, just remove the old one
            parentElement.removeChild(parentElement.childNodes[index]);

        } else if (vDom._changed(newNode, oldNode)) { // change if both are existing and not equal
            if (parentElement.type === 'textarea')
                parentElement.innerHTML = oldNode === '' ? '' : vDom._createElement(oldNode);

            parentElement.replaceChild(vDom._createElement(newNode), parentElement.childNodes[index]);

        } else if (newNode.type) { // if the new node is an element, update all children
            vDom._updateProps(parentElement.childNodes[index], newNode.props, oldNode.props);

            const newLength = newNode.children.length;
            const oldLength = oldNode.children.length;

            for (let i = 0; i < newLength || i < oldLength; i++) {
                vDom._updateElement(parentElement.childNodes[index], newNode.children[i], oldNode.children[i], i);
            }
        }
    }

    /*
     * creates a vdom node
     */
    static CN(type, props = {}, children = []) {
        return {type, props, children};
    }

    /*
     * updates the whole dom
     */
    static Update(NewVDom) {
        this._updateElement(document.getElementById('body'), NewVDom, vDom.currentVDom);
        // clone the new dom node
        vDom.currentVDom = JSON.parse(JSON.stringify(NewVDom));
    }
}