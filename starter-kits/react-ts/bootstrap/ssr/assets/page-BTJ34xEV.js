import { jsxs, jsx } from "react/jsx-runtime";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { T as TextLink } from "./text-link-kNea88ED.js";
import { B as Button } from "./app-logo-icon-BHmYduCG.js";
import { A as AuthLayout } from "./auth-layout-uK96YZ3q.js";
import { nexusProps, Head, visit } from "@laravext/react";
import axios from "axios";
import { u as useForm } from "./useForm-DaykqEH7.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function VerifyEmail() {
  const [status, setStatus] = useState(nexusProps().status);
  const { processing, setProcessing } = useForm({});
  const submit = (e) => {
    e.preventDefault();
    setProcessing(true);
    axios.post("/api/email/verification-notification").then((response) => {
      setStatus(response.data.status);
    }).finally(() => {
      setProcessing(false);
    });
  };
  const logout = () => {
    axios.post("/api/logout").then(() => {
      visit(route("home"));
    });
  };
  return /* @__PURE__ */ jsxs(AuthLayout, { title: "Verify email", description: "Please verify your email address by clicking on the link we just emailed to you.", children: [
    /* @__PURE__ */ jsx(Head, { title: "Email verification" }),
    status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mb-4 text-center text-sm font-medium text-green-600", children: "A new verification link has been sent to the email address you provided during registration." }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6 text-center", children: [
      /* @__PURE__ */ jsxs(Button, { disabled: processing, variant: "secondary", children: [
        processing && /* @__PURE__ */ jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
        "Resend verification email"
      ] }),
      /* @__PURE__ */ jsx(TextLink, { onClick: logout, className: "mx-auto block text-sm", children: "Log out" })
    ] })
  ] });
}
export {
  VerifyEmail as default
};
