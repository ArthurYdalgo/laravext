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
            'email' => 'sometimes|email|max:200|unique:users,email,' . $this->user()->id,
            'username' => 'sometimes|string|min:3|max:20|unique:users,username,' . $this->user()->id,
            'privacy' => 'sometimes|boolean',
            'locale' => 'sometimes|string',
            'name' => 'sometimes|string|min:5|max:255',
            'banner_hex_color' => 'nullable|string|size:7|regex:/^#[0-9A-F]{6}$/i',
            'biography' => 'nullable|string|max:1000',
            'location' => 'nullable|string|max:255',
            'education' => 'nullable|string|max:255',
            'work' => 'nullable|string|max:255',
            'pronouns' => 'nullable|string|max:20',
            'avatar' => [
                'exclude_if:avatar,null',
                'image',
                'max:2048',
                'dimensions:max_width=3000,max_height=3000',
                'mimes:jpeg,png,jpg'
            ]
        ];
    }
}
