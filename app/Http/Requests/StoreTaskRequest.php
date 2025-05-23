<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
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
            'name' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|in:pending,in_progress,completed|',
            'due_date' => 'required|date',
            'image' => 'required|image',
            'priority' => 'required|in:low,high,medium',
            'project_id' => 'required|integer|exists:projects,id',
            'assigned_to' => 'required|integer|exists:users,id'
        ];
    }
}
