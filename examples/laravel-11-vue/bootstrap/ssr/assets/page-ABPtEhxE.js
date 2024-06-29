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
        team_id: ""
      },
      errors: [],
      loading: false
    });
    const createResource = () => {
      form.loading = true;
      form.errors = {};
      return axios.post("/api/projects", form.data).then(() => {
        form.loading = false;
        location.href = "/admin/projects";
      }).catch((error) => {
        form.loading = false;
      });
    };
    const searchTeams = async ({ search, page, hasNextPage }) => {
      if (!search) {
        return [];
      }
      const res = await axios.get(`/api/teams`, {
        params: {
          search
        }
      });
      if (res.data) {
        return res.data.data.map((team) => ({
          value: team.id,
          label: team.name
        }));
      }
      return [];
    };
    const searchCompanies = async ({ search, page, hasNextPage }) => {
      if (!search) {
        return [];
      }
      const res = await axios.get(`/api/companies`, {
        params: {
          search
        }
      });
      if (res.data) {
        return res.data.data.map((team) => ({
          value: team.id,
          label: team.name
        }));
      }
      return [];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormKit = resolveComponent("FormKit");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Header, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("Create a project"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("Create a project")), 1)
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
                    placeholder: "Parthenon",
                    modelValue: form.data.name,
                    "onUpdate:modelValue": ($event) => form.data.name = $event
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_FormKit, {
                    type: "autocomplete",
                    name: "team",
                    label: _ctx.$t("Team"),
                    modelValue: form.data.team_id,
                    "onUpdate:modelValue": ($event) => form.data.team_id = $event,
                    placeholder: _ctx.$t("Search for a team"),
                    options: searchTeams,
                    popover: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_FormKit, {
                    type: "autocomplete",
                    name: "company",
                    label: _ctx.$t("Company"),
                    modelValue: form.data.company_id,
                    "onUpdate:modelValue": ($event) => form.data.company_id = $event,
                    placeholder: _ctx.$t("Search for a company"),
                    options: searchCompanies,
                    popover: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_FormKit, {
                    "validation-visibility": "live",
                    type: "textarea",
                    name: "description",
                    "outer-class": "min-w-[25%]",
                    "input-class": "min-h-[150px] max-h-[350px]",
                    validation: "length:2,2000",
                    required: "",
                    id: "description",
                    label: _ctx.$t("Description"),
                    placeholder: _ctx.$t("A brief description of the project"),
                    modelValue: form.data.description,
                    "onUpdate:modelValue": ($event) => form.data.description = $event
                  }, null, _parent3, _scopeId2));
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
                        placeholder: "Parthenon",
                        modelValue: form.data.name,
                        "onUpdate:modelValue": ($event) => form.data.name = $event
                      }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_FormKit, {
                        type: "autocomplete",
                        name: "team",
                        label: _ctx.$t("Team"),
                        modelValue: form.data.team_id,
                        "onUpdate:modelValue": ($event) => form.data.team_id = $event,
                        placeholder: _ctx.$t("Search for a team"),
                        options: searchTeams,
                        popover: ""
                      }, null, 8, ["label", "modelValue", "onUpdate:modelValue", "placeholder"]),
                      createVNode(_component_FormKit, {
                        type: "autocomplete",
                        name: "company",
                        label: _ctx.$t("Company"),
                        modelValue: form.data.company_id,
                        "onUpdate:modelValue": ($event) => form.data.company_id = $event,
                        placeholder: _ctx.$t("Search for a company"),
                        options: searchCompanies,
                        popover: ""
                      }, null, 8, ["label", "modelValue", "onUpdate:modelValue", "placeholder"])
                    ]),
                    createVNode(_component_FormKit, {
                      "validation-visibility": "live",
                      type: "textarea",
                      name: "description",
                      "outer-class": "min-w-[25%]",
                      "input-class": "min-h-[150px] max-h-[350px]",
                      validation: "length:2,2000",
                      required: "",
                      id: "description",
                      label: _ctx.$t("Description"),
                      placeholder: _ctx.$t("A brief description of the project"),
                      modelValue: form.data.description,
                      "onUpdate:modelValue": ($event) => form.data.description = $event
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
                  createVNode("div", { class: "flex justify-start space-x-4" }, [
                    createVNode(_component_FormKit, {
                      "validation-visibility": "live",
                      type: "text",
                      name: "name",
                      validation: "length:2,200",
                      required: "",
                      id: "name",
                      label: _ctx.$t("Name"),
                      placeholder: "Parthenon",
                      modelValue: form.data.name,
                      "onUpdate:modelValue": ($event) => form.data.name = $event
                    }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_FormKit, {
                      type: "autocomplete",
                      name: "team",
                      label: _ctx.$t("Team"),
                      modelValue: form.data.team_id,
                      "onUpdate:modelValue": ($event) => form.data.team_id = $event,
                      placeholder: _ctx.$t("Search for a team"),
                      options: searchTeams,
                      popover: ""
                    }, null, 8, ["label", "modelValue", "onUpdate:modelValue", "placeholder"]),
                    createVNode(_component_FormKit, {
                      type: "autocomplete",
                      name: "company",
                      label: _ctx.$t("Company"),
                      modelValue: form.data.company_id,
                      "onUpdate:modelValue": ($event) => form.data.company_id = $event,
                      placeholder: _ctx.$t("Search for a company"),
                      options: searchCompanies,
                      popover: ""
                    }, null, 8, ["label", "modelValue", "onUpdate:modelValue", "placeholder"])
                  ]),
                  createVNode(_component_FormKit, {
                    "validation-visibility": "live",
                    type: "textarea",
                    name: "description",
                    "outer-class": "min-w-[25%]",
                    "input-class": "min-h-[150px] max-h-[350px]",
                    validation: "length:2,2000",
                    required: "",
                    id: "description",
                    label: _ctx.$t("Description"),
                    placeholder: _ctx.$t("A brief description of the project"),
                    modelValue: form.data.description,
                    "onUpdate:modelValue": ($event) => form.data.description = $event
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/nexus/(global)/(auth)/admin/projects/create/page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
