import { ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
const pageRange = 1;
const _sfc_main$1 = {
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    pagination: {
      type: Object,
      required: true
    },
    hidePageInput: {
      type: Boolean,
      default: false
    },
    hidePerPageSelector: {
      type: Boolean,
      default: false
    },
    hidePageSelector: {
      type: Boolean,
      default: false
    },
    hideTotal: {
      type: Boolean,
      default: false
    }
  },
  emits: ["paginate-to"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const perPageOptions = [5, 10, 25, 50, 100, 200];
    ref(props.pagination.meta.per_page);
    const currentPage = ref(props.pagination.meta.current_page);
    const pages = computed(() => {
      const total = props.pagination.meta.last_page;
      let pagesArray = [];
      if (total <= 2 * pageRange + 1) {
        return Array.from({ length: total }, (_, i) => i + 1);
      } else {
        pagesArray.push(1);
        if (currentPage.value <= pageRange + 1) {
          pagesArray.push(...Array.from({ length: 2 * pageRange + 1 }, (_, i) => i + 2));
        } else if (currentPage.value > total - pageRange) {
          pagesArray.push(...Array.from({ length: 2 * pageRange + 1 }, (_, i) => total - 2 * pageRange + i));
        } else {
          pagesArray.push(...Array.from({ length: 2 * pageRange + 1 }, (_, i) => currentPage.value - pageRange + i));
        }
        if (!pagesArray.includes(total)) {
          pagesArray.push(total);
        }
        for (let i = 1; i < pagesArray.length; i++) {
          if (pagesArray[i] - pagesArray[i - 1] >= 2) {
            pagesArray.splice(i, 0, "...");
          }
        }
        return pagesArray;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-between" }, _attrs))}><div class="flex items-center">`);
      if (!__props.hideTotal) {
        _push(`<label for="per-page-selector" class="mr-2">${ssrInterpolate(_ctx.$t("Total"))}: ${ssrInterpolate(props.pagination.meta.total)}</label>`);
      } else {
        _push(`<!---->`);
      }
      if (!__props.hidePerPageSelector && !__props.hideTotal) {
        _push(`<span class="text-black/50 py-2 dark:text-white/50 mx-4">|</span>`);
      } else {
        _push(`<!---->`);
      }
      if (!__props.hidePerPageSelector) {
        _push(`<label for="per-page-selector" class="mr-2">${ssrInterpolate(_ctx.$t("Per Page"))}:</label>`);
      } else {
        _push(`<!---->`);
      }
      if (!__props.hidePerPageSelector) {
        _push(`<select id="per-page-selector" class="border border-gray-300 rounded px-3 py-2 pr-8"><!--[-->`);
        ssrRenderList(perPageOptions, (option) => {
          _push(`<option${ssrRenderAttr("value", option)}>${ssrInterpolate(option)}</option>`);
        });
        _push(`<!--]--></select>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (!__props.hidePageSelector) {
        _push(`<div class="flex items-center"><label for="page-selector" class="mr-2">${ssrInterpolate(_ctx.$t("Page"))}:</label><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="border border-gray-300 rounded px-3 py-2 cursor-pointer">&lt;&lt;</button><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="border border-gray-300 rounded px-3 py-2 mr-3 cursor-pointer">&lt;</button><ul class="flex list-none border border-gray-300 rounded overflow-hidden"><!--[-->`);
        ssrRenderList(pages.value, (page) => {
          _push(`<li class="${ssrRenderClass([{ "bg-blue-500 text-white cursor-pointer": page === currentPage.value, "text-gray-700 cursor-pointer": page !== currentPage.value }, "px-3 py-2 border-r last:border-r-0"])}">`);
          if (typeof page === "number") {
            _push(`<button class="focus:outline-none w-full h-full">${ssrInterpolate(page)}</button>`);
          } else {
            _push(`<span>${ssrInterpolate(page)}</span>`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul><button${ssrIncludeBooleanAttr(currentPage.value === props.pagination.meta.last_page) ? " disabled" : ""} class="border border-gray-300 rounded px-3 py-2 ml-3 cursor-pointer">&gt;</button><button${ssrIncludeBooleanAttr(currentPage.value === props.pagination.meta.last_page) ? " disabled" : ""} class="border border-gray-300 rounded px-3 py-2 cursor-pointer">&gt;&gt;</button>`);
        if (!__props.hidePageSelector && !__props.hidePageInput) {
          _push(`<span class="text-black/50 py-2 dark:text-white/50 mx-4">|</span>`);
        } else {
          _push(`<!---->`);
        }
        if (!__props.hidePageInput) {
          _push(`<label for="current-page-input" class="mr-2">${ssrInterpolate(_ctx.$t("Current Page"))}:</label>`);
        } else {
          _push(`<!---->`);
        }
        if (!__props.hidePageInput) {
          _push(`<input id="current-page-input" type="number"${ssrRenderAttr("value", currentPage.value)}${ssrRenderAttr("max", props.pagination.meta.last_page)} class="border border-gray-300 w-24 rounded px-3 py-2 [&amp;::-webkit-inner-spin-button]:appearance-none [appearance:textfield]">`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Pagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "SecondaryButton",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "button"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        class: "inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/SecondaryButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _sfc_main$1 as a
};
