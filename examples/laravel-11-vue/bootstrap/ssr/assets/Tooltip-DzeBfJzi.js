import { unref, withCtx, createTextVNode, toDisplayString, renderSlot, useSSRContext } from "vue";
import { ssrRenderSlot, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Tooltip } from "floating-vue";
/* empty css                             */
const _sfc_main = {
  __name: "Tooltip",
  __ssrInlineRender: true,
  props: {
    text: {
      type: String,
      default: ""
    },
    condition: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (!__props.condition) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      } else {
        _push(ssrRenderComponent(unref(Tooltip), _attrs, {
          popper: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.text)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.text), 1)
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "default")
              ];
            }
          }),
          _: 3
        }, _parent));
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Tooltip.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
