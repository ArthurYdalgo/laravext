# Layout

This is an example of a layout [file convention](/concepts/file-conventions.md). These files are located at `./resources/js/nexus/(global)/(auth)/layout.(jsx|tsx|js|ts|vue)`.


If a user tries to access a `/admin/dashboard` route (created by `./resources/js/nexus/(global)/(auth)/admin/dashboard/page.(jsx|tsx|js|ts|vue)`), the layout cascaded down will be surrouding the page component.

<!-- tabs:start -->

#### **React**

`layout.jsx`:

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

`layout.vue`:

```vue
<script setup>
import { ref } from 'vue';
import ApplicationLogo from '@/components/ApplicationLogo.vue';
import Dropdown from '@/components/Dropdown.vue';
import DropdownLink from '@/components/DropdownLink.vue';
import DropdownButton from '@/components/DropdownButton.vue';
import NavLink from '@/components/NavLink.vue';
import Link from '@/components/Link.vue';
import ResponsiveNavLink from '@/components/ResponsiveNavLink.vue';
import axios from 'axios';

import { sharedProps } from '@laravext/vue3';

const {user} = sharedProps().auth;

const logout = async () => {
    await axios.post('/api/auth/logout');
    window.location.href = '/';
};

const showingNavigationDropdown = ref(false);
</script>

<template>
    <div>
        <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav class="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <!-- Your navbar -->
            </nav>

            <!-- Page Content -->
            <main>
                <slot /> <!-- This is where the page component will be rendered (which might be surrouded by a error file convention) -->
            </main>
        </div>
    </div>
</template>


```

<!-- tabs:end -->

⚠️Important note⚠️: remember that this middleware will be executed on the client side and is meant for non-sensitive scenarios, so be aware of any data that should be present in the client. If a middleware is of uttermoust importance, you should use a standard middleware.