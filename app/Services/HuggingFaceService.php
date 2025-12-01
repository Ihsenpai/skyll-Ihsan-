<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class HuggingFaceService
{
    private string $apiKey;
    private string $model;
    private string $apiUrl = 'https://api-inference.huggingface.co/models/';

    public function __construct()
    {
        $this->apiKey = config('services.huggingface.api_key');
        $this->model = config('services.huggingface.model', 'mistralai/Mixtral-8x7B-Instruct-v0.1');
    }

    /**
     * Generate AI feedback for simulation results
     */
    public function generateFeedback(array $simulationData): ?string
    {
        try {
            $prompt = $this->buildFeedbackPrompt($simulationData);
            
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
            ])->timeout(30)->post($this->apiUrl . $this->model, [
                'inputs' => $prompt,
                'parameters' => [
                    'max_new_tokens' => 500,
                    'temperature' => 0.7,
                    'top_p' => 0.9,
                    'return_full_text' => false,
                ],
            ]);

            if ($response->successful()) {
                $result = $response->json();
                
                if (isset($result[0]['generated_text'])) {
                    return $result[0]['generated_text'];
                }
                
                return $this->extractGeneratedText($result);
            }

            Log::error('Hugging Face API error', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return $this->getFallbackFeedback($simulationData);

        } catch (\Exception $e) {
            Log::error('Hugging Face service exception', [
                'message' => $e->getMessage(),
            ]);

            return $this->getFallbackFeedback($simulationData);
        }
    }

    /**
     * Build prompt for AI feedback
     */
    private function buildFeedbackPrompt(array $data): string
    {
        $professionName = $data['profession_name'] ?? 'Unknown';
        $score = $data['completion_percentage'] ?? 0;
        $correctChoices = $data['correct_choices'] ?? 0;
        $totalChoices = $data['total_choices'] ?? 0;
        $skillBreakdown = $data['skill_breakdown'] ?? [];

        $skillText = '';
        foreach ($skillBreakdown as $skill => $points) {
            $skillText .= "- {$skill}: {$points} points\n";
        }

        return <<<PROMPT
You are a professional career coach providing personalized feedback for a {$professionName} simulation.

Performance Summary:
- Overall Score: {$score}%
- Correct Decisions: {$correctChoices}/{$totalChoices}

Skill Breakdown:
{$skillText}

Please provide:
1. A brief assessment of their performance (2-3 sentences)
2. Key strengths demonstrated
3. Areas for improvement
4. One specific actionable tip to improve

Keep the feedback encouraging, professional, and under 200 words.
PROMPT;
    }

    /**
     * Extract generated text from various response formats
     */
    private function extractGeneratedText($result): ?string
    {
        if (is_array($result)) {
            if (isset($result['generated_text'])) {
                return $result['generated_text'];
            }
            
            if (isset($result[0]) && is_array($result[0])) {
                if (isset($result[0]['generated_text'])) {
                    return $result[0]['generated_text'];
                }
            }
        }

        return null;
    }

    /**
     * Provide fallback feedback when AI is unavailable
     */
    private function getFallbackFeedback(array $data): string
    {
        $score = $data['completion_percentage'] ?? 0;
        $professionName = $data['profession_name'] ?? 'this profession';

        if ($score >= 90) {
            return "Outstanding performance! You've demonstrated excellent decision-making skills in {$professionName}. Your choices show strong understanding of the key competencies required. Keep up the excellent work and continue to build on these strengths.";
        } elseif ($score >= 75) {
            return "Great work! You've shown solid understanding of {$professionName} scenarios. Your decision-making is on the right track. Focus on refining your approach to the more challenging situations to reach the next level.";
        } elseif ($score >= 60) {
            return "Good effort! You've passed the simulation with a decent understanding of {$professionName}. Review the scenarios where you could improve, and practice identifying the key factors in each decision.";
        } else {
            return "Thanks for completing the simulation. This is a learning opportunity! Review the correct choices and their explanations carefully. Consider retrying the simulation to improve your understanding of {$professionName} decision-making.";
        }
    }

    /**
     * Generate career advice based on profession
     */
    public function generateCareerAdvice(string $professionName): ?string
    {
        try {
            $prompt = "Provide 3 brief tips for someone aspiring to work as a {$professionName}. Keep it under 100 words.";
            
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $this->apiKey,
            ])->timeout(20)->post($this->apiUrl . $this->model, [
                'inputs' => $prompt,
                'parameters' => [
                    'max_new_tokens' => 200,
                    'temperature' => 0.7,
                ],
            ]);

            if ($response->successful()) {
                $result = $response->json();
                return $this->extractGeneratedText($result);
            }

            return null;

        } catch (\Exception $e) {
            Log::error('Career advice generation failed', [
                'message' => $e->getMessage(),
            ]);
            return null;
        }
    }
}
