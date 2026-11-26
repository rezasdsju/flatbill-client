import AddNewFlat from "@/app/components/dashboard/flat-owner/AddNewFlat";

const AddFlatPage = () => {
    return (
        <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
            <header className="max-w-2xl space-y-2">
                <p className="text-sm font-medium text-primary">Flat Owner</p>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    Add a New Flat
                </h1>
                <p className="text-sm leading-6 text-muted-foreground">
                    Keep your property details organized. Start with the flat&apos;s
                    basic information, then add any optional room, utility, or billing
                    details.
                </p>
            </header>
            <AddNewFlat />
        </main>
    );
};

export default AddFlatPage;