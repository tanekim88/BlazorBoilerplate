import { S as SvelteComponent, i as init, s as safe_not_equal, e as element, t as text, k as space, c as claim_element, a as children, g as claim_text, d as detach, n as claim_space, f as insert_hydration, H as append_hydration, J as set_input_value, K as listen, L as prevent_default, h as set_data, I as noop, M as run_all, A as onMount, N as destroy_each } from "../chunks/vendor-d405148d.js";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[14] = list[i];
  return child_ctx;
}
function create_if_block_1(ctx) {
  let div;
  let each_value = ctx[3];
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div_nodes);
      }
      div_nodes.forEach(detach);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div, null);
      }
    },
    p(ctx2, dirty) {
      if (dirty & 8) {
        each_value = ctx2[3];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_if_block(ctx) {
  let t;
  return {
    c() {
      t = text("Loading...");
    },
    l(nodes) {
      t = claim_text(nodes, "Loading...");
    },
    m(target, anchor) {
      insert_hydration(target, t, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(t);
    }
  };
}
function create_each_block(ctx) {
  let div0;
  let t0_value = ctx[14].from + "";
  let t0;
  let t1;
  let div1;
  let t2_value = ctx[14].to + "";
  let t2;
  let t3;
  let hr;
  return {
    c() {
      div0 = element("div");
      t0 = text(t0_value);
      t1 = space();
      div1 = element("div");
      t2 = text(t2_value);
      t3 = space();
      hr = element("hr");
    },
    l(nodes) {
      div0 = claim_element(nodes, "DIV", {});
      var div0_nodes = children(div0);
      t0 = claim_text(div0_nodes, t0_value);
      div0_nodes.forEach(detach);
      t1 = claim_space(nodes);
      div1 = claim_element(nodes, "DIV", {});
      var div1_nodes = children(div1);
      t2 = claim_text(div1_nodes, t2_value);
      div1_nodes.forEach(detach);
      t3 = claim_space(nodes);
      hr = claim_element(nodes, "HR", {});
    },
    m(target, anchor) {
      insert_hydration(target, div0, anchor);
      append_hydration(div0, t0);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, div1, anchor);
      append_hydration(div1, t2);
      insert_hydration(target, t3, anchor);
      insert_hydration(target, hr, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & 8 && t0_value !== (t0_value = ctx2[14].from + ""))
        set_data(t0, t0_value);
      if (dirty & 8 && t2_value !== (t2_value = ctx2[14].to + ""))
        set_data(t2, t2_value);
    },
    d(detaching) {
      if (detaching)
        detach(div0);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(div1);
      if (detaching)
        detach(t3);
      if (detaching)
        detach(hr);
    }
  };
}
function create_fragment(ctx) {
  let form;
  let h1;
  let t0;
  let t1;
  let h30;
  let t2;
  let t3;
  let input0;
  let t4;
  let h31;
  let t5;
  let t6;
  let input1;
  let t7;
  let button0;
  let t8;
  let t9;
  let button1;
  let t10;
  let t11;
  let mounted;
  let dispose;
  function select_block_type(ctx2, dirty) {
    if (ctx2[4])
      return create_if_block;
    if (ctx2[3])
      return create_if_block_1;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type && current_block_type(ctx);
  return {
    c() {
      form = element("form");
      h1 = element("h1");
      t0 = text(ctx[0]);
      t1 = space();
      h30 = element("h3");
      t2 = text("From");
      t3 = space();
      input0 = element("input");
      t4 = space();
      h31 = element("h3");
      t5 = text("To");
      t6 = space();
      input1 = element("input");
      t7 = space();
      button0 = element("button");
      t8 = text("Preview");
      t9 = space();
      button1 = element("button");
      t10 = text("Commit");
      t11 = space();
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      form = claim_element(nodes, "FORM", {});
      var form_nodes = children(form);
      h1 = claim_element(form_nodes, "H1", {});
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, ctx[0]);
      h1_nodes.forEach(detach);
      t1 = claim_space(form_nodes);
      h30 = claim_element(form_nodes, "H3", {});
      var h30_nodes = children(h30);
      t2 = claim_text(h30_nodes, "From");
      h30_nodes.forEach(detach);
      t3 = claim_space(form_nodes);
      input0 = claim_element(form_nodes, "INPUT", {});
      t4 = claim_space(form_nodes);
      h31 = claim_element(form_nodes, "H3", {});
      var h31_nodes = children(h31);
      t5 = claim_text(h31_nodes, "To");
      h31_nodes.forEach(detach);
      t6 = claim_space(form_nodes);
      input1 = claim_element(form_nodes, "INPUT", {});
      t7 = claim_space(form_nodes);
      button0 = claim_element(form_nodes, "BUTTON", {});
      var button0_nodes = children(button0);
      t8 = claim_text(button0_nodes, "Preview");
      button0_nodes.forEach(detach);
      t9 = claim_space(form_nodes);
      button1 = claim_element(form_nodes, "BUTTON", {});
      var button1_nodes = children(button1);
      t10 = claim_text(button1_nodes, "Commit");
      button1_nodes.forEach(detach);
      t11 = claim_space(form_nodes);
      if (if_block)
        if_block.l(form_nodes);
      form_nodes.forEach(detach);
      this.h();
    },
    h() {
      input0.required = true;
      input1.required = true;
    },
    m(target, anchor) {
      insert_hydration(target, form, anchor);
      append_hydration(form, h1);
      append_hydration(h1, t0);
      append_hydration(form, t1);
      append_hydration(form, h30);
      append_hydration(h30, t2);
      append_hydration(form, t3);
      append_hydration(form, input0);
      set_input_value(input0, ctx[1]);
      append_hydration(form, t4);
      append_hydration(form, h31);
      append_hydration(h31, t5);
      append_hydration(form, t6);
      append_hydration(form, input1);
      set_input_value(input1, ctx[2]);
      append_hydration(form, t7);
      append_hydration(form, button0);
      append_hydration(button0, t8);
      append_hydration(form, t9);
      append_hydration(form, button1);
      append_hydration(button1, t10);
      append_hydration(form, t11);
      if (if_block)
        if_block.m(form, null);
      if (!mounted) {
        dispose = [
          listen(input0, "input", ctx[7]),
          listen(input1, "input", ctx[8]),
          listen(button0, "click", prevent_default(ctx[9])),
          listen(button1, "click", prevent_default(ctx[10])),
          listen(form, "submit", prevent_default(submit_handler))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 1)
        set_data(t0, ctx2[0]);
      if (dirty & 2 && input0.value !== ctx2[1]) {
        set_input_value(input0, ctx2[1]);
      }
      if (dirty & 4 && input1.value !== ctx2[2]) {
        set_input_value(input1, ctx2[2]);
      }
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if (if_block)
          if_block.d(1);
        if_block = current_block_type && current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(form, null);
        }
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(form);
      if (if_block) {
        if_block.d();
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
const submit_handler = () => {
};
function instance($$self, $$props, $$invalidate) {
  var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  onMount(() => __awaiter(void 0, void 0, void 0, function* () {
    window.addEventListener("message", (event) => __awaiter(void 0, void 0, void 0, function* () {
      const message = event.data;
      switch (message.type) {
        case "source-fetched":
          $$invalidate(0, source = message.value);
          break;
        case "preview-fetched":
          $$invalidate(3, previewItems = message.value);
          break;
      }
    }));
    yield sendFetchSourceCommand();
  }));
  let source;
  let from;
  let to;
  let previewItems;
  let isPreviewLoading = false;
  function sendFetchPreviewCommand() {
    return __awaiter(this, void 0, void 0, function* () {
      $$invalidate(4, isPreviewLoading = true);
      const fromInput = new RegExp(from, "gi");
      yield tsvscode.postMessage({
        type: "fetch-preview",
        value: { from: fromInput, to, source }
      });
      $$invalidate(4, isPreviewLoading = false);
    });
  }
  function sendCommitCommand() {
    return __awaiter(this, void 0, void 0, function* () {
      if (!previewItems) {
        yield sendFetchPreviewCommand();
      }
      yield tsvscode.postMessage({ type: "commit", value: previewItems });
    });
  }
  function sendFetchSourceCommand() {
    return __awaiter(this, void 0, void 0, function* () {
      yield tsvscode.postMessage({
        type: "fetch-source",
        value: previewItems
      });
    });
  }
  function input0_input_handler() {
    from = this.value;
    $$invalidate(1, from);
  }
  function input1_input_handler() {
    to = this.value;
    $$invalidate(2, to);
  }
  const click_handler = async () => {
    await sendFetchPreviewCommand();
  };
  const click_handler_1 = async () => {
    await sendCommitCommand();
  };
  return [
    source,
    from,
    to,
    previewItems,
    isPreviewLoading,
    sendFetchPreviewCommand,
    sendCommitCommand,
    input0_input_handler,
    input1_input_handler,
    click_handler,
    click_handler_1
  ];
}
class Routes extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export { Routes as default };
