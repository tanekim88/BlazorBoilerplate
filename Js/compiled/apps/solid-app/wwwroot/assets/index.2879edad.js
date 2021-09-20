import { t as e, r, c as o } from "./vendor.2bf70d6a.js";
!function () { const e = document.createElement("link").relList; if (!(e && e.supports && e.supports("modulepreload"))) {
    for (const e of document.querySelectorAll('link[rel="modulepreload"]'))
        r(e);
    new MutationObserver((e => { for (const o of e)
        if ("childList" === o.type)
            for (const e of o.addedNodes)
                "LINK" === e.tagName && "modulepreload" === e.rel && r(e); })).observe(document, { childList: !0, subtree: !0 });
} function r(e) { if (e.ep)
    return; e.ep = !0; const r = function (e) { const r = {}; return e.integrity && (r.integrity = e.integrity), e.referrerpolicy && (r.referrerPolicy = e.referrerpolicy), "use-credentials" === e.crossorigin ? r.credentials = "include" : "anonymous" === e.crossorigin ? r.credentials = "omit" : r.credentials = "same-origin", r; }(e); fetch(e.href, r); } }();
const t = e("<div>hi</div>"), i = () => (() => { const e = t.cloneNode(!0); return e.className = "_1p8qikc23 _1p8qikc2f _1p8qikc3 _1p8qikcf _1p8qikce _1p8qikc30 _1p8qikc37", e; })();
r((() => o(i, {})), document.getElementById("root"));
//# sourceMappingURL=index.2879edad.js.map