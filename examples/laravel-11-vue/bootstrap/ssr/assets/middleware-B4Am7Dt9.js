import { unref, useSSRContext } from "vue";
import { ssrRenderSlot, ssrRenderAttrs } from "vue/server-renderer";
import { s as sharedProps } from "../ssr.js";
import "axios";
import "vue-cookies";
import "vue-i18n";
import "@formkit/vue";
import "vue-sweetalert2";
import "@formkit/icons";
import "@formkit/i18n";
import "@formkit/pro";
/* empty css                            */
import "./vendor-others-CNLO9YKw.js";
import "@vue/server-renderer";
import "express";
import "jsdom";
import "qs";
import "js-cookie";
const _sfc_main = {
  __name: "middleware",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    if (!((_a = sharedProps().auth) == null ? void 0 : _a.user)) {
      window.location.href = "/";
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      if ((_a2 = unref(sharedProps)().auth) == null ? void 0 : _a2.user) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      } else {
        _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-center items-center h-[75vh]"><div class="flex flex-col items-center"><h1 class="text-xl font-bold mb-4">I&#39;m sorry Dave, I&#39;m afraid I can&#39;t let you do that...</h1><div class="loader"></div></div></div></div>`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/nexus/(global)/(auth)/middleware.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
