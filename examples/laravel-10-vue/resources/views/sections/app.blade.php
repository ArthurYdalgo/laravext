@extends('layouts.app')
@section('content')
    @php
        $initial_state = boolval(random_int(0, 1));
    @endphp
    @strand('PrivacyToggle', ['initialState' =>  $initial_state])
    <br/>
    @nexus('skeletons.card')
@endsection
