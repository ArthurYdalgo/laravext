import { createLaravextSsrApp } from "@laravext/react";
import { resolveComponent } from "@laravext/react/tools";
import { serve } from "@laravext/react/server";
serve(({ window, cookies }) => createLaravextSsrApp({
  // This is optional, the default is renderToString from 'react-dom/server', but you can use renderToStaticMarkup if you want
  // render: renderToString,
  nexusResolver: (name) => resolveComponent(`./nexus/${name}`, /* @__PURE__ */ Object.assign({ "./nexus/(app)/confirm-password/page.tsx": () => import("./assets/page-w810hjrh.js"), "./nexus/(app)/dashboard/page.tsx": () => import("./assets/page-CCeRlPgG.js"), "./nexus/(app)/settings/appearance/page.tsx": () => import("./assets/page-ClUtd2mP.js"), "./nexus/(app)/settings/password/page.tsx": () => import("./assets/page-CwPwNaAZ.js"), "./nexus/(app)/settings/profile/page.tsx": () => import("./assets/page-iwCAGOjC.js"), "./nexus/(app)/verify-email/page.tsx": () => import("./assets/page-BTJ34xEV.js"), "./nexus/(guest)/forgot-password/page.tsx": () => import("./assets/page-CLtkhQBK.js"), "./nexus/(guest)/login/page.tsx": () => import("./assets/page-CgYqnLVF.js"), "./nexus/(guest)/register/page.tsx": () => import("./assets/page-BNj-RbgC.js"), "./nexus/(guest)/reset-password/{token}/page.tsx": () => import("./assets/page-ChpIUcLJ.js"), "./nexus/page.tsx": () => import("./assets/page-DJVRZ346.js") })),
  strandsResolver: (name) => resolveComponent(`./strands/${name}.jsx`, /* @__PURE__ */ Object.assign({})),
  // The beforeSetup function is executed once, before any of the setups. 
  // You can use this to set up global variables or anything else, such as internationalization, cookies, etc.
  beforeSetup: ({ laravext }) => {
    var _a, _b;
    if ((_b = (_a = laravext == null ? void 0 : laravext.page_data) == null ? void 0 : _a.shared_props) == null ? void 0 : _b.ziggy) {
      global.route = (name, params, absolute) => route(name, params, absolute, {
        ...laravext.page_data.shared_props.ziggy,
        url: laravext.page_data.shared_props.ziggy.url
      });
      global.Ziggy = laravext.page_data.shared_props.ziggy;
    }
  },
  // Don't forget to pass the window object to the laravext object
  laravext: window.__laravext,
  document: window.document
}));
