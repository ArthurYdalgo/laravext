<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Developer>
 */
class DeveloperFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->name;
        return [
            'username' => fake()->userName(),
            'name' => $name,
            'email' => $this->faker->unique()->safeEmail,
            'role' => $this->faker->randomElement(['backend', 'designer', 'frontend', 'fullstack', 'qa', 'devops']),
        ];
    }
}
