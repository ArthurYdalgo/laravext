import { ref, onErrorCaptured, unref, useSSRContext, mergeProps, withCtx, createVNode, renderSlot } from "vue";
import { ssrRenderSlot, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main$1 = {
  __name: "ErrorBoundary",
  __ssrInlineRender: true,
  props: ["onError"],
  setup(__props) {
    const { onError } = __props;
    let errorWasCaptured = ref(false);
    onErrorCaptured((error, vm, info) => {
      errorWasCaptured.value = true;
      console.log("Error captured in error component: ", error);
      if (onError) {
        onError();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (!unref(errorWasCaptured)) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      } else {
        ssrRenderSlot(_ctx.$slots, "fallback", {}, null, _push, _parent);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ErrorBoundary.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "error",
  __ssrInlineRender: true,
  setup(__props) {
    const doSomething = () => {
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ onError: doSomething }, _attrs), {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>Something went wrong... Oopsie daisy</span>`);
          } else {
            return [
              createVNode("span", null, "Something went wrong... Oopsie daisy")
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
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/nexus/(global)/(auth)/error.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
