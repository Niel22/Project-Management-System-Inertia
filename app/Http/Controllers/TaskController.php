<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Traits\ApiResponse;
use Illuminate\Support\Str;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\TaskCollection;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
    use ApiResponse;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::with(['createdBy', 'updatedBy', 'project', 'assignedTo']);

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if(request('name')){
            $query->where('name', 'like', '%'.request('name').'%');
        }

        if(request('status')){
            $query->where('status', 'like', '%'.request('status').'%');
        }

        if(request('project_name')){
            $name = request('project_name');
            $query->whereHas('project', function($query) use ($name){
                $query->where('name', 'like', '%'.$name.'%');
            });
        }

        $task = $query
                    ->orderBy($sortField, $sortDirection)
                    ->paginate(10);
        return $this->success(new TaskCollection($task), 'All Task');
    }


    public function store(StoreTaskRequest $request)
    {
        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('tasks/' . Str::random(), 'public');
        }

        $task = Task::create([
            ...$request->validated(),
            'image' => $imagePath,
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        return $task ? $this->success([], 'Task Created Successfully') : $this->error([], 'Problem Creating Task');
    }

    public function show(Task $task)
    {
        //
    }

    public function edit(Task $task)
    {
        //
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    public function destroy(Task $task)
    {
        //
    }
}
