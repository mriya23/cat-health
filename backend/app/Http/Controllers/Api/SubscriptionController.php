<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    /**
     * Get user's current subscription
     */
    public function show(Request $request)
    {
        $subscription = $request->user()->subscription;

        if (!$subscription) {
            return response()->json([
                'subscription' => null,
                'plan' => 'free',
                'message' => 'No active subscription',
            ]);
        }

        return response()->json([
            'subscription' => $subscription,
        ]);
    }

    /**
     * Create or update subscription
     */
    public function store(Request $request)
    {
        $request->validate([
            'plan' => 'required|in:free,pro,clinic',
        ]);

        $prices = [
            'free' => 0,
            'pro' => 99000,
            'clinic' => 499000,
        ];

        $subscription = $request->user()->subscription()->updateOrCreate(
            ['user_id' => $request->user()->id],
            [
                'plan' => $request->plan,
                'status' => 'active',
                'starts_at' => now(),
                'ends_at' => $request->plan === 'free' ? null : now()->addMonth(),
                'price' => $prices[$request->plan],
            ]
        );

        // Update user's plan
        $request->user()->update(['plan' => $request->plan]);

        return response()->json([
            'subscription' => $subscription,
            'message' => 'Subscription updated successfully',
        ]);
    }

    /**
     * Cancel subscription
     */
    public function destroy(Request $request)
    {
        $subscription = $request->user()->subscription;

        if (!$subscription) {
            return response()->json(['message' => 'No subscription to cancel'], 404);
        }

        $subscription->update([
            'status' => 'cancelled',
        ]);

        $request->user()->update(['plan' => 'free']);

        return response()->json(['message' => 'Subscription cancelled successfully']);
    }

    /**
     * Get available plans
     */
    public function plans()
    {
        $plans = [
            [
                'name' => 'Free Trial',
                'slug' => 'free',
                'price' => 0,
                'period' => null,
                'features' => [
                    '5 scan per bulan',
                    'Hasil dasar',
                    'Riwayat 7 hari',
                    'Email support',
                ],
            ],
            [
                'name' => 'Pro',
                'slug' => 'pro',
                'price' => 99000,
                'period' => '/bulan',
                'features' => [
                    'Unlimited scan',
                    'Detailed Analisis',
                    'Riwayat unlimited',
                    'Scheduled Checkup',
                    'Priority support',
                    'Consultation Feature',
                    'Export Reports',
                    'API Access',
                ],
            ],
            [
                'name' => 'Clinic',
                'slug' => 'clinic',
                'price' => 499000,
                'period' => '/bulan',
                'features' => [
                    'Semua fitur Pro',
                    'Multi-user access',
                    'Admin dashboard',
                    'Analytics & Reports',
                    'White-label option',
                    'Dedicated support',
                    'Custom integration',
                    'SLA guarantee',
                ],
            ],
        ];

        return response()->json(['plans' => $plans]);
    }
}
