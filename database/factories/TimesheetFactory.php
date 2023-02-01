<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Timesheet>
 */
class TimesheetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => 1,
            'project_id' => rand(1, 10),
            'start_time' => now(),
            'end_time' => now()->addHours(rand(1, 10)),
            'title' => $this->faker->title,
        ];
    }
}
