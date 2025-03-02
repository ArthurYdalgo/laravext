import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { B as Button, c as cn } from "./app-logo-icon-BHmYduCG.js";
import { S as Separator } from "./app-layout-vfvBydDc.js";
import { Link, path } from "@laravext/react";
function HeadingSmall({ title, description }) {
  return /* @__PURE__ */ jsxs("header", { children: [
    /* @__PURE__ */ jsx("h3", { className: "mb-0.5 text-base font-medium", children: title }),
    description && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: description })
  ] });
}
function Heading({ title, description }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "mb-8 space-y-0.5", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold tracking-tight", children: title }),
    description && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-sm", children: description })
  ] }) });
}
const sidebarNavItems = [
  {
    title: "Profile",
    url: "/settings/profile",
    icon: null
  },
  {
    title: "Password",
    url: "/settings/password",
    icon: null
  },
  {
    title: "Appearance",
    url: "/settings/appearance",
    icon: null
  }
];
function SettingsLayout({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "px-4 py-6", children: [
    /* @__PURE__ */ jsx(Heading, { title: "Settings", description: "Manage your profile and account settings" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12", children: [
      /* @__PURE__ */ jsx("aside", { className: "w-full max-w-xl lg:w-48", children: /* @__PURE__ */ jsx("nav", { className: "flex flex-col space-y-1 space-x-0", children: sidebarNavItems.map((item) => /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          variant: "ghost",
          asChild: true,
          className: cn("w-full justify-start", {
            "bg-muted": path() === item.url
          }),
          children: /* @__PURE__ */ jsx(Link, { href: item.url, children: item.title })
        },
        item.url
      )) }) }),
      /* @__PURE__ */ jsx(Separator, { className: "my-6 md:hidden" }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 md:max-w-2xl", children: /* @__PURE__ */ jsx("section", { className: "max-w-xl space-y-12", children }) })
    ] })
  ] });
}
export {
  HeadingSmall as H,
  SettingsLayout as S
};
