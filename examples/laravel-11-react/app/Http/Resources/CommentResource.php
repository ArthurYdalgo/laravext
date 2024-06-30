<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        $data['user'] = $this->whenLoaded('user', function(){
            return $this->user->only(['id', 'name', 'email']);
        });

        $data['content'] = $this->deleted_at ? '-- ' . __('This comment was deleted') . ' ' . $this->deleted_at->diffForHumans() . ' --' : $data['content'];

        return $data;
    }
}
