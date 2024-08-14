# The visit(url) function

Much like [Inertia.js' Protocol](https://inertiajs.com/the-protocol), you can use the `visit(url)` function to navigate to a new page that uses Laravext. This creates a smooth SPA experience, as it doesn't reload the page. If the version of the application changes between visits, or if the view set for that route is different from the one that was previously loaded, an usual page visit will happen.

Here's an example on how you could use it, which are used in the [example projects](/before-you-start?id=the-example-projects) inside a `<Link />` component:

<!-- tabs:start -->

#### **React**

`Link.jsx`:

```jsx
import { visit } from '@laravext/react/router';

export default  ({ routeName, href, className = '', children }) => {
  let resolvedHref = href ? href : (routeName != null && route().has(routeName) ? route(routeName) : '');

  return (
    <a href={resolvedHref} onClick={(e) =>{
      e.preventDefault();
      visit(resolvedHref);
    }

    } className={className}>
      {children}
    </a>
  );
};

```

#### **Vue**

`Link.vue`:

```vue
<script setup>
import { visit } from '@laravext/vue3/router';

const props = defineProps({
    routeName: {
        type: String,
        required: false,
    },
    href: {
        type: String,
        required: false,
    },
    classes: {
        type: String,
        required: false,
    },
});

let href = props.href ? props.href : (props.routeName != null && route().has(props.routeName) ? route(props.routeName) : '');
let classes = props.classes ?? '';

</script>

<template>
    <a :href="href" v-on:click.prevent="visit(href)" :class="classes">
        <slot />
    </a>
</template>

```

<!-- tabs:end -->

<sup>⚠️Important note⚠️: it's not recomendable to use the `visit(url)` function to navigate to a page that doesn't use Laravext. This is due to the function first checking if the page is a Laravext page, and if it's not, it'll do a redirect. As a side effect this will cause a double page visit (the first when the function makes a get request, then the actual redirect), which could degrade the user experience, so you should use a standard anchor tag (`<a href="...">`) instead if you know it's an external link or a non-Laravext page.</sup>