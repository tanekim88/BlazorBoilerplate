let e = h;
const t = {}, n = { owned: null, cleanups: null, context: null, owner: null };
var l = null;
let r = null, o = null, s = null, u = 0;
function i(e, t, r) { a(function (e, t, r, o = 1, s) { const u = { fn: e, state: o, updatedAt: null, owned: null, sources: null, sourceSlots: null, cleanups: null, value: t, owner: l, context: null, pure: r }; null === l || l !== n && (l.owned ? l.owned.push(u) : l.owned = [u]); return u; }(e, t, !1, 1)); }
function f(e) { let t; return t = e(), t; }
function c(e, n, l) { if (e.comparator && e.comparator(e.value, n))
    return n; if (r)
    return e.pending === t && r.push(e), e.pending = n, n; let u = !1; return e.value = n, e.observers && e.observers.length && d((() => { for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    u, n.pure ? o.push(n) : s.push(n), n.observers && !n.state && v(n), n.state = 1;
} if (o.length > 1e6)
    throw o = [], new Error; }), !1), n; }
function a(e) { if (!e.fn)
    return; y(e); const t = l, n = u; l = e, function (e, t, n) { let l; try {
    l = e.fn(t);
}
catch (r) {
    b(r);
} (!e.updatedAt || e.updatedAt <= n) && (e.observers && e.observers.length ? c(e, l) : e.value = l, e.updatedAt = n); }(e, e.value, n), l = t; }
function p(e) { if (1 !== e.state)
    return e.state = 0; if (e.suspense && f(e.suspense.inFallback))
    return e.suspense.effects.push(e); const t = [e]; for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < u);)
    e.state && t.push(e); for (let n = t.length - 1; n >= 0; n--)
    if (1 === (e = t[n]).state)
        a(e);
    else if (2 === e.state) {
        const t = o;
        o = null, g(e), o = t;
    } }
function d(n, l) { if (o)
    return n(); let i = !1; l || (o = []), s ? i = !0 : s = [], u++; try {
    n();
}
catch (f) {
    b(f);
}
finally {
    !function (n) { o && (h(o), o = null); if (n)
        return; s.length ? function (e) { if (r)
        return e(); let n; const l = r = []; try {
        n = e();
    }
    finally {
        r = null;
    } d((() => { for (let e = 0; e < l.length; e += 1) {
        const n = l[e];
        if (n.pending !== t) {
            const e = n.pending;
            n.pending = t, c(n, e);
        }
    } }), !1); }((() => { e(s), s = null; })) : s = null; }(i);
} }
function h(e) { for (let t = 0; t < e.length; t++)
    p(e[t]); }
function g(e) { e.state = 0; for (let t = 0; t < e.sources.length; t += 1) {
    const n = e.sources[t];
    n.sources && (1 === n.state ? p(n) : 2 === n.state && g(n));
} }
function v(e) { for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    n.state || (n.state = 2, n.pure ? o.push(n) : s.push(n), n.observers && v(n));
} }
function y(e) { let t; if (e.sources)
    for (; e.sources.length;) {
        const t = e.sources.pop(), n = e.sourceSlots.pop(), l = t.observers;
        if (l && l.length) {
            const e = l.pop(), r = t.observerSlots.pop();
            n < l.length && (e.sourceSlots[r] = n, l[n] = e, t.observerSlots[n] = r);
        }
    } if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
        y(e.owned[t]);
    e.owned = null;
} if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
        e.cleanups[t]();
    e.cleanups = null;
} e.state = 0, e.context = null; }
function b(e) { throw e; }
function w(e, t) { return f((() => e(t))); }
function C(e, t, n) { let l = n.length, r = t.length, o = l, s = 0, u = 0, i = t[r - 1].nextSibling, f = null; for (; s < r || u < o;)
    if (t[s] !== n[u]) {
        for (; t[r - 1] === n[o - 1];)
            r--, o--;
        if (r === s) {
            const t = o < l ? u ? n[u - 1].nextSibling : n[o - u] : i;
            for (; u < o;)
                e.insertBefore(n[u++], t);
        }
        else if (o === u)
            for (; s < r;)
                f && f.has(t[s]) || e.removeChild(t[s]), s++;
        else if (t[s] === n[o - 1] && n[u] === t[r - 1]) {
            const l = t[--r].nextSibling;
            e.insertBefore(n[u++], t[s++].nextSibling), e.insertBefore(n[--o], l), t[r] = n[o];
        }
        else {
            if (!f) {
                f = new Map;
                let e = u;
                for (; e < o;)
                    f.set(n[e], e++);
            }
            const l = f.get(t[s]);
            if (null != l)
                if (u < l && l < o) {
                    let i, c = s, a = 1;
                    for (; ++c < r && c < o && null != (i = f.get(t[c])) && i === l + a;)
                        a++;
                    if (a > l - u) {
                        const r = t[s];
                        for (; u < l;)
                            e.insertBefore(n[u++], r);
                    }
                    else
                        e.replaceChild(n[u++], t[s++]);
                }
                else
                    s++;
            else
                e.removeChild(t[s++]);
        }
    }
    else
        s++, u++; }
