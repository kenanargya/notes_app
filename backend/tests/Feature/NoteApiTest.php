<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Note;

class NoteApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test unauthenticated users cannot access notes API.
     */
    public function test_unauthenticated_user_cannot_access_notes()
    {
        $response = $this->getJson('/api/notes');
        $response->assertStatus(401);
    }

    /**
     * Test a user can retrieve only their own notes.
     */
    public function test_user_can_get_their_own_notes()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        // Create 3 notes for user 1
        Note::factory()->count(3)->create(['user_id' => $user1->id]);
        
        // Create 2 notes for user 2
        Note::factory()->count(2)->create(['user_id' => $user2->id]);

        $response = $this->actingAs($user1)->getJson('/api/notes');

        $response->assertStatus(200)
                 ->assertJsonCount(3, 'data'); // Should only see 3 notes
    }

    /**
     * Test a user can create a valid note.
     */
    public function test_user_can_create_a_note()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/notes', [
            'title'   => 'My New Note',
            'content' => 'This is the content of my new note.',
        ]);

        $response->assertStatus(201)
                 ->assertJsonPath('data.title', 'My New Note');

        $this->assertDatabaseHas('notes', [
            'title'   => 'My New Note',
            'user_id' => $user->id,
        ]);
    }

    /**
     * Test note creation validation rules.
     */
    public function test_note_creation_requires_title_and_content()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->postJson('/api/notes', []);

        $response->assertStatus(422)
                 ->assertJsonValidationErrors(['title', 'content']);
    }

    /**
     * Test a user can update their own note.
     */
    public function test_user_can_update_their_own_note()
    {
        $user = User::factory()->create();
        $note = Note::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->putJson('/api/notes/' . $note->id, [
            'title'   => 'Updated Title',
            'content' => 'Updated Content',
        ]);

        $response->assertStatus(200)
                 ->assertJsonPath('data.title', 'Updated Title');

        $this->assertDatabaseHas('notes', [
            'id'    => $note->id,
            'title' => 'Updated Title',
        ]);
    }

    /**
     * Test a user cannot update someone else's note.
     */
    public function test_user_cannot_update_other_users_note()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $note  = Note::factory()->create(['user_id' => $user2->id]);

        $response = $this->actingAs($user1)->putJson('/api/notes/' . $note->id, [
            'title'   => 'Hacked Title',
            'content' => 'Hacked Content',
        ]);

        // Should return 404 because of where('user_id', auth()->id())->firstOrFail()
        $response->assertStatus(404);
        
        $this->assertDatabaseMissing('notes', [
            'id'    => $note->id,
            'title' => 'Hacked Title',
        ]);
    }

    /**
     * Test a user can delete their own note.
     */
    public function test_user_can_delete_their_own_note()
    {
        $user = User::factory()->create();
        $note = Note::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->deleteJson('/api/notes/' . $note->id);

        $response->assertStatus(200);
        $this->assertDatabaseMissing('notes', ['id' => $note->id]);
    }
}
