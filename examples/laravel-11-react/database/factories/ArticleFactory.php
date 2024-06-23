<?php

namespace Database\Factories;

use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Lottery;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'subtitle' => $this->faker->sentence(),
            'short_link_code' => $this->faker->unique()->slug(),
            'language' => $this->faker->randomElement(['en', 'pt']),
            'reading_time' => $this->faker->numberBetween(5, 30),
            'keywords' => Tag::all()->random($this->faker->numberBetween(5,10))->pluck('slug')->toArray(),
            'published_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
