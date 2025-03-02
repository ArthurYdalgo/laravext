import { jsxs, jsx } from "react/jsx-runtime";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { L as Label, I as InputError } from "./label-BZWDHOTY.js";
import { T as TextLink } from "./text-link-kNea88ED.js";
import { B as Button } from "./app-logo-icon-BHmYduCG.js";
import { I as Input } from "./input-E5fbwyyU.js";
import { A as AuthLayout } from "./auth-layout-uK96YZ3q.js";
import { Head } from "@laravext/react";
import { u as useForm } from "./useForm-DaykqEH7.js";
import axios from "axios";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
function ForgotPassword() {
  const { data, setData, reset, processing, setProcessing, errors, setErrors, clearErrors } = useForm({
    email: ""
  });
  const [status, setStatus] = useState("");
  const submit = (e) => {
    e.preventDefault();
    clearErrors();
    setProcessing(true);
    axios.post("/api/forgot-password", data).then((response) => {
      reset();
      clearErrors();
      setStatus(response.data.status);
    }).catch((error) => {
      setErrors(error.response.data.errors);
    }).finally(() => {
      setProcessing(false);
    });
  };
  return /* @__PURE__ */ jsxs(AuthLayout, { title: "Forgot password", description: "Enter your email to receive a password reset link", children: [
    /* @__PURE__ */ jsx(Head, { title: "Forgot password" }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 text-center text-sm font-medium text-green-600", children: status }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email address" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "email",
              name: "email",
              autoComplete: "off",
              value: data.email,
              autoFocus: true,
              required: true,
              onChange: (e) => setData("email", e.target.value),
              placeholder: "email@example.com"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.email })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "my-6 flex items-center justify-start", children: /* @__PURE__ */ jsxs(Button, { className: "w-full", disabled: processing, children: [
          processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          "Email password reset link"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground space-x-1 text-center text-sm", children: [
        /* @__PURE__ */ jsx("span", { children: "Or, return to" }),
        /* @__PURE__ */ jsx(TextLink, { href: route("login"), children: "log in" })
      ] })
    ] })
  ] });
}
export {
  ForgotPassword as default
};
