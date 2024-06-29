import { reactive, resolveComponent, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { H as Header, P as PageContent } from "./PageContent-DUCvys5k.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "page",
  __ssrInlineRender: true,
  setup(__props) {
    const form = reactive({
      data: {
        name: "",
        email: "",
        website: ""
      },
      errors: [],
      loading: false
    });
    const createResource = () => {
      form.loading = true;
      form.errors = {};
      return axios.post("/api/companies", form.data).then(() => {
        form.loading = false;
        location.href = "/admin/companies";
      }).catch((error) => {
        form.loading = false;
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormKit = resolveComponent("FormKit");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Header, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("Create a company"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("Create a company")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(PageContent, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_FormKit, {
              "submit-label": _ctx.$t("Save"),
              onSubmit: createResource,
              type: "form"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-start space-x-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_FormKit, {
                    "validation-visibility": "live",
                    type: "text",
                    name: "name",
                    validation: "length:2,200",
                    required: "",
                    id: "name",
                    label: _ctx.$t("Name"),
                    placeholder: "Coca-Cola",
                    modelValue: form.data.name,
                    "onUpdate:modelValue": ($event) => form.data.name = $event
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_FormKit, {
                    "validation-visibility": "live",
                    type: "email",
                    name: "email",
                    validation: "email",
                    required: "",
                    id: "email",
                    label: _ctx.$t("Email"),
                    placeholder: "coca.coca@email.com",
                    modelValue: form.data.email,
                    "onUpdate:modelValue": ($event) => form.data.email = $event
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_FormKit, {
                    "validation-visibility": "live",
                    type: "text",
                    name: "website",
                    validation: "length:2,200",
                    required: "",
                    id: "website",
                    label: _ctx.$t("Website"),
                    placeholder: "https://www.coca-cola.com",
                    modelValue: form.data.website,
                    "onUpdate:modelValue": ($event) => form.data.website = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-start space-x-4" }, [
                      createVNode(_component_FormKit, {
                        "validation-visibility": "live",
                        type: "text",
                        name: "name",
                        validation: "length:2,200",
                        required: "",
                        id: "name",
                        label: _ctx.$t("Name"),
                        placeholder: "Coca-Cola",
                        modelValue: form.data.name,
                        "onUpdate:modelValue": ($event) => form.data.name = $event
                      }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_FormKit, {
                        "validation-visibility": "live",
                        type: "email",
                        name: "email",
                        validation: "email",
                        required: "",
                        id: "email",
                        label: _ctx.$t("Email"),
                        placeholder: "coca.coca@email.com",
                        modelValue: form.data.email,
                        "onUpdate:modelValue": ($event) => form.data.email = $event
                      }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_FormKit, {
                        "validation-visibility": "live",
                        type: "text",
                        name: "website",
                        validation: "length:2,200",
                        required: "",
                        id: "website",
                        label: _ctx.$t("Website"),
                        placeholder: "https://www.coca-cola.com",
                        modelValue: form.data.website,
                        "onUpdate:modelValue": ($event) => form.data.website = $event
                      }, null, 8, ["label", "modelValue", "onUpdate:modelValue"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_FormKit, {
                "submit-label": _ctx.$t("Save"),
                onSubmit: createResource,
                type: "form"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex justify-start space-x-4" }, [
                    createVNode(_component_FormKit, {
                      "validation-visibility": "live",
                      type: "text",
                      name: "name",
                      validation: "length:2,200",
                      required: "",
                      id: "name",
                      label: _ctx.$t("Name"),
                      placeholder: "Coca-Cola",
                      modelValue: form.data.name,
                      "onUpdate:modelValue": ($event) => form.data.name = $event
                    }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_FormKit, {
                      "validation-visibility": "live",
                      type: "email",
                      name: "email",
                      validation: "email",
                      required: "",
                      id: "email",
                      label: _ctx.$t("Email"),
                      placeholder: "coca.coca@email.com",
                      modelValue: form.data.email,
                      "onUpdate:modelValue": ($event) => form.data.email = $event
                    }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_FormKit, {
                      "validation-visibility": "live",
                      type: "text",
                      name: "website",
                      validation: "length:2,200",
                      required: "",
                      id: "website",
                      label: _ctx.$t("Website"),
                      placeholder: "https://www.coca-cola.com",
                      modelValue: form.data.website,
                      "onUpdate:modelValue": ($event) => form.data.website = $event
                    }, null, 8, ["label", "modelValue", "onUpdate:modelValue"])
                  ])
                ]),
                _: 1
              }, 8, ["submit-label"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/nexus/(global)/(auth)/admin/companies/create/page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
