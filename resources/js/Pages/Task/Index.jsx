import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import TasksTable from "./TasksTable";

export default function index({ tasks, queryParams = null }){

    // console.log(queryParams)

    
    
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-white">
                    Tasks
                </h2>
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
                            <TasksTable queryParams={queryParams} tasks={tasks}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </AuthenticatedLayout>
    )
}

