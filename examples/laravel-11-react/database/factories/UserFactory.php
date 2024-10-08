<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $random_skills = fake()->randomElements([
            'PHP',
            'JavaScript',
            'Python',
            'Ruby',
            'Java',
            'C#',
            'C++',
            'Go',
            'Swift',
            'Kotlin',
            'TypeScript',
            'Rust',
            'Scala',
            'Perl',
            'R',
            'Haskell',
            'Lua',
            'Laravel',
            'Vue.js',
            'React',
            'Angular',
            'Ember.js',
            'Django',
            'Flask',
            'Ruby on Rails',
            'Spring',
        ], random_int(2, 5));

        $gender = fake()->randomElement(['male', 'female']);

        $link_types = [
            'link',
            'linkedin',
            'github',
            'discord',
            'twitter',
            'facebook',
            'x-twitter',
            'youtube'
        ];

        $links = [];

        for($i = 0; $i < random_int(2, 4); $i++) {

            $link_type = fake()->randomElement($link_types);
            $links[] = [
                'type' => $link_type,
                'href' => "https://$link_type.com/" . fake()->userName(),
                'display_mode' => $link_type == 'link' ? 'short_link' : 'icon',
            ];

            unset($link_types[array_search($link_type, $link_types)]);  
        }

        return [
            'name' => fake()->firstName($gender) . " " . fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'pronouns' => $gender == 'male' ? 'he/him' : 'she/her', // or they/them, ze/zer, etc.
            'skills' => $random_skills,
            'biography' => fake()->paragraph(),
            'banner_hex_color' => fake()->hexColor(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
