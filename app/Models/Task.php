<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'due_date',
        'image',
        'status',
        'priority',
        'assigned_to',
        'project_id',
        'created_by',
        'updated_by'
    ];

    public function project(){
        return $this->belongsTo(Project::class);
    }

    public function createdBy(){
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy(){
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function assignedTo(){
        return $this->belongsTo(User::class, 'assigned_to');
    }
    
}
