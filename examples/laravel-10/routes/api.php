<?php

use App\Models\Author;
use App\Models\Book;
use App\Models\Chapter;
use App\Models\User;
use Illuminate\Support\Facades\Http;

Route::get('books', function () {
    return Book::with('author')->paginate();
})->name('api.books.index');

Route::get('books/{slug}', function ($slug) {
    $book = Book::where('slug', $slug)->with('author')->firstOrFail();
    return $book;
})->name('api.books.book.show');

Route::get('books/{book}/comments', function (Book $book) {
    return $book->comments()->with('user')->paginate();
})->name('api.books.book.comments.index');

Route::get('books/{book}/chapters', function (Book $book) {
    return $book->chapters()->paginate();
})->name('api.books.book.chapters.index');

Route::get('chapters/{chapter}', function (Chapter $chapter) {
    return $chapter;
})->name('api.chapters.chapter.show');

Route::get('authors/{author}/books', function (Author $author) {
    return $author->books()->paginate();
})->name('api.authors.author.books.book.index');

Route::get('users', function () {
    return User::paginate();
})->name('api.users.index');