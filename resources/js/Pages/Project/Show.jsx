import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import { useFetchSingleProject, useFetchTaskByProject } from "@/hooks/useProject";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import TasksTable from "../Task/TasksTable";
import { useEffect, useState } from "react";

export default function Show({id}){

    const [queryParams, setQueryParams] = useState({});
    const [currentPage, setCurrentPage] = useState(1);


    const {data: project, error: projectError, isLoading: projectLoading, refetch: projectRefetch} = useFetchSingleProject(id);

    const {data: tasks, error: taskError, isLoading: taskLoading, refetch: taskRefetch} = useFetchTaskByProject(id, {...queryParams, page: currentPage});
        
    useEffect(() => {
            taskRefetch();
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
    
    

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-white">
                    Project Details
                </h2>
            }
        >


        {projectLoading ? (
            <h1>Loading</h1>
        ) : (
            <div className="py-12">
                
            <Head title={project.name} />   
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div>
                            <img src={project.image} alt={project.name} className="w-full h-64 object-cover" />
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Project ID</label>
                                        <p className="mt-1">{project.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Project Name</label>
                                        <p className="mt-1">{project.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Project Status</label>
                                        <p className="mt-1">
                                            <span className={`px-2 py-1 rounded text-white ${PROJECT_STATUS_CLASS_MAP[project.status]}`}>
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Created By</label>
                                        <p className="mt-1">{project.createdBy.name}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Due Date</label>
                                        <p className="mt-1">{project.due_date}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Create Date</label>
                                        <p className="mt-1">{project.created_at}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Updated By</label>
                                        <p className="mt-1">{project.updatedBy.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold text-lg">
                                    Description
                                </label>
                                <p className="mt-1">{project.description}</p>
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
                                <TasksTable queryParams={queryParams} setQueryParams={setQueryParams} showPoject={false} tasks={tasks} setCurrentPage={setCurrentPage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>)}


        </AuthenticatedLayout>
    )
}