import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Badge from '@/Components/Badge';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ auth, ticket }) {
    const handleDelete = () => {
        if (confirm('Delete this ticket?')) {
            router.delete(route('tickets.destroy', ticket.id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold text-gray-800">Ticket Details</h2>}
        >
            <Head title={ticket.title} />

            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold">{ticket.title}</h3>

                    <div className="mt-3 flex flex-wrap gap-2">
                        <Badge type="priority" value={ticket.priority} />
                        <Badge type="status" value={ticket.status} />
                        <span className="text-sm text-gray-500">{ticket.category}</span>
                    </div>

                    <p className="mt-4 whitespace-pre-wrap text-gray-700">{ticket.description}</p>

                    <div className="mt-6 flex gap-4 text-sm">
                        <Link href={route('tickets.index')} className="text-gray-600">Back</Link>
                        <Link href={route('tickets.edit', ticket.id)} className="text-yellow-600">Edit</Link>
                        <button onClick={handleDelete} className="text-red-600">Delete</button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}