# Middleware

This is an example of a middleware [file convention](/concepts/file-conventions.md). These files are located at `./resources/js/nexus/(global)/(auth)/middleware.(jsx|tsx|js|ts|vue)`.

Although this is present in the example projects it would not be actually used because there's a middleware that is already present in the `./routes/web.php` that redirects the user to the login page if they're not authenticated, as the following:

```php
Route::laravext("admin",  route_group_attributes: [
    'middleware' => 'auth',
], root_view: 'sections.app');
```

but for now, let's assume it's not there. 

If a user tries to access a `/admin/dashboard` route (created by `./resources/js/nexus/(global)/(auth)/admin/dashboard/page.(jsx|tsx|js|ts|vue)`), the middleware cascaded down will be surrouding the page component, so if the user is not authenticated, they will be redirected to the login page.

<!-- tabs:start -->

#### **React**

`middleware.jsx`:

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

`middleware.vue`:

```vue
<script setup>
import { sharedProps } from '@laravext/vue';

if (!sharedProps().auth?.user) {
  window.location.href = '/'
}
</script>
<template>
  <slot v-if="sharedProps().auth?.user"></slot>
  <div v-else>
    <div class="flex justify-center items-center h-[75vh]">
      <div class="flex flex-col items-center">
        <h1 class="text-xl font-bold mb-4">I'm sorry Dave, I'm afraid I can't let you do that...</h1>
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>

```

<!-- tabs:end -->

⚠️Important note⚠️: remember that this middleware will be executed on the client side and is meant for non-sensitive scenarios, so be aware of any data that should be present in the client. If a middleware is of uttermoust importance, you should use a standard middleware.