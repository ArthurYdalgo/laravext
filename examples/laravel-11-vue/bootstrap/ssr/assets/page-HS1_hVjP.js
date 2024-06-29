import { inject, reactive, onMounted, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, withDirectives, vModelText, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$3, a as _sfc_main$4 } from "./SecondaryButton-VZaFm0Ff.js";
import { debounce } from "lodash";
import { D as DangerButton } from "./DangerButton-Dcecw4TW.js";
import { H as Header, P as PageContent } from "./PageContent-DUCvys5k.js";
import { _ as _sfc_main$1 } from "./Link-5PMH6oFQ.js";
import { P as PrimaryButton } from "./PrimaryButton-q_mES2K7.js";
import { _ as _sfc_main$2 } from "./Loading-B6yUkSxp.js";
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
    const pagination = reactive({
      data: [],
      meta: {},
      loading: true,
      page: 1,
      per_page: 10
    });
    const filters = reactive({
      search: ""
    });
    const paginateTo = ({ page, perPage }) => {
      pagination.page = page;
      pagination.per_page = perPage;
      fetchResources();
    };
    const fetchResources = () => {
      pagination.loading = true;
      axios.get(`/api/projects`, {
        params: {
          filter: {
            team_id: routeParams().team
          },
          page: pagination.page,
          per_page: pagination.per_page,
          search: filters.search
        }
      }).then((response) => {
        pagination.data = response.data.data;
        pagination.meta = response.data.meta;
        pagination.loading = false;
      }).catch((error) => {
        console.error(error);
        pagination.loading = false;
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
          axios.delete(`/api/projects/${id}`).then(() => {
            fetchResources();
            swal(t("Record deleted!"), t("The project has been deleted."), "success");
          }).catch((error) => {
            console.error(error);
            swal(t("Error!"), t("An error occurred while deleting the project."), "error");
          });
        }
      });
    };
    const debouncedFetchResources = debounce(() => {
      pagination.page = 1;
      fetchResources();
    }, 1e3);
    onMounted(async () => {
      fetchResources();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Header, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              href: `/admin/teams/${unref(routeParams)().team}`,
              classes: "text-blue-600"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("Return to"))} ${ssrInterpolate(_ctx.$t("Team"))} #${ssrInterpolate(unref(routeParams)().team)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("Return to")) + " " + toDisplayString(_ctx.$t("Team")) + " #" + toDisplayString(unref(routeParams)().team), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(` / ${ssrInterpolate(_ctx.$t("Projects"))}`);
          } else {
            return [
              createVNode(_sfc_main$1, {
                href: `/admin/teams/${unref(routeParams)().team}`,
                classes: "text-blue-600"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("Return to")) + " " + toDisplayString(_ctx.$t("Team")) + " #" + toDisplayString(unref(routeParams)().team), 1)
                ]),
                _: 1
              }, 8, ["href"]),
              createTextVNode(" / " + toDisplayString(_ctx.$t("Projects")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(PageContent, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (pagination.loading) {
              _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center justify-between mb-4"${_scopeId}><div class="flex items-center"${_scopeId}><input type="text" id="search"${ssrRenderAttr("value", filters.search)}${ssrRenderAttr("placeholder", _ctx.$t("Search"))} class="border border-gray-300 rounded px-3 py-2"${_scopeId}></div><div class="flex items-center"${_scopeId}></div></div><table class="${ssrRenderClass([{ "opacity-50": pagination.loading }, "min-w-full divide-y divide-gray-200 border my-4"])}"${_scopeId}><thead${_scopeId}><tr${_scopeId}><th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> ID </th><th class="border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>${ssrInterpolate(_ctx.$t("Name"))}</th><th class="border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>${ssrInterpolate(_ctx.$t("Company"))}</th><th class="border-l w-96 px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>${ssrInterpolate(_ctx.$t("Actions"))}</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(pagination.data, (resource) => {
              var _a;
              _push2(`<tr class="odd:bg-gray-100 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-700"${_scopeId}><td class="border-t px-6 py-4 whitespace-no-wrap text-sm text-gray-900 w-28"${_scopeId}><div class="text-sm leading-5 font-medium text-gray-900"${_scopeId}>${ssrInterpolate(resource.id)}</div></td><td class="border-t border-l px-6 py-4 whitespace-no-wrap"${_scopeId}><div class="text-sm leading-5 font-medium text-gray-900"${_scopeId}>${ssrInterpolate(resource.name)}</div></td><td class="border-t border-l px-6 py-4 whitespace-no-wrap"${_scopeId}><div class="text-sm leading-5 font-medium text-gray-900"${_scopeId}>`);
              if (resource.company) {
                _push2(ssrRenderComponent(_sfc_main$1, {
                  class: "text-blue-600",
                  href: `/admin/companies/${(_a = resource.company) == null ? void 0 : _a.id}`
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(resource.company.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(resource.company.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<span${_scopeId}>--</span>`);
              }
              _push2(`</div></td><td class="border-t border-l px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                href: `/admin/projects/${resource.id}`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(PrimaryButton, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(_ctx.$t("Show"))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(_ctx.$t("Show")), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
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
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$1, {
                href: `/admin/projects/${resource.id}/edit`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$3, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(_ctx.$t("Edit"))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(_ctx.$t("Edit")), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$3, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("Edit")), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(DangerButton, {
                onClick: ($event) => destroyResource(resource.id),
                class: "hover:text-red-900"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.$t("Delete"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("Delete")), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</td></tr>`);
            });
            _push2(`<!--]--></tbody></table>`);
            if (!pagination.loading) {
              _push2(ssrRenderComponent(_sfc_main$4, {
                onPaginateTo: paginateTo,
                pagination: pagination ?? {}
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              pagination.loading ? (openBlock(), createBlock(_sfc_main$2, { key: 0 })) : createCommentVNode("", true),
              createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                createVNode("div", { class: "flex items-center" }, [
                  withDirectives(createVNode("input", {
                    type: "text",
                    id: "search",
                    "onUpdate:modelValue": ($event) => filters.search = $event,
                    placeholder: _ctx.$t("Search"),
                    class: "border border-gray-300 rounded px-3 py-2",
                    onInput: unref(debouncedFetchResources)
                  }, null, 40, ["onUpdate:modelValue", "placeholder", "onInput"]), [
                    [vModelText, filters.search]
                  ])
                ]),
                createVNode("div", { class: "flex items-center" })
              ]),
              createVNode("table", {
                class: [{ "opacity-50": pagination.loading }, "min-w-full divide-y divide-gray-200 border my-4"]
              }, [
                createVNode("thead", null, [
                  createVNode("tr", null, [
                    createVNode("th", { class: "px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" }, " ID "),
                    createVNode("th", { class: "border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" }, toDisplayString(_ctx.$t("Name")), 1),
                    createVNode("th", { class: "border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" }, toDisplayString(_ctx.$t("Company")), 1),
                    createVNode("th", { class: "border-l w-96 px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" }, toDisplayString(_ctx.$t("Actions")), 1)
                  ])
                ]),
                createVNode("tbody", null, [
                  (openBlock(true), createBlock(Fragment, null, renderList(pagination.data, (resource) => {
                    var _a;
                    return openBlock(), createBlock("tr", {
                      class: "odd:bg-gray-100 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-700",
                      key: resource.id
                    }, [
                      createVNode("td", { class: "border-t px-6 py-4 whitespace-no-wrap text-sm text-gray-900 w-28" }, [
                        createVNode("div", { class: "text-sm leading-5 font-medium text-gray-900" }, toDisplayString(resource.id), 1)
                      ]),
                      createVNode("td", { class: "border-t border-l px-6 py-4 whitespace-no-wrap" }, [
                        createVNode("div", { class: "text-sm leading-5 font-medium text-gray-900" }, toDisplayString(resource.name), 1)
                      ]),
                      createVNode("td", { class: "border-t border-l px-6 py-4 whitespace-no-wrap" }, [
                        createVNode("div", { class: "text-sm leading-5 font-medium text-gray-900" }, [
                          resource.company ? (openBlock(), createBlock(_sfc_main$1, {
                            key: 0,
                            class: "text-blue-600",
                            href: `/admin/companies/${(_a = resource.company) == null ? void 0 : _a.id}`
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(resource.company.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["href"])) : (openBlock(), createBlock("span", { key: 1 }, "--"))
                        ])
                      ]),
                      createVNode("td", { class: "border-t border-l px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium space-x-2" }, [
                        createVNode(_sfc_main$1, {
                          href: `/admin/projects/${resource.id}`
                        }, {
                          default: withCtx(() => [
                            createVNode(PrimaryButton, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("Show")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1032, ["href"]),
                        createVNode(_sfc_main$1, {
                          href: `/admin/projects/${resource.id}/edit`
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$3, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("Edit")), 1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1032, ["href"]),
                        createVNode(DangerButton, {
                          onClick: ($event) => destroyResource(resource.id),
                          class: "hover:text-red-900"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t("Delete")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])
                      ])
                    ]);
                  }), 128))
                ])
              ], 2),
              !pagination.loading ? (openBlock(), createBlock(_sfc_main$4, {
                key: 1,
                onPaginateTo: paginateTo,
                pagination: pagination ?? {}
              }, null, 8, ["pagination"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/nexus/(global)/(auth)/admin/teams/{team}/projects/page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
