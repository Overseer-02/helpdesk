import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Badge from "@/Components/Badge";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ auth, tickets, filters }) {
    const handleDelete = (id) => {
        if (confirm("Delete this ticket?")) {
            router.delete(route("tickets.destroy", id));
        }
    };

    const handleFilter = (e) => {
        router.get(
            route("tickets.index"),
            { status: e.target.value },
            { preserveState: true, replace: true }
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    My Tickets
                </h2>
            }
        >
            <Head title="My Tickets" />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <select
                        value={filters.status ?? ""}
                        onChange={handleFilter}
                        className="rounded-md border-gray-300 text-sm"
                    >
                        <option value="">All statuses</option>
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                        <option>Closed</option>
                    </select>
                    <Link
                        href={route("tickets.create")}
                        className="rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white"
                    >
                        New Ticket
                    </Link>
                </div>

                {tickets.data.length === 0 ? (
                    <div className="rounded-lg bg-white p-10 text-center shadow-sm">
                        <p className="text-gray-600">
                            You have no tickets yet.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {tickets.data.map((t) => (
                            <div
                                key={t.id}
                                className="flex flex-col gap-3 rounded-lg bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between"
                            >
                                <div>
                                    <p className="font-semibold">{t.title}</p>
                                    <p className="text-sm text-gray-500">
                                        {t.category}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Badge type="priority" value={t.priority} />
                                    <Badge type="status" value={t.status} />
                                </div>
                                <div className="flex gap-4 text-sm">
                                    <Link
                                        href={route("tickets.show", t.id)}
                                        className="text-indigo-600"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        href={route("tickets.edit", t.id)}
                                        className="text-yellow-600"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(t.id)}
                                        className="text-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="mt-6 flex items-center justify-center gap-3 text-sm">
                            {tickets.prev_page_url ? (
                                <Link
                                    href={tickets.prev_page_url}
                                    className="rounded border bg-white px-3 py-1"
                                >
                                    Previous
                                </Link>
                            ) : (
                                <span className="rounded border px-3 py-1 text-gray-400">
                                    Previous
                                </span>
                            )}
                            <span>
                                Page {tickets.current_page} of{" "}
                                {tickets.last_page}
                            </span>
                            {tickets.next_page_url ? (
                                <Link
                                    href={tickets.next_page_url}
                                    className="rounded border bg-white px-3 py-1"
                                >
                                    Next
                                </Link>
                            ) : (
                                <span className="rounded border px-3 py-1 text-gray-400">
                                    Next
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
