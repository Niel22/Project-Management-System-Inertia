<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Traits\ApiResponse;

class UserController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $user = User::all();

        if($user->isNotEmpty()){
            return $this->success($user, 'All Users');
        }

        return $this->error('No User Found');
    }

    public function store(StoreUserRequest $request)
    {
        //
    }

    
    public function show(User $user)
    {
        //
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        //
    }

    public function destroy(User $user)
    {
        //
    }
}
