<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Traits\ApiResponse;

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

        $project = $query
                    ->orderBy($sortField, $sortDirection)
                    ->paginate(10)
                    ->onEachSide(1);

        return inertia('Task/Index', [
            'tasks' => TaskResource::collection($project),
            'queryParams' => request()->query() ?? null
        ]);
    }

    public function fetchAllTasks(){
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

    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
