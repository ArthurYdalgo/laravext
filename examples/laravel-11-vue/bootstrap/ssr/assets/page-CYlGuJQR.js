import { inject, reactive, resolveComponent, unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import "./InputLabel-CaeVc5ld.js";
import "./PrimaryButton-q_mES2K7.js";
import "./TextArea-BWL8-cJW.js";
import "./TextInput-C8eY-5uG.js";
import { H as Head } from "../ssr.js";
import axios from "axios";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
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
  __name: "page",
  __ssrInlineRender: true,
  setup(__props) {
    const swal = inject("$swal");
    let form = reactive({
      data: {
        name: "",
        email: "",
        message: "",
        subject: ""
      },
      errors: [],
      loading: true
    });
    const submit = async () => {
      form.errors = {};
      const data = {
        name: form.data.name,
        email: form.data.email,
        message: form.data.message,
        subject: form.data.subject
      };
      return axios.post(`/api/contact-requests`, data).then(() => {
        swal("Message Sent!", "We will get back to you soon.", "success").then(() => {
          window.location.href = route("contact");
        });
      }).catch(() => {
        swal("Error!", "An error occurred while sending the message.", "error");
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormKit = resolveComponent("FormKit");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Contact" }, null, _parent));
      _push(`<div class="flex justify-center mt-6"> Contact Us at our email <a href="mailto:fake@email.com" class="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out mx-2"> fake@email.com </a><span>|</span><a href="https://twitter.com" target="_blank" class="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out mx-2"> Twitter </a><span>|</span><a href="https://facebook.com" target="_blank" class="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out mx-2"> Facebook </a><span>|</span><a href="https://instagram.com" target="_blank" class="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out mx-2"> Instagram </a></div><div class="min-h-[50vh] flex justify-center"><div class="flex flex-col justify-center"><div class="w-full flex justify-center items-center">`);
      _push(ssrRenderComponent(_component_FormKit, {
        actions: false,
        "submit-label": "Send",
        onSubmit: submit,
        type: "form"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col items-center"${_scopeId}><h3 class="mt-6 font-extrabold text-gray-900 dark:text-white"${_scopeId}>Or submit a message below, we&#39;ll get back to you:</h3>`);
            _push2(ssrRenderComponent(_component_FormKit, {
              "validation-visibility": "live",
              type: "text",
              name: "name",
              validation: "length:2,200",
              required: "",
              id: "name",
              "outer-class": "w-full",
              label: _ctx.$t("Name"),
              placeholder: "Your beautiful name here",
              modelValue: unref(form).data.name,
              "onUpdate:modelValue": ($event) => unref(form).data.name = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_FormKit, {
              "validation-visibility": "live",
              type: "email",
              name: "email",
              validation: "email",
              required: "",
              id: "email",
              "outer-class": "w-full",
              label: _ctx.$t("Email"),
              placeholder: "Your email here",
              modelValue: unref(form).data.email,
              "onUpdate:modelValue": ($event) => unref(form).data.email = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_FormKit, {
              "validation-visibility": "live",
              type: "text",
              name: "subject",
              validation: "length:2,200",
              required: "",
              "outer-class": "w-full",
              id: "subject",
              label: _ctx.$t("Subject"),
              placeholder: "Your subject here",
              modelValue: unref(form).data.subject,
              "onUpdate:modelValue": ($event) => unref(form).data.subject = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_FormKit, {
              "validation-visibility": "live",
              type: "textarea",
              name: "message",
              validation: "length:2,5000",
              required: "",
              "outer-class": "w-full",
              id: "message",
              label: _ctx.$t("Message"),
              "input-class": "w-full max-h-[300px]",
              placeholder: "Your message here",
              modelValue: unref(form).data.message,
              "onUpdate:modelValue": ($event) => unref(form).data.message = $event
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_FormKit, {
              type: "submit",
              class: "mt-6"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col items-center" }, [
                createVNode("h3", { class: "mt-6 font-extrabold text-gray-900 dark:text-white" }, "Or submit a message below, we'll get back to you:"),
                createVNode(_component_FormKit, {
                  "validation-visibility": "live",
                  type: "text",
                  name: "name",
                  validation: "length:2,200",
                  required: "",
                  id: "name",
                  "outer-class": "w-full",
                  label: _ctx.$t("Name"),
                  placeholder: "Your beautiful name here",
                  modelValue: unref(form).data.name,
                  "onUpdate:modelValue": ($event) => unref(form).data.name = $event
                }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                createVNode(_component_FormKit, {
                  "validation-visibility": "live",
                  type: "email",
                  name: "email",
                  validation: "email",
                  required: "",
                  id: "email",
                  "outer-class": "w-full",
                  label: _ctx.$t("Email"),
                  placeholder: "Your email here",
                  modelValue: unref(form).data.email,
                  "onUpdate:modelValue": ($event) => unref(form).data.email = $event
                }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                createVNode(_component_FormKit, {
                  "validation-visibility": "live",
                  type: "text",
                  name: "subject",
                  validation: "length:2,200",
                  required: "",
                  "outer-class": "w-full",
                  id: "subject",
                  label: _ctx.$t("Subject"),
                  placeholder: "Your subject here",
                  modelValue: unref(form).data.subject,
                  "onUpdate:modelValue": ($event) => unref(form).data.subject = $event
                }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                createVNode(_component_FormKit, {
                  "validation-visibility": "live",
                  type: "textarea",
                  name: "message",
                  validation: "length:2,5000",
                  required: "",
                  "outer-class": "w-full",
                  id: "message",
                  label: _ctx.$t("Message"),
                  "input-class": "w-full max-h-[300px]",
                  placeholder: "Your message here",
                  modelValue: unref(form).data.message,
                  "onUpdate:modelValue": ($event) => unref(form).data.message = $event
                }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                createVNode(_component_FormKit, {
                  type: "submit",
                  class: "mt-6"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/nexus/(global)/(guest)/contact-us/page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
