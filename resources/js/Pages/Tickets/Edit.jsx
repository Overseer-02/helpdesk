import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TicketForm from "@/Components/TicketForm";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({ auth, ticket }) {
    const { data, setData, put, processing, errors } = useForm({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        category: ticket.category,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("tickets.update", ticket.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-gray-800">
                    Edit Ticket
                </h2>
            }
        >
            <Head title="Edit Ticket" />

            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                    <TicketForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={submit}
                        submitLabel="Update Ticket"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
