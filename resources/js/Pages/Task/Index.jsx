import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import TasksTable from "./TasksTable";
import { useFetchTasks } from "@/hooks/useTasks";
import { useEffect, useState } from "react";

export default function index(){

    const [currentPage, setCurrentPage] = useState(1);
    const [queryParams, setQueryParams] = useState({});
    const {flash} = usePage().props;
    const [flashMessage, setFlashMessage] = useState(flash);

    const {data: tasks, isLoading, refetch} = useFetchTasks({...queryParams, page: currentPage});

    useEffect(() => {
        refetch();
    }, [queryParams, currentPage]);

    const searchFieldChange = (name, value) => {
        setQueryParams(prev => {
            const updated = { ...prev };
            if (value) {
                updated[name] = value;
            } else {
                delete updated[name];
            }
            return updated;
        });
    };


    const onKeyPress = (name, e) => {
        if(e.key !== 'Enter') return;

        searchFieldChange(name, e.target.value);
    }

    const sortChanged = (name) => {
        setQueryParams(prev => {
            const updated = { ...prev };
            if (name === updated.sort_field) {
                updated.sort_direction = updated.sort_direction === 'asc' ? 'desc' : 'asc';
            } else {
                updated.sort_field = name;
                updated.sort_direction = 'asc';
            }
            return updated;
        });
    }

    useEffect(() => {
        if (flash.success) {
            const timeout = setTimeout(() => {
                setFlashMessage([]);
            }, 4000);

            return () => clearTimeout(timeout);
        }
    }, [flash.success]);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-white">
                        Tasks
                    </h2>
                    <Link href={route('tasks.create')} className="font-semibold text-sm bg-emerald-500 hover:bg-emerald-600 px-3 py-3 rounded-md text-white dark:text-gray-200 leading-tight">
                        Add New Task
                    </Link>
                </div>
            }
        >

        <Head title="Tasks" />

        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        All Tasks
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <TasksTable setCurrentPage={setCurrentPage} queryParams={queryParams} setQueryParams={setQueryParams} tasks={tasks}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </AuthenticatedLayout>
    )
}