function x(e, t, r) { let o; return function (e, t) { t && (l = t); const r = l, o = 0 === e.length ? n : { owned: null, cleanups: null, context: null, owner: r }; let s; l = o; try {
    d((() => s = e((() => y(o)))), !0);
}
finally {
    l = r;
} }((n => { o = n, function (e, t, n, l) { void 0 === n || l || (l = []); if ("function" != typeof t)
    return m(e, t, l, n); i((l => m(e, t(), l, n)), l); }(t, e(), t.firstChild ? null : void 0, r); })), () => { o(), t.textContent = ""; }; }
function A(e, t, n) { const l = document.createElement("template"); l.innerHTML = e; let r = l.content.firstChild; return n && (r = r.firstChild), r; }
function m(e, t, n, l, r) { for (; "function" == typeof n;)
    n = n(); if (t === n)
    return n; const o = typeof t, s = void 0 !== l; if (e = s && n[0] && n[0].parentNode || e, "string" === o || "number" === o)
    if ("number" === o && (t = t.toString()), s) {
        let r = n[0];
        r && 3 === r.nodeType ? r.data = t : r = document.createTextNode(t), n = B(e, n, l, r);
    }
    else
        n = "" !== n && "string" == typeof n ? e.firstChild.data = t : e.textContent = t;
else if (null == t || "boolean" === o)
    n = B(e, n, l);
else {
    if ("function" === o)
        return i((() => { let r = t(); for (; "function" == typeof r;)
            r = r(); n = m(e, r, n, l); })), () => n;
    if (Array.isArray(t)) {
        const o = [];
        if (S(o, t, r))
            return i((() => n = m(e, o, n, l, !0))), () => n;
        if (0 === o.length) {
            if (n = B(e, n, l), s)
                return n;
        }
        else
            Array.isArray(n) ? 0 === n.length ? N(e, o, l) : C(e, n, o) : null == n || "" === n ? N(e, o) : C(e, s && n || [e.firstChild], o);
        n = o;
    }
    else if (t instanceof Node) {
        if (Array.isArray(n)) {
            if (s)
                return n = B(e, n, l, t);
            B(e, n, null, t);
        }
        else
            null != n && "" !== n && e.firstChild ? e.replaceChild(t, e.firstChild) : e.appendChild(t);
        n = t;
    }
} return n; }
function S(e, t, n) { let l = !1; for (let r = 0, o = t.length; r < o; r++) {
    let o, s = t[r];
    if (s instanceof Node)
        e.push(s);
    else if (null == s || !0 === s || !1 === s)
        ;
    else if (Array.isArray(s))
        l = S(e, s) || l;
    else if ("string" == (o = typeof s))
        e.push(document.createTextNode(s));
    else if ("function" === o)
        if (n) {
            for (; "function" == typeof s;)
                s = s();
            l = S(e, Array.isArray(s) ? s : [s]) || l;
        }
        else
            e.push(s), l = !0;
    else
        e.push(document.createTextNode(s.toString()));
} return l; }
function N(e, t, n) { for (let l = 0, r = t.length; l < r; l++)
    e.insertBefore(t[l], n); }
function B(e, t, n, l) { if (void 0 === n)
    return e.textContent = ""; const r = l || document.createTextNode(""); if (t.length) {
    let l = !1;
    for (let o = t.length - 1; o >= 0; o--) {
        const s = t[o];
        if (r !== s) {
            const t = s.parentNode === e;
            l || o ? t && e.removeChild(s) : t ? e.replaceChild(r, s) : e.insertBefore(r, n);
        }
        else
            l = !0;
    }
}
else
    e.insertBefore(r, n); return [r]; }
export { w as c, x as r, A as t };
//# sourceMappingURL=vendor.2bf70d6a.js.map