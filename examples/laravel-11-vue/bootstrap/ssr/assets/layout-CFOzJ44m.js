import { mergeProps, useSSRContext, onMounted, onUnmounted, computed, ref, withCtx, renderSlot, createVNode, createTextVNode, toDisplayString, unref, openBlock, createBlock, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderStyle, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { _ as _sfc_main$6 } from "./Link-5PMH6oFQ.js";
import axios from "axios";
import { s as sharedProps } from "../ssr.js";
import { p as privacy } from "./usePrivacy-tgfaLRgV.js";
import { _ as _sfc_main$8 } from "./Fa-mqR-7ziz.js";
import { useI18n } from "vue-i18n";
import { _ as _sfc_main$7 } from "./Tooltip-DzeBfJzi.js";
import VueCookies from "vue-cookies";
import "./vendor-others-CNLO9YKw.js";
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
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/vue-fontawesome";
import "@fortawesome/free-solid-svg-icons";
import "floating-vue";
/* empty css                             */
const _sfc_main$5 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<img${ssrRenderAttrs(mergeProps({ src: "/images/logos/laravext.png" }, _attrs))}>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ApplicationLogo.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const ApplicationLogo = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$4 = {
  __name: "Dropdown",
  __ssrInlineRender: true,
  props: {
    align: {
      type: String,
      default: "right"
    },
    width: {
      type: String,
      default: "48"
    },
    contentClasses: {
      type: String,
      default: "py-1 bg-white dark:bg-gray-700"
    }
  },
  setup(__props) {
    const props = __props;
    const closeOnEscape = (e) => {
      if (open.value && e.key === "Escape") {
        open.value = false;
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => document.removeEventListener("keydown", closeOnEscape));
    const widthClass = computed(() => {
      return {
        48: "w-48",
        24: "w-24"
      }[props.width.toString()];
    });
    const alignmentClasses = computed(() => {
      if (props.align === "left") {
        return "ltr:origin-top-left rtl:origin-top-right start-0";
      } else if (props.align === "right") {
        return "ltr:origin-top-right rtl:origin-top-left end-0";
      } else {
        return "origin-top";
      }
    });
    const open = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><div>`);
      ssrRenderSlot(_ctx.$slots, "trigger", {}, null, _push, _parent);
      _push(`</div><div style="${ssrRenderStyle(open.value ? null : { display: "none" })}" class="fixed inset-0 z-40"></div><div style="${ssrRenderStyle([
        open.value ? null : { display: "none" },
        { "display": "none" }
      ])}" class="${ssrRenderClass([[widthClass.value, alignmentClasses.value], "absolute z-50 mt-2 rounded-md shadow-lg"])}"><div class="${ssrRenderClass([__props.contentClasses, "rounded-md ring-1 ring-black ring-opacity-5"])}">`);
      ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Dropdown.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<button${ssrRenderAttrs(mergeProps({ class: "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</button>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/DropdownButton.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const DropdownButton = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$2 = {
  __name: "NavLink",
  __ssrInlineRender: true,
  props: {
    routeName: {
      type: String,
      required: false
    },
    href: {
      type: String,
      required: true
    },
    active: {
      type: [Boolean, null, void 0],
      required: false,
      default: null
    }
  },
  setup(__props) {
    const { routeName, href, active } = __props;
    const classes = computed(
      () => (active !== null ? active : routeName && route().has(routeName) && route().current(routeName) || href && navigator.location.href.includes(href)) ? "inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 dark:border-indigo-600 text-sm font-medium leading-5 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out" : "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700 focus:outline-none focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 transition duration-150 ease-in-out"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$6, mergeProps({
        routeName: __props.routeName,
        href: __props.href,
        class: classes.value
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/NavLink.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "ResponsiveNavLink",
  __ssrInlineRender: true,
  props: {
    routeName: {
      type: String,
      required: false
    },
    href: {
      type: String,
      required: true
    },
    active: {
      type: [Boolean, null, void 0],
      required: false,
      default: null
    }
  },
  setup(__props) {
    const { routeName, href, active } = __props;
    const classes = computed(
      () => (active !== null ? active : routeName && route().has(routeName) && route().current(routeName) || href && navigator.location.href.includes(href)) ? "block w-full ps-3 pe-4 py-2 border-l-4 border-indigo-400 dark:border-indigo-600 text-start text-base font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/50 focus:outline-none focus:text-indigo-800 dark:focus:text-indigo-200 focus:bg-indigo-100 dark:focus:bg-indigo-900 focus:border-indigo-700 dark:focus:border-indigo-300 transition duration-150 ease-in-out" : "block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600 transition duration-150 ease-in-out"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$6, mergeProps({
        routeName: __props.routeName,
        href: __props.href,
        class: classes.value
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ResponsiveNavLink.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "layout",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b;
    const { locale: i18nLocale } = useI18n();
    const { user } = sharedProps().auth;
    const privacyInitialState = (_b = (_a = sharedProps().auth) == null ? void 0 : _a.user) == null ? void 0 : _b.privacy;
    const locales = {
      en: {
        locale: "en",
        flag: "/images/flags/us.svg"
      },
      pt: {
        locale: "pt",
        flag: "/images/flags/br.svg"
      }
    };
    if (privacyInitialState !== void 0) {
      privacy.setActive(privacyInitialState);
    }
    const handleTogglePrivacy = () => {
      let state = privacy.active;
      privacy.toggle();
      axios.put("/api/auth/user", {
        privacy: !state
      });
    };
    const handleLocaleChange = async (locale) => {
      i18nLocale.value = locale;
      VueCookies.set("locale", locale);
      await axios.put("/api/auth/user", {
        locale
      });
    };
    const logout = async () => {
      await axios.post("/api/auth/logout");
      window.location.href = "/";
    };
    const showingNavigationDropdown = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="min-h-screen bg-gray-100 dark:bg-gray-900"><nav class="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700"><div class="mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between h-16"><div class="flex"><div class="shrink-0 flex items-center">`);
      _push(ssrRenderComponent(_sfc_main$6, { routeName: "admin.dashboard" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ApplicationLogo, { class: "block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(ApplicationLogo, { class: "block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">`);
      _push(ssrRenderComponent(_sfc_main$2, { routeName: "admin.dashboard" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Dashboard `);
          } else {
            return [
              createTextVNode(" Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, { routeName: "admin.teams" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("Teams"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("Teams")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, { routeName: "admin.developers" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("Developers"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("Developers")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, { routeName: "admin.projects" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("Projects"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("Projects")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, { routeName: "admin.companies" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("Companies"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("Companies")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, { routeName: "admin.contact-requests" }, {
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
      _push(`</div></div><div class="hidden sm:flex sm:items-center sm:ms-6">`);
      _push(ssrRenderComponent(_sfc_main$7, {
        text: unref(privacy).active ? _ctx.$t("Click to disable privacy filter") : _ctx.$t("Click to enable privacy filter")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="cursor-pointer px-4 mt-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$8, {
              icon: unref(privacy).active ? "fa-eye-slash" : "fa-eye",
              class: "text-gray-400 dark:text-gray-500"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: "cursor-pointer px-4 mt-1",
                onClick: handleTogglePrivacy
              }, [
                createVNode(_sfc_main$8, {
                  icon: unref(privacy).active ? "fa-eye-slash" : "fa-eye",
                  class: "text-gray-400 dark:text-gray-500"
                }, null, 8, ["icon"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$4, {
        align: "right",
        width: "24"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="inline-flex items-center px-2 py-2 border border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"${_scopeId}><img${ssrRenderAttr("src", locales[_ctx.$i18n.locale].flag)} class="w-[20px]"${_scopeId}><svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button></span>`);
          } else {
            return [
              createVNode("span", { class: "inline-flex rounded-md" }, [
                createVNode("button", {
                  type: "button",
                  class: "inline-flex items-center px-2 py-2 border border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                }, [
                  createVNode("img", {
                    src: locales[_ctx.$i18n.locale].flag,
                    class: "w-[20px]"
                  }, null, 8, ["src"]),
                  (openBlock(), createBlock("svg", {
                    class: "ms-2 -me-0.5 h-4 w-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(Object.values(locales), (locale) => {
              _push2(ssrRenderComponent(DropdownButton, {
                onClick: ($event) => handleLocaleChange(locale.locale)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="flex items-center space-x-2"${_scopeId2}><img${ssrRenderAttr("src", locale.flag)} class="w-[30px]"${_scopeId2}> <span${_scopeId2}>${ssrInterpolate(locale.locale.toUpperCase())}</span></span>`);
                  } else {
                    return [
                      createVNode("span", { class: "flex items-center space-x-2" }, [
                        createVNode("img", {
                          src: locale.flag,
                          class: "w-[30px]"
                        }, null, 8, ["src"]),
                        createTextVNode(),
                        createVNode("span", null, toDisplayString(locale.locale.toUpperCase()), 1)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(Object.values(locales), (locale) => {
                return openBlock(), createBlock(DropdownButton, {
                  onClick: ($event) => handleLocaleChange(locale.locale)
                }, {
                  default: withCtx(() => [
                    createVNode("span", { class: "flex items-center space-x-2" }, [
                      createVNode("img", {
                        src: locale.flag,
                        class: "w-[30px]"
                      }, null, 8, ["src"]),
                      createTextVNode(),
                      createVNode("span", null, toDisplayString(locale.locale.toUpperCase()), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["onClick"]);
              }), 256))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ms-2 relative">`);
      _push(ssrRenderComponent(_sfc_main$4, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="inline-flex items-center px-2 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"${_scopeId}>${ssrInterpolate(unref(user).name)} <svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button></span>`);
          } else {
            return [
              createVNode("span", { class: "inline-flex rounded-md" }, [
                createVNode("button", {
                  type: "button",
                  class: "inline-flex items-center px-2 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                }, [
                  createTextVNode(toDisplayString(unref(user).name) + " ", 1),
                  (openBlock(), createBlock("svg", {
                    class: "ms-2 -me-0.5 h-4 w-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(DropdownButton, { onClick: logout }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("Log Out"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("Log Out")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(DropdownButton, { onClick: logout }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("Log Out")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="-me-2 flex items-center sm:hidden"><div class="cursor-pointer px-3">`);
      _push(ssrRenderComponent(_sfc_main$8, {
        onClick: handleTogglePrivacy,
        icon: unref(privacy).active ? "fa-eye-slash" : "fa-eye",
        class: "text-gray-400 dark:text-gray-500"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        align: "right",
        width: "24"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="inline-flex items-center px-2 py-2 border border-transparent"${_scopeId}><img${ssrRenderAttr("src", locales[_ctx.$i18n.locale].flag)} class="w-[20px]"${_scopeId}><svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button></span>`);
          } else {
            return [
              createVNode("span", { class: "inline-flex rounded-md" }, [
                createVNode("button", {
                  type: "button",
                  class: "inline-flex items-center px-2 py-2 border border-transparent"
                }, [
                  createVNode("img", {
                    src: locales[_ctx.$i18n.locale].flag,
                    class: "w-[20px]"
                  }, null, 8, ["src"]),
                  (openBlock(), createBlock("svg", {
                    class: "ms-2 -me-0.5 h-4 w-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ])
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(Object.values(locales), (locale) => {
              _push2(ssrRenderComponent(DropdownButton, {
                onClick: ($event) => handleLocaleChange(locale.locale)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="flex items-center space-x-2"${_scopeId2}><img${ssrRenderAttr("src", locale.flag)} class="w-[30px]"${_scopeId2}> <span${_scopeId2}>${ssrInterpolate(locale.locale.toUpperCase())}</span></span>`);
                  } else {
                    return [
                      createVNode("span", { class: "flex items-center space-x-2" }, [
                        createVNode("img", {
                          src: locale.flag,
                          class: "w-[30px]"
                        }, null, 8, ["src"]),
                        createTextVNode(),
                        createVNode("span", null, toDisplayString(locale.locale.toUpperCase()), 1)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(Object.values(locales), (locale) => {
                return openBlock(), createBlock(DropdownButton, {
                  onClick: ($event) => handleLocaleChange(locale.locale)
                }, {
                  default: withCtx(() => [
                    createVNode("span", { class: "flex items-center space-x-2" }, [
                      createVNode("img", {
                        src: locale.flag,
                        class: "w-[30px]"
                      }, null, 8, ["src"]),
                      createTextVNode(),
                      createVNode("span", null, toDisplayString(locale.locale.toUpperCase()), 1)
                    ])
                  ]),
                  _: 2
                }, 1032, ["onClick"]);
              }), 256))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="inline-flex items-center justify-center p-3 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"><svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path class="${ssrRenderClass({
        hidden: showingNavigationDropdown.value,
        "inline-flex": !showingNavigationDropdown.value
      })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="${ssrRenderClass({
        hidden: !showingNavigationDropdown.value,
        "inline-flex": showingNavigationDropdown.value
      })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><div class="${ssrRenderClass([{ block: showingNavigationDropdown.value, hidden: !showingNavigationDropdown.value }, "sm:hidden"])}"><div class="pt-2 pb-3 space-y-1">`);
      _push(ssrRenderComponent(_sfc_main$1, { routeName: "admin.dashboard" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Dashboard `);
          } else {
            return [
              createTextVNode(" Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { routeName: "admin.teams" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("Teams"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("Teams")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { routeName: "admin.developers" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("Developers"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("Developers")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { routeName: "admin.projects" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("Projects"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("Projects")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { routeName: "admin.companies" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("Companies"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("Companies")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { routeName: "admin.contact-requests" }, {
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
      _push(`</div><div class="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600"><div class="px-4"><div class="font-medium text-base text-gray-800 dark:text-gray-200">${ssrInterpolate(unref(user).name)}</div><div class="font-medium text-sm text-gray-500">${ssrInterpolate(unref(user).email)}</div></div><div class="mt-3 space-y-1">`);
      _push(ssrRenderComponent(_sfc_main$1, { onClick: logout }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("Log Out"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("Log Out")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></nav><main>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/nexus/(global)/(auth)/layout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
