# Server Side Rending

Laravext offers two ways to server side render you application: a javascript runtime and a blade engine based. If for some reason the need arises, you can even use both at the same time for different routes.

To sum up, the javascript runtime is quite similar to how [Inertia.js' Server Side Rendering](https://inertiajs.com/server-side-rendering) works. You create a `ssr.(js|ts|jsx|tsx)` file which will be used by a node process to render the page being visited and sending it to the client, where it'll be replaced when the javascript loads up. 

The blade engine based is quite similar to how you'd traditionally render a blade view, and the contents are later replaced when the javascript starts running. The later is handy, but it can become cubersome for complex pages where you'll have to essentially replicate whatever you have for you React or Vue components in blade.

<sup>**Note:** You can also use the [loading.html file convention](/concepts/file-conventions?id=loading) for simpler html loadings while your javascript doesn't kick in.</sup>

## Blade Engine Based

The blade engine based methods you can use are througly explained in the [Tools/Blade Directives/@startNexus and @endNexus](/tools/blade-directives?id=startnexus-and-endnexus), [Tools/Blade Directives/@startStrand and @endStrand](/tools/blade-directives?id=startstrand-and-endstrand), [Tools/Nexus Response/withViewSkeleton](/tools/nexus-response?id=withviewskeletonview-props-) and [Tools/Nexus Response/withHtmlSkeleton](/tools/nexus-response?id=withhtmlskeletonhtml_skeleton) sections of this documentation.

## Javascript Runtime