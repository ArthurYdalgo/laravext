<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence;
        return [
            'title' => $title,
            'slug' => str($title)->slug()->append(str()->random(8))->toString(),
            'description' => $this->faker->paragraph,
            'published_at' => now()->subDays(random_int(10, 365 * 5))->toDateString()
        ];
    }
}
