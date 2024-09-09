# Laravext Example - Laravel 11 with React

⚠️This example is still under development, so some pages are fully finished⚠️

## Introduction

This is an example of a Laravel 11 application with React that makes use of the [Laravext package](laravext.dev).

## Instructions

I'm assuming you have PHP (8.2 or later), Composer and Node.js installed on your machine, and also that you have some kind of database server running (like MySQL or SQLite), that you have created a `.env` file based on the `.env.example` file and set it up with your database credentials.

```bash
npm install
npm run build

composer install

php artisan migrate --seed
php artisan serve # or use Laravel Herd, or whatever you prefer
```

You should now be able to access the application at [http://localhost:8000](http://localhost:8000).