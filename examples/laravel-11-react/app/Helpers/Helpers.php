<?php

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Laravel\Prompts\Output\ConsoleOutput;

if (!function_exists('generateTextedImage')) {
    function generateTextedImage($text, $width = 100, $height = 100, $background_color = [255, 255, 255], $text_color = [0, 0, 0], $font_path = null, $font_size = 12)
    {
        if (is_null($font_path)) {
            $font_path = resource_path('fonts/Brice-Bold.ttf'); // Provide a default font path
        }

        $image = imagecreatetruecolor($width, $height);
        $bgColor = imagecolorallocate($image, $background_color[0], $background_color[1], $background_color[2]);
        imagefill($image, 0, 0, $bgColor);
        $textColor = imagecolorallocate($image, $text_color[0], $text_color[1], $text_color[2]);

        // Calculate the text box dimensions
        $text_box = imagettfbbox($font_size, 0, $font_path, $text);

        // Calculate the coordinates to center the text
        $textX = intval(($width - ($text_box[2] - $text_box[0])) / 2);
        $textY = intval(($height - ($text_box[1] - $text_box[7])) / 2) + $font_size;

        imagettftext($image, $font_size, 0, $textX, $textY, $textColor, $font_path, $text);

        // Save the image to a temporary file
        $tempFilePath = tempnam(sys_get_temp_dir(), 'image');
        imagepng($image, $tempFilePath); // You can change to imagejpeg or imagegif if needed

        imagedestroy($image);

        // Read the temporary file contents into $bytes
        $bytes = file_get_contents($tempFilePath);

        // Delete the temporary file
        unlink($tempFilePath);

        return $bytes;
    }
}

if (!function_exists('getMimeFromBinary')) {
    function getMimeFromBinary($binary_content, $extension_only = false)
    {
        $finfo = new finfo(FILEINFO_MIME_TYPE);

        $mime = $finfo->buffer($binary_content);

        if (!$extension_only) {
            return $mime;
        }

        $extension = explode('/', $mime)[1];

        if ($extension == 'plain') {
            return 'txt';
        }

        return $extension;
    }
}

if (!function_exists('scoutIsAvailable')) {
    function scoutIsAvailable()
    {
        try {
            $status = Cache::remember('scout_status', 60, function () {
                return Http::get(config('scout.meilisearch.host') . "/health")->json()['status'] ?? 'unavailable';
            });

            return $status === 'available';
        } catch (\Throwable $th) {
            report("Scout is not available.");
            return null;
        }
    }
}

if (!function_exists('scriptStripper')) {
    /**
     * Remove script tags from the input
     * 
     * @see https://laracasts.com/discuss/channels/laravel/how-to-remove-script-tags-from-the-markdown-input-by-the-user
     */
    function scriptStripper($input)
    {
        return preg_replace('#<script(.*?)>(.*?)</script>#is', '', $input);
    }
}

if (!function_exists('getAverageColorFromImageBinary')) {
    function getAverageColorFromImageBinary($binary_content)
    {
        $image = imagecreatefromstring($binary_content);

        $width = imagesx($image);
        $height = imagesy($image);

        $r = $g = $b = 0;

        for ($x = 0; $x < $width; $x++) {
            for ($y = 0; $y < $height; $y++) {
                $rgb = imagecolorat($image, $x, $y);
                $r += ($rgb >> 16) & 0xFF;
                $g += ($rgb >> 8) & 0xFF;
                $b += $rgb & 0xFF;
            }
        }

        $total = $width * $height;

        $r = round($r / $total);
        $g = round($g / $total);
        $b = round($b / $total);

        // return hex
        return sprintf("#%02x%02x%02x", $r, $g, $b);
    }
}

if (!function_exists('user')) {
    /**
     * Get the authenticated user
     * 
     * @return \App\Models\User|null
     */
    function user()
    {
        return auth()->user();
    }
}

if (!function_exists('line')) {
    function line($string, $style = 'info')
    {
        $output = new ConsoleOutput();

        $styled = "<$style>  $string</$style>";

        $output->writeln($styled);
    }
}
