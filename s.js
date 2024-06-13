function a(element,attribute,value) {
    if(value) {
        if(typeof value === 'object') {
            for(atr in value) { element.setAttribute(atr, value[atr].replace(/_/g, '-')) }
        } else { element.setAttribute(attribute,value) }
    }
    else if(attribute) { element.getAttribute(attribute) }
    else return element.attributes
}

function e(query = '*', element = document, all = 0) { return all?element.querySelectorAll(query): element.querySelector(query) }

function t(el, text) { text ? el.innerText = text : return el.innerText }

function to(el, child, prepend = 0) { if(typeof el === 'string') {
    prepend? e(el).prepend(typeof child === 'object') ? ce(child) : e(el)) : e(el).append(child)}
    else prepend? el.prepend(typeof child === 'object') ? ce(child) : e(el)) : el.append(child)
}

function s(key, value = null) { return value ? typeof value == 'string' ? window.localStorage.setItem(key, value) : window.localStorage.setItem(key, JSON.stringify(value)) : JSON.parse(window.localStorage.getItem(key)) ?? window.localStorage.getItem(key)}

function c(el = "DIV") { return document.createElement(el) }

function sa(el, key, value = null) { value? el.style[key] = value : el.style[key] }
function ss(el, style) { el.style = style }
function ca(el, clas) { el.classList.add(clas) }
function cr(el, clas) { el.classList.remove(clas) }
function ct(el, clas) { el.classList.toggle(clas) }
function ih(el, html) {el.innerHTML = html}
function oh(el, html) {el.outerHTML = html}

function p(el) { return el.parentNode }
function gp(el) { return p(el.parentNode) }
function si(el) { return p(el).children }
function uo(object, key, value) {

    let path = key.split('.')

    if(path.length > 1) {
        for(p in path) {
            if(!object[path[p]]) { object[path[p]] = {} }
            if(p === path.length - 1) {
                object
            }
        }
    }
    else { object[key]= value }
    
}
function so(obj, el) {
    var st = ''
    for(s in obj) { st += s + ':' + obj[s] + '; ' }
    el ? el.style = st.replace(/_/g, '-') : return st
}
function ce(obj) { 
    const el = c(obj.e || 'div')
    obj.id ? a(el, 'id', obj.id) : null 
    obj.cl ? a(el, 'class', obj.cl) : null
    obj.t ? t(el, obj.t) : null
    obj.a ? ao(el, obj.a) : null
    obj.so ? ss(el, so(obj.so)) : null
    if(obj.c && obj.c.length) { for(ch of obj.c) { add(el,ce(ch)) } }
    return el
}

function obj(el) {
    var o = {}
    o.e = el.nodeName
    if(el.attributes.length) {
        o.a = {}
        for(attr of el.attributes) {o.a[attr.name] = attr.value}
    }
    if(el.children.length) {
        o.c = []
        for(ch of el.children) {o.c.push(obj(ch))}
        const cln = el.cloneNode(true)
        const cl = cln.children.length
        for(var i = 0; i < cl; i++) { cln.children[0].remove() }
        if(cln.innerText && cln.innerText.length) { o.t = cln.innerText.trim()}
    }
    else if(el.innerText && el.innerText.length ) { o.t = el.innerText.trim()}
    return o
}

function lw(w) {
    const head = q('head')
    const body = q('body')
    for(h of w.head) { add(head, ce(h)) }
    for(b of w.body) { add(body, ce(b)) }
}


function mw(document) {
    var w = {head: [], body: []}
    for(h of q('head').children) { w.head.push(obj(h))}
    for(b of q('body').children) { w.body.push(obj(b))}
    return w
}

function mo(o = {}, objects = []) {
    let ob = o
    //iterate objects from array
    for(let i = 0; i < objects.length; i++) {
        //iterate properties of object
        let object = objects[i]
        for(prop in object) {
            //if property is not an object assign it
            if(typeof object[prop] !== 'object' ) {
                ob[prop] = object[prop]
            }
            else if(Array.isArray(object[prop])) {
                console.log('hooray, an array - what to do?')
            }
            //if it is itterate the object
            else {
                ob[prop] = mo(ob[prop], [object[prop]])
            }
        }
    }

    return ob
}

function coe(obj) {
    const el = ce({
        a: {o: JSON.stringify(obj)},
        t: obj.e
    })
    return el
}


function notify(m, style = 'z-index: 100; padding: 22px; background-color: #ddd; color: #222; display: flex; justify-content: center; align-items: center; position: fixed; top: 0; left: 0; right: 0; bottom: 0;  font-size: 22px;') {
    const n = c('div')
    ss(n, style)
    t(n, m)

    const x = c('div')
    t(x, 'ok')
    a(x, 'onclick', 'p(this).remove()')
    ss(x, 'position: fixed; bottom: 0; margin: 1em; padding: 1em; cursor: pointer; text-align: center; background-color: #222; color: #ddd;')
    add(n,x)

    add(q('body'), n)
}
