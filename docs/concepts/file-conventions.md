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

Most of these are client-side rendered, except for the [Loading/Server Side](/concepts/file-conventions?id=server-side-basic-html)

## Page

Unique UI of a route.

File name: `page.(jsx|tsx|js|ts|vue)`

## Layout

Shared UI for a segment and its children

File name: `layout.(jsx|tsx|js|ts|vue)`

## Middleware

Shared verifier for a segment and it's children. **REMEMBER** that this is done in the client-side.

File name: `middleware.(jsx|tsx|js|ts|vue)`

## Error

Error UI for a segment and its children

File name: `error.(jsx|tsx|js|ts|vue)`

## Loading (Server/Client Side)

Loading UI for a segment and its children. This can be defined three different ways:

### Client Side

Defining a `loading.jsx` can be used so to to data fetching, and then conditionally render the components inside it. **ONCE AGAIN, REMEMBER** that this component will not be server side rendered.

### Server Side (Basic HTML)

Defining a `loading.html` will make it's content be used by the [nexus directive](/tools/blade-directives?id=nexus), and it'll be rendered server side (this will be passed in the `server_skeleton` property of the [laravext's nexus property](/concepts/laravext-prop)). This is useful to show something to your user while the javascript assets are being loaded to improve the UX. 

```html
<div class="your-really-cool-spinner"></div>
```

### Server Side (Blade Template)

Because using only html can limit how complex your skeleton can be, you can call the `@startNexus` and `@endNexus` in your `resouces/views/sections/app.blade.php`, like the example below:

```php
@extends('layouts.app')
@section('content')
    @startNexus
        Hold up, {{ auth()->user() ? auth()->user()->name : 'stranger' }}...
    @endNexus
@endsection
```

Anything between them will be server-side rendered and displayed to the user until the javascript is loaded. Remember that anything in between those two directives will be cleared when the content of the page component is loaded.