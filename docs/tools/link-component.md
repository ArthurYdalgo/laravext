# Head Component

Much like the [Link Component from Inertia.js](https://inertiajs.com/links), Laravext has its own `Link` component, which is a wrapper around the `a` tag and the [visit function](/tools/visit)  that allows you to navigate between pages without a full page reload. It accepts two props: `preserveScroll` (defaults to `false`) and a `redirectToUrlIntended` (defaults to `true`).

The `preserveScroll` prop is used to keep the scroll position of the page when navigating back to it. The `redirectToUrlIntended` prop is used to redirect a intended url that was stored in the session when being redirected by a middleware, such as the `auth` middleware. This is useful when you want to redirect the user to the intended url after a successful login. If the [router_url_intended_is_enabled config](/configuration?id=router-url-intended-is-enabled-router_url_intended_is_enabled) is disabled, it won't be used, as the client side will not receive it.

<!-- tabs:start -->

#### **React**

`page.jsx`:

```jsx
import { Head, Link, nexusProps } from "@laravext/react";

export default () => {
    const { teams } = nexusProps();

    return (
        <div>
            <Head>Our Teams</Head>

            <nav className="some-cool-classes">
                <Link href="/">Home</Link>
            </nav>

            {/* The Rest of your component */}
        </div>
    );
};
```

#### **Vue**

`page.vue`:

```vue
<script setup>
import { Head, Link } from "@laravext/vue3";
const nexusProps = inject("$nexusProps");

const { teams } = nexusProps();
</script>
<template>
    <Head title="Our Teams" />
    <div class="some-cool-classes">
        <Link href="/">Home</Link>
    </div>
    <!-- The Rest of your component -->
</template>
```

<!-- tabs:end -->