<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('follows', function (Blueprint $table) {
            $table->foreignIdFor(User::class, 'follower_id')->constrained('users')->cascadeOnDelete();
            $table->foreignIdFor(User::class, 'followee_id')->constrained('users')->cascadeOnDelete();

            $table->dateTime('started_at')->useCurrent();
            $table->dateTime('ended_at')->nullable();

            $table->dateTime('created_at')->useCurrent();
            $table->dateTime('updated_at')->useCurrentOnUpdate();

            $table->primary(['follower_id', 'followee_id']);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('follows');
    }
};
