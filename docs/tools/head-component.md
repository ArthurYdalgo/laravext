# Head Component

Much like the [Head Component from Inertia.js](https://inertiajs.com/title-and-meta), Laravext has its own `Head` component that allows you to set the title of the page.

<!-- tabs:start -->

#### **React**

`page.jsx`:

```jsx
// @todo
export default ({laravext}) => {
    console.log(laravext);

    return (
        <div>
            - Hello, there...
            - General Kenoby!
        </div>
    )
}
```

#### **Vue**

`page.vue`:

```vue
<script setup>
import { Head, nexusProps } from '@laravext/vue'

const {teams} = nexusProps();

</script>
<template>
    <Head title="Our Teams" />
    <!-- The Rest of your component -->
</template>
```

<!-- tabs:end -->

