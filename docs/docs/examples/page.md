# Page

These examples will mostly focus on how to use the page [file convention](/docs/concepts/file-conventions.md) and the [Laravext prop](/docs/concepts/laravext-prop.md) to create a page.

## Page with Client Side Fetching

This is a rather simple example on how to create a page that fetches data from an API and renders it on the client side. This file is localed at `.resources/js/nexus/(global)/(guest)/our-projects/page.(jsx|tsx|js|ts|vue)`.

<Tabs>

<TabItem value="React" label="React">

`page.jsx`:

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Head } from "@laravext/react";

export default () => {
    const [data, setData] = useState({
        projects: [],
        loading: true,
    });

    useEffect(() => {
        axios.get('/api/projects')
            .then(response => {
                setData({
                    projects: response.data.data,
                    loading: false,
                });
            })
            .catch(error => {
                console.error(error);
                setData({
                    projects: [],
                    loading: false,
                });
            });
    }, []);

    return (
        <div>
            <Header>Our Projects</Header>

            {data.loading ? (
                <div className="flex justify-center items-center min-h-[70vh] mt-6">
                    Loading...
                </div>
            ) : (
                <div className="flex justify-center items-center min-h-[70vh] mt-6">
                    <div>
                        <h3 className="text-2xl mb-2">Our projects...</h3>
                        <ul>
                            {data.projects.map(project => (
                                <li key={project.id}>
                                    {project.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
```

  </TabItem>
  <TabItem value="Vue" label="Vue">

`page.vue`:

```vue
<script setup>
import { Head } from '@laravext/vue3'
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

  </TabItem>
</Tabs>

## Page with Server Side Fetching

This is a rather simple example on how to create a page that renders data that was server-side fetched, and sent as a prop to this page. This file is localed at `.resources/js/nexus/(global)/(guest)/our-teams/page.(jsx|tsx|js|ts|vue)`. This example also includes how you could do it in your `web.php` file. For the sake of simplicity, a closure is being used instead of using a controller, but organize your code as you see fit.

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

            <div className="flex justify-center items-center min-h-[70vh] mt-6">
                <div>
                    <h3 className="text-2xl mb-2">Our teams...</h3>
                    <ul>
                        {teams.map((team) => (
                            <li key={team.id}>
                                {team.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
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
</TabItem>

<TabItem value="web.php" label="web.php">

```php
use App\Models\Team;
use Illuminate\Support\Facades\Route;

Route::laravext();

Route::get('our-teams', function () {
    $teams = Team::all();

    return nexus(props: compact('teams'))->render();
})->name('our-teams');
```

  </TabItem>
  
</Tabs>