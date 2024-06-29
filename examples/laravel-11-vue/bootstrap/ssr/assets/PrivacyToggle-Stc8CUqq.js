import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { p as privacy } from "./usePrivacy-tgfaLRgV.js";
const _sfc_main = {
  __name: "PrivacyToggle",
  __ssrInlineRender: true,
  props: ["initialState"],
  setup(__props) {
    const { initialState } = __props;
    if (initialState !== void 0) {
      privacy.setActive(initialState);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({ class: "cursor-pointer" }, _attrs))}>${ssrInterpolate(unref(privacy).active ? "Click to Turn Privacy Off" : "Click to Turn Privacy On")}</span>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/strands/PrivacyToggle.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
