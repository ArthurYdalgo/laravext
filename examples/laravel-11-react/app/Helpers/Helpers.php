<?php

if (!function_exists('generateTextedImage')) {
    function generateTextedImage($text, $width = 100, $height = 100, $background_color = [255, 255, 255], $text_color = [0, 0, 0])
    {
        $image = imagecreatetruecolor($width, $height);
        $bgColor = imagecolorallocate($image, $background_color[0], $background_color[1], $background_color[2]);
        imagefill($image, 0, 0, $bgColor);
        $textColor = imagecolorallocate($image, $text_color[0], $text_color[1], $text_color[2]);

        $textX = intval(($width - imagefontwidth(5) * strlen($text)) / 2); // Using font index 5
        $textY = intval(($height - imagefontheight(5)) / 2);

        imagestring($image, 5, $textX, $textY, $text, $textColor); // 5 is the font index for default GD font

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
