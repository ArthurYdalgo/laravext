# Page

These examples will mostly focus on how to use the page [file convention](/concepts/file-conventions.md) and the [Laravext prop](/concepts/laravext-prop.md) to create a page.

## Page with Client Side Fetching

This is a rather simple example on how to create a page that fetches data from an API and renders it on the client side. This file is localed at `.resources/js/nexus/(global)/(guest)/our-projects/page.(jsx|tsx|js|ts|vue)`.

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
import { Head } from '@laravext/vue'
import axios from 'axios';
import { reactive, onMounted } from 'vue'

const data = reactive({
    projects: [],
    loading: true,
});

onMounted(async () => {
    axios.get('/api/projects')
        .then(response => {
            data.projects = response.data.data;
            data.loading = false;
        })
        .catch(error => {
            console.error(error);
            data.loading = false;
        });
});

</script>
<template>
    <Head title="Our Projects" />
    <div v-if="data.loading" class="flex justify-center items-center min-h-[70vh] mt-6">
        Loading...
    </div>
    <div v-else class="flex justify-center items-center min-h-[70vh]  mt-6">

        <div>
            <h3 class="text-2xl mb-2">Our projects...</h3>
            <ul>
                <li v-for="project in data.projects" :key="project.id">
                    {{ project.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

```

<!-- tabs:end -->

## Page with Server Side Fetching

This is a rather simple example on how to create a page that renders data that was server-side fetched, and sent as a prop to this page. This file is localed at `.resources/js/nexus/(global)/(guest)/our-teams/page.(jsx|tsx|js|ts|vue)`.

<!-- tabs:start -->

#### **React**

`page.jsx`:

```jsx
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

const { teams } = nexusProps();

</script>
<template>
    <Head title="Our Teams" />
    <div class="flex justify-center items-center min-h-[70vh] mt-6">
        <div>
            <h3 class="text-2xl mb-2">Our teams...</h3>
            <ul>
                <li v-for="team in teams" :key="team.id">
                    {{ team.name }}
                </li>
            </ul>
        </div>
    </div>
</template>
```

<!-- tabs:end -->