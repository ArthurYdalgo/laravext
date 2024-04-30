<?php

namespace App\Http\Controllers;

use App\Models\Developer;
use App\Http\Requests\Developer\StoreRequest;
use App\Http\Requests\Developer\UpdateRequest;
use Illuminate\Http\Resources\Json\JsonResource;

class DeveloperController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return JsonResource::collection(Developer::paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        return Developer::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Developer $developer)
    {
        return $developer;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Developer $developer)
    {
        $developer->update($request->validated());

        return $developer;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Developer $developer)
    {
        $developer->delete();

        return response()->noContent();
    }
}
