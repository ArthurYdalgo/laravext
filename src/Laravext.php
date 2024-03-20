<?php

namespace ArthurYdalgo\Laravext;

class Laravext
{
    public $root_view;
    public $component;
    public $props = [];

    public function __construct()
    {
        $this->root_view = config('laravext.root_view');
    }

    public function nexus($component = null, $props = []){
        $this->component = $component;

        return $this->withProps($props);
    }

    public function withProps($props = []){
        $this->props = array_merge($this->props, $props);

        return $this;
    }

    public function rootView($root_view){
        $this->root_view = $root_view;

        return $this;
    }

    public function render(){
        return view($this->root_view, [
            'laravextComponent' => $this->component,
            'laravextProps' => $this->props
        ]);
    }
}
