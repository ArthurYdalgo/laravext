<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Team>
 */
class TeamFactory extends Factory
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
                /**
                 * In memory of one of the best brazilian 🇧🇷 rock bands
                 * 
                 * @see https://en.wikipedia.org/wiki/Mamonas_Assassinas
                 */
                "Mamonas Assassinas",
                
                "Avengers",
                "Jedi Order",
                "Guardians of the Galaxy",
                "Fellowship of the Ring",
                "Justice League",
                "X-Men",
                "Gryffindor",
                "Slytherin",
                "Hufflepuff",
                "Ravenclaw",
                "Power Rangers",
                "Ghostbusters",
                "Teen Titans",
                "A-Team",
                "Scooby Gang",
                "The Seven Samurai",
                "The Four Horsemen of the Apocalypse",
                "Fantastic Four",
                "Team Rocket",
                "The Incredibles",
                "The Magnificent Seven",
                "Mighty Morphin Power Rangers",
                "Ninja Turtles",
                "Fellowship of the Sun",
                "Defenders",
                "Watchmen"
            ])
        ];
    }
}
