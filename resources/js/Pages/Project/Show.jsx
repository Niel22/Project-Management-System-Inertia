import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TasksTable from "../Task/TasksTable";

export default function Show({project, tasks, queryParams}){
    const {data} = project;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-white">
                    Project Details
                </h2>
            }
        >

        <Head title={data.name} />

        <div className="py-12">
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div>
                            <img src={data.image} alt={data.name} className="w-full h-64 object-cover" />
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Project ID</label>
                                        <p className="mt-1">{data.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Project Name</label>
                                        <p className="mt-1">{data.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Project Status</label>
                                        <p className="mt-1">
                                            <span className={`px-2 py-1 rounded text-white ${PROJECT_STATUS_CLASS_MAP[data.status]}`}>
                                                {PROJECT_STATUS_TEXT_MAP[data.status]}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Created By</label>
                                        <p className="mt-1">{data.createdBy.name}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Due Date</label>
                                        <p className="mt-1">{data.due_date}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Create Date</label>
                                        <p className="mt-1">{data.created_at}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Updated By</label>
                                        <p className="mt-1">{data.updatedBy.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold text-lg">
                                    Description
                                </label>
                                <p className="mt-1">{data.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white mb-2 shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                All Task For This Project
                            </div>
                        </div>
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <TasksTable showPoject={false} tasks={tasks} queryParams={queryParams} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>


        </AuthenticatedLayout>
    )
}