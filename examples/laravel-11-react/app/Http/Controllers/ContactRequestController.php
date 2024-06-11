<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest\ReplyRequest;
use App\Http\Requests\ContactRequest\StoreRequest;
use App\Mail\ContactRequestReply;
use App\Models\ContactRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Mail;
use Spatie\QueryBuilder\QueryBuilder;

class ContactRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->query('search');
        $contact_requests = QueryBuilder::for(ContactRequest::class)
            ->when($search, function ($query, $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%$search%")
                        ->orWhere('email', 'like', "%$search%")
                        ->orWhere('subject', 'like', "%$search%");
                });
            })
            // The ones that have not been replied to or delivered should be at the top
            ->orderByRaw('replied_at is null desc, delivered_at is null desc, delivered_at desc, replied_at desc, id desc')
            ->with(['replier'])
            ->paginate(request()->query('per_page', 10))
            ->appends(request()->query());

        return JsonResource::collection($contact_requests);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        return ContactRequest::create($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ContactRequest $contactRequest)
    {
        $contactRequest->delete();

        return response()->noContent();
    }

    /**
     * Reply to the contact request.
     */
    public function reply(ReplyRequest $request, ContactRequest $contactRequest)
    {
        $contactRequest->update([
            'reply' => $request->validated('reply'),
            'replier_id' => auth()->id(),
            'replied_at' => now(),
        ]);

        dispatch(function () use ($contactRequest) {
            Mail::to($contactRequest->email)->send(new ContactRequestReply($contactRequest));

            $contactRequest->update(['delivered_at' => now()]);
        });

        return $contactRequest;
    }
}
