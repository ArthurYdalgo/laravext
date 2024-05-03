<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Http\Requests\Company\StoreRequest;
use App\Http\Requests\Company\UpdateRequest;
use Illuminate\Http\Resources\Json\JsonResource;

class CompanyController extends Controller
{
    public function index()
    {
        return JsonResource::collection(Company::withCount(['projects'])->paginate());
    }


    public function store(StoreRequest $request)
    {
        return Company::create($request->validated());
    }

    public function show(Company $company)
    {
        return $company;
    }

    public function update(UpdateRequest $request, Company $company)
    {
        $company->update($request->validated());

        return $company;
    }

    public function destroy(Company $company)
    {
        $company->delete();

        return response()->noContent();
    }
}
