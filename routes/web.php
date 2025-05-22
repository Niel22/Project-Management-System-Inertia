<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');



Route::get('all-projects', [ProjectController::class, 'fetchAllProjects']);
Route::get('single-project/{id}', [ProjectController::class, 'fetchSingleProject']);
Route::get('single-project/{projectId}/tasks', [ProjectController::class, 'fetchTaskByProject']);

Route::get('all-tasks', [TaskController::class, 'fetchAllTasks']);
Route::get('single-task/{id}', [TaskController::class, 'fetchSingleTask']);

Route::middleware(['auth', 'verified'])->group(function(){
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    Route::resource('projects', ProjectController::class);
    Route::resource('tasks', TaskController::class);
    Route::resource('users', UserController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
