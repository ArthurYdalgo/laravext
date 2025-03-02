import { jsxs, jsx } from "react/jsx-runtime";
import { LoaderCircle } from "lucide-react";
import { L as Label, I as InputError } from "./label-BZWDHOTY.js";
import { B as Button } from "./app-logo-icon-BHmYduCG.js";
import { I as Input } from "./input-E5fbwyyU.js";
import { u as useForm } from "./useForm-DaykqEH7.js";
import { A as AuthLayout } from "./auth-layout-uK96YZ3q.js";
import { urlIntended, Head, visit } from "@laravext/react";
import axios from "axios";
import "@radix-ui/react-label";
import "class-variance-authority";
import "react";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
function ConfirmPassword() {
  const url = urlIntended();
  console.log(url);
  const { data, setData, processing, setProcessing, errors, setErrors } = useForm({
    password: ""
  });
  const submit = (e) => {
    e.preventDefault();
    setProcessing(true);
    axios.post("api/confirm-password", data).then(() => {
      visit(url ?? route("home"));
    }).catch((error) => {
      console.log(error);
      setErrors(error.response.data.errors);
    }).finally(() => {
      setProcessing(false);
    });
  };
  return /* @__PURE__ */ jsxs(
    AuthLayout,
    {
      title: "Confirm your password",
      description: "This is a secure area of the application. Please confirm your password before continuing.",
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Confirm password" }),
        /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Password" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "password",
                type: "password",
                name: "password",
                placeholder: "Password",
                autoComplete: "current-password",
                value: data.password,
                autoFocus: true,
                onChange: (e) => setData("password", e.target.value)
              }
            ),
            /* @__PURE__ */ jsx(InputError, { message: errors.password })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs(Button, { className: "w-full", disabled: processing, children: [
            processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            "Confirm password"
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  ConfirmPassword as default
};
