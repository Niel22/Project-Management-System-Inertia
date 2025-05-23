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
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    use ApiResponse;
    
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

    public function show($id)
    {
        $project = Project::with(['createdBy', 'updatedBy', 'tasks'])->find($id);

        if(!empty($project)){
            return $this->success(new ProjectResource($project), 'Single Project');
        }

        return $this->error('Project Not Found');
    }

    public function update(UpdateProjectRequest $request, Project $project)
    {
        if ($request->hasFile('image')) {
            $request['image'] = $request->file('image')->store('project/' . Str::random(), 'public');

            if($project->image){
                Storage::disk('public')->delete($project->image);
            }
        }


        $result = $project->update([
            ...$request->validated(),
            'updated_by' => Auth::id(),
        ]);

        return $result ? $this->success([$request], 'Project Updated Successfully') : $this->error([], 'Problem Updating Project');
    }
    

    public function destroy(Project $project)
    {
        if($project->image){
            Storage::disk('public')->delete($project->image);
        }
        $project->delete();
        session()->flash('success', 'Project Deleted Successfully');
        return $this->success([], 'Project Deleted');
    }
}
