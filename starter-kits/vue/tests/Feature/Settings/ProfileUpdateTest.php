<?php

namespace Tests\Feature\Settings;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_page_is_displayed()
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/settings/profile');

        $response->assertOk();
    }

    public function test_profile_information_can_be_updated()
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->patch('/api/settings/profile', [
                'name' => 'Test User',
                'email' => 'test@example.com',
            ], headers: [
                'Accept' => 'application/json',
            ]);

        $response->assertSuccessful();

        $user->refresh();

        $this->assertSame('Test User', $user->name);
        $this->assertSame('test@example.com', $user->email);
        $this->assertNull($user->email_verified_at);
    }

    public function test_email_verification_status_is_unchanged_when_the_email_address_is_unchanged()
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->patch('/api/settings/profile', [
                'name' => 'Test User',
                'email' => $user->email,
            ], headers: [
                'Accept' => 'application/json',
            ]);

        $response->assertSuccessful();

        $this->assertNotNull($user->refresh()->email_verified_at);
    }

    public function test_user_can_delete_their_account()
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->delete('/api/settings/profile', [
                'password' => 'password',
            ], headers: [
                'Accept' => 'application/json',
            ]);

        $response->assertSuccessful();

        $this->assertNull($user->fresh());
    }

    public function test_correct_password_must_be_provided_to_delete_account()
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->from('/settings/profile')
            ->delete('/api/settings/profile', [
                'password' => 'wrong-password',
            ], headers: [
                'Accept' => 'application/json',
            ]);

        $response->assertStatus(422);

        $this->assertNotNull($user->fresh());
    }
}
