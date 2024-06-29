import { withCtx, createTextVNode, unref, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { s as sharedProps } from "../ssr.js";
import { H as Header, P as PageContent } from "./PageContent-DUCvys5k.js";
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
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "page",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Header, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Dashboard (Vue)`);
          } else {
            return [
              createTextVNode("Dashboard (Vue)")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(PageContent, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="p-6 text-gray-900 dark:text-gray-100"${_scopeId}>${ssrInterpolate(_ctx.$t("You're logged in"))}, ${ssrInterpolate((_a = unref(sharedProps)().auth) == null ? void 0 : _a.user.first_name)}! </div>`);
          } else {
            return [
              createVNode("div", { class: "p-6 text-gray-900 dark:text-gray-100" }, toDisplayString(_ctx.$t("You're logged in")) + ", " + toDisplayString((_b = unref(sharedProps)().auth) == null ? void 0 : _b.user.first_name) + "! ", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/nexus/(global)/(auth)/admin/dashboard/page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
