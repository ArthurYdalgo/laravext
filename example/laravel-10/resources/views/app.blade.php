<x-app-layout>
    <span class="text-white">
        This was server side rendered...
        <br/>
        <br/>
    {{$laravext['shared_props']['motivation']}}
    </span>
    <br/>
    <br/>
    <span class="text-white">
        This was client side rendered...
    </span>
        <br/>
        <br/>
    @strand('EyeToggle', ['seiLa' => 'valorDaora'])
    <br />

    @nexus
</x-app-layout>
