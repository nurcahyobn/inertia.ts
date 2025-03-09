<?php

use App\Http\Controllers\More\AffiliatesController;
use App\Http\Controllers\More\DiscountsController;
use App\Http\Controllers\More\ShippingController;
use App\Http\Controllers\More\TaxesController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])
    ->prefix('more')
    ->name('more.')
    ->group(function () {
        Route::get('affiliates', AffiliatesController::class)->name('affiliates');
        Route::get('discounts', TaxesController::class)->name('discounts');
        Route::get('shipping', DiscountsController::class)->name('shipping');
        Route::get('taxes', ShippingController::class)->name('taxes');
    });
