import { M as MDCRipple, a as MDCCheckbox, b as MDCFormField, c as MDCTopAppBar, d as MDCDrawer, e as MDCList, f as MDCMenu, g as MDCSnackbar, h as MDCTextField } from './vendor.e7b5bfbb.js';

const p = function polyfill() {
    const relList = document.createElement('link').relList;
    if (relList && relList.supports && relList.supports('modulepreload')) {
        return;
    }
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        processPreload(link);
    }
    new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type !== 'childList') {
                continue;
            }
            for (const node of mutation.addedNodes) {
                if (node.tagName === 'LINK' && node.rel === 'modulepreload')
                    processPreload(node);
            }
        }
    }).observe(document, { childList: true, subtree: true });
    function getFetchOpts(script) {
        const fetchOpts = {};
        if (script.integrity)
            fetchOpts.integrity = script.integrity;
        if (script.referrerpolicy)
            fetchOpts.referrerPolicy = script.referrerpolicy;
        if (script.crossorigin === 'use-credentials')
            fetchOpts.credentials = 'include';
        else if (script.crossorigin === 'anonymous')
            fetchOpts.credentials = 'omit';
        else
            fetchOpts.credentials = 'same-origin';
        return fetchOpts;
    }
    function processPreload(link) {
        if (link.ep)
            // ep marker = processed
            return;
        link.ep = true;
        // prepopulate the load record
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
    }
};true&&p();

var index = '';

var _index$H = '';

var _index$G = '';

var _index$F = '';

[].map.call(document.querySelectorAll(".mdc-button"), function(el) {
  new MDCRipple(el);
});

var _index$E = '';

const selector$2 = ".mdc-button, .mdc-icon-button, .mdc-card__primary-action";
[].map.call(document.querySelectorAll(selector$2), function(el) {
  return new MDCRipple(el);
});

var _index$D = '';

const checkboxes = document.querySelectorAll(".mdc-checkbox");
[].forEach.call(checkboxes, function(checkbox) {
  const cbInstance = MDCCheckbox.attachTo(checkbox);
  if (checkbox.parentElement.classList.contains("mdc-form-field")) {
    const ffInstance = MDCFormField.attachTo(checkbox.parentElement);
    ffInstance.input = cbInstance;
  }
});

var _index$C = '';

var _index$B = '';

var _index$A = '';

var _index$z = '';

var _index$y = '';

var _index$x = '';

var _index$w = '';

const appBarEl = document.getElementById("app-bar");
const mainContentEl = document.getElementById("main-content");
if (mainContentEl && appBarEl) {
  const topAppBar = MDCTopAppBar.attachTo(appBarEl);
  [].map.call(document.querySelectorAll(".mdc-drawer"), function(el) {
    const drawer = MDCDrawer.attachTo(el);
    topAppBar.setScrollTarget(mainContentEl);
    topAppBar.listen("MDCTopAppBar:nav", () => {
      drawer.open = !drawer.open;
    });
    [].map.call(el.querySelectorAll(".mdc-list"), function(el2) {
      const list = MDCList.attachTo(el2);
      list.wrapFocus = true;
      el2.addEventListener("click", (event) => {
        mainContentEl.querySelector("input, button").focus();
      });
    });
  });
  document.body.addEventListener("MDCDrawer:closed", () => {
    mainContentEl.querySelector("input, button").focus();
  });
}

var _index$v = '';

var _index$u = '';

var _index$t = '';

var _index$s = '';

var _index$r = '';

var _index$q = '';

[].map.call(document.querySelectorAll(".mdc-icon-button"), function(el) {
  const iconButtonRipple = new MDCRipple(el);
  iconButtonRipple.unbounded = true;
});

var _index$p = '';

var _index$o = '';

var _index$n = '';

var _index$m = '';

var _index$l = '';

[].map.call(document.querySelectorAll(".mdc-list"), function(el) {
  const list = new MDCList(el);
  list.listElements.map((listItemEl) => new MDCRipple(listItemEl));
});

var _index$k = '';

const selector$1 = ".mdc-menu";
[].map.call(document.querySelectorAll(selector$1), function(el) {
  const menu = new MDCMenu(el);
  menu.open = true;
});

var _index$j = '';

var _index$i = '';

var _index$h = '';

var _index$g = '';

var _index$f = '';

var _index$e = '';

var _index$d = '';

var _index$c = '';

var _index$b = '';

var _index$a = '';

[].map.call(document.querySelectorAll(".mdc-snackbar"), function(el) {
  new MDCSnackbar(el);
});

var _index$9 = '';

var _index$8 = '';

var _index$7 = '';

var _index$6 = '';

var _index$5 = '';

var _index$4 = '';

[].map.call(document.querySelectorAll(".mdc-text-field"), function(el) {
  return new MDCTextField(el);
});

var _index$3 = '';

var _index$2 = '';

const selector = ".mdc-top-app-bar";
[].map.call(document.querySelectorAll(selector), function(el) {
  new MDCTopAppBar(el);
});

var _index$1 = '';

var _index = '';
//# sourceMappingURL=_Layout.cshtml.9debfbbc.js.map
