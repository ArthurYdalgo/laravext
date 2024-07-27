<?php

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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('username')->index()->unique()->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('theme')->default('light');
            $table->boolean('privacy')->default(0);
            $table->string('locale')->default('en');
            $table->string('avatar_url', 512)->nullable();
            $table->string('banner_hex_color', 10)->nullable();
            $table->text('biography')->nullable();
            $table->string('education')->nullable();
            $table->string('work')->nullable();
            $table->string("location")->nullable();
            $table->json('links')->nullable();
            $table->string('password');
            $table->rememberToken();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
