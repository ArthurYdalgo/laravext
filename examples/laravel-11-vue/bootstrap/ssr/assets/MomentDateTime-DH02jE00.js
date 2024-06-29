import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import moment from "moment";
const _sfc_main = {
  __name: "MomentDateTime",
  __ssrInlineRender: true,
  props: {
    dateTime: { type: String, required: false },
    date: { type: String, required: false },
    format: { type: String, default: "DD/MMM/YYYY HH:mm" },
    fallback: { type: String, default: "--/---/---- --:--" },
    style: { type: String, required: false },
    className: { type: String, required: false }
  },
  setup(__props) {
    const props = __props;
    const dateTime = props.dateTime ?? props.date;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({ class: "font-mono" }, _attrs))}>${ssrInterpolate(unref(dateTime) ? unref(moment)(unref(dateTime)).format(__props.format) : __props.fallback)}</span>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/MomentDateTime.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
