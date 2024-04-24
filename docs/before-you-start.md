
This documentation assumes that you have some experience with PHP, Laravel and Javascript, and also that you already have a development environment that meets the requirements to run a Laravel project using Vite as your bundler.

## Disclaimer

I'm not an experienced front-end developer. I'm a back-end developer with some-what basic experience with front-end and in my projects I would only be responsible for making any front-end if it was for internal use only, so the looks were not important. 

With that in mind: the examples I might give in this documentation might cringe you a little bit, or just straight up look bad. I'm just trying to show you how to use Laravext. If you have any suggestions, please let me know by submitting a PR or opening an issue. Please be kind.

<div style="text-align: center; margin-top: 20px;"> 
    <img src="/images/memes/back-end-developer-doing-css.webp" width="200px">
    <p style="font-size: 10px">Source: <a href="https://www.reddit.com/r/ProgrammerHumor/comments/8tnztu/backend_developer_doing_css/" target="_blank">r/ProgrammerHumor (Backend developer doing CSS)</a></p>
    <p style="font-size: 14px">Me trying to do front-end (Not a joke, I had to use GitHub Copilot to center this very image)</p>
</div>


## Example Standards

Because this set of tools is meant to be used with React/Vue, you should be aware of some standards...

I might use `.jsx` as an extension for most files, or something like `.(jsx|tsx|js|ts|vue)`, assuming that you'll know that it may change depending on what you're using or what you're using it for (that means changing to `.vue`, `.tsx`, etc).

If I'm showing some code that wouldn't vary much betweem those libraries/frameworks (one or two lines), I might just show how it's be done for each one of them in the surrouding lines.

If the example is **too** specific, such as a component/page/etc, I will show implementations on all of them, like the example below:

<!-- tabs:start -->

#### **React**

`page.jsx`:

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

`page.vue`:

```vue
<script setup>
import { defineProps } from 'vue'
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


Please submit a PR if you think that an example is not clear enough and you think it could use some improvements.

The examples are meant to help you understand how to use these tools, and are not meant to reflect how a real world application would be designed, so everything will be as simple as possible.

## The Example Project(s) <!-- {docsify-ignore} -->

Some code or file structures in this documentation might (or not) be derived from the [laravext examples available at GitHub](https://github.com/ArthurYdalgo/laravext/tree/main/examples), and it'll be either the [laravel-10-react](https://github.com/ArthurYdalgo/laravext/tree/main/examples/laravel-10-react) or [laravel-10-vue](https://github.com/ArthurYdalgo/laravext/tree/main/examples/laravel-10-vue). It's a basic developer team manager, where teams have developers and projects, and these projects belong to companies (needless to say that this does not reflect how a real world application of this kind would be designed). 
In order for you to have some basic comprehension of the project itself, here's the database structure:

![image](/images/illustrations/example-developer-team-database-diagram.png)

<sup>Database diagram of the example project. Designed on [dbdiagram.io](https://dbdiagram.io). The declaration used to create this illustration can be found in the [laravext repository](https://github.com/ArthurYdalgo/laravext/tree/main/docs/images/illustrations/example-developer-team-database-diagram.dbdiagram.io)</sub>


