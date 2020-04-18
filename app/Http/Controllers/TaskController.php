<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;

class TaskController extends Controller
{
    //
    // retrieving all the records
    public function index() {
        return Task::all();
    }

    //
    // storing a record
    public function store(Request $req) {
        return Task::create($req->all());
    }

    //
    // update
    public function update(Request $req, $id) {
        $task = Task::findOrFail($id);
        $task->update($req->all());
    }

    //
    // delete
    public function delete($id) {
        $task = Task::findOrFail($id);
        $task->delete();
        //
        return 204;
    }
}
