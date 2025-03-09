<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Management\BrandsController;
use App\Http\Controllers\Management\CustomersController;
use App\Http\Controllers\Management\CategoriesController;

Route::middleware(['auth', 'verified'])
    ->prefix('management')
    ->name('management.')
    ->group(function () {
        Route::get('customers', CustomersController::class)->name('customers');
        Route::get('categories', CategoriesController::class)->name('categories');
        Route::get('brands', BrandsController::class)->name('brands');
    });