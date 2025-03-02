import { jsxs, jsx } from "react/jsx-runtime";
import { LoaderCircle } from "lucide-react";
import { L as Label, I as InputError } from "./label-BZWDHOTY.js";
import { B as Button } from "./app-logo-icon-BHmYduCG.js";
import { I as Input } from "./input-E5fbwyyU.js";
import { u as useForm } from "./useForm-DaykqEH7.js";
import { A as AuthLayout } from "./auth-layout-uK96YZ3q.js";
import { routeParams, queryParams, Head, visit } from "@laravext/react";
import axios from "axios";
import "@radix-ui/react-label";
import "class-variance-authority";
import "react";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
function ResetPassword() {
  const { token } = routeParams();
  const { email } = queryParams();
  const { data, setData, processing, setProcessing, errors, setErrors, reset } = useForm({
    token,
    email,
    password: "password",
    password_confirmation: "password"
  });
  const submit = (e) => {
    e.preventDefault();
    setProcessing(true);
    axios.post("/api/reset-password", data).then((response) => {
      reset();
      setErrors({});
      visit(route("login"));
    }).catch((error) => {
      setErrors(error.response.data.errors);
    }).finally(() => {
      setProcessing(false);
    });
  };
  return /* @__PURE__ */ jsxs(AuthLayout, { title: "Reset password", description: "Please enter your new password below", children: [
    /* @__PURE__ */ jsx(Head, { title: "Reset password" }),
    /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "email",
            type: "email",
            name: "email",
            autoComplete: "email",
            value: data.email,
            className: "mt-1 block w-full",
            readOnly: true,
            onChange: (e) => setData("email", e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "password",
            type: "password",
            name: "password",
            autoComplete: "new-password",
            value: data.password,
            className: "mt-1 block w-full",
            autoFocus: true,
            onChange: (e) => setData("password", e.target.value),
            placeholder: "Password"
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
            type: "password",
            name: "password_confirmation",
            autoComplete: "new-password",
            value: data.password_confirmation,
            className: "mt-1 block w-full",
            onChange: (e) => setData("password_confirmation", e.target.value),
            placeholder: "Confirm password"
          }
        ),
        /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation, className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs(Button, { type: "submit", className: "mt-4 w-full", disabled: processing, children: [
        processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        "Reset password"
      ] })
    ] }) })
  ] });
}
export {
  ResetPassword as default
};
