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
                "Catedral de Brasília 🇧🇷",
                "Palácio da Alvorada 🇧🇷",
                "Cristo Redentor 🇧🇷",
                "Death Star",
                "Tower of Babel",
                "Starkiller Base",
                "Hogwarts Castle",
                "TARDIS",
                "Ark of the Covenant",
                "Iron Throne",
                "The Matrix",
                "The One Ring",
                "Enterprise",
                "Delorean",
                "Batcave",
                "Quidditch World Cup Stadium",
                "The Shire",
                "The Wall (Game of Thrones)",
                "Death Star II",
                "The Emerald City",
                "The Forbidden City",
                "Palace of Versailles",
                "Tower of London",
                "Temple of Doom",
                "The Hanging Gardens of Babylon",
                "The Tower of Orthanc",
                "The Sphinx",
                "The Colosseum",
                "The Great Wall of China",
                "Louvre Pyramid",
                "Statue of Liberty"
            ]),
            'description' => $this->faker->paragraph,
        ];
    }
}
