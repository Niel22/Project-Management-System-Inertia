<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Http\Resources\ProjectResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'due_date' => (new Carbon($this->due_date))->format('Y-m-d'),
            'status' => $this->status,
            'priority' => $this->priority,
            'image' => $this->image && !(str_starts_with($this->image, 'http')) ?
                Storage::url($this->image) : '',
            'project_id' => $this->project_id,
            'project' => new ProjectResource($this->project),
            'assigned_to' => $this->assigned_to,
            'assignedUser' => $this->assignedTo ? new UserResource($this->assignedTo) : null,
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
