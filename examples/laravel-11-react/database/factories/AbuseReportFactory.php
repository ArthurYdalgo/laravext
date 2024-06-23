<?php

namespace Database\Factories;

use App\Models\AbuseReport;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AbuseReport>
 */
class AbuseReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ip_address' => $this->faker->ipv4,
            'type' => $this->faker->randomElement(AbuseReport::$available_types),
            'message' => $this->faker->sentence,
        ];
    }
}
