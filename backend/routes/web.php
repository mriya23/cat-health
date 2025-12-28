<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'name' => 'Cat Health AI API',
        'version' => '1.0.0',
        'documentation' => '/api/docs',
    ]);
});
