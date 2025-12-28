<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Scan;
use App\Models\User;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    /**
     * Get admin dashboard statistics
     */
    public function statistics()
    {
        // For demo purposes, we'll calculate real stats where possible and simulate others
        // In a real app, you'd want to cache these heavy queries
        
        $stats = [
            'total_users' => [
                'value' => User::count(),
                'change' => '+12%', // Simulated
                'label' => 'Total Users'
            ],
            'total_scans' => [
                'value' => Scan::count(),
                'change' => '+8%', // Simulated
                'label' => 'Total Scans'
            ],
            'revenue' => [
                'value' => 'Rp ' . number_format(Subscription::where('status', 'active')->sum('price'), 0, ',', '.'),
                'change' => '+15%', // Simulated
                'label' => 'Revenue'
            ],
            'active_subs' => [
                'value' => Subscription::where('status', 'active')->count(),
                'change' => '+5%', // Simulated
                'label' => 'Active Subs'
            ]
        ];

        return response()->json($stats);
    }

    /**
     * Get recent users
     */
    public function users(Request $request)
    {
        $users = User::with('subscription')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'plan' => $user->plan,
                    'date' => $user->created_at->format('M d, Y'),
                ];
            });

        return response()->json($users);
    }

    /**
     * Get analytics data
     */
    public function analytics()
    {
        // Simulated analytics data
        return response()->json([
            [
                'name' => 'User Profiles',
                'value' => '89%',
                'description' => 'Profile completion rate'
            ],
            [
                'name' => 'Scan Ratio',
                'value' => '4.2',
                'description' => 'Average scans per user'
            ],
            [
                'name' => 'Retention',
                'value' => '78%',
                'description' => 'Monthly retention rate'
            ]
        ]);
    }
}
