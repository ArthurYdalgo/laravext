import { inject, reactive, onMounted, withCtx, createTextVNode, toDisplayString, unref, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
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
    const team = reactive({
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
          axios.delete(`/api/teams/${id}`).then(() => {
            swal(t("Record deleted!"), t("The team has been deleted."), "success").then(() => {
              window.location.href = "/admin/teams";
            });
          }).catch((error) => {
            console.error(error);
            swal(t("Error!"), t("An error occurred while deleting the team."), "error");
          });
        }
      });
    };
    onMounted(() => {
      team.loading = true;
      axios.get(`/api/teams/${routeParams().team}`).then((response) => {
        team.data = {
          id: response.data.id,
          name: response.data.name,
          developers: response.data.developers
        };
        team.loading = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Header, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(team.loading ? _ctx.$t("Loading...") : `#${team.data.id} - ${team.data.name}`)}`);
          } else {
            return [
              createTextVNode(toDisplayString(team.loading ? _ctx.$t("Loading...") : `#${team.data.id} - ${team.data.name}`), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mt-3 mx-4 flex justify-end space-x-2">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        href: `/admin/teams/${unref(routeParams)().team}/edit`
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
        onClick: ($event) => destroyResource(unref(routeParams)().team),
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
      if (team.loading) {
        _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      } else {
        _push(ssrRenderComponent(PageContent, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                href: `/admin/teams/${unref(routeParams)().team}/projects`,
                class: "text-blue-600 text-xl font-bold"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.$t("Click to view projects of Team"))} #${ssrInterpolate(unref(routeParams)().team)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("Click to view projects of Team")) + " #" + toDisplayString(unref(routeParams)().team), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<br${_scopeId}><span class="text-lg font-bold"${_scopeId}>${ssrInterpolate(_ctx.$t("Name"))}: </span>${ssrInterpolate(team.data.name)} <br${_scopeId}><span class="text-lg font-bold"${_scopeId}>${ssrInterpolate(_ctx.$t("Developers"))}:</span><div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"${_scopeId}><!--[-->`);
              ssrRenderList(team.data.developers.sort((a, b) => a.name.localeCompare(b.name)), (developer) => {
                _push2(`<div class="bg-white rounded-lg shadow p-4"${_scopeId}><div class="font-bold"${_scopeId}>@${ssrInterpolate(developer.username)}</div><div class="border-b-2 border-gray-200 my-2"${_scopeId}></div><div class="text-sm"${_scopeId}>${ssrInterpolate(_ctx.$t("Name"))}: ${ssrInterpolate(_ctx.$t(developer.name))}</div><div class="text-sm"${_scopeId}>${ssrInterpolate(_ctx.$t("Role"))}: ${ssrInterpolate(_ctx.$t(developer.role_label))}</div><div class="text-sm"${_scopeId}>Email: ${ssrInterpolate(unref(privacy).active ? "***@***" : developer.email)}</div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode(_sfc_main$1, {
                  href: `/admin/teams/${unref(routeParams)().team}/projects`,
                  class: "text-blue-600 text-xl font-bold"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("Click to view projects of Team")) + " #" + toDisplayString(unref(routeParams)().team), 1)
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode("br"),
                createVNode("span", { class: "text-lg font-bold" }, toDisplayString(_ctx.$t("Name")) + ": ", 1),
                createTextVNode(toDisplayString(team.data.name) + " ", 1),
                createVNode("br"),
                createVNode("span", { class: "text-lg font-bold" }, toDisplayString(_ctx.$t("Developers")) + ":", 1),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(team.data.developers.sort((a, b) => a.name.localeCompare(b.name)), (developer) => {
                    return openBlock(), createBlock("div", {
                      class: "bg-white rounded-lg shadow p-4",
                      key: developer.id
                    }, [
                      createVNode("div", { class: "font-bold" }, "@" + toDisplayString(developer.username), 1),
                      createVNode("div", { class: "border-b-2 border-gray-200 my-2" }),
                      createVNode("div", { class: "text-sm" }, toDisplayString(_ctx.$t("Name")) + ": " + toDisplayString(_ctx.$t(developer.name)), 1),
                      createVNode("div", { class: "text-sm" }, toDisplayString(_ctx.$t("Role")) + ": " + toDisplayString(_ctx.$t(developer.role_label)), 1),
                      createVNode("div", { class: "text-sm" }, "Email: " + toDisplayString(unref(privacy).active ? "***@***" : developer.email), 1)
                    ]);
                  }), 128))
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/nexus/(global)/(auth)/admin/teams/{team}/page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
