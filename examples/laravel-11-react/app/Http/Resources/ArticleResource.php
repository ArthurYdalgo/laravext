<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        unset($data['bookmarks']);

        $data['has_been_bookmarked_by_user'] = $this->whenLoaded('bookmarks', function () {
            return $this->bookmarks->contains('id', user()->id);
        });

        return $data;
    }
}
