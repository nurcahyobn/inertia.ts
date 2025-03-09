<?php

use App\Http\Controllers;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\ActivitiesController;
use Illuminate\Support\Facades\Route;

Route::get('/', Controllers\HomeController::class)->name('home');
Route::get('about', Controllers\AboutController::class)->name('about');

Route::get('/', Controllers\HomeController::class)->name('home');
Route::get('about', Controllers\AboutController::class)->name('about');
Route::get('mahasiswa', Controllers\MahasiswaController::class)->name('mahasiswa');

Route::get('dashboard', Controllers\DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');
Route::get('products', Controllers\ProductsController::class)->middleware(['auth', 'verified'])->name('products');
Route::get('orders', OrdersController::class)->middleware(['auth', 'verified'])->name('orders');
Route::get('analytics', AnalyticsController::class)->middleware(['auth', 'verified'])->name('analytics');
Route::get('activities', ActivitiesController::class)->middleware(['auth', 'verified'])->name('activities');

Route::middleware('auth')->group(function () {
    Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/dev.php';
require __DIR__ . '/management.php';
require __DIR__ . '/more.php';
