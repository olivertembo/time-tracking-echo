<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $projects = Project::all();

        return Inertia::render('Dashboard', [
            'projects' => $projects,
        ]);
    }
}
