<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('timesheets', function (Blueprint $table) {
            $table->id();
            $table->foreignId(column: 'user_id')->nullable()->constrained(table: 'users');
            $table->foreignId(column: 'project_id')->nullable()->constrained(table: 'projects');
            $table->string(column: 'title');
            $table->dateTime(column: 'start_time');
            $table->dateTime(column: 'end_time');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('timesheets');
    }
};
