<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTimesheetRequest;
use App\Http\Requests\UpdateTimesheetRequest;
use App\Models\Timesheet;
use Carbon\Carbon;
use Carbon\CarbonInterval;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TimesheetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $startTime = $request->start_time ? $request->start_time : null;
        $endTime = $request->end_time ? $request->end_time : null;

        $timesheets = Timesheet::select(['*'])
        ->with(['project'])
        ->where('user_id', auth()->user()->id)
            ->when($startTime, function ($query, $startTime) {
                return $query->where('start_time', '>=', Carbon::parse($startTime));
            })
            ->when($endTime, function ($query, $endTime) {
                return $query->where('end_time', '<=', Carbon::parse($endTime));
            })
            ->get();

        $totalDuration = $timesheets->reduce(function ($carry, $item) {
            $date1 = Carbon::parse($item->start_time);
            $date2 = Carbon::parse($item->end_time);
            $diff = $date2->diffInSeconds($date1);
            $carry += $diff;
            return $carry;
        }, 0);
        
        $totalDurationInHours =  floor($totalDuration / 3600);

        return Inertia::render('Timesheets', [
            'timesheets' => $timesheets,
            'startTime' => $startTime,
            'endTime' => $endTime,
            'totalDuration' => $totalDurationInHours,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTimesheetRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTimesheetRequest $request)
    {
        $timesheet = new Timesheet(array(
            'user_id' => auth()->user()->id,
            'project_id' => $request->project_id,
            'title' => $request->title,
            'start_time' => Carbon::parse($request->start_time),
            'end_time' => Carbon::parse($request->end_time),
        ));
        $timesheet->save();

        return Inertia::render('Timesheets', [
            'timesheets' => Timesheet::where('user_id', auth()->user()->id)->get(),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Timesheet  $timesheet
     * @return \Illuminate\Http\Response
     */
    public function show(Timesheet $timesheet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Timesheet  $timesheet
     * @return \Illuminate\Http\Response
     */
    public function edit(Timesheet $timesheet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTimesheetRequest  $request
     * @param  \App\Models\Timesheet  $timesheet
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTimesheetRequest $request, Timesheet $timesheet)
    {
        $timesheet->title = $request->title;
        $timesheet->start_time = Carbon::parse($request->start_time);
        $timesheet->end_time = Carbon::parse($request->end_time);
        $timesheet->save();

        return redirect()->route('timesheets.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Timesheet  $timesheet
     * @return \Illuminate\Http\Response
     */
    public function destroy(Timesheet $timesheet)
    {
        //
    }
}
