<?php

namespace App\Http\Requests\CurrentUser;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'privacy' => 'sometimes|boolean',
            'locale' => 'sometimes|string',
            'name' => 'sometimes|string|min:5|max:255',
            'theme' => 'sometimes|string|in:light,dark',
        ];
    }
}
