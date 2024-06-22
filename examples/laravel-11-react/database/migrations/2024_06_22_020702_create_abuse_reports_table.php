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
        Schema::create('abuse_reports', function (Blueprint $table) {
            $table->id();

            $table->morphs('reportable');
            $table->foreignIdFor(User::class)->nullable()->constrained()->nullOnDelete();
            $table->string('ip_address')->index();
            $table->string('type')->index();
            $table->text('message');
            $table->text('reply')->nullable();

            $table->dateTime('replied_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abuse_reports');
    }
};
