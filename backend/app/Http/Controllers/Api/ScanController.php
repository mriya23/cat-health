<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Scan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ScanController extends Controller
{
    /**
     * Get all scans for authenticated user
     */
    public function index(Request $request)
    {
        $scans = $request->user()
            ->scans()
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json($scans);
    }

    /**
     * Get a specific scan
     */
    public function show(Request $request, Scan $scan)
    {
        // Ensure user owns the scan
        if ($scan->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json(['scan' => $scan]);
    }

    /**
     * Upload and analyze a cat photo
     */
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:10240',
            'cat_name' => 'nullable|string|max:255',
        ]);

        // Store the image
        $imagePath = $request->file('image')->store('scans', 'public');

        // Simulate AI Analysis (in production, this would call an AI service)
        $analysisResult = $this->simulateAIAnalysis();

        // Create the scan record
        $scan = $request->user()->scans()->create([
            'cat_name' => $request->cat_name ?? 'My Cat',
            'image_path' => $imagePath,
            'status' => $analysisResult['status'],
            'confidence' => $analysisResult['confidence'],
            'findings' => $analysisResult['findings'],
            'recommendations' => $analysisResult['recommendations'],
            'explanation' => $analysisResult['explanation'],
        ]);

        return response()->json([
            'scan' => $scan,
            'message' => 'Scan completed successfully',
        ], 201);
    }

    /**
     * Delete a scan
     */
    public function destroy(Request $request, Scan $scan)
    {
        if ($scan->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Delete the image file
        if ($scan->image_path) {
            Storage::disk('public')->delete($scan->image_path);
        }

        $scan->delete();

        return response()->json(['message' => 'Scan deleted successfully']);
    }

    /**
     * Get scan statistics for dashboard
     */
    public function statistics(Request $request)
    {
        $user = $request->user();
        
        $stats = [
            'total_scans' => $user->scans()->count(),
            'healthy' => $user->scans()->where('status', 'Healthy')->count(),
            'attention' => $user->scans()->where('status', 'Attention')->count(),
            'pending' => $user->scans()->where('status', 'Pending')->count(),
        ];

        return response()->json($stats);
    }

    /**
     * Simulate AI analysis (placeholder for actual AI integration)
     */
    private function simulateAIAnalysis(): array
    {
        $statuses = ['Healthy', 'Minor Issue', 'Attention'];
        $randomStatus = $statuses[array_rand($statuses)];
        
        $findings = [
            [
                'name' => 'Coat Condition',
                'status' => 'Good',
                'description' => 'Healthy and shiny coat'
            ],
            [
                'name' => 'Eye Health',
                'status' => 'Good',
                'description' => 'Clear eyes, no discharge'
            ],
            [
                'name' => 'Skin Condition',
                'status' => $randomStatus === 'Healthy' ? 'Good' : 'Attention',
                'description' => $randomStatus === 'Healthy' 
                    ? 'Healthy skin, no issues detected' 
                    : 'Minor dryness detected'
            ],
            [
                'name' => 'Overall Health',
                'status' => $randomStatus === 'Healthy' ? 'Good' : 'Attention',
                'description' => 'Cat appears ' . strtolower($randomStatus)
            ],
        ];

        $recommendations = [
            'Regular grooming recommended',
            'Maintain balanced diet',
            'Schedule annual vet checkup',
            'Ensure fresh water availability',
        ];

        if ($randomStatus !== 'Healthy') {
            array_unshift($recommendations, 'Consider consulting with a veterinarian');
            array_unshift($recommendations, 'Monitor for any changes in behavior');
        }

        return [
            'status' => $randomStatus,
            'confidence' => rand(85, 98),
            'findings' => $findings,
            'recommendations' => $recommendations,
            'explanation' => $randomStatus === 'Healthy'
                ? 'Berdasarkan analisis AI, kucing Anda menunjukkan kondisi kesehatan yang baik secara keseluruhan. Lanjutkan perawatan rutin dan jadwalkan pemeriksaan tahunan dengan dokter hewan.'
                : 'Berdasarkan analisis AI, terdapat beberapa area yang perlu diperhatikan. Meskipun tidak memerlukan tindakan medis segera, disarankan untuk memantau kondisi dan berkonsultasi dengan dokter hewan jika ada perubahan.',
        ];
    }
}
