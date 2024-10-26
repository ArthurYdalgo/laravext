# Head Component

Much like the [Head Component from Inertia.js](https://inertiajs.com/title-and-meta), Laravext has its own `Head` component that allows you to set the title of the page.

<Tabs>

<TabItem value="React" label="React">

`page.jsx`:

```jsx
import { Head, nexusProps } from "@laravext/react";

export default () => {
    
    const { teams } = nexusProps();

    return (
        <div>
            <Head title="Our Teams" />

            {/* The Rest of your component */}
        </div>
    )
}
```

  </TabItem>
  <TabItem value="Vue" label="Vue">

`page.vue`:

```vue
<script setup>
import { inject } from 'vue';
import { Head } from '@laravext/vue3'
const nexusProps = inject('$nexusProps');

const {teams} = nexusProps();

</script>
<template>
    <Head title="Our Teams" />
    <!-- The Rest of your component -->
</template>
```

  </TabItem>
</Tabs>

