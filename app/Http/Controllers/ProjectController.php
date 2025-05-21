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
use App\Traits\ApiResponse;

class ProjectController extends Controller
{
    use ApiResponse;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
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
                    ->paginate(10)
                    ->onEachSide(1);

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

        return $this->success(ProjectResource::collection($project), 'All Projects');
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

        Project::create([
            ...$request->validated(),
            'image' => $imagePath,
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        session()->flash('success', 'Project Created Successfully');
        return to_route('projects.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if(request('name')){
            $query->where('name', 'like', '%'.request('name').'%');
        }

        if(request('status')){
            $query->where('status', 'like', '%'.request('status').'%');
        }

        $task = $query->orderBy($sortField, $sortDirection)
                    ->paginate(10)
                    ->onEachSide(1);;
        return inertia('Project/Show', [
            'project' => new ProjectResource($project->load(['createdBy', 'updatedBy'])),
            'tasks' => TaskResource::collection($task)
        ]);
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
        return to_route('projects.index');
    }
}
