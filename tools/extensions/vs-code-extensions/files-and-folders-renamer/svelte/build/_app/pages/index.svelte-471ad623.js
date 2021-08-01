import { S as SvelteComponent, i as init, s as safe_not_equal, e as element, t as text, k as space, c as claim_element, a as children, g as claim_text, d as detach, n as claim_space, b as attr, f as insert_hydration, H as append_hydration, J as set_input_value, K as listen, L as prevent_default, h as set_data, I as noop, M as run_all, A as onMount, N as destroy_each } from "../chunks/vendor-d405148d.js";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[18] = list[i];
  return child_ctx;
}
function create_if_block_1(ctx) {
  let div;
  let each_value = ctx[4];
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
      if (dirty & 16) {
        each_value = ctx2[4];
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
  let t0_value = ctx[18].from + "";
  let t0;
  let t1;
  let div1;
  let t2_value = ctx[18].to + "";
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
      if (dirty & 16 && t0_value !== (t0_value = ctx2[18].from + ""))
        set_data(t0, t0_value);
      if (dirty & 16 && t2_value !== (t2_value = ctx2[18].to + ""))
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
  let h31;
  let t4;
  let t5;
  let input0;
  let input0_checked_value;
  let t6;
  let input1;
  let t7;
  let h32;
  let t8;
  let t9;
  let input2;
  let t10;
  let button0;
  let t11;
  let t12;
  let button1;
  let t13;
  let t14;
  let h33;
  let t15;
  let t16;
  let input3;
  let t17;
  let h34;
  let t18;
  let t19;
  let input4;
  let t20;
  let h35;
  let t21;
  let t22;
  let input5;
  let t23;
  let mounted;
  let dispose;
  function select_block_type(ctx2, dirty) {
    if (ctx2[5])
      return create_if_block;
    if (ctx2[4])
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
      h31 = element("h3");
      t4 = text("Regex");
      t5 = space();
      input0 = element("input");
      t6 = space();
      input1 = element("input");
      t7 = space();
      h32 = element("h3");
      t8 = text("To");
      t9 = space();
      input2 = element("input");
      t10 = space();
      button0 = element("button");
      t11 = text("Preview");
      t12 = space();
      button1 = element("button");
      t13 = text("Commit");
      t14 = space();
      h33 = element("h3");
      t15 = text("Case Insensitive");
      t16 = space();
      input3 = element("input");
      t17 = space();
      h34 = element("h3");
      t18 = text("Include files");
      t19 = space();
      input4 = element("input");
      t20 = space();
      h35 = element("h3");
      t21 = text("Include folders");
      t22 = space();
      input5 = element("input");
      t23 = space();
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
      h31 = claim_element(form_nodes, "H3", {});
      var h31_nodes = children(h31);
      t4 = claim_text(h31_nodes, "Regex");
      h31_nodes.forEach(detach);
      t5 = claim_space(form_nodes);
      input0 = claim_element(form_nodes, "INPUT", { type: true });
      t6 = claim_space(form_nodes);
      input1 = claim_element(form_nodes, "INPUT", {});
      t7 = claim_space(form_nodes);
      h32 = claim_element(form_nodes, "H3", {});
      var h32_nodes = children(h32);
      t8 = claim_text(h32_nodes, "To");
      h32_nodes.forEach(detach);
      t9 = claim_space(form_nodes);
      input2 = claim_element(form_nodes, "INPUT", {});
      t10 = claim_space(form_nodes);
      button0 = claim_element(form_nodes, "BUTTON", {});
      var button0_nodes = children(button0);
      t11 = claim_text(button0_nodes, "Preview");
      button0_nodes.forEach(detach);
      t12 = claim_space(form_nodes);
      button1 = claim_element(form_nodes, "BUTTON", {});
      var button1_nodes = children(button1);
      t13 = claim_text(button1_nodes, "Commit");
      button1_nodes.forEach(detach);
      t14 = claim_space(form_nodes);
      h33 = claim_element(form_nodes, "H3", {});
      var h33_nodes = children(h33);
      t15 = claim_text(h33_nodes, "Case Insensitive");
      h33_nodes.forEach(detach);
      t16 = claim_space(form_nodes);
      input3 = claim_element(form_nodes, "INPUT", { type: true });
      t17 = claim_space(form_nodes);
      h34 = claim_element(form_nodes, "H3", {});
      var h34_nodes = children(h34);
      t18 = claim_text(h34_nodes, "Include files");
      h34_nodes.forEach(detach);
      t19 = claim_space(form_nodes);
      input4 = claim_element(form_nodes, "INPUT", { type: true });
      t20 = claim_space(form_nodes);
      h35 = claim_element(form_nodes, "H3", {});
      var h35_nodes = children(h35);
      t21 = claim_text(h35_nodes, "Include folders");
      h35_nodes.forEach(detach);
      t22 = claim_space(form_nodes);
      input5 = claim_element(form_nodes, "INPUT", { type: true });
      t23 = claim_space(form_nodes);
      if (if_block)
        if_block.l(form_nodes);
      form_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(input0, "type", "checkbox");
      input0.checked = input0_checked_value = ctx[3].isRegex;
      input1.required = true;
      input2.required = true;
      attr(input3, "type", "checkbox");
      attr(input4, "type", "checkbox");
      attr(input5, "type", "checkbox");
    },
    m(target, anchor) {
      insert_hydration(target, form, anchor);
      append_hydration(form, h1);
      append_hydration(h1, t0);
      append_hydration(form, t1);
      append_hydration(form, h30);
      append_hydration(h30, t2);
      append_hydration(form, t3);
      append_hydration(form, h31);
      append_hydration(h31, t4);
      append_hydration(form, t5);
      append_hydration(form, input0);
      append_hydration(form, t6);
      append_hydration(form, input1);
      set_input_value(input1, ctx[1]);
      append_hydration(form, t7);
      append_hydration(form, h32);
      append_hydration(h32, t8);
      append_hydration(form, t9);
      append_hydration(form, input2);
      set_input_value(input2, ctx[2]);
      append_hydration(form, t10);
      append_hydration(form, button0);
      append_hydration(button0, t11);
      append_hydration(form, t12);
      append_hydration(form, button1);
      append_hydration(button1, t13);
      append_hydration(form, t14);
      append_hydration(form, h33);
      append_hydration(h33, t15);
      append_hydration(form, t16);
      append_hydration(form, input3);
      input3.checked = ctx[3].caseInsensitive;
      append_hydration(form, t17);
      append_hydration(form, h34);
      append_hydration(h34, t18);
      append_hydration(form, t19);
      append_hydration(form, input4);
      input4.checked = ctx[3].includeFiles;
      append_hydration(form, t20);
      append_hydration(form, h35);
      append_hydration(h35, t21);
      append_hydration(form, t22);
      append_hydration(form, input5);
      input5.checked = ctx[3].includeFolders;
      append_hydration(form, t23);
      if (if_block)
        if_block.m(form, null);
      if (!mounted) {
        dispose = [
          listen(input1, "input", ctx[8]),
          listen(input2, "input", ctx[9]),
          listen(button0, "click", prevent_default(ctx[10])),
          listen(button1, "click", prevent_default(ctx[11])),
          listen(input3, "change", ctx[12]),
          listen(input4, "change", ctx[13]),
          listen(input5, "change", ctx[14]),
          listen(form, "submit", prevent_default(submit_handler))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & 1)
        set_data(t0, ctx2[0]);
      if (dirty & 8 && input0_checked_value !== (input0_checked_value = ctx2[3].isRegex)) {
        input0.checked = input0_checked_value;
      }
      if (dirty & 2 && input1.value !== ctx2[1]) {
        set_input_value(input1, ctx2[1]);
      }
      if (dirty & 4 && input2.value !== ctx2[2]) {
        set_input_value(input2, ctx2[2]);
      }
      if (dirty & 8) {
        input3.checked = ctx2[3].caseInsensitive;
      }
      if (dirty & 8) {
        input4.checked = ctx2[3].includeFiles;
      }
      if (dirty & 8) {
        input5.checked = ctx2[3].includeFolders;
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
          $$invalidate(4, previewItems = message.value);
          break;
        case "commit-done":
          $$invalidate(4, previewItems = void 0);
          break;
      }
    }));
    yield sendFetchSourceCommand();
  }));
  let source;
  let from;
  let to;
  let options = {
    includeFiles: true,
    includeFolders: true,
    isGlobal: true,
    isRegex: true,
    caseInsensitive: false
  };
  let previewItems;
  let isPreviewLoading = false;
  function sendFetchPreviewCommand() {
    return __awaiter(this, void 0, void 0, function* () {
      $$invalidate(5, isPreviewLoading = true);
      yield tsvscode.postMessage({
        type: "fetch-preview",
        value: { from, to, source, options }
      });
      $$invalidate(5, isPreviewLoading = false);
    });
  }
  function sendCommitCommand() {
    return __awaiter(this, void 0, void 0, function* () {
      if (!previewItems) {
        yield sendFetchPreviewCommand();
      }
      yield tsvscode.postMessage({
        type: "commit",
        value: { from, to, source, options, previewItems }
      });
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
  function input1_input_handler() {
    from = this.value;
    $$invalidate(1, from);
  }
  function input2_input_handler() {
    to = this.value;
    $$invalidate(2, to);
  }
  const click_handler = async () => {
    await sendFetchPreviewCommand();
  };
  const click_handler_1 = async () => {
    await sendCommitCommand();
  };
  function input3_change_handler() {
    options.caseInsensitive = this.checked;
    $$invalidate(3, options);
  }
  function input4_change_handler() {
    options.includeFiles = this.checked;
    $$invalidate(3, options);
  }
  function input5_change_handler() {
    options.includeFolders = this.checked;
    $$invalidate(3, options);
  }
  return [
    source,
    from,
    to,
    options,
    previewItems,
    isPreviewLoading,
    sendFetchPreviewCommand,
    sendCommitCommand,
    input1_input_handler,
    input2_input_handler,
    click_handler,
    click_handler_1,
    input3_change_handler,
    input4_change_handler,
    input5_change_handler
  ];
}
class Routes extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export { Routes as default };
