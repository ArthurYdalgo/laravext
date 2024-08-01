<?php

namespace App\Http\Requests\User\AbuseReport;

use App\Models\AbuseReport;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $type = $this->input('type');
        $user = $this->route('user');

        if (user()->submittedAbuseReports()->type($type)->abuseReportableIs($user)->notReplied()->exists()) {
            throw new AuthorizationException(__('You have already submitted an abuse report of this type for this user which has not been replied to.'));
        }

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
            'type' => ['required', 'string', Rule::in(array_keys(AbuseReport::$available_types))],
            'message' => ['required', 'string', 'max:2000', 'min:10'],
        ];
    }
}
