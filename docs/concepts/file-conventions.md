# File Conventions

File conventions are special files that are used when rendering a nexus, and they are inspired by the [Next.js' file conventions](https://nextjs.org/docs/app/building-your-application/routing#file-conventions). They follow the hierarchy below:

```
<Middleware>
  <Layout>
    <Loading>
      <Error>
        <Page />
      </Error>
    </Loading>
  </Layout>
</Middleware>
```

Most of these are client-side rendered, except for the [Loading/Server Side](/concepts/file-conventions?id=server-side-basic-html)

You can modify this hierarchy by sending the list of conventions when calling the `createLaravextApp`. The list of the conventions should be an array of strings, and should be in order that you want to be rendered from the inside out after the page. The default list of conventions is:

```javascript
[
  'error',
  'loading',
  'layout',
  'middleware',
]
```

There's no need to include the `page` convention, as it's filtered out before the list is used. Here's an example:

```javascript
// For Vue
import { createLaravextApp, resolveComponent } from "@laravext/vue"

// For React
import { createLaravextApp, resolveComponent } from "@laravext/react"

createLaravextApp({
    nexusResolver: (name) => resolveComponent(`./nexus/${name}`, import.meta.glob('./nexus/**/*')),

    // ...

    conventions: [
        'error',
        'loading',
        'middleware',
        'layout',
    ]
})
```

In this example, the file hierarchy would be:

```
<Layout>
  <Middleware>
    <Loading>
      <Error>
        <Page />
      </Error>
    </Loading>
  </Middleware>
</Layout>
```

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

Example:

<!-- tabs:start -->

#### **React**

You might want to use [react-error-boundary](https://www.npmjs.com/package/react-error-boundary) to handle errors in your components. I wanted to keep external libraries to a minimum in the examples, so I've created a simple error boundary component [based on React's documentation](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary).

<!-- tabs:start -->

#### **error.jsx**

```jsx
import ErrorBoundary from "@/components/ErrorBoundary"

export default ({ laravext, children }) => {

    const doSomething = async () => {
        window.location.reload();
    }

    return (
        <ErrorBoundary onError={doSomething} fallback={<div>Something went wrong... Oopsie daisy</div>}>
            {children}
        </ErrorBoundary>
    )
}
```

#### **ErrorBoundary.jsx**

```jsx
import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log('Error captured in error component: ', error)
        
        if(this.props.onError){
            this.props.onError();
        }
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
```

<!-- tabs:end -->

#### **Vue**

You might want to use [vue-error-boundary](https://www.npmjs.com/package/vue-error-boundary) to handle errors in your components. I wanted to keep external libraries to a minimum in the examples, so I've created a simple error boundary component [based on Vue's documentation](https://vuejs.org/error-reference/).

<!-- tabs:start -->

#### **error.vue**

```vue
<script setup>
import ErrorBoundary from "@/components/ErrorBoundary.vue";

const doSomething = () => {
  window.location.reload();
};

</script>
<template>
  <ErrorBoundary :onError="doSomething">
    <slot></slot>

    <template v-slot:fallback>
      <span>Something went wrong... Oopsie daisy</span>
    </template>
    
  </ErrorBoundary>
</template>
```

#### **ErrorBoundary.vue**

```vue
<script setup>
import { onErrorCaptured, ref } from "vue";
const { onError } = defineProps(["onError"]);

let errorWasCaptured = ref(false);

onErrorCaptured((error, vm, info) => {
  errorWasCaptured.value = true;

  console.log("Error captured in error component: ", error);

  if (onError) {
    onError();
  }
});
</script>
<template>
  <slot name="default" v-if="!errorWasCaptured"></slot>
  <slot name="fallback" v-else></slot>
</template>
```

<!-- tabs:end -->

<!-- tabs:end -->

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
        Hold up, {{ auth()->user()?->name ?? 'stranger' }}...
    @endNexus
@endsection
```

Anything between them will be server-side rendered and displayed to the user until the javascript is loaded. Remember that anything in between those two directives will be cleared when the content of the page component is loaded.
