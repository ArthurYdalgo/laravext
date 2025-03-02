import { jsxs, jsx } from "react/jsx-runtime";
import { LoaderCircle } from "lucide-react";
import { L as Label, I as InputError } from "./label-BZWDHOTY.js";
import { T as TextLink } from "./text-link-kNea88ED.js";
import { B as Button } from "./app-logo-icon-BHmYduCG.js";
import { I as Input } from "./input-E5fbwyyU.js";
import { A as AuthLayout } from "./auth-layout-uK96YZ3q.js";
import { Head, visit } from "@laravext/react";
import { u as useForm } from "./useForm-DaykqEH7.js";
import axios from "axios";
import "@radix-ui/react-label";
import "class-variance-authority";
import "react";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
function Register() {
  const { data, setData, processing, errors, setErrors } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const submit = (e) => {
    e.preventDefault();
    axios.post("/api/register", data).then(() => {
      visit(route("dashboard"));
    }).catch((error) => {
      setErrors(error.response.data.errors);
    });
  };
  return /* @__PURE__ */ jsxs(AuthLayout, { title: "Create an account", description: "Enter your details below to create your account", children: [
    /* @__PURE__ */ jsx(Head, { title: "Register" }),
    /* @__PURE__ */ jsxs("form", { className: "flex flex-col gap-6", onSubmit: submit, children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "name",
              type: "text",
              required: true,
              autoFocus: true,
              tabIndex: 1,
              autoComplete: "name",
              value: data.name,
              onChange: (e) => setData("name", e.target.value),
              disabled: processing,
              placeholder: "Full name"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.name, className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email address" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "email",
              type: "email",
              required: true,
              tabIndex: 2,
              autoComplete: "email",
              value: data.email,
              onChange: (e) => setData("email", e.target.value),
              disabled: processing,
              placeholder: "email@example.com"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              type: "password",
              required: true,
              tabIndex: 3,
              autoComplete: "new-password",
              value: data.password,
              onChange: (e) => setData("password", e.target.value),
              disabled: processing,
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
              required: true,
              tabIndex: 4,
              autoComplete: "new-password",
              value: data.password_confirmation,
              onChange: (e) => setData("password_confirmation", e.target.value),
              disabled: processing,
              placeholder: "Confirm password"
            }
          ),
          /* @__PURE__ */ jsx(InputError, { message: errors.password_confirmation })
        ] }),
        /* @__PURE__ */ jsxs(Button, { type: "submit", className: "mt-2 w-full", tabIndex: 5, disabled: processing, children: [
          processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          "Create account"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground text-center text-sm", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ jsx(TextLink, { href: route("login"), tabIndex: 6, children: "Log in" })
      ] })
    ] })
  ] });
}
export {
  Register as default
};
