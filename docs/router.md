# Router

The Laravext router follows the same pattern as [Next.js](https://nextjs.org/)' App Router. Each directory will be, in most cases, a url segment that might be a page. For a directory do be a page it must contain a `page.(jsx|tsx|vue|ts|js)` file. (These types are the default ones, but can be customized). Other file conventions from Next.js also exist here, and will be explained further ahead. Every time an automagically generated route is accessed, the application will load the default root view (which can be overwritten for a specific route, if necessary). This route view might extend a layout or not, depending on your needs, and must contain a @nexus directory. The `createLaravextApp` will then look for every nexus in the DOM (although it'd usually only make sense to have one), and render the page component of that URL path.

## Parameters

In a nexus route you might have two types of parameters: `query_params` and `route_params`. Query parameters are the usual ones, such as `domain.com/dashboard?foo=bar&baz=qux`. Additionally, you can create route parameters using the same naming convention from Laravel:

```
+ resources/js/nexus
+ dashboard
  + orders
    + {order}
      - page.jsx
```

When accessing `domain.com/dashboard/orders/12345`, you'd receive a route parameter `"order": "12345"` in your component, which is accessible through the laravext prop.

## The laravext prop

Every time a component is rendered by the `createLaravextApp`, a `laravext` props is passed to it. Still on the previous example, having a `./resources/js/nexus/dashbord/orders/{order}/page.jsx`:

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

## File Conventions

File conventions are special files that are used when rendering a nexus. They follow the hierarchy below:

```jsx
<Loading>
  <Layout>
    <Middleware>
      <Error>
        <Page />
      </Error>
    </Middleware>
  </Layout>
</Loading>
```

### Page

Unique UI of a route and make routes publicly accessible.

### Layout

Shared UI for a segment and its children

### Middleware

Shared verifier for a segment and it's children

### Error

Error UI for a segment and its children

### Loading (Server/Client Side)

Loading UI for a segment and its children. This can be defined three different ways:

#### Client Side

Defining a `loading.jsx`. Inside it you can do all the data fetching, and then conditionally render the components inside it. IT'S IMPORTANT TO KNOW that this component will not be server side rendered

#### Server Side

Defining a `loading.html` will make it's content be used by the nexus directive, and it'll be rendered server side (this will be passed in the `server_skeleton` property of the laravext's nexus property shown before). This is useful to show something to your user while the javascript assets are being loaded to improve the UX. Because using just html can limit how complex your loading screen can be, you can give a `path.to.a.skeleton.view` as a parameter for the `@nexus` directive. Assuming you have a `resouces.views.skeletons.orders`, containing:

```php
<div>
    Hold up...
    @if(date("m-d") == "12-25")
        Merry Christmas by the way
    @endif
</div>
```

you can call the nexus in your `resouces/views/sections/app.blade.php` (assuming you have one), like the example below:

```php
@extends('layouts.app')
@section('content')
    @nexus('skeletons.orders')
@endsection
```

## Route Groups

Sometimes you might want to apply layouts, middleware, etc to children directories. You can do this by creating route groups. Simply name a directory with surrounding parenthesis

## Sending props
