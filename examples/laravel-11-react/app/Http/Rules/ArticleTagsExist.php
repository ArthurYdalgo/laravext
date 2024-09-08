<?php

namespace App\Http\Rules;

use App\Models\Tag;
use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;

class ArticleTagsExist implements DataAwareRule, ValidationRule
{
    protected $data = [];

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {   
        if (! is_array($value)) {
            $value = explode(',', $value);
        }
        
        if($value && !Tag::whereIn('slug', $value)->count() === count($value)){
            $fail(__("The tags submitted do not exist."));
        }
         
    }

    /**
     * Set the data under validation.
     *
     * @param  array<string, mixed>  $data
     */
    public function setData(array $data): static
    {
        $this->data = $data;
 
        return $this;
    }
}
