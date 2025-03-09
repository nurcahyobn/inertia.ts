<?php

namespace App\Http\Controllers\More;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AffiliatesController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return inertia('more/affiliates');
    }
}
