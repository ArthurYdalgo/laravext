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
            'username' => 'required|string|max:255|unique:developers,username,' . $this->route('developer')->id,
            'team_id' => 'required|integer|exists:teams,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:developers,email,' . $this->route('developer')->id,
            'role' => 'required|string|max:255',
        ];
    }
}
