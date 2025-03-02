import { jsxs, jsx } from "react/jsx-runtime";
import { L as Label, I as InputError } from "./label-BZWDHOTY.js";
import { A as AppLayout } from "./app-layout-vfvBydDc.js";
import { S as SettingsLayout, H as HeadingSmall } from "./layout-CwDbAL5g.js";
import { Transition } from "@headlessui/react";
import { useRef } from "react";
import { B as Button } from "./app-logo-icon-BHmYduCG.js";
import { I as Input } from "./input-E5fbwyyU.js";
import { Head } from "@laravext/react";
import { u as useForm } from "./useForm-DaykqEH7.js";
import axios from "axios";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "lucide-react";
import "@radix-ui/react-separator";
import "@radix-ui/react-dialog";
import "@radix-ui/react-tooltip";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-avatar";
import "clsx";
import "tailwind-merge";
const breadcrumbs = [
  {
    title: "Password settings",
    href: "/settings/password"
  }
];
function Password() {
  const passwordInput = useRef(null);
  const currentPasswordInput = useRef(null);
  const { data, setData, errors, setErrors, clearErrors, reset, processing, recentlySuccessful } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const updatePassword = (e) => {
    e.preventDefault();
    axios.put("/api/settings/password", data).then(() => {
      reset();
      clearErrors();
    }).catch((error) => {
      var _a, _b;
      let responseErrors = error.response.data.errors;
      setErrors(responseErrors);
      if (responseErrors.password) {
        reset("password");
        reset("password_confirmation");
        (_a = passwordInput.current) == null ? void 0 : _a.focus();
      }
      if (responseErrors.current_password) {
        reset("current_password");
        (_b = currentPasswordInput.current) == null ? void 0 : _b.focus();
      }
    });
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsx(Head, { title: "Profile settings" }),
    /* @__PURE__ */ jsx(SettingsLayout, { children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx(HeadingSmall, { title: "Update password", description: "Ensure your account is using a long, random password to stay secure" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: updatePassword, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "current_password", children: "Current password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "current_password",
              ref: currentPasswordInput,
              value: data.current_password,
              onChange: (e) => setData("current_password", e.target.value),
              type: "password",
              className: "mt-1 block w-full",
              autoComplete: "current-password",
              placeholder: "Current password"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.current_password })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "New password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              ref: passwordInput,
              value: data.password,
              onChange: (e) => setData("password", e.target.value),
              type: "password",
              className: "mt-1 block w-full",
              autoComplete: "new-password",
              placeholder: "New password"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.password })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password_confirmation", children: "Confirm password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password_confirmation",
              value: data.password_confirmation,
              onChange: (e) => setData("password_confirmation", e.target.value),
              type: "password",
              className: "mt-1 block w-full",
              autoComplete: "new-password",
              placeholder: "Confirm password"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(Button, { disabled: processing, children: "Save password" }),
          /* @__PURE__ */ jsx(
            Transition,
            {
              show: recentlySuccessful,
              enter: "transition ease-in-out",
              enterFrom: "opacity-0",
              leave: "transition ease-in-out",
              leaveTo: "opacity-0",
              children: /* @__PURE__ */ jsx("p", { className: "text-sm text-neutral-600", children: "Saved" })
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Password as default
};
