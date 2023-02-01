import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { TimeTracker, ManualTimeTracker } from '@/Components/TimeTracker';
import Main from '@/Components/Main';

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Track Time" />
            <Main>
            <TimeTracker />
            <ManualTimeTracker />
                
            </Main>
        </AuthenticatedLayout>
    );
}
