import { computed, mergeProps, useSSRContext, reactive, unref, withCtx, createTextVNode, toDisplayString } from "vue";
import { ssrRenderAttrs, ssrLooseContain, ssrGetDynamicModelProps, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$3 } from "./InputLabel-CaeVc5ld.js";
import "./Link-5PMH6oFQ.js";
import { P as PrimaryButton } from "./PrimaryButton-q_mES2K7.js";
import { _ as _sfc_main$4 } from "./TextInput-C8eY-5uG.js";
import { H as Head } from "../ssr.js";
import "./vendor-others-CNLO9YKw.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "axios";
import "vue-cookies";
import "vue-i18n";
import "@formkit/vue";
import "vue-sweetalert2";
import "@formkit/icons";
import "@formkit/i18n";
import "@formkit/pro";
/* empty css                            */
import "@vue/server-renderer";
import "express";
import "jsdom";
import "qs";
import "js-cookie";
const _sfc_main$2 = {
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    checked: {
      type: [Array, Boolean],
      required: true
    },
    value: {
      default: null
    }
  },
  emits: ["update:checked"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const proxyChecked = computed({
      get() {
        return props.checked;
      },
      set(val) {
        emit("update:checked", val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        type: "checkbox",
        value: __props.value,
        checked: Array.isArray(proxyChecked.value) ? ssrLooseContain(proxyChecked.value, __props.value) : proxyChecked.value,
        class: "rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, proxyChecked.value))))}>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Checkbox.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "InputError",
  __ssrInlineRender: true,
  props: {
    message: {
      type: String
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: __props.message ? null : { display: "none" }
      }, _attrs))}><p class="text-sm text-red-600 dark:text-red-400">${ssrInterpolate(__props.message)}</p></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/InputError.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "page",
  __ssrInlineRender: true,
  setup(__props) {
    let form = reactive({
      email: "",
      password: "",
      remember: false,
      response: null,
      processing: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Login" }, null, _parent));
      _push(`<div class="flex justify-center items-center min-h-[70vh] mt-6"><form class="w-96"><h3 class="mt-6 justify-center text-2xl font-extrabold text-gray-900 dark:text-white text-center">Login</h3><div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        for: "email",
        value: _ctx.$t("Email")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        id: "email",
        type: "email",
        class: "mt-1 block w-full",
        modelValue: unref(form).email,
        "onUpdate:modelValue": ($event) => unref(form).email = $event,
        required: "",
        autofocus: "",
        autocomplete: "username"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        class: "mt-2",
        message: (_b = (_a = unref(form).response) == null ? void 0 : _a.errors) == null ? void 0 : _b.email
      }, null, _parent));
      _push(`</div><div class="mt-4">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        for: "password",
        value: _ctx.$t("Password")
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        id: "password",
        type: "password",
        class: "mt-1 block w-full",
        modelValue: unref(form).password,
        "onUpdate:modelValue": ($event) => unref(form).password = $event,
        required: "",
        autocomplete: "current-password"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        class: "mt-2",
        message: (_d = (_c = unref(form).response) == null ? void 0 : _c.errors) == null ? void 0 : _d.password
      }, null, _parent));
      _push(`</div><div class="block mt-4"><label class="flex items-center">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        name: "remember",
        checked: unref(form).remember,
        "onUpdate:checked": ($event) => unref(form).remember = $event
      }, null, _parent));
      _push(`<span class="ms-2 text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(_ctx.$t("Remember me"))}</span></label></div><div class="flex items-center justify-end mt-4">`);
      _push(ssrRenderComponent(PrimaryButton, {
        class: ["ms-4", { "opacity-25": unref(form).processing }],
        disabled: unref(form).processing
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("Login"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("Login")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/nexus/(global)/(guest)/login/page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
