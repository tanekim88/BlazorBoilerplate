let e = h;
const t = {}, n = { owned: null, cleanups: null, context: null, owner: null };
var r = null;
let o = null, l = null, s = null, i = 0;
function u(e, t, o) { a(function (e, t, o, l = 1, s) { const i = { fn: e, state: l, updatedAt: null, owned: null, sources: null, sourceSlots: null, cleanups: null, value: t, owner: r, context: null, pure: o }; null === r || r !== n && (r.owned ? r.owned.push(i) : r.owned = [i]); return i; }(e, t, !1, 1)); }
function f(e) { let t; return t = e(), t; }
function c(e, n, r) { if (e.comparator && e.comparator(e.value, n))
    return n; if (o)
    return e.pending === t && o.push(e), e.pending = n, n; let i = !1; return e.value = n, e.observers && e.observers.length && d((() => { for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    i, n.pure ? l.push(n) : s.push(n), n.observers && !n.state && y(n), n.state = 1;
} if (l.length > 1e6)
    throw l = [], new Error; }), !1), n; }
function a(e) { if (!e.fn)
    return; v(e); const t = r, n = i; r = e, function (e, t, n) { let r; try {
    r = e.fn(t);
}
catch (o) {
    b(o);
} (!e.updatedAt || e.updatedAt <= n) && (e.observers && e.observers.length ? c(e, r) : e.value = r, e.updatedAt = n); }(e, e.value, n), r = t; }
function p(e) { if (1 !== e.state)
    return e.state = 0; if (e.suspense && f(e.suspense.inFallback))
    return e.suspense.effects.push(e); const t = [e]; for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < i);)
    e.state && t.push(e); for (let n = t.length - 1; n >= 0; n--)
    if (1 === (e = t[n]).state)
        a(e);
    else if (2 === e.state) {
        const t = l;
        l = null, g(e), l = t;
    } }
function d(n, r) { if (l)
    return n(); let u = !1; r || (l = []), s ? u = !0 : s = [], i++; try {
    n();
}
catch (f) {
    b(f);
}
finally {
    !function (n) { l && (h(l), l = null); if (n)
        return; s.length ? function (e) { if (o)
        return e(); let n; const r = o = []; try {
        n = e();
    }
    finally {
        o = null;
    } d((() => { for (let e = 0; e < r.length; e += 1) {
        const n = r[e];
        if (n.pending !== t) {
            const e = n.pending;
            n.pending = t, c(n, e);
        }
    } }), !1); }((() => { e(s), s = null; })) : s = null; }(u);
} }
function h(e) { for (let t = 0; t < e.length; t++)
    p(e[t]); }
function g(e) { e.state = 0; for (let t = 0; t < e.sources.length; t += 1) {
    const n = e.sources[t];
    n.sources && (1 === n.state ? p(n) : 2 === n.state && g(n));
} }
function y(e) { for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    n.state || (n.state = 2, n.pure ? l.push(n) : s.push(n), n.observers && y(n));
} }
function v(e) { let t; if (e.sources)
    for (; e.sources.length;) {
        const t = e.sources.pop(), n = e.sourceSlots.pop(), r = t.observers;
        if (r && r.length) {
            const e = r.pop(), o = t.observerSlots.pop();
            n < r.length && (e.sourceSlots[o] = n, r[n] = e, t.observerSlots[n] = o);
        }
    } if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
        v(e.owned[t]);
    e.owned = null;
} if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
        e.cleanups[t]();
    e.cleanups = null;
} e.state = 0, e.context = null; }
function b(e) { throw e; }
function w(e, t) { return f((() => e(t))); }
function m(e, t, n) { let r = n.length, o = t.length, l = r, s = 0, i = 0, u = t[o - 1].nextSibling, f = null; for (; s < o || i < l;)
    if (t[s] !== n[i]) {
        for (; t[o - 1] === n[l - 1];)
            o--, l--;
        if (o === s) {
            const t = l < r ? i ? n[i - 1].nextSibling : n[l - i] : u;
            for (; i < l;)
                e.insertBefore(n[i++], t);
        }
        else if (l === i)
            for (; s < o;)
                f && f.has(t[s]) || e.removeChild(t[s]), s++;
        else if (t[s] === n[l - 1] && n[i] === t[o - 1]) {
            const r = t[--o].nextSibling;
            e.insertBefore(n[i++], t[s++].nextSibling), e.insertBefore(n[--l], r), t[o] = n[l];
        }
        else {
            if (!f) {
                f = new Map;
                let e = i;
                for (; e < l;)
                    f.set(n[e], e++);
            }
            const r = f.get(t[s]);
            if (null != r)
                if (i < r && r < l) {
                    let u, c = s, a = 1;
                    for (; ++c < o && c < l && null != (u = f.get(t[c])) && u === r + a;)
                        a++;
                    if (a > r - i) {
                        const o = t[s];
                        for (; i < r;)
                            e.insertBefore(n[i++], o);
                    }
                    else
                        e.replaceChild(n[i++], t[s++]);
                }
                else
                    s++;
            else
                e.removeChild(t[s++]);
        }
    }
    else
        s++, i++; }
