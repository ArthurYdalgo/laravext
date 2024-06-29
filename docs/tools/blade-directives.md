# Blade Directives 

Laravext offers some blade directives to be used in your project.

## @nexus

The `@nexus` directive is used to define where the content of the `page.(jsx|tsx|js|ts|vue)` files (an all the outer file conventions) will be rendered. Assuming you have a `./resources/views/layouts/app.blade.php` blade view (with a `@yield('content')` inside it), inside a `./resources/views/sections/app.blade.php` you should use the `@nexus` directive like this:

```php
@extends('layouts.app')
@section('content')

    @nexus

@endsection
```

## @startNexus and @endNexus

As mentioned before in the [Concepts/File Conventions/Loading](/concepts/file-conventions?id=loading) section of this documentation, you might need more complex server side skeletons to be rendered while the javascript is loaded, so you can use the `@startNexus` and `@endNexus` directives to define where the content of the `page.(jsx|tsx|js|ts|vue)` files (an all the outer file conventions) will be rendered. Assuming you have a `./resources/views/layouts/app.blade.php` blade view (with a `@yield('content')` inside it), inside a `./resources/views/sections/app.blade.php` you should use the `@startNexus` and `@endNexus` directives like this:

```php
@extends('layouts.app')
@section('content')
    @startNexus
        @auth
            <h1 class="text-xl font-bold text-gray-800 dark:text-gray-200">Welcome back,
                {{ auth()->user()->name }}</h1>
        @endauth
        @guest
            <h1 class="text-xl font-bold text-gray-800 dark:text-gray-200">Welcome, stranger</h1>
        @endguest
    @endNexus
@endsection
```

Once again... Remember that anything in between those two directives will be cleared when the content of the page component is loaded.

## @strand

You can use the @strand('Path/To/Component') directive alongside a @nexus, which will use the name as a path to find a React/Vue component inside the resources/js/strands (which is customizable). The first parateters is the `path/to/the/component`, and the second one is `['any' => 'data', 'you' => 'might need']`

```php
@extends('layouts.app')
@section('content')

    @strand('PrivacyToggle', ['initialState' => auth()->user()?->privacy ?? false])

    @nexus

@endsection
```

For some context, here's the component:

<!-- tabs:start -->

#### **React**

<!-- tabs:start -->

#### **PrivacyToggle.jsx**

```jsx
import usePrivacy from '@/hooks/usePrivacy'
import axios from 'axios';
import { useEffect } from 'react'

export default ({ laravext, initialState }) => {
    const { active, setActive, toggle } = usePrivacy();
    
    useEffect(() => {
        if(initialState !== undefined){
            setActive(initialState);
        }
    }, []);

    const handleToggle = () => {
        // This is done like this because the active wouldn't always be updated immediately
        let currentState = active;
        toggle();
        axios.put('/api/auth/user/privacy', { privacy: !currentState })
    }

    return (
        <>
            <span className="cursor-pointer" onClick={handleToggle}>{active ? 'Click to Turn Privacy Off' : 'Click to Turn Privacy On'}</span>
        </>
    )
}
```

#### **usePrivacy.js**

⚠️This example uses the [zustand](https://github.com/pmndrs/zustand) package⚠️

```js
import { create } from 'zustand'

const usePrivacy = create((set) => ({
  active: false,
  setActive: (active) => set(() => ({ active })),
  toggle: () => set((state) => ({ active: !state.active })),
}))

export default usePrivacy;
```

<!-- tabs:end -->

#### **Vue**

<!-- tabs:start -->

#### **PrivacyToggle.vue**

```vue
<script setup>
import { privacy } from '@/composables/usePrivacy'
import axios from 'axios';
const {initialState, laravext} = defineProps(['initialState', 'laravext'])

if(initialState !== undefined) {
    privacy.setActive(initialState)
}

const handleToggle = () => {
    privacy.toggle();

    axios.put('/api/auth/user/privacy', {
        privacy: privacy.active
    });
}

</script>
<template>
    <span @click="handleToggle" class="cursor-pointer">
        {{ privacy.active ? 'Click to Turn Privacy Off' : 'Click to Turn Privacy On' }}
    </span>
</template>
```

#### **usePrivacy.js**

```js
import { reactive } from 'vue'

export const privacy = reactive({
  active: false,
  toggle() {
    this.active = !this.active
  },
  setActive(value) {
    this.active = value
  }
})
```

<!-- tabs:end -->

<!-- tabs:end -->


## Overview 

In the end, depending on how/which directives you use, your overall blade structure might look like one of these illustrations:

### @nexus
<a
href="/../images/illustrations/nexus-inside-section-inside-layout.jpg" target="_blank">
<img src="/../images/illustrations/nexus-inside-section-inside-layout.jpg" alt="image" style="width: 700px"/>
</a>

### @startNexus and @endNexus
<a
href="/../images/illustrations/start-and-end-nexus-inside-section-inside-layout.jpg" target="_blank">
<img src="/../images/illustrations/start-and-end-nexus-inside-section-inside-layout.jpg" alt="image" style="width: 700px"/>
</a>

Just a reminder that the view file can be customized not only in the config file, but also in a more granular way, as shown in the [Tools/Routing](/tools/routing) section.