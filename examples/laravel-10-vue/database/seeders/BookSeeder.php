<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Book;
use App\Models\Chapter;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $books = Book::factory(50)
            ->forAuthor(
                Author::factory()->make()->toArray()
            )
            ->hasChapters(random_int(10, 20))
            ->create();
        
            
        foreach ($books as $book) {
            $chapters = $book->chapters;
            foreach ($chapters as $chapter) {
                Comment::factory(random_int(0, 10))
                    ->forUser(
                        User::factory()->make()->toArray()
                    )
                    ->create([
                        'chapter_id' => $chapter->id
                    ]);
            }
        }
    }
}
