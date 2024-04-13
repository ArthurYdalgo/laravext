# Laravext Prop

Every time a component is rendered by the `createLaravextApp`, a `laravext` props is passed to it. Considering the previous example from the [Concepts/Router](/concepts/router) page, having a `./resources/js/nexus/dashbord/orders/{order}/page.jsx`:

```jsx
export default ({laravext}) => {
    console.log(laravext);

    ...
}
```

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
  }
}
```
