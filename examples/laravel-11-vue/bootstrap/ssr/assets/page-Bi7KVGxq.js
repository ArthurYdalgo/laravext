import { reactive, onMounted, unref, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { H as Head } from "../ssr.js";
import axios from "axios";
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
    const data = reactive({
      projects: [],
      loading: true
    });
    onMounted(async () => {
      axios.get("/api/projects").then((response) => {
        data.projects = response.data.data;
        data.loading = false;
      }).catch((error) => {
        console.error(error);
        data.loading = false;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Our Projects" }, null, _parent));
      if (data.loading) {
        _push(`<div class="flex justify-center items-center min-h-[70vh] mt-6"> Loading... </div>`);
      } else {
        _push(`<div class="flex justify-center items-center min-h-[70vh] mt-6"><div><h3 class="text-2xl mb-2">Our projects...</h3><ul><!--[-->`);
        ssrRenderList(data.projects, (project) => {
          _push(`<li>${ssrInterpolate(project.name)}</li>`);
        });
        _push(`<!--]--></ul></div></div>`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/nexus/(global)/(guest)/our-projects/page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
