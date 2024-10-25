# Laravext Prop

Every time a component is rendered by the `createLaravextApp`/`createLaravextSsrApp`, a `laravext` props is passed to it. Considering the previous example from the [Concepts/Router](/concepts/router) page, having a `./resources/js/nexus/dashbord/orders/{order}/page.(jsx|tsx|js|ts|vue)`:

<!-- tabs:start -->

#### **React**

```jsx
export default ({ laravext }) => {
  console.log(laravext);

  return <div>
    - Hello, there... 
    - General Kenoby!
  </div>;
};
```

#### **Vue**

```html
<script setup>
const { laravext } = defineProps(["laravext"]);
</script>
<template>
  <div>
    - Hello, there... 
    - General Kenoby!
  </div>
</template>
```

<!-- tabs:end -->

When accessing `/dashboard/orders/12345?foo=bar`
You'd get something similar to

```json
{
  "nexus": {
    "page": "dashboard/orders/{order}/page.jsx",
    "props": [],
    "server_skeleton": null,
    "middleware": null,
    "layout": null,
    "error": null
  },
  "shared_props": {
    "auth": {
      "user": null
    },
    "motivation": "Don't forget you have bills to pay."
  },
  "route_params": {
    "order": "12345"
  },
  "query_params": {
    "foo": "bar"
  },
  "route_name": "dashboard.orders.order"
}
```

## Nexus

The `laravext.nexus` property will contain informations about your rendered nexus, the most useful one is going to be the `props`, which contains any prop that was sent to it that was pre-fetched before the page was loaded.

Other than that, there're also other props which are related to the [File Conventions](/docs/concepts/file-conventions.md), which are used by the `createLaravextApp` to actually render the nexus.

## Shared Props

The `laravext.shared_props` property will contain whatever you defined in your `HandleLaravextRequests` to be the shared data. By default, when declaring this middleware and extending the `\Laravext\Middlweware`, it will contain a

```php
'auth' => [
  'user' => $request->user(),
]
```

Check the [Shared Props](/tools/shared-props.md) page for more details.

## Route Params

Using the example defined in the beginning of this page, assuming you have a `./resources/js/nexus/dashbord/orders/{order}/page.jsx` file which creates a `dashboard/orders/{order}` route, upon accessing `dashboard/orders/12345?foo=bar`, the `laravext.route_params` would contain

```json
{
  "order": "12345"
}
```

## Query Params

Following the previous example, `laravext.query_params` would contain:

```json
{
  "foo": "bar"
}
```

## Helper Functions

There're also other ways to access any data from the laravext prop:

<!-- tabs:start -->

#### **React**

```jsx
// I've exemplified how to import all of them, but you can import them individually as needed
import { laravext, nexus, nexusProps, queryParams, routeParams, sharedProps } from '@laravext/react'

export default () => {
  
  const {droids} = nexusProps();.

  return (
    <div>
      These...
      <ul>
        {droids.map(droid => (
          <li key={droid.id}>{droid.name}</li>
        ))}
      </ul>
      are not the droids you are looking for.
    </div>
  )
};
```

#### **Vue**

```html
<script setup>
import { inject } from 'vue';
// I've exemplified how to import all of them, but you can import them individually as needed
const laravext = inject("$laravext");
const nexus = inject("$nexus");
const nexusProps = inject('$nexusProps');
const queryParams = inject('$queryParams');
const routeParams = inject('$routeParams');
const sharedProps = inject('$sharedProps');

const { droids } = nexusPros().

<script setup>
</script>
<template>
  These...
  <ul>
    <li v-for="droid in droids" :key="droid.id">
      {{ droid.name }}
    </li>
  </ul>
  are not the droids you are looking for.
</template>
```

<!-- tabs:end -->
