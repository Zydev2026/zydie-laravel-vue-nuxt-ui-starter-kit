<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Auth/Login')->name('home');

Route::middleware(['auth'])->group(function (): void {
    Route::inertia('/dashboard', 'Dashboard')->name('dashboard');
    Route::inertia('/dashboard/settings', 'Dashboard/Settings')->name('dashboard.settings');
    Route::inertia('/dashboard/profile', 'Dashboard/Profile')->name('dashboard.profile');
});
