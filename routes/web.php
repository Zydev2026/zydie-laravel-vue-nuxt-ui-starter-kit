<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'auth/Login')->name('home');

Route::middleware(['auth'])->group(function (): void {
    Route::inertia('/dashboard', 'Dashboard')->name('dashboard');
});
