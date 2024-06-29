import { inject, reactive, onMounted, withCtx, createTextVNode, toDisplayString, unref, createVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { D as DangerButton } from "./DangerButton-Dcecw4TW.js";
import { H as Header, P as PageContent } from "./PageContent-DUCvys5k.js";
import { _ as _sfc_main$1 } from "./Link-5PMH6oFQ.js";
import { _ as _sfc_main$2 } from "./Loading-B6yUkSxp.js";
import { _ as _sfc_main$4 } from "./MomentDateTime-DH02jE00.js";
import { P as PrimaryButton } from "./PrimaryButton-q_mES2K7.js";
import { _ as _sfc_main$3 } from "./TextArea-BWL8-cJW.js";
import "./usePrivacy-tgfaLRgV.js";
import { s as sharedProps, r as routeParams } from "../ssr.js";
import axios from "axios";
import { useI18n } from "vue-i18n";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./vendor-others-CNLO9YKw.js";
import "moment";
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
    const { user } = sharedProps().auth;
    const { t } = useI18n();
    const swal = inject("$swal");
    const project = reactive({
      data: {},
      loading: true
    });
    const form = reactive({
      data: {
        content: ""
      },
      errors: [],
      loading: false
    });
    const createComment = () => {
      form.loading = true;
      form.errors = {};
      axios.post(`/api/projects/${routeParams().project}/comments`, form.data).then((response) => {
        projectComments.data = [response.data.data, ...projectComments.data];
        form.loading = false;
      }).catch((error) => {
        form.loading = false;
        form.errors = error.response.data.errors;
      });
    };
    const projectComments = reactive({
      data: [],
      meta: {},
      loading: true,
      page: 1,
      per_page: 15
    });
    const loadMore = () => {
      projectComments.page++;
      fetchComments();
    };
    const fetchComments = () => {
      projectComments.loading = true;
      axios.get(`/api/projects/${routeParams().project}/comments`, {
        params: {
          page: projectComments.page,
          per_page: projectComments.per_page
        }
      }).then((response) => {
        projectComments.data = [...projectComments.data, ...response.data.data];
        projectComments.meta = response.data.meta;
        projectComments.loading = false;
      }).catch((error) => {
        console.error(error);
        projectComments.loading = false;
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
            swal(t("Record deleted!"), t("The projects has been deleted."), "success").then(() => {
              window.location.href = "/admin/projects";
            });
          }).catch((error) => {
            console.error(error);
            swal(t("Error!"), t("An error occurred while deleting the project."), "error");
          });
        }
      });
    };
    onMounted(() => {
      project.loading = true;
      axios.get(`/api/projects/${routeParams().project}`).then((response) => {
        project.data = response.data;
        project.loading = false;
        fetchComments();
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Header, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(project.loading ? _ctx.$t("Loading...") : `#${project.data.id} - ${project.data.name}`)}`);
          } else {
            return [
              createTextVNode(toDisplayString(project.loading ? _ctx.$t("Loading...") : `#${project.data.id} - ${project.data.name}`), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="mt-3 mx-4 flex justify-end space-x-2">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        href: `/admin/projects/${unref(routeParams)().project}/edit`
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
        onClick: ($event) => destroyResource(unref(routeParams)().project),
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
      if (project.loading) {
        _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      } else {
        _push(ssrRenderComponent(PageContent, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-lg font-bold"${_scopeId}>${ssrInterpolate(_ctx.$t("Name"))}: </span>${ssrInterpolate(project.data.name)} <br${_scopeId}><span class="text-lg font-bold"${_scopeId}>${ssrInterpolate(_ctx.$t("Team"))}: </span>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                class: { "cursor-poiter text-blue-600": project.data.team_id },
                href: `/admin/teams/${project.data.team_id}`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a, _b;
                  if (_push3) {
                    _push3(`${ssrInterpolate(((_a = project.data.team) == null ? void 0 : _a.name) ?? "--")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(((_b = project.data.team) == null ? void 0 : _b.name) ?? "--"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<br${_scopeId}><span class="text-lg font-bold"${_scopeId}>${ssrInterpolate(_ctx.$t("Company"))}: </span>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                class: { "cursor-poiter text-blue-600": project.data.company_id },
                href: `/admin/companies/${project.data.company_id}`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a, _b;
                  if (_push3) {
                    _push3(`${ssrInterpolate(((_a = project.data.company) == null ? void 0 : _a.name) ?? "--")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(((_b = project.data.company) == null ? void 0 : _b.name) ?? "--"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<br${_scopeId}><span class="text-lg font-bold"${_scopeId}>${ssrInterpolate(_ctx.$t("Description"))}: </span><br${_scopeId}><p class="whitespace-pre-wrap"${_scopeId}>${ssrInterpolate(project.data.description)}</p><br${_scopeId}><span class="text-lg font-bold"${_scopeId}>${ssrInterpolate(_ctx.$t("Comments"))}: </span><br${_scopeId}><div class="mt-3 mx-4 flex justify-end"${_scopeId}><div${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                modelValue: form.data.content,
                "onUpdate:modelValue": ($event) => form.data.content = $event,
                errors: form.errors.content,
                class: "lg:w-[30rem] max-h-[300px]",
                placeholder: _ctx.$t("Write a comment...")
              }, null, _parent2, _scopeId));
              _push2(`<br${_scopeId}><div class="flex justify-end"${_scopeId}>`);
              _push2(ssrRenderComponent(PrimaryButton, {
                onClick: createComment,
                disabled: form.loading
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.$t("Submit"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("Submit")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div></div><br${_scopeId}><div class="flex flex-col"${_scopeId}><!--[-->`);
              ssrRenderList(projectComments.data, (comment) => {
                _push2(`<div class="${ssrRenderClass([{ "ml-auto": comment.user_id === unref(user).id, "mr-auto": comment.user_id !== unref(user).id }, "w-3/4 my-4"])}"${_scopeId}><div class="bg-white shadow-md rounded-lg p-4"${_scopeId}><div class="flex justify-between"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  class: "text-blue-600",
                  href: `mailto:${comment.user.email}`
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(comment.user.name)} `);
                      if (comment.user_id == unref(user).id) {
                        _push3(`<span class="text-xs text-gray-400"${_scopeId2}>(${ssrInterpolate(_ctx.$t("You"))})</span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        createTextVNode(toDisplayString(comment.user.name) + " ", 1),
                        comment.user_id == unref(user).id ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-xs text-gray-400"
                        }, "(" + toDisplayString(_ctx.$t("You")) + ")", 1)) : createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_sfc_main$4, {
                  date: comment.created_at
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="border-b-2 border-gray-200 my-2"${_scopeId}></div><p${_scopeId}>${ssrInterpolate(comment.content)}</p></div></div>`);
              });
              _push2(`<!--]--></div><div class="flex justify-center mt-4"${_scopeId}>`);
              if (projectComments.loading || !projectComments.loading && projectComments.meta.current_page < projectComments.meta.last_page) {
                _push2(ssrRenderComponent(PrimaryButton, {
                  disabled: projectComments.loading,
                  onClick: loadMore
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (projectComments.loading) {
                        _push3(`<div class="tiny-loader w-[10px] mr-2"${_scopeId2}></div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(` ${ssrInterpolate(projectComments.loading ? _ctx.$t("Loading") : _ctx.$t("Load more"))}`);
                    } else {
                      return [
                        projectComments.loading ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "tiny-loader w-[10px] mr-2"
                        })) : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(projectComments.loading ? _ctx.$t("Loading") : _ctx.$t("Load more")), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("span", { class: "text-lg font-bold" }, toDisplayString(_ctx.$t("Name")) + ": ", 1),
                createTextVNode(toDisplayString(project.data.name) + " ", 1),
                createVNode("br"),
                createVNode("span", { class: "text-lg font-bold" }, toDisplayString(_ctx.$t("Team")) + ": ", 1),
                createVNode(_sfc_main$1, {
                  class: { "cursor-poiter text-blue-600": project.data.team_id },
                  href: `/admin/teams/${project.data.team_id}`
                }, {
                  default: withCtx(() => {
                    var _a;
                    return [
                      createTextVNode(toDisplayString(((_a = project.data.team) == null ? void 0 : _a.name) ?? "--"), 1)
                    ];
                  }),
                  _: 1
                }, 8, ["class", "href"]),
                createVNode("br"),
                createVNode("span", { class: "text-lg font-bold" }, toDisplayString(_ctx.$t("Company")) + ": ", 1),
                createVNode(_sfc_main$1, {
                  class: { "cursor-poiter text-blue-600": project.data.company_id },
                  href: `/admin/companies/${project.data.company_id}`
                }, {
                  default: withCtx(() => {
                    var _a;
                    return [
                      createTextVNode(toDisplayString(((_a = project.data.company) == null ? void 0 : _a.name) ?? "--"), 1)
                    ];
                  }),
                  _: 1
                }, 8, ["class", "href"]),
                createVNode("br"),
                createVNode("span", { class: "text-lg font-bold" }, toDisplayString(_ctx.$t("Description")) + ": ", 1),
                createVNode("br"),
                createVNode("p", { class: "whitespace-pre-wrap" }, toDisplayString(project.data.description), 1),
                createVNode("br"),
                createVNode("span", { class: "text-lg font-bold" }, toDisplayString(_ctx.$t("Comments")) + ": ", 1),
                createVNode("br"),
                createVNode("div", { class: "mt-3 mx-4 flex justify-end" }, [
                  createVNode("div", null, [
                    createVNode(_sfc_main$3, {
                      modelValue: form.data.content,
                      "onUpdate:modelValue": ($event) => form.data.content = $event,
                      errors: form.errors.content,
                      class: "lg:w-[30rem] max-h-[300px]",
                      placeholder: _ctx.$t("Write a comment...")
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "errors", "placeholder"]),
                    createVNode("br"),
                    createVNode("div", { class: "flex justify-end" }, [
                      createVNode(PrimaryButton, {
                        onClick: createComment,
                        disabled: form.loading
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("Submit")), 1)
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ])
                  ])
                ]),
                createVNode("br"),
                createVNode("div", { class: "flex flex-col" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(projectComments.data, (comment) => {
                    return openBlock(), createBlock("div", {
                      key: comment.id,
                      class: ["w-3/4 my-4", { "ml-auto": comment.user_id === unref(user).id, "mr-auto": comment.user_id !== unref(user).id }]
                    }, [
                      createVNode("div", { class: "bg-white shadow-md rounded-lg p-4" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode(_sfc_main$1, {
                            class: "text-blue-600",
                            href: `mailto:${comment.user.email}`
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(comment.user.name) + " ", 1),
                              comment.user_id == unref(user).id ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "text-xs text-gray-400"
                              }, "(" + toDisplayString(_ctx.$t("You")) + ")", 1)) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1032, ["href"]),
                          createVNode(_sfc_main$4, {
                            date: comment.created_at
                          }, null, 8, ["date"])
                        ]),
                        createVNode("div", { class: "border-b-2 border-gray-200 my-2" }),
                        createVNode("p", null, toDisplayString(comment.content), 1)
                      ])
                    ], 2);
                  }), 128))
                ]),
                createVNode("div", { class: "flex justify-center mt-4" }, [
                  projectComments.loading || !projectComments.loading && projectComments.meta.current_page < projectComments.meta.last_page ? (openBlock(), createBlock(PrimaryButton, {
                    key: 0,
                    disabled: projectComments.loading,
                    onClick: loadMore
                  }, {
                    default: withCtx(() => [
                      projectComments.loading ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "tiny-loader w-[10px] mr-2"
                      })) : createCommentVNode("", true),
                      createTextVNode(" " + toDisplayString(projectComments.loading ? _ctx.$t("Loading") : _ctx.$t("Load more")), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/nexus/(global)/(auth)/admin/projects/{project}/page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
