import { inject, reactive, resolveComponent, withCtx, unref, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import "./Fa-mqR-7ziz.js";
import { H as Header, P as PageContent } from "./PageContent-DUCvys5k.js";
import "./Loading-B6yUkSxp.js";
import "./Modal-BZp5eeYU.js";
import "./PrimaryButton-q_mES2K7.js";
import "./TextInput-C8eY-5uG.js";
import "./usePrivacy-tgfaLRgV.js";
import "lodash";
import { n as nexusProps, r as routeParams } from "../ssr.js";
import axios from "axios";
import { D as DangerButton } from "./DangerButton-Dcecw4TW.js";
import "./Link-5PMH6oFQ.js";
import { useI18n } from "vue-i18n";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/vue-fontawesome";
import "@fortawesome/free-solid-svg-icons";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "vue-cookies";
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
    const { t } = useI18n();
    const swal = inject("$swal");
    const form = reactive({
      data: nexusProps().developer,
      errors: [],
      loading: true
    });
    const developerRoles = nexusProps().developer_roles;
    const updateResource = () => {
      form.errors = {};
      const data = {
        username: form.data.username,
        name: form.data.name,
        email: form.data.email,
        role: form.data.role,
        team_id: form.data.team_id === void 0 ? null : form.data.team_id
      };
      return axios.put(`/api/developers/${routeParams().developer.id}`, data).then(() => {
        swal(t("Record updated!"), t("The developer has been updated."), "success").then(() => {
          window.location.href = route("admin.developers");
        });
      }).catch(() => {
        swal(t("Error!"), t("An error occurred while updating the developer."), "error");
      });
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
    const destroyResource = (id) => {
      swal({
        title: t("Are you sure?"),
        icon: "warning",
        confirmButtonText: t("Yes, delete it!"),
        cancelButtonText: t("No, cancel!"),
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        showCancelButton: true,
        showCloseButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`/api/developers/${id}`).then(() => {
            swal(t("Record deleted!"), t("The developer has been deleted."), "success").then(() => {
              window.location.href = "/admin/developers";
            });
          }).catch((error) => {
            console.error(error);
            swal(t("Error!"), t("An error occurred while deleting the developer."), "error");
          });
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormKit = resolveComponent("FormKit");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Header, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(`${_ctx.$t("Edit developer")} #${unref(nexusProps)().developer.id} - ${unref(nexusProps)().developer.name}`)}`);
          } else {
            return [
              createTextVNode(toDisplayString(`${_ctx.$t("Edit developer")} #${unref(nexusProps)().developer.id} - ${unref(nexusProps)().developer.name}`), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mt-3 mx-4 flex justify-end space-x-2">`);
      _push(ssrRenderComponent(DangerButton, {
        onClick: ($event) => destroyResource(unref(nexusProps)().developer.id),
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
                    type: "text",
                    name: "email",
                    validation: "email",
                    required: "",
                    id: "email",
                    label: _ctx.$t("Email"),
                    placeholder: `“${_ctx.$t("Type the developer email")}”`,
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
                    "selection-removable": "",
                    "option-loader": loadTeam,
                    name: "team_id",
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
                        type: "text",
                        name: "email",
                        validation: "email",
                        required: "",
                        id: "email",
                        label: _ctx.$t("Email"),
                        placeholder: `“${_ctx.$t("Type the developer email")}”`,
                        modelValue: form.data.email,
                        "onUpdate:modelValue": ($event) => form.data.email = $event
                      }, null, 8, ["label", "placeholder", "modelValue", "onUpdate:modelValue"]),
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
                        "selection-removable": "",
                        "option-loader": loadTeam,
                        name: "team_id",
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
                      type: "text",
                      name: "email",
                      validation: "email",
                      required: "",
                      id: "email",
                      label: _ctx.$t("Email"),
                      placeholder: `“${_ctx.$t("Type the developer email")}”`,
                      modelValue: form.data.email,
                      "onUpdate:modelValue": ($event) => form.data.email = $event
                    }, null, 8, ["label", "placeholder", "modelValue", "onUpdate:modelValue"]),
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
                      "selection-removable": "",
                      "option-loader": loadTeam,
                      name: "team_id",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/nexus/(global)/(auth)/admin/developers/{developer}/edit/page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
