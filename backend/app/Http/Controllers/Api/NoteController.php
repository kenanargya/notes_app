<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNoteRequest;
use App\Http\Requests\UpdateNoteRequest;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class NoteController extends Controller
{
    /**
     * Display a listing of the authenticated user's notes.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $notes = $request->user()
            ->notes()
            ->latest()
            ->paginate(6);

        return NoteResource::collection($notes);
    }

    /**
     * Store a newly created note.
     */
    public function store(StoreNoteRequest $request): JsonResponse
    {
        $note = $request->user()->notes()->create($request->validated());

        return (new NoteResource($note))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified note.
     */
    public function show(Request $request, Note $note): NoteResource
    {
        // Ensure the note belongs to the authenticated user
        $this->authorizeNote($request, $note);

        return new NoteResource($note);
    }

    /**
     * Update the specified note.
     */
    public function update(UpdateNoteRequest $request, Note $note): NoteResource
    {
        // Ensure the note belongs to the authenticated user
        $this->authorizeNote($request, $note);

        $note->update($request->validated());

        return new NoteResource($note);
    }

    /**
     * Remove the specified note.
     */
    public function destroy(Request $request, Note $note): JsonResponse
    {
        // Ensure the note belongs to the authenticated user
        $this->authorizeNote($request, $note);

        $note->delete();

        return response()->json([
            'message' => 'Note deleted successfully.',
        ]);
    }

    /**
     * Ensure the note belongs to the authenticated user.
     */
    private function authorizeNote(Request $request, Note $note): void
    {
        if ($note->user_id !== $request->user()->id) {
            throw new AccessDeniedHttpException('You are not authorized to access this note.');
        }
    }
}
