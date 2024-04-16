# File Conventions

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

Most of these are client-side rendered, except for the [Loading/Server Side](/concepts/file-conventions?id=server-side)

## Page

Unique UI of a route.

File name: `page.(jsx|vue)`

## Layout

Shared UI for a segment and its children

File name: `layout.(jsx|vue)`

## Middleware

Shared verifier for a segment and it's children. **REMEMBER** that this is done in the client-side.

File name: `middleware.(jsx|vue)`

## Error

Error UI for a segment and its children

File name: `error.(jsx|vue)`

## Loading (Server/Client Side)

Loading UI for a segment and its children. This can be defined three different ways:

### Client Side

Defining a `loading.jsx` can be used so to to data fetching, and then conditionally render the components inside it. **ONCE AGAIN, REMEMBER** that this component will not be server side rendered.

### Server Side (Basic HTML)

Defining a `loading.html` will make it's content be used by the [nexus directive](/tools/blade-directives), and it'll be rendered server side (this will be passed in the `server_skeleton` property of the [laravext's nexus property](/concepts/laravext-prop)). This is useful to show something to your user while the javascript assets are being loaded to improve the UX. 

```html
<div class="your-really-cool-spinner"></div>
```

### Server Side (Blade Template)

Because using just html can limit how complex your loading screen can be, you can give a `path.to.a.skeleton.view` as a parameter for the `@nexus` [blade directive](/tools/blade-directives.md). Assuming you have a `resouces.views.skeletons.orders`, containing:

```php
<div>
    Hold up...
    @if(date("m-d") == "12-25")
        Merry Christmas by the way
    @endif
</div>
```

you can call the `@nexus` in your `resouces/views/sections/app.blade.php` (assuming you have one), like the example below:

```php
@extends('layouts.app')
@section('content')
    @nexus('skeletons.orders')
@endsection
```