function A(e, t, o) { let l; return function (e, t) { t && (r = t); const o = r, l = 0 === e.length ? n : { owned: null, cleanups: null, context: null, owner: o }; let s; r = l; try {
    d((() => s = e((() => v(l)))), !0);
}
finally {
    r = o;
} }((n => { l = n, function (e, t, n, r) { void 0 === n || r || (r = []); if ("function" != typeof t)
    return x(e, t, r, n); u((r => x(e, t(), r, n)), r); }(t, e(), t.firstChild ? null : void 0, o); })), () => { l(), t.textContent = ""; }; }
function C(e, t, n) { const r = document.createElement("template"); r.innerHTML = e; let o = r.content.firstChild; return n && (o = o.firstChild), o; }
function x(e, t, n, r, o) { for (; "function" == typeof n;)
    n = n(); if (t === n)
    return n; const l = typeof t, s = void 0 !== r; if (e = s && n[0] && n[0].parentNode || e, "string" === l || "number" === l)
    if ("number" === l && (t = t.toString()), s) {
        let o = n[0];
        o && 3 === o.nodeType ? o.data = t : o = document.createTextNode(t), n = B(e, n, r, o);
    }
    else
        n = "" !== n && "string" == typeof n ? e.firstChild.data = t : e.textContent = t;
else if (null == t || "boolean" === l)
    n = B(e, n, r);
else {
    if ("function" === l)
        return u((() => { let o = t(); for (; "function" == typeof o;)
            o = o(); n = x(e, o, n, r); })), () => n;
    if (Array.isArray(t)) {
        const l = [];
        if (S(l, t, o))
            return u((() => n = x(e, l, n, r, !0))), () => n;
        if (0 === l.length) {
            if (n = B(e, n, r), s)
                return n;
        }
        else
            Array.isArray(n) ? 0 === n.length ? N(e, l, r) : m(e, n, l) : null == n || "" === n ? N(e, l) : m(e, s && n || [e.firstChild], l);
        n = l;
    }
    else if (t instanceof Node) {
        if (Array.isArray(n)) {
            if (s)
                return n = B(e, n, r, t);
            B(e, n, null, t);
        }
        else
            null != n && "" !== n && e.firstChild ? e.replaceChild(t, e.firstChild) : e.appendChild(t);
        n = t;
    }
} return n; }
function S(e, t, n) { let r = !1; for (let o = 0, l = t.length; o < l; o++) {
    let l, s = t[o];
    if (s instanceof Node)
        e.push(s);
    else if (null == s || !0 === s || !1 === s)
        ;
    else if (Array.isArray(s))
        r = S(e, s) || r;
    else if ("string" == (l = typeof s))
        e.push(document.createTextNode(s));
    else if ("function" === l)
        if (n) {
            for (; "function" == typeof s;)
                s = s();
            r = S(e, Array.isArray(s) ? s : [s]) || r;
        }
        else
            e.push(s), r = !0;
    else
        e.push(document.createTextNode(s.toString()));
} return r; }
function N(e, t, n) { for (let r = 0, o = t.length; r < o; r++)
    e.insertBefore(t[r], n); }
function B(e, t, n, r) { if (void 0 === n)
    return e.textContent = ""; const o = r || document.createTextNode(""); if (t.length) {
    let r = !1;
    for (let l = t.length - 1; l >= 0; l--) {
        const s = t[l];
        if (o !== s) {
            const t = s.parentNode === e;
            r || l ? t && e.removeChild(s) : t ? e.replaceChild(o, s) : e.insertBefore(o, n);
        }
        else
            r = !0;
    }
}
else
    e.insertBefore(o, n); return [o]; }
const T = e => e, j = (...e) => { return (t = T, (...e) => { const n = Object.assign({}, ...e.map((e => e.styles))), r = Object.keys(n), o = r.filter((e => "mappings" in n[e])); return Object.assign((e => { const r = [], l = {}, s = { ...e }; let i = !1; for (const t of o) {
    const r = e[t];
    if (r) {
        const e = n[t];
        i = !0;
        for (const t of e.mappings)
            l[t] = r, s[t] || delete s[t];
    }
} const u = i ? { ...l, ...s } : e; for (const t in u) {
    const e = u[t], o = n[t];
    try {
        if (o.mappings)
            continue;
        if ("string" == typeof e || "number" == typeof e)
            r.push(o.values[e].defaultClass);
        else if (Array.isArray(e))
            for (const t in e) {
                const n = e[t];
                if (null != n) {
                    const e = o.responsiveArray[t];
                    r.push(o.values[n].conditions[e]);
                }
            }
        else
            for (const t in e) {
                const n = e[t];
                null != n && r.push(o.values[n].conditions[t]);
            }
    }
    catch (f) {
        throw f;
    }
} return t(r.join(" ")); }), { properties: new Set(r) }); })(...e); var t; };
export { u as a, w as b, j as c, A as r, C as t };
//# sourceMappingURL=vendor.a4488c43.js.map