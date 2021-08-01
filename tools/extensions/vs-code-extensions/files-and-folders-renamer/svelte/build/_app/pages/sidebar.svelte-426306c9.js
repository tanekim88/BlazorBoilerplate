import { S as SvelteComponent, i as init, s as safe_not_equal, e as element, t as text, c as claim_element, a as children, g as claim_text, d as detach, f as insert_hydration, H as append_hydration, I as noop } from "../chunks/vendor-d405148d.js";
function create_fragment(ctx) {
  let p;
  let t;
  return {
    c() {
      p = element("p");
      t = text("SIDEBAR");
    },
    l(nodes) {
      p = claim_element(nodes, "P", {});
      var p_nodes = children(p);
      t = claim_text(p_nodes, "SIDEBAR");
      p_nodes.forEach(detach);
    },
    m(target, anchor) {
      insert_hydration(target, p, anchor);
      append_hydration(p, t);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(p);
    }
  };
}
class Sidebar extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment, safe_not_equal, {});
  }
}
export { Sidebar as default };
