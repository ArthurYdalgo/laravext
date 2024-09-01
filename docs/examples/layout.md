# Layout

This is an example of a layout [file convention](/concepts/file-conventions.md). These files are located at `./resources/js/nexus/(global)/(auth)/layout.(jsx|tsx|js|ts|vue)`.


If a user tries to access a `/admin/dashboard` route (created by `./resources/js/nexus/(global)/(auth)/admin/dashboard/page.(jsx|tsx|js|ts|vue)`), the layout cascaded down will be surrouding the page component.

<!-- tabs:start -->

#### **React**

`layout.jsx`:

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { sharedProps } from '@laravext/react';

export default ({ children }) => {
    const { user } = sharedProps().auth;
    
    const logout = async () => {
        await axios.post('/api/auth/logout');
        window.location.href = '/';
    };

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div>
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                    {/* Your navbar */}
                </nav>

                {/* Page Content */}
                <main>{children}</main>{/* This is where the page component will be rendered (which might be surrouded by a error file convention) */}
                
            </div>
        </div>
    );
};
```

#### **Vue**

`layout.vue`:

```vue
<script setup>
import { ref, inject } from 'vue';
import axios from 'axios';
const sharedProps = inject('$sharedProps');

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