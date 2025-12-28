<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scan extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'cat_name',
        'image_path',
        'status',
        'confidence',
        'findings',
        'recommendations',
        'explanation',
    ];

    protected $casts = [
        'findings' => 'array',
        'recommendations' => 'array',
        'confidence' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
