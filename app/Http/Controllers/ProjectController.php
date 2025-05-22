<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Project;
use Illuminate\Support\Str;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ProjectResource;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectCollection;
use App\Http\Resources\TaskCollection;
use App\Traits\ApiResponse;

class ProjectController extends Controller
{
    use ApiResponse;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Project/Index');
    }

    public function fetchAllProjects(){
        $query = Project::with(['createdBy', 'updatedBy']);

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if(request('name')){
            $query->where('name', 'like', '%'.request('name').'%');
        }

        if(request('status')){
            $query->where('status', 'like', '%'.request('status').'%');
        }

        $project = $query
                    ->orderBy($sortField, $sortDirection)
                    ->paginate(10);

        return $this->success(new ProjectCollection($project), 'All Projects');
    }
    

    public function fetchTaskByProject($projectId){
        $query = Task::with(['createdBy', 'updatedBy', 'project', 'assignedTo'])->where('project_id', $projectId);

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

        return $this->success(new TaskCollection($task), 'All Task Under This Project');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('project/' . Str::random(), 'public');
        }

        $project = Project::create([
            ...$request->validated(),
            'image' => $imagePath,
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        return $project ? $this->success([], 'Project Created Successfully') : $this->error([], 'Problem Creating Project');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return inertia('Project/Show', [
            'id' => $id
        ]);
    }

    public function fetchSingleProject($id){
        $project = Project::with(['createdBy', 'updatedBy', 'tasks'])->find($id);

        if(!empty($project)){
            return $this->success(new ProjectResource($project), 'Single Project');
        }

        return $this->error('Project Not Found');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();
        session()->flash('success', 'Project Deleted Successfully');
        return $this->success([], 'Project Deleted');
    }
}
