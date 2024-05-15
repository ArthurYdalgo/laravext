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
        $developers = Developer::query()
            ->paginate(request()->query('per_page'))
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
