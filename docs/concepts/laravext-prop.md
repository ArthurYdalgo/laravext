# Laravext Prop

Every time a component is rendered by the `createLaravextApp`, a `laravext` props is passed to it. Considering the previous example from the [Concepts/Router](/concepts/router) page, having a `./resources/js/nexus/dashbord/orders/{order}/page.(jsx|tsx|js|ts|vue)`:

<!-- tabs:start -->

#### **React**

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

```vue
<script setup>
const { laravext } = defineProps(['laravext'])

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
    "loading": null,
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

The `__laravext.nexus` property will contain informations about your rendered nexus, the most useful one is going to be the `props`, which contains any prop that was sent to it that was pre-fetched before the page was loaded. There're two ways to do this, either using a [Nexus Response](/tools/nexus-response.md) or creating a [Nexus Route](/tools/routing?id=nexus). 

Other than that, there're also other props which are related to the [File Conventions](/concepts/file-conventions.md), which are used by the `createLaravextApp` to actually render the nexus.

## Shared Props

The `__laravext.shared_props` property will contain whatever you defined in your `HandleLaravextRequests` to be the shared data. By default, when declaring this middleware and extending the `\Laravext\Middlweware`, it will contain a

```
'auth' => [
  'user' => $request->user(),
]
```
Check the [Shared Props](/tools/shared-props.md) page for more details.

## Route Params

Using the example defined in the beginning of this page, assuming you have a `./resources/js/nexus/dashbord/orders/{order}/page.jsx` file which creates a `dashboard/orders/{order}` route, upon accessing `dashboard/orders/12345?foo=bar`, the `__laravext.route_params` would contain

```
{
  "order": "12345"
}
```

## Query Params

Following the previous example, `__laravext.query_params` would contain:

```
{
  "foo": "bar
}
```