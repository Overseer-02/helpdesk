import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

const selects = {
    priority: ["Low", "Medium", "High", "Urgent"],
    status: ["Open", "In Progress", "Resolved", "Closed"],
    category: ["Hardware", "Software", "Network", "Account", "Other"],
};

export default function TicketForm({
    data,
    setData,
    errors,
    processing,
    onSubmit,
    submitLabel,
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <InputLabel htmlFor="title" value="Title" />
                <TextInput
                    id="title"
                    className="mt-1 block w-full"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                />
                <InputError message={errors.title} className="mt-1" />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Description" />
                <textarea
                    id="description"
                    rows="5"
                    className="mt-1 block w-full rounded-md border-gray-300"
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-1" />
            </div>

            {Object.entries(selects).map(([field, options]) => (
                <div key={field}>
                    <InputLabel
                        htmlFor={field}
                        value={field.charAt(0).toUpperCase() + field.slice(1)}
                    />
                    <select
                        id={field}
                        className="mt-1 block w-full rounded-md border-gray-300"
                        value={data[field]}
                        onChange={(e) => setData(field, e.target.value)}
                    >
                        <option value="">Select {field}</option>
                        {options.map((o) => (
                            <option key={o} value={o}>
                                {o}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors[field]} className="mt-1" />
                </div>
            ))}

            <button
                type="submit"
                disabled={processing}
                className="rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
                {processing ? "Saving..." : submitLabel}
            </button>
        </form>
    );
}
