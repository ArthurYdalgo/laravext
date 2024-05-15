<?php

namespace App\Http\Controllers;

use App\Models\Developer;
use App\Http\Requests\Developer\StoreRequest;
use App\Http\Requests\Developer\UpdateRequest;
use Illuminate\Http\Resources\Json\JsonResource;

class DeveloperController extends Controller
{
    public function index()
    {
        $search = request()->query('search');
        $developers = Developer::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%$search%")
                    ->orWhere('email', 'like', "%$search%");
            })
            ->paginate(request()->query('per_page', 10))
            ->appends(request()->query());

        return JsonResource::collection($developers);
    }


    public function store(StoreRequest $request)
    {
        return Developer::create($request->validated());
    }

    public function show(Developer $developer)
    {
        return $developer;
    }

    public function update(UpdateRequest $request, Developer $developer)
    {
        $developer->update($request->validated());

        return $developer;
    }

    public function destroy(Developer $developer)
    {
        $developer->delete();

        return response()->noContent();
    }
}
