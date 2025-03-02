import { jsx, jsxs } from "react/jsx-runtime";
import { Check, LoaderCircle } from "lucide-react";
import { L as Label, I as InputError } from "./label-BZWDHOTY.js";
import { T as TextLink } from "./text-link-kNea88ED.js";
import { c as cn, B as Button } from "./app-logo-icon-BHmYduCG.js";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";
import { I as Input } from "./input-E5fbwyyU.js";
import { A as AuthLayout } from "./auth-layout-uK96YZ3q.js";
import { nexusProps, Head, visit } from "@laravext/react";
import axios from "axios";
import { u as useForm } from "./useForm-DaykqEH7.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
const Checkbox = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    CheckboxPrimitive.Root,
    {
      ref,
      className: cn(
        "peer size-5 shrink-0 rounded-sm border border-input ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-accent-foreground",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, { className: cn("flex items-center justify-center text-current"), children: /* @__PURE__ */ jsx(Check, { className: "size-3.5 stroke-[3]" }) })
    }
  )
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
function Login() {
  const { canResetPassword } = nexusProps();
  const { data, setData, errors, setErrors, processing, setProcessing } = useForm({
    email: "test@example.com",
    password: "password",
    remember: false
  });
  const submit = (e) => {
    e.preventDefault();
    setProcessing(true);
    axios.post("/api/login", data).then((response) => {
      visit(route("dashboard"));
    }).catch((error) => {
      setErrors(error.response.data.errors);
    }).finally(() => {
      setProcessing(false);
    });
  };
  return /* @__PURE__ */ jsxs(AuthLayout, { title: "Log in to your account", description: "Enter your email and password below to log in", children: [
    /* @__PURE__ */ jsx(Head, { title: "Log in" }),
    /* @__PURE__ */ jsxs("form", { className: "flex flex-col gap-6", onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email address" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "email",
              required: true,
              autoFocus: true,
              tabIndex: 1,
              autoComplete: "email",
              value: data.email,
              onChange: (e) => setData("email", e.target.value),
              placeholder: "email@example.com"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
            canResetPassword && /* @__PURE__ */ jsx(TextLink, { href: route("forgot-password"), className: "ml-auto text-sm", tabIndex: 5, children: "Forgot password?" })
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              type: "password",
              required: true,
              tabIndex: 2,
              autoComplete: "current-password",
              value: data.password,
              onChange: (e) => setData("password", e.target.value),
              placeholder: "Password"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.password })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx(Checkbox, { id: "remember", name: "remember", tabIndex: 3 }),
          /* @__PURE__ */ jsx(Label, { htmlFor: "remember", children: "Remember me" })
        ] }),
        /* @__PURE__ */ jsxs(Button, { type: "submit", className: "mt-4 w-full", tabIndex: 4, disabled: processing, children: [
          processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          "Log in"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground text-center text-sm", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsx(TextLink, { href: route("register"), tabIndex: 5, children: "Sign up" })
      ] })
    ] }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 text-center text-sm font-medium text-green-600", children: status })
  ] });
}
export {
  Login as default
};
