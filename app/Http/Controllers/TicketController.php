<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Ticket;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $tickets = Ticket::where('user_id', $request->user()->id)
            ->when($request->status, fn ($q, $status) => $q->where('status', $status))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets,
            'filters' => $request->only('status'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Tickets/Create');
    }

    public function store(StoreTicketRequest $request)
    {
        $ticket = new Ticket($request->validated());
        $ticket->user_id = $request->user()->id;
        $ticket->save();

        return redirect()->route('tickets.index')->with('success', 'Ticket created.');
    }

    public function show(Ticket $ticket)
    {
        $this->authorize('view', $ticket);

        return Inertia::render('Tickets/Show', ['ticket' => $ticket]);
    }

    public function edit(Ticket $ticket)
    {
        $this->authorize('update', $ticket);

        return Inertia::render('Tickets/Edit', ['ticket' => $ticket]);
    }

    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        $this->authorize('update', $ticket);

        $ticket->update($request->validated());

        return redirect()->route('tickets.index')->with('success', 'Ticket updated.');
    }

    public function destroy(Ticket $ticket)
    {
        $this->authorize('delete', $ticket);

        $ticket->delete();

        return redirect()->route('tickets.index')->with('success', 'Ticket deleted.');
    }
}