import { inject, reactive, onMounted, resolveComponent, withCtx, createTextVNode, toDisplayString, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { D as DangerButton } from "./DangerButton-Dcecw4TW.js";
import { H as Header, P as PageContent } from "./PageContent-DUCvys5k.js";
import { _ as _sfc_main$1 } from "./Link-5PMH6oFQ.js";
import { P as PrimaryButton } from "./PrimaryButton-q_mES2K7.js";
import { r as routeParams } from "../ssr.js";
import { useI18n } from "vue-i18n";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./vendor-others-CNLO9YKw.js";
import "axios";
import "vue-cookies";
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
const _sfc_main = {
  __name: "page",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const swal = inject("$swal");
    const form = reactive({
      data: {
        name: "",
        team_id: ""
      },
      errors: [],
      loading: false
    });
    onMounted(() => {
      form.loading = true;
      axios.get(`/api/projects/${routeParams().project}`).then((response) => {
        form.data = response.data;
        form.loading = false;
      }).catch(() => {
        swal(t("Error!"), "Failed to load project data.", "error");
        form.loading = false;
      });
    });
    const updateResource = () => {
      form.errors = {};
      const data = {
        name: form.data.name,
        team_id: form.data.team_id === void 0 ? null : form.data.team_id,
        company_id: form.data.company_id === void 0 ? null : form.data.company_id,
        description: form.data.description
      };
      return axios.put(`/api/projects/${routeParams().project}`, data).then(() => {
        swal(t("Record updated!"), t("The project has been updated."), "success").then(() => {
          window.location.href = route("admin.projects");
        });
      }).catch(() => {
        swal(t("Error!"), t("An error occurred while updating the project."), "error");
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
    const loadTeam = (id, cachedOption) => {
      if (cachedOption) {
        return cachedOption;
      }
      if (form.data.team) {
        return {
          value: form.data.team.id,
          label: form.data.team.name
        };
      }
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
        return res.data.data.map((company) => ({
          value: company.id,
          label: company.name
        }));
      }
      return [];
    };
    const loadCompany = (id, cachedOption) => {
      if (cachedOption) {
        return cachedOption;
      }
      if (form.data.company) {
        return {
          value: form.data.company.id,
          label: form.data.company.name
        };
      }
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
      _push(`<div class="mt-3 mx-4 flex justify-end space-x-2">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        href: `/admin/projects/${unref(routeParams)().project}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PrimaryButton, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("Show"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("Show")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(PrimaryButton, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("Show")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(DangerButton, {
        onClick: ($event) => _ctx.destroyResource(unref(routeParams)().project),
        class: "hover:text-red-900"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("Delete"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("Delete")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(PageContent, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_FormKit, {
              "submit-label": _ctx.$t("Save"),
              onSubmit: updateResource,
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
                    "option-loader": loadTeam,
                    popover: "",
                    "selection-removable": ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_FormKit, {
                    type: "autocomplete",
                    name: "company",
                    label: _ctx.$t("Company"),
                    modelValue: form.data.company_id,
                    "onUpdate:modelValue": ($event) => form.data.company_id = $event,
                    placeholder: _ctx.$t("Search for a company"),
                    options: searchCompanies,
                    "option-loader": loadCompany,
                    popover: "",
                    "selection-removable": ""
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
                        "option-loader": loadTeam,
                        popover: "",
                        "selection-removable": ""
                      }, null, 8, ["label", "modelValue", "onUpdate:modelValue", "placeholder"]),
                      createVNode(_component_FormKit, {
                        type: "autocomplete",
                        name: "company",
                        label: _ctx.$t("Company"),
                        modelValue: form.data.company_id,
                        "onUpdate:modelValue": ($event) => form.data.company_id = $event,
                        placeholder: _ctx.$t("Search for a company"),
                        options: searchCompanies,
                        "option-loader": loadCompany,
                        popover: "",
                        "selection-removable": ""
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
                onSubmit: updateResource,
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
                      "option-loader": loadTeam,
                      popover: "",
                      "selection-removable": ""
                    }, null, 8, ["label", "modelValue", "onUpdate:modelValue", "placeholder"]),
                    createVNode(_component_FormKit, {
                      type: "autocomplete",
                      name: "company",
                      label: _ctx.$t("Company"),
                      modelValue: form.data.company_id,
                      "onUpdate:modelValue": ($event) => form.data.company_id = $event,
                      placeholder: _ctx.$t("Search for a company"),
                      options: searchCompanies,
                      "option-loader": loadCompany,
                      popover: "",
                      "selection-removable": ""
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/nexus/(global)/(auth)/admin/projects/{project}/edit/page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
