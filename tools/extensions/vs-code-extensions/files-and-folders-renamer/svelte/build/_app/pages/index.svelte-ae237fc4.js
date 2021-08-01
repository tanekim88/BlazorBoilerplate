import { S as SvelteComponent, i as init, s as safe_not_equal, e as element, t as text, k as space, c as claim_element, a as children, g as claim_text, d as detach, n as claim_space, b as attr, f as insert_hydration, H as append_hydration, J as listen, K as prevent_default, h as set_data, I as noop, L as run_all } from "../chunks/vendor-28bc571e.js";
function create_fragment(ctx) {
  let form;
  let h1;
  let t0;
  let t1;
  let t2;
  let t3;
  let input;
  let t4;
  let button;
  let t5;
  let mounted;
  let dispose;
  return {
    c() {
      form = element("form");
      h1 = element("h1");
      t0 = text("Hello ");
      t1 = text(ctx[0]);
      t2 = text("!");
      t3 = space();
      input = element("input");
      t4 = space();
      button = element("button");
      t5 = text("Preview");
      this.h();
    },
    l(nodes) {
      form = claim_element(nodes, "FORM", {});
      var form_nodes = children(form);
      h1 = claim_element(form_nodes, "H1", {});
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, "Hello ");
      t1 = claim_text(h1_nodes, ctx[0]);
      t2 = claim_text(h1_nodes, "!");
      h1_nodes.forEach(detach);
      t3 = claim_space(form_nodes);
      input = claim_element(form_nodes, "INPUT", { type: true });
      t4 = claim_space(form_nodes);
      button = claim_element(form_nodes, "BUTTON", { type: true });
      var button_nodes = children(button);
      t5 = claim_text(button_nodes, "Preview");
      button_nodes.forEach(detach);
      form_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(input, "type", "file");
      input.multiple = true;
      attr(button, "type", "submit");
    },
    m(target, anchor) {
      insert_hydration(target, form, anchor);
      append_hydration(form, h1);
      append_hydration(h1, t0);
      append_hydration(h1, t1);
      append_hydration(h1, t2);
      append_hydration(form, t3);
      append_hydration(form, input);
      append_hydration(form, t4);
      append_hydration(form, button);
      append_hydration(button, t5);
      if (!mounted) {
        dispose = [
          listen(input, "change", ctx[1]),
          listen(form, "submit", prevent_default(submit_handler))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 1)
        set_data(t1, ctx2[0]);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(form);
      mounted = false;
      run_all(dispose);
    }
  };
}
const submit_handler = () => {
};
function instance($$self, $$props, $$invalidate) {
  let file;
  function input_change_handler() {
    file = this.value;
    $$invalidate(0, file);
  }
  return [file, input_change_handler];
}
class Routes extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export { Routes as default };
