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
        name: ""
      },
      errors: [],
      loading: false
    });
    const createResource = () => {
      form.loading = true;
      form.errors = {};
      return axios.post("/api/teams", form.data).then(() => {
        form.loading = false;
        location.href = "/admin/teams";
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
            _push2(`${ssrInterpolate(_ctx.$t("Create a team"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("Create a team")), 1)
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
                  _push3(ssrRenderComponent(_component_FormKit, {
                    "validation-visibility": "live",
                    type: "text",
                    name: "name",
                    validation: "length:2,200",
                    required: "",
                    id: "name",
                    label: _ctx.$t("Name"),
                    placeholder: `“${_ctx.$t("The Beatles")}”`,
                    modelValue: form.data.name,
                    "onUpdate:modelValue": ($event) => form.data.name = $event
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_FormKit, {
                      "validation-visibility": "live",
                      type: "text",
                      name: "name",
                      validation: "length:2,200",
                      required: "",
                      id: "name",
                      label: _ctx.$t("Name"),
                      placeholder: `“${_ctx.$t("The Beatles")}”`,
                      modelValue: form.data.name,
                      "onUpdate:modelValue": ($event) => form.data.name = $event
                    }, null, 8, ["label", "placeholder", "modelValue", "onUpdate:modelValue"])
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
                  createVNode(_component_FormKit, {
                    "validation-visibility": "live",
                    type: "text",
                    name: "name",
                    validation: "length:2,200",
                    required: "",
                    id: "name",
                    label: _ctx.$t("Name"),
                    placeholder: `“${_ctx.$t("The Beatles")}”`,
                    modelValue: form.data.name,
                    "onUpdate:modelValue": ($event) => form.data.name = $event
                  }, null, 8, ["label", "placeholder", "modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/nexus/(global)/(auth)/admin/teams/create/page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
