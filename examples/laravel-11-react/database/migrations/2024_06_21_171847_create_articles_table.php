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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();

            $table->foreignIdFor(User::class);
            $table->string('short_link_code')->index()->unique();
            $table->string('slug')->index()->unique();
            $table->string('banner_url', 512)->nullable();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->mediumText('content');
            $table->string('language')->default('en')->index();
            $table->integer('reading_time')->nullable();
            $table->text('keywords')->nullable();

            $table->dateTime('published_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
