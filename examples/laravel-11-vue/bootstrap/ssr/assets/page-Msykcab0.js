import { inject, reactive, onMounted, resolveComponent, withCtx, unref, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { H as Header, P as PageContent } from "./PageContent-DUCvys5k.js";
import { _ as _sfc_main$2 } from "./Loading-B6yUkSxp.js";
import { r as routeParams } from "../ssr.js";
import axios from "axios";
import { D as DangerButton } from "./DangerButton-Dcecw4TW.js";
import { useI18n } from "vue-i18n";
import { P as PrimaryButton } from "./PrimaryButton-q_mES2K7.js";
import { _ as _sfc_main$1 } from "./Link-5PMH6oFQ.js";
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
      data: {
        name: "",
        email: "",
        website: ""
      },
      errors: [],
      loading: true
    });
    onMounted(() => {
      form.loading = true;
      axios.get(`/api/companies/${routeParams().company}`).then((response) => {
        form.data = response.data;
        form.loading = false;
      }).catch(() => {
        swal(t("Error!"), "Failed to load company data.", "error");
        form.loading = false;
      });
    });
    const updateResource = () => {
      form.errors = {};
      const data = {
        name: form.data.name,
        email: form.data.email,
        website: form.data.website
      };
      return axios.put(`/api/companies/${routeParams().company}`, data).then(() => {
        swal(t("Record updated!"), t("The company has been updated."), "success").then(() => {
          window.location.href = route("admin.companies");
        });
      }).catch(() => {
        swal(t("Error!"), t("An error occurred while updating the company."), "error");
      });
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
          axios.delete(`/api/companies/${id}`).then(() => {
            swal(t("Record deleted!"), t("The company has been deleted."), "success").then(() => {
              window.location.href = "/admin/companies";
            });
          }).catch((error) => {
            console.error(error);
            swal(t("Error!"), t("An error occurred while deleting the company."), "error");
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
            _push2(`${ssrInterpolate(form.loading ? _ctx.$t("Loading...") : `${_ctx.$t("Edit company")} #${unref(routeParams)().company} - ${form.data.name}`)}`);
          } else {
            return [
              createTextVNode(toDisplayString(form.loading ? _ctx.$t("Loading...") : `${_ctx.$t("Edit company")} #${unref(routeParams)().company} - ${form.data.name}`), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mt-3 mx-4 flex justify-end space-x-2">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        href: `/admin/companies/${unref(routeParams)().company}`
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
        onClick: ($event) => destroyResource(unref(routeParams)().company),
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
      if (form.loading) {
        _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      } else {
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
                      type: "email",
                      name: "email",
                      validation: "email",
                      required: "",
                      id: "email",
                      label: _ctx.$t("Email"),
                      placeholder: `“${_ctx.$t("cool-email@email.com")}”`,
                      modelValue: form.data.email,
                      "onUpdate:modelValue": ($event) => form.data.email = $event
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_FormKit, {
                      "validation-visibility": "live",
                      type: "text",
                      name: "website",
                      validation: "url",
                      required: "",
                      id: "website",
                      label: _ctx.$t("Website"),
                      placeholder: `“${_ctx.$t("cool-website.com")}”`,
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
                          placeholder: `“${_ctx.$t("The Beatles")}”`,
                          modelValue: form.data.name,
                          "onUpdate:modelValue": ($event) => form.data.name = $event
                        }, null, 8, ["label", "placeholder", "modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_FormKit, {
                          "validation-visibility": "live",
                          type: "email",
                          name: "email",
                          validation: "email",
                          required: "",
                          id: "email",
                          label: _ctx.$t("Email"),
                          placeholder: `“${_ctx.$t("cool-email@email.com")}”`,
                          modelValue: form.data.email,
                          "onUpdate:modelValue": ($event) => form.data.email = $event
                        }, null, 8, ["label", "placeholder", "modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_FormKit, {
                          "validation-visibility": "live",
                          type: "text",
                          name: "website",
                          validation: "url",
                          required: "",
                          id: "website",
                          label: _ctx.$t("Website"),
                          placeholder: `“${_ctx.$t("cool-website.com")}”`,
                          modelValue: form.data.website,
                          "onUpdate:modelValue": ($event) => form.data.website = $event
                        }, null, 8, ["label", "placeholder", "modelValue", "onUpdate:modelValue"])
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
                        type: "email",
                        name: "email",
                        validation: "email",
                        required: "",
                        id: "email",
                        label: _ctx.$t("Email"),
                        placeholder: `“${_ctx.$t("cool-email@email.com")}”`,
                        modelValue: form.data.email,
                        "onUpdate:modelValue": ($event) => form.data.email = $event
                      }, null, 8, ["label", "placeholder", "modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_FormKit, {
                        "validation-visibility": "live",
                        type: "text",
                        name: "website",
                        validation: "url",
                        required: "",
                        id: "website",
                        label: _ctx.$t("Website"),
                        placeholder: `“${_ctx.$t("cool-website.com")}”`,
                        modelValue: form.data.website,
                        "onUpdate:modelValue": ($event) => form.data.website = $event
                      }, null, 8, ["label", "placeholder", "modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  _: 1
                }, 8, ["submit-label"])
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/nexus/(global)/(auth)/admin/companies/{company}/edit/page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
