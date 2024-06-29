import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
import "../ssr.js";
import "./vendor-others-CNLO9YKw.js";
const _sfc_main = {
  __name: "Link",
  __ssrInlineRender: true,
  props: {
    routeName: {
      type: String,
      required: false
    },
    href: {
      type: String,
      required: false
    },
    classes: {
      type: String,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    let href = props.href ? props.href : props.routeName && route().has(props.routeName) ? route(props.routeName) : "";
    let classes = props.classes ?? "";
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<a${ssrRenderAttrs(mergeProps({
        href: unref(href),
        class: unref(classes)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</a>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Link.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
