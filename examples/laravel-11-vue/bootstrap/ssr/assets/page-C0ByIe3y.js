import { inject, reactive, onMounted, withCtx, createTextVNode, toDisplayString, unref, createVNode, openBlock, createBlock, createCommentVNode, withDirectives, vModelText, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { a as _sfc_main$5 } from "./SecondaryButton-VZaFm0Ff.js";
import { debounce } from "lodash";
import { D as DangerButton } from "./DangerButton-Dcecw4TW.js";
import { H as Header, P as PageContent } from "./PageContent-DUCvys5k.js";
import "./Link-5PMH6oFQ.js";
import { P as PrimaryButton } from "./PrimaryButton-q_mES2K7.js";
import { _ as _sfc_main$1 } from "./Loading-B6yUkSxp.js";
import { p as privacy } from "./usePrivacy-tgfaLRgV.js";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$2 } from "./MomentDateTime-DH02jE00.js";
import { _ as _sfc_main$4 } from "./Fa-mqR-7ziz.js";
import { _ as _sfc_main$3 } from "./Tooltip-DzeBfJzi.js";
import { _ as _sfc_main$6 } from "./Modal-BZp5eeYU.js";
import { FormKit } from "@formkit/vue";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "../ssr.js";
import "axios";
import "vue-cookies";
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
import "moment";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/vue-fontawesome";
import "@fortawesome/free-solid-svg-icons";
import "floating-vue";
/* empty css                             */
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
    const replyContactRequestModal = reactive({
      visible: false,
      data: {}
    });
    const replyContactRequest = () => {
      return axios.put(`/api/contact-requests/${replyContactRequestModal.data.id}/reply`, {
        reply: replyContactRequestModal.data.reply
      }).then(() => {
        swal(t("Replied!"), t("The contact request has been replied."), "success").then(() => {
          fetchResources();
          replyContactRequestModal.visible = false;
          replyContactRequestModal.data = {};
        });
      }).catch(() => {
        swal(t("Error!"), t("An error occurred while replying to the contact request."), "error");
      });
    };
    const paginateTo = ({ page, perPage }) => {
      pagination.page = page;
      pagination.per_page = perPage;
      fetchResources();
    };
    const fetchResources = () => {
      pagination.loading = true;
      axios.get("/api/contact-requests", {
        params: {
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
          axios.delete(`/api/contact-requests/${id}`).then(() => {
            fetchResources();
            swal(t("Record deleted!"), t("The contact request has been deleted."), "success");
          }).catch((error) => {
            console.error(error);
            swal(t("Error!"), t("An error occurred while deleting the contact request."), "error");
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
            _push2(`${ssrInterpolate(_ctx.$t("Contact Requests"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("Contact Requests")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(PageContent, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (pagination.loading) {
              _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center justify-between mb-4"${_scopeId}><div class="flex items-center"${_scopeId}><input type="text" id="search"${ssrRenderAttr("value", filters.search)}${ssrRenderAttr("placeholder", _ctx.$t("Search"))} class="border border-gray-300 rounded px-3 py-2"${_scopeId}></div><div class="flex items-center"${_scopeId}></div></div><table class="${ssrRenderClass([{ "opacity-50": pagination.loading }, "min-w-full divide-y divide-gray-200 border my-4"])}"${_scopeId}><thead${_scopeId}><th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> ID </th><th class="border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>${ssrInterpolate(_ctx.$t("Name"))}</th><th class="border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Email </th><th class="border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>${ssrInterpolate(_ctx.$t("Subject"))}</th><th class="border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>${ssrInterpolate(_ctx.$t("Created At"))}</th><th class="border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>${ssrInterpolate(_ctx.$t("Replied At"))}</th><th class="border-l w-96 px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>${ssrInterpolate(_ctx.$t("Actions"))}</th></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(pagination.data, (resource) => {
              var _a;
              _push2(`<tr class="odd:bg-gray-100 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-700"${_scopeId}><td class="border-t border-l px-6 py-4 whitespace-no-wrap text-sm text-gray-900 w-28"${_scopeId}><div class="text-sm leading-5 font-medium text-gray-900"${_scopeId}>${ssrInterpolate(resource.id)}</div></td><td class="border-t border-l px-6 py-4 whitespace-no-wrap"${_scopeId}><div class="text-sm leading-5 font-medium text-gray-900"${_scopeId}>${ssrInterpolate(resource.name)}</div></td><td class="border-t border-l px-6 py-4 whitespace-no-wrap"${_scopeId}><div class="text-sm leading-5 text-gray-900"${_scopeId}>${ssrInterpolate(unref(privacy).active ? "***@***" : resource.email)}</div></td><td class="border-t border-l px-6 py-4 whitespace-no-wrap"${_scopeId}><div class="text-sm leading-5 text-gray-900"${_scopeId}>${ssrInterpolate(resource.subject)}</div></td><td class="border-t border-l px-6 py-4 whitespace-no-wrap"${_scopeId}><div class="text-sm leading-5 text-gray-900"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                dateTime: resource.created_at
              }, null, _parent2, _scopeId));
              _push2(`</div></td><td class="border-t border-l px-6 py-4 whitespace-no-wrap"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                condition: resource.replied_at,
                text: (resource.delivered_at ? unref(t)("Delivered") : unref(t)("On delivery queue")) + ` - ${_ctx.$t("Replied by")}: ${(_a = resource.replier) == null ? void 0 : _a.name}`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="${ssrRenderClass([{ "cursor-pointer": resource.replied_at, "text-gray-900": !resource.replied_at, "text-green-600": resource.replied_at && resource.delivered_at, "text-orange-600": resource.replied_at && !resource.delivered_at }, "flex text-sm leading-5"])}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_sfc_main$2, {
                      dateTime: resource.replied_at
                    }, null, _parent3, _scopeId2));
                    if (resource.replied_at) {
                      _push3(ssrRenderComponent(_sfc_main$4, {
                        icon: resource.delivered_at ? "check-circle" : "clock",
                        class: "ml-2 mt-1"
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: ["flex text-sm leading-5", { "cursor-pointer": resource.replied_at, "text-gray-900": !resource.replied_at, "text-green-600": resource.replied_at && resource.delivered_at, "text-orange-600": resource.replied_at && !resource.delivered_at }]
                      }, [
                        createVNode(_sfc_main$2, {
                          dateTime: resource.replied_at
                        }, null, 8, ["dateTime"]),
                        resource.replied_at ? (openBlock(), createBlock(_sfc_main$4, {
                          key: 0,
                          icon: resource.delivered_at ? "check-circle" : "clock",
                          class: "ml-2 mt-1"
                        }, null, 8, ["icon"])) : createCommentVNode("", true)
                      ], 2)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</td><td class="border-t border-l px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(PrimaryButton, {
                onClick: ($event) => {
                  replyContactRequestModal.visible = true;
                  replyContactRequestModal.data = resource;
                }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(resource.replied_at ? _ctx.$t("Show") : _ctx.$t("Reply"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(resource.replied_at ? _ctx.$t("Show") : _ctx.$t("Reply")), 1)
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
              _push2(ssrRenderComponent(_sfc_main$5, {
                onPaginateTo: paginateTo,
                pagination: pagination ?? {}
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              pagination.loading ? (openBlock(), createBlock(_sfc_main$1, { key: 0 })) : createCommentVNode("", true),
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
                  createVNode("th", { class: "px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" }, " ID "),
                  createVNode("th", { class: "border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" }, toDisplayString(_ctx.$t("Name")), 1),
                  createVNode("th", { class: "border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" }, " Email "),
                  createVNode("th", { class: "border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" }, toDisplayString(_ctx.$t("Subject")), 1),
                  createVNode("th", { class: "border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" }, toDisplayString(_ctx.$t("Created At")), 1),
                  createVNode("th", { class: "border-l px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" }, toDisplayString(_ctx.$t("Replied At")), 1),
                  createVNode("th", { class: "border-l w-96 px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" }, toDisplayString(_ctx.$t("Actions")), 1)
                ]),
                createVNode("tbody", null, [
                  (openBlock(true), createBlock(Fragment, null, renderList(pagination.data, (resource) => {
                    var _a;
                    return openBlock(), createBlock("tr", {
                      class: "odd:bg-gray-100 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 hover:bg-gray-200 hover:dark:bg-gray-700",
                      key: resource.id
                    }, [
                      createVNode("td", { class: "border-t border-l px-6 py-4 whitespace-no-wrap text-sm text-gray-900 w-28" }, [
                        createVNode("div", { class: "text-sm leading-5 font-medium text-gray-900" }, toDisplayString(resource.id), 1)
                      ]),
                      createVNode("td", { class: "border-t border-l px-6 py-4 whitespace-no-wrap" }, [
                        createVNode("div", { class: "text-sm leading-5 font-medium text-gray-900" }, toDisplayString(resource.name), 1)
                      ]),
                      createVNode("td", { class: "border-t border-l px-6 py-4 whitespace-no-wrap" }, [
                        createVNode("div", { class: "text-sm leading-5 text-gray-900" }, toDisplayString(unref(privacy).active ? "***@***" : resource.email), 1)
                      ]),
                      createVNode("td", { class: "border-t border-l px-6 py-4 whitespace-no-wrap" }, [
                        createVNode("div", { class: "text-sm leading-5 text-gray-900" }, toDisplayString(resource.subject), 1)
                      ]),
                      createVNode("td", { class: "border-t border-l px-6 py-4 whitespace-no-wrap" }, [
                        createVNode("div", { class: "text-sm leading-5 text-gray-900" }, [
                          createVNode(_sfc_main$2, {
                            dateTime: resource.created_at
                          }, null, 8, ["dateTime"])
                        ])
                      ]),
                      createVNode("td", { class: "border-t border-l px-6 py-4 whitespace-no-wrap" }, [
                        createVNode(_sfc_main$3, {
                          condition: resource.replied_at,
                          text: (resource.delivered_at ? unref(t)("Delivered") : unref(t)("On delivery queue")) + ` - ${_ctx.$t("Replied by")}: ${(_a = resource.replier) == null ? void 0 : _a.name}`
                        }, {
                          default: withCtx(() => [
                            createVNode("div", {
                              class: ["flex text-sm leading-5", { "cursor-pointer": resource.replied_at, "text-gray-900": !resource.replied_at, "text-green-600": resource.replied_at && resource.delivered_at, "text-orange-600": resource.replied_at && !resource.delivered_at }]
                            }, [
                              createVNode(_sfc_main$2, {
                                dateTime: resource.replied_at
                              }, null, 8, ["dateTime"]),
                              resource.replied_at ? (openBlock(), createBlock(_sfc_main$4, {
                                key: 0,
                                icon: resource.delivered_at ? "check-circle" : "clock",
                                class: "ml-2 mt-1"
                              }, null, 8, ["icon"])) : createCommentVNode("", true)
                            ], 2)
                          ]),
                          _: 2
                        }, 1032, ["condition", "text"])
                      ]),
                      createVNode("td", { class: "border-t border-l px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium space-x-2" }, [
                        createVNode(PrimaryButton, {
                          onClick: ($event) => {
                            replyContactRequestModal.visible = true;
                            replyContactRequestModal.data = resource;
                          }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(resource.replied_at ? _ctx.$t("Show") : _ctx.$t("Reply")), 1)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
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
              !pagination.loading ? (openBlock(), createBlock(_sfc_main$5, {
                key: 1,
                onPaginateTo: paginateTo,
                pagination: pagination ?? {}
              }, null, 8, ["pagination"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$6, {
        show: replyContactRequestModal.visible,
        closeable: true,
        onClose: ($event) => {
          replyContactRequestModal.visible = false;
          replyContactRequestModal.data = {};
        },
        maxWidth: "w-[500px]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 flex flex-col justify-center"${_scopeId}><h2 class="text-xl font-bold mb-2"${_scopeId}>${ssrInterpolate(replyContactRequestModal.data.replied_at ? _ctx.$t("Contact request's response") : _ctx.$t("Reply to contact request"))}</h2>`);
            _push2(ssrRenderComponent(unref(FormKit), {
              actions: false,
              onSubmit: replyContactRequest,
              type: "form"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col items-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(FormKit), {
                    "validation-visibility": "live",
                    type: "text",
                    name: "name",
                    required: "",
                    id: "name",
                    label: _ctx.$t("Name"),
                    placeholder: "Your beautiful name here",
                    modelValue: replyContactRequestModal.data.name,
                    "onUpdate:modelValue": ($event) => replyContactRequestModal.data.name = $event,
                    "outer-class": "w-full max-w-[500px]",
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormKit), {
                    "validation-visibility": "live",
                    type: "email",
                    name: "email",
                    required: "",
                    id: "email",
                    label: _ctx.$t("Email"),
                    placeholder: "Your email here",
                    modelValue: replyContactRequestModal.data.email,
                    "onUpdate:modelValue": ($event) => replyContactRequestModal.data.email = $event,
                    "outer-class": "w-full max-w-[500px]",
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormKit), {
                    "validation-visibility": "live",
                    type: "text",
                    name: "subject",
                    required: "",
                    id: "subject",
                    "outer-class": "w-full max-w-[500px]",
                    label: _ctx.$t("Subject"),
                    placeholder: "Your subject here",
                    modelValue: replyContactRequestModal.data.subject,
                    "onUpdate:modelValue": ($event) => replyContactRequestModal.data.subject = $event,
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormKit), {
                    "validation-visibility": "live",
                    type: "textarea",
                    name: "message",
                    required: "",
                    id: "message",
                    label: _ctx.$t("Message"),
                    "input-class": "max-h-[300px] min-h-[100px]",
                    "outer-class": "w-full max-w-[500px]",
                    placeholder: "Your message here",
                    modelValue: replyContactRequestModal.data.message,
                    "onUpdate:modelValue": ($event) => replyContactRequestModal.data.message = $event,
                    disabled: ""
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(FormKit), {
                    "validation-visibility": "live",
                    type: "textarea",
                    name: "reply",
                    validation: "length:2,5000",
                    required: "",
                    id: "reply",
                    label: _ctx.$t("Response"),
                    "input-class": "max-h-[300px] min-h-[100px]",
                    "outer-class": "w-full max-w-[500px]",
                    placeholder: _ctx.$t("Your response here"),
                    modelValue: replyContactRequestModal.data.reply,
                    "onUpdate:modelValue": ($event) => replyContactRequestModal.data.reply = $event,
                    disabled: replyContactRequestModal.data.replied_at
                  }, null, _parent3, _scopeId2));
                  if (!replyContactRequestModal.data.replied_at) {
                    _push3(ssrRenderComponent(unref(FormKit), {
                      type: "submit",
                      class: "mt-6"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(_ctx.$t("Save"))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(_ctx.$t("Save")), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col items-center" }, [
                      createVNode(unref(FormKit), {
                        "validation-visibility": "live",
                        type: "text",
                        name: "name",
                        required: "",
                        id: "name",
                        label: _ctx.$t("Name"),
                        placeholder: "Your beautiful name here",
                        modelValue: replyContactRequestModal.data.name,
                        "onUpdate:modelValue": ($event) => replyContactRequestModal.data.name = $event,
                        "outer-class": "w-full max-w-[500px]",
                        disabled: ""
                      }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                      createVNode(unref(FormKit), {
                        "validation-visibility": "live",
                        type: "email",
                        name: "email",
                        required: "",
                        id: "email",
                        label: _ctx.$t("Email"),
                        placeholder: "Your email here",
                        modelValue: replyContactRequestModal.data.email,
                        "onUpdate:modelValue": ($event) => replyContactRequestModal.data.email = $event,
                        "outer-class": "w-full max-w-[500px]",
                        disabled: ""
                      }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                      createVNode(unref(FormKit), {
                        "validation-visibility": "live",
                        type: "text",
                        name: "subject",
                        required: "",
                        id: "subject",
                        "outer-class": "w-full max-w-[500px]",
                        label: _ctx.$t("Subject"),
                        placeholder: "Your subject here",
                        modelValue: replyContactRequestModal.data.subject,
                        "onUpdate:modelValue": ($event) => replyContactRequestModal.data.subject = $event,
                        disabled: ""
                      }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                      createVNode(unref(FormKit), {
                        "validation-visibility": "live",
                        type: "textarea",
                        name: "message",
                        required: "",
                        id: "message",
                        label: _ctx.$t("Message"),
                        "input-class": "max-h-[300px] min-h-[100px]",
                        "outer-class": "w-full max-w-[500px]",
                        placeholder: "Your message here",
                        modelValue: replyContactRequestModal.data.message,
                        "onUpdate:modelValue": ($event) => replyContactRequestModal.data.message = $event,
                        disabled: ""
                      }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                      createVNode(unref(FormKit), {
                        "validation-visibility": "live",
                        type: "textarea",
                        name: "reply",
                        validation: "length:2,5000",
                        required: "",
                        id: "reply",
                        label: _ctx.$t("Response"),
                        "input-class": "max-h-[300px] min-h-[100px]",
                        "outer-class": "w-full max-w-[500px]",
                        placeholder: _ctx.$t("Your response here"),
                        modelValue: replyContactRequestModal.data.reply,
                        "onUpdate:modelValue": ($event) => replyContactRequestModal.data.reply = $event,
                        disabled: replyContactRequestModal.data.replied_at
                      }, null, 8, ["label", "placeholder", "modelValue", "onUpdate:modelValue", "disabled"]),
                      !replyContactRequestModal.data.replied_at ? (openBlock(), createBlock(unref(FormKit), {
                        key: 0,
                        type: "submit",
                        class: "mt-6"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("Save")), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "p-6 flex flex-col justify-center" }, [
                createVNode("h2", { class: "text-xl font-bold mb-2" }, toDisplayString(replyContactRequestModal.data.replied_at ? _ctx.$t("Contact request's response") : _ctx.$t("Reply to contact request")), 1),
                createVNode(unref(FormKit), {
                  actions: false,
                  onSubmit: replyContactRequest,
                  type: "form"
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex flex-col items-center" }, [
                      createVNode(unref(FormKit), {
                        "validation-visibility": "live",
                        type: "text",
                        name: "name",
                        required: "",
                        id: "name",
                        label: _ctx.$t("Name"),
                        placeholder: "Your beautiful name here",
                        modelValue: replyContactRequestModal.data.name,
                        "onUpdate:modelValue": ($event) => replyContactRequestModal.data.name = $event,
                        "outer-class": "w-full max-w-[500px]",
                        disabled: ""
                      }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                      createVNode(unref(FormKit), {
                        "validation-visibility": "live",
                        type: "email",
                        name: "email",
                        required: "",
                        id: "email",
                        label: _ctx.$t("Email"),
                        placeholder: "Your email here",
                        modelValue: replyContactRequestModal.data.email,
                        "onUpdate:modelValue": ($event) => replyContactRequestModal.data.email = $event,
                        "outer-class": "w-full max-w-[500px]",
                        disabled: ""
                      }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                      createVNode(unref(FormKit), {
                        "validation-visibility": "live",
                        type: "text",
                        name: "subject",
                        required: "",
                        id: "subject",
                        "outer-class": "w-full max-w-[500px]",
                        label: _ctx.$t("Subject"),
                        placeholder: "Your subject here",
                        modelValue: replyContactRequestModal.data.subject,
                        "onUpdate:modelValue": ($event) => replyContactRequestModal.data.subject = $event,
                        disabled: ""
                      }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                      createVNode(unref(FormKit), {
                        "validation-visibility": "live",
                        type: "textarea",
                        name: "message",
                        required: "",
                        id: "message",
                        label: _ctx.$t("Message"),
                        "input-class": "max-h-[300px] min-h-[100px]",
                        "outer-class": "w-full max-w-[500px]",
                        placeholder: "Your message here",
                        modelValue: replyContactRequestModal.data.message,
                        "onUpdate:modelValue": ($event) => replyContactRequestModal.data.message = $event,
                        disabled: ""
                      }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                      createVNode(unref(FormKit), {
                        "validation-visibility": "live",
                        type: "textarea",
                        name: "reply",
                        validation: "length:2,5000",
                        required: "",
                        id: "reply",
                        label: _ctx.$t("Response"),
                        "input-class": "max-h-[300px] min-h-[100px]",
                        "outer-class": "w-full max-w-[500px]",
                        placeholder: _ctx.$t("Your response here"),
                        modelValue: replyContactRequestModal.data.reply,
                        "onUpdate:modelValue": ($event) => replyContactRequestModal.data.reply = $event,
                        disabled: replyContactRequestModal.data.replied_at
                      }, null, 8, ["label", "placeholder", "modelValue", "onUpdate:modelValue", "disabled"]),
                      !replyContactRequestModal.data.replied_at ? (openBlock(), createBlock(unref(FormKit), {
                        key: 0,
                        type: "submit",
                        class: "mt-6"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("Save")), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ])
                  ]),
                  _: 1
                })
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/nexus/(global)/(auth)/admin/contact-requests/page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
