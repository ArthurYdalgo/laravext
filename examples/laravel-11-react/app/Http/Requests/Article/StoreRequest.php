<?php

namespace App\Http\Requests\Article;

use App\Http\Rules\ArticleTagsExist;
use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'language' => ['required', 'string', 'in:en,pt'],
            'reading_time' => ['required', 'integer'],
            'publishing_datetime' => ['nullable', 'date'],
            'markdown' => ['required', 'string'],
            'tags' => [new ArticleTagsExist],
        ];
    }
}
