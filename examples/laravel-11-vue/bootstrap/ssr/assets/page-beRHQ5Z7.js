import { inject, reactive, resolveComponent, withCtx, createTextVNode, toDisplayString, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { H as Header, P as PageContent } from "./PageContent-DUCvys5k.js";
import { n as nexusProps } from "../ssr.js";
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
    const form = reactive({
      data: {
        name: "",
        email: "",
        role: "",
        username: ""
      },
      errors: [],
      loading: true
    });
    const developerRoles = nexusProps().developer_roles;
    const createResource = () => {
      form.errors = {};
      const data = {
        name: form.data.name,
        email: form.data.email,
        role: form.data.role
      };
      return axios.post(`/api/developers`, data).then(() => {
        swal(t("Record updated!"), "The developer has been created.", "success").then(() => {
          window.location.href = route("admin.developers");
        });
      }).catch(() => {
        swal(t("Error!"), "An error occurred while creating the developer.", "error");
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormKit = resolveComponent("FormKit");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Header, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("Create developer"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("Create developer")), 1)
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
                    placeholder: `“${_ctx.$t("The Beatles")}”`,
                    modelValue: form.data.name,
                    "onUpdate:modelValue": ($event) => form.data.name = $event
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_FormKit, {
                    "validation-visibility": "live",
                    type: "text",
                    name: "username",
                    required: "",
                    id: "username",
                    label: _ctx.$t("Username"),
                    placeholder: _ctx.$t("cool_nickname"),
                    modelValue: form.data.username,
                    "onUpdate:modelValue": ($event) => form.data.username = $event
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_FormKit, {
                    "validation-visibility": "live",
                    type: "email",
                    name: "email",
                    validation: "email",
                    required: "",
                    id: "email",
                    label: _ctx.$t("Email"),
                    placeholder: "developer@email.com",
                    modelValue: form.data.email,
                    "onUpdate:modelValue": ($event) => form.data.email = $event
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_FormKit, {
                    type: "select",
                    name: "role",
                    required: "",
                    id: "role",
                    label: _ctx.$t("Role"),
                    modelValue: form.data.role,
                    "onUpdate:modelValue": ($event) => form.data.role = $event,
                    options: unref(developerRoles)
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
                        placeholder: `“${_ctx.$t("The Beatles")}”`,
                        modelValue: form.data.name,
                        "onUpdate:modelValue": ($event) => form.data.name = $event
                      }, null, 8, ["label", "placeholder", "modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_FormKit, {
                        "validation-visibility": "live",
                        type: "text",
                        name: "username",
                        required: "",
                        id: "username",
                        label: _ctx.$t("Username"),
                        placeholder: _ctx.$t("cool_nickname"),
                        modelValue: form.data.username,
                        "onUpdate:modelValue": ($event) => form.data.username = $event
                      }, null, 8, ["label", "placeholder", "modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_FormKit, {
                        "validation-visibility": "live",
                        type: "email",
                        name: "email",
                        validation: "email",
                        required: "",
                        id: "email",
                        label: _ctx.$t("Email"),
                        placeholder: "developer@email.com",
                        modelValue: form.data.email,
                        "onUpdate:modelValue": ($event) => form.data.email = $event
                      }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_FormKit, {
                        type: "select",
                        name: "role",
                        required: "",
                        id: "role",
                        label: _ctx.$t("Role"),
                        modelValue: form.data.role,
                        "onUpdate:modelValue": ($event) => form.data.role = $event,
                        options: unref(developerRoles)
                      }, null, 8, ["label", "modelValue", "onUpdate:modelValue", "options"]),
                      createVNode(_component_FormKit, {
                        type: "autocomplete",
                        name: "team",
                        label: _ctx.$t("Team"),
                        modelValue: form.data.team_id,
                        "onUpdate:modelValue": ($event) => form.data.team_id = $event,
                        placeholder: _ctx.$t("Search for a team"),
                        options: searchTeams,
                        popover: ""
                      }, null, 8, ["label", "modelValue", "onUpdate:modelValue", "placeholder"])
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
                      placeholder: `“${_ctx.$t("The Beatles")}”`,
                      modelValue: form.data.name,
                      "onUpdate:modelValue": ($event) => form.data.name = $event
                    }, null, 8, ["label", "placeholder", "modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_FormKit, {
                      "validation-visibility": "live",
                      type: "text",
                      name: "username",
                      required: "",
                      id: "username",
                      label: _ctx.$t("Username"),
                      placeholder: _ctx.$t("cool_nickname"),
                      modelValue: form.data.username,
                      "onUpdate:modelValue": ($event) => form.data.username = $event
                    }, null, 8, ["label", "placeholder", "modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_FormKit, {
                      "validation-visibility": "live",
                      type: "email",
                      name: "email",
                      validation: "email",
                      required: "",
                      id: "email",
                      label: _ctx.$t("Email"),
                      placeholder: "developer@email.com",
                      modelValue: form.data.email,
                      "onUpdate:modelValue": ($event) => form.data.email = $event
                    }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_FormKit, {
                      type: "select",
                      name: "role",
                      required: "",
                      id: "role",
                      label: _ctx.$t("Role"),
                      modelValue: form.data.role,
                      "onUpdate:modelValue": ($event) => form.data.role = $event,
                      options: unref(developerRoles)
                    }, null, 8, ["label", "modelValue", "onUpdate:modelValue", "options"]),
                    createVNode(_component_FormKit, {
                      type: "autocomplete",
                      name: "team",
                      label: _ctx.$t("Team"),
                      modelValue: form.data.team_id,
                      "onUpdate:modelValue": ($event) => form.data.team_id = $event,
                      placeholder: _ctx.$t("Search for a team"),
                      options: searchTeams,
                      popover: ""
                    }, null, 8, ["label", "modelValue", "onUpdate:modelValue", "placeholder"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/nexus/(global)/(auth)/admin/developers/create/page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
