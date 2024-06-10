<x-mail::message>
# Hi, {{ $contact_request->name }}!

Regarding your contact request:

@component('mail::panel')
{{ $contact_request->message }}
@endcomponent

Here's our reply:

@component('mail::panel')
{{ $contact_request->reply }}
@endcomponent

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
