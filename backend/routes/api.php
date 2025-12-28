<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\ScanController;
use App\Http\Controllers\Api\SubscriptionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/plans', [SubscriptionController::class, 'plans']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/user/update-profile', [AuthController::class, 'updateProfile']);
    Route::post('/user/update-password', [AuthController::class, 'updatePassword']);
    Route::post('/user/update-notification-preferences', [AuthController::class, 'updateNotificationPreferences']);

    // Scans
    Route::get('/scans', [ScanController::class, 'index']);
    Route::post('/scans', [ScanController::class, 'store']);
    Route::get('/scans/statistics', [ScanController::class, 'statistics']);
    Route::get('/scans/{scan}', [ScanController::class, 'show']);
    Route::delete('/scans/{scan}', [ScanController::class, 'destroy']);

    // Subscriptions
    Route::get('/subscription', [SubscriptionController::class, 'show']);
    Route::post('/subscription', [SubscriptionController::class, 'store']);
    Route::delete('/subscription', [SubscriptionController::class, 'destroy']);

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead']);
    Route::patch('/notifications/{notification}/mark-read', [NotificationController::class, 'markAsRead']);
    Route::delete('/notifications/{notification}', [NotificationController::class, 'destroy']);

    // Admin
    Route::prefix('admin')->group(function () {
        Route::get('/statistics', [App\Http\Controllers\Api\AdminController::class, 'statistics']);
        Route::get('/users', [App\Http\Controllers\Api\AdminController::class, 'users']);
        Route::get('/analytics', [App\Http\Controllers\Api\AdminController::class, 'analytics']);
    });
});
