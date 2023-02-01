<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timesheet extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'start_time',
        'end_time',
        'user_id',
        'project_id',
    ];

    protected $hidden = [
        'user_id',
    ];

    protected $appends = [
        'duration',
    ];

    public function getDurationAttribute()
    {
        $date1 = new \DateTime($this->start_time);
        $date2 = new \DateTime($this->end_time);
        
        $diff = $date2->diff($date1);
        return $diff->format('%H:%I:%S');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id' , 'id');
    }

}
