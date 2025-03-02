import { jsx, jsxs } from "react/jsx-runtime";
import { Transition } from "@headlessui/react";
import * as React from "react";
import { useRef, useState } from "react";
import { L as Label, I as InputError } from "./label-BZWDHOTY.js";
import { c as cn, B as Button } from "./app-logo-icon-BHmYduCG.js";
import { I as Input } from "./input-E5fbwyyU.js";
import { H as HeadingSmall, S as SettingsLayout } from "./layout-CwDbAL5g.js";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { u as useForm } from "./useForm-DaykqEH7.js";
import { visit, sharedProps, nexusProps, Head } from "@laravext/react";
import axios from "axios";
import { A as AppLayout } from "./app-layout-vfvBydDc.js";
import "@radix-ui/react-label";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-separator";
import "@radix-ui/react-tooltip";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-avatar";
const Dialog = SheetPrimitive.Root;
const DialogTrigger = SheetPrimitive.Trigger;
const DialogPortal = SheetPrimitive.Portal;
const DialogClose = SheetPrimitive.Close;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = SheetPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(
        // "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = SheetPrimitive.Content.displayName;
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className), ...props });
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Title, { ref, className: cn("text-lg font-semibold leading-none tracking-tight", className), ...props })
);
DialogTitle.displayName = SheetPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SheetPrimitive.Description, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
DialogDescription.displayName = SheetPrimitive.Description.displayName;
function DeleteUser() {
  const passwordInput = useRef(null);
  const { data, setData, processing, setProcessing, reset, errors, setErrors, clearErrors } = useForm({ password: "" });
  const deleteUser = (e) => {
    e.preventDefault();
    clearErrors();
    setProcessing(true);
    console.log(data);
    axios.delete("/api/settings/profile", { data }).then(() => {
      setProcessing(true);
      closeModal();
      visit(route("home"));
    }).catch((error) => {
      setProcessing(false);
      setErrors(error.response.data.errors);
    }).finally(() => {
      setProcessing(false);
    });
  };
  const closeModal = () => {
    clearErrors();
    reset();
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(HeadingSmall, { title: "Delete account", description: "Delete your account and all of its resources" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative space-y-0.5 text-red-600 dark:text-red-100", children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium", children: "Warning" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Please proceed with caution, this cannot be undone." })
      ] }),
      /* @__PURE__ */ jsxs(Dialog, { children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "destructive", children: "Delete account" }) }),
        /* @__PURE__ */ jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsx(DialogTitle, { children: "Are you sure you want to delete your account?" }),
          /* @__PURE__ */ jsx(DialogDescription, { children: "Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account." }),
          /* @__PURE__ */ jsxs("form", { className: "space-y-6", onSubmit: deleteUser, children: [
            /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
              /* @__PURE__ */ jsx(Label, { htmlFor: "password", className: "sr-only", children: "Password" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "password",
                  type: "password",
                  name: "password",
                  ref: passwordInput,
                  value: data.password,
                  onChange: (e) => setData("password", e.target.value),
                  placeholder: "Password",
                  autoComplete: "current-password"
                }
              ),
              /* @__PURE__ */ jsx(InputError, { message: errors.password })
            ] }),
            /* @__PURE__ */ jsxs(DialogFooter, { children: [
              /* @__PURE__ */ jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", onClick: closeModal, children: "Cancel" }) }),
              /* @__PURE__ */ jsx(Button, { variant: "destructive", disabled: processing, asChild: true, children: /* @__PURE__ */ jsx("button", { type: "submit", children: "Delete account" }) })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const breadcrumbs = [
  {
    title: "Profile settings",
    href: "/settings/profile"
  }
];
function Profile() {
  const { auth } = sharedProps();
  const { mustVerifyEmail } = nexusProps();
  const { data, setData, errors, setErrors, processing, setProcessing, recentlySuccessful, setRecentlySuccessful, clearErrors } = useForm({
    name: auth.user.name,
    email: auth.user.email
  });
  const [status, setStatus] = useState(null);
  const submit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setRecentlySuccessful(false);
    clearErrors();
    axios.patch("/api/settings/profile", data).then(() => {
      setRecentlySuccessful(true);
      visit("/settings/profile");
    }).catch((error) => {
      setErrors(error.response.data.errors);
    }).finally(() => {
      setProcessing(false);
    });
  };
  const sendVerificationEmail = () => {
    axios.post("/api/email/verification-notification").then(({ data: data2 }) => {
      setStatus(data2.status);
    });
  };
  return /* @__PURE__ */ jsxs(AppLayout, { breadcrumbs, children: [
    /* @__PURE__ */ jsx(Head, { title: "Profile settings" }),
    /* @__PURE__ */ jsxs(SettingsLayout, { children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx(HeadingSmall, { title: "Profile information", description: "Update your name and email address" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Name" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "name",
                className: "mt-1 block w-full",
                value: data.name,
                onChange: (e) => setData("name", e.target.value),
                required: true,
                autoComplete: "name",
                placeholder: "Full name"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-2", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email address" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "email",
                type: "email",
                className: "mt-1 block w-full",
                value: data.email,
                onChange: (e) => setData("email", e.target.value),
                required: true,
                autoComplete: "username",
                placeholder: "Email address"
              }
            ),
            /* @__PURE__ */ jsx(InputError, { className: "mt-2", message: errors.email })
          ] }),
          mustVerifyEmail && auth.user.email_verified_at === null && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-neutral-800 dark:text-neutral-200", children: [
              "Your email address is unverified.",
              " ",
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: sendVerificationEmail,
                  type: "button",
                  className: "rounded-md text-sm text-neutral-600 underline hover:text-neutral-900 focus:ring-2 focus:ring-offset-2 focus:outline-hidden dark:text-neutral-400 dark:hover:text-neutral-300",
                  children: "Click here to re-send the verification email."
                }
              )
            ] }),
            status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm font-medium text-green-600", children: "A new verification link has been sent to your email address." }),
            status === "email-already-verified" && /* @__PURE__ */ jsx("div", { className: "mt-2 text-sm font-medium text-green-600", children: "Your email address is already verified." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx(Button, { disabled: processing, children: "Save" }),
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
      ] }),
      /* @__PURE__ */ jsx(DeleteUser, {})
    ] })
  ] });
}
export {
  Profile as default
};
