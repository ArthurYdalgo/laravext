import { unref, mergeProps, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPlus, faTrash, faEye, faEyeSlash, faCheckCircle, faClock } from "@fortawesome/free-solid-svg-icons";
const _sfc_main = {
  __name: "Fa",
  __ssrInlineRender: true,
  props: {
    icon: {
      type: [Object, Array],
      required: true
    },
    size: {
      type: String,
      default: "1x"
    },
    class: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    library.add(faPlus, faTrash, faEye, faEyeSlash, faCheckCircle, faClock);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(FontAwesomeIcon), mergeProps({
        icon: __props.icon,
        size: __props.size,
        class: __props.class
      }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Fa.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
