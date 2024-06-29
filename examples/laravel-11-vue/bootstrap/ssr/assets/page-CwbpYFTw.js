import { inject, reactive, onMounted, withCtx, createTextVNode, toDisplayString, unref, createVNode, openBlock, createBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { D as DangerButton } from "./DangerButton-Dcecw4TW.js";
import { H as Header, P as PageContent } from "./PageContent-DUCvys5k.js";
import { _ as _sfc_main$1 } from "./Link-5PMH6oFQ.js";
import { _ as _sfc_main$2 } from "./Loading-B6yUkSxp.js";
import { P as PrimaryButton } from "./PrimaryButton-q_mES2K7.js";
import { p as privacy } from "./usePrivacy-tgfaLRgV.js";
import { r as routeParams } from "../ssr.js";
import axios from "axios";
import { useI18n } from "vue-i18n";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./vendor-others-CNLO9YKw.js";
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
    const company = reactive({
      data: {},
      loading: true
    });
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
    onMounted(() => {
      axios.get(`/api/companies/${routeParams().company}`).then((response) => {
        company.data = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          website: response.data.website
        };
        company.loading = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Header, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(company.loading ? _ctx.$t("Loading...") : `#${company.data.id} - ${company.data.name}`)}`);
          } else {
            return [
              createTextVNode(toDisplayString(company.loading ? _ctx.$t("Loading...") : `#${company.data.id} - ${company.data.name}`), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mt-3 mx-4 flex justify-end space-x-2">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        href: `/admin/companies/${unref(routeParams)().company}/edit`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(PrimaryButton, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("Edit"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("Edit")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(PrimaryButton, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("Edit")), 1)
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
      if (company.loading) {
        _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      } else {
        _push(ssrRenderComponent(PageContent, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                href: `/admin/companies/${unref(routeParams)().company}/projects`,
                class: "text-blue-600 text-xl font-bold"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.$t("Click to view projects of Company"))} #${ssrInterpolate(unref(routeParams)().company)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("Click to view projects of Company")) + " #" + toDisplayString(unref(routeParams)().company), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<br${_scopeId}><span class="text-lg font-bold"${_scopeId}>${ssrInterpolate(_ctx.$t("Name"))}: </span>${ssrInterpolate(company.data.name)} <br${_scopeId}><span class="text-lg font-bold"${_scopeId}>Email: </span>${ssrInterpolate(unref(privacy).active ? "***@***" : company.data.email)} <br${_scopeId}><span class="text-lg font-bold"${_scopeId}>Website: </span>`);
              if (company.data.website) {
                _push2(ssrRenderComponent(_sfc_main$1, {
                  href: company.data.website,
                  class: "text-blue-600"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(company.data.website)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(company.data.website), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<span class="text-gray-400"${_scopeId}>${ssrInterpolate(_ctx.$t("No website"))}</span>`);
              }
            } else {
              return [
                createVNode(_sfc_main$1, {
                  href: `/admin/companies/${unref(routeParams)().company}/projects`,
                  class: "text-blue-600 text-xl font-bold"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("Click to view projects of Company")) + " #" + toDisplayString(unref(routeParams)().company), 1)
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode("br"),
                createVNode("span", { class: "text-lg font-bold" }, toDisplayString(_ctx.$t("Name")) + ": ", 1),
                createTextVNode(toDisplayString(company.data.name) + " ", 1),
                createVNode("br"),
                createVNode("span", { class: "text-lg font-bold" }, "Email: "),
                createTextVNode(toDisplayString(unref(privacy).active ? "***@***" : company.data.email) + " ", 1),
                createVNode("br"),
                createVNode("span", { class: "text-lg font-bold" }, "Website: "),
                company.data.website ? (openBlock(), createBlock(_sfc_main$1, {
                  key: 0,
                  href: company.data.website,
                  class: "text-blue-600"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(company.data.website), 1)
                  ]),
                  _: 1
                }, 8, ["href"])) : (openBlock(), createBlock("span", {
                  key: 1,
                  class: "text-gray-400"
                }, toDisplayString(_ctx.$t("No website")), 1))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/nexus/(global)/(auth)/admin/companies/{company}/page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
