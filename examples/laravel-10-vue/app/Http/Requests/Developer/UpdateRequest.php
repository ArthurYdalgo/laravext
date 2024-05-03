<?php

namespace App\Http\Requests\Developer;

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
            'username' => 'sometimes|string|max:255|unique:developers,username,' . $this->route('developer')->id,
            'team_id' => 'sometimes|integer|exists:teams,id',
            'name' => 'sometimes|string|min:5|max:255',
            'email' => 'sometimes|email|max:255|unique:developers,email,' . $this->route('developer')->id,
            'role' => 'sometimes|string|max:255',
        ];
    }
}
