<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Http\Requests\Company\StoreRequest;
use App\Http\Requests\Company\UpdateRequest;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return JsonResource::collection(Company::withCount(['projects'])->paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        return Company::create($request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        return $company;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Company $company)
    {
        $company->update($request->validated());

        return $company;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        $company->delete();

        return response()->noContent();
    }
}
