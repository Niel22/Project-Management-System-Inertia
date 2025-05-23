<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

// Route::get('single-project/{projectId}/tasks', [ProjectController::class, 'fetchTaskByProject']);

Route::middleware(['web', 'auth', 'verified'])->group(function(){
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    Route::inertia('/projects', 'Project/Index')->name('projects.index');
    Route::inertia('/projects/create', 'Project/Create')->name('projects.create');
    Route::get('/projects/{project}', function ($id) {
        return inertia('Project/Show', ['id' => $id]);
    })->name('projects.show');
    Route::get('/projects/{project}/edit', function ($id) {
        return inertia('Project/Edit', ['id' => $id]);
    })->name('projects.edit');

    // Task
    Route::inertia('tasks', 'Task/Index')->name('tasks.index');
    Route::inertia('tasks/create', 'Task/Create')->name('tasks.create');
    Route::get('/tasks/{task}', function ($id) {
        return inertia('Task/Show', ['id' => $id]);
    })->name('tasks.show');
    Route::get('/tasks/{task}/edit', function ($id) {
        return inertia('Task/Edit', ['id' => $id]);
    })->name('tasks.edit');
    
    
});

Route::prefix('api')->middleware('api')->group(function(){
    Route::apiResource('project', ProjectController::class);
    Route::get('project/{id}/tasks', [ProjectController::class, 'fetchTaskByProject']);
    Route::apiResource('task', TaskController::class);
    Route::apiResource('user', UserController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
