<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                "Death Star",
                "Tower of Babel",
                "Starkiller Base",
                "Hogwarts Castle",
                "The TARDIS",
                "The Ark of the Covenant",
                "The Iron Throne",
                "The Matrix",
                "The One Ring",
                "The Enterprise",
                "The Delorean",
                "The Batcave",
                "The Quidditch World Cup Stadium",
                "The Shire",
                "The Wall (Game of Thrones)",
                "The Death Star II",
                "The Lighthouse (Annihilation)",
                "The Emerald City",
                "The Forbidden City",
                "The Palace of Versailles",
                "The Tower of London",
                "The Temple of Doom",
                "The Hanging Gardens of Babylon",
                "The Tower of Orthanc",
                "The Sphinx",
                "The Colosseum",
                "The Great Wall of China",
                "The Louvre Pyramid",
                "The Statue of Liberty"
            ]),
            'description' => $this->faker->paragraph,
        ];
    }
}
