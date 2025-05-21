import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ projects, queryParams, success }){

    queryParams = queryParams || {};

    const [successMsg, setSuccessMsg] = useState(success);

    const searchFieldChange = (name, value) => {
        if(value){
            queryParams[name] = value;
        }else{
            delete queryParams[name];
        }

        router.get(route('projects.index'), queryParams);
    }

    const onKeyPress = (name, e) => {
        if(e.key !== 'Enter') return;

        searchFieldChange(name, e.target.value);
    }

    const sortChanged = (name) => {
        if(name === queryParams.sort_field){
            if(queryParams.sort_direction === 'asc'){
                queryParams.sort_direction = 'desc';
            }else{
                queryParams.sort_direction = 'asc';
            }
        }else{
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }

        router.get(route('projects.index'), queryParams);
    }

    if(successMsg){
        setTimeout(() => {
            setSuccessMsg(null);
        }, 4000);
    }
    
    return(
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-white">
                        Projects
                    </h2>
                    <Link href={route('projects.create')} className="font-semibold text-sm bg-emerald-500 hover:bg-emerald-600 px-3 py-3 rounded-md text-white dark:text-gray-200 leading-tight">
                        Add New Project
                    </Link>
                </div>
            }
        >

        <Head title="Projects" />

        
        <div className="py-12">
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {successMsg && (<div className="bg-emerald-500 mb-2 py-3 px-4 text-white rounded">
                        {successMsg}
                    </div>)}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="overflow-auto">
                                
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <TableHeading 
                                                    sort_field={'id'}

                                                    sortChanged={(field) => sortChanged(field)} 
                                                    name={'ID'} queryParams={queryParams}
                                            />
                                            <th className="px-3 py-5">Image</th>
                                            <TableHeading 
                                                    sort_field={'name'}

                                                    sortChanged={(field) => sortChanged(field)} 
                                                    name={'Name'} queryParams={queryParams}
                                            />
                                            <TableHeading 
                                                    sort_field={'status'}

                                                    sortChanged={(field) => sortChanged(field)} 
                                                    name={'Status'} queryParams={queryParams}
                                            />
                                            <TableHeading 
                                                    sort_field={'created_at'}

                                                    sortChanged={(field) => sortChanged(field)} 
                                                    name={'Created Date'} queryParams={queryParams}
                                            />
                                            <TableHeading 
                                                    sort_field={'due_date'}

                                                    sortChanged={(field) => sortChanged(field)} 
                                                    name={'Due Date'} queryParams={queryParams}
                                            />
                                            <th className="px-3 py-5">Created By</th>
                                            <th className="px-3 py-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-5"></th>
                                            <th className="px-3 py-5"></th>
                                            <th className="px-3 py-5">
                                                <TextInput 
                                                    className="w-full" 
                                                    defaultValue={queryParams['name']}
                                                    placeholder="Project name"
                                                    onBlur={e => searchFieldChange('name', e.target.value)}
                                                    onKeyPress={e => onKeyPress('name', e)}
                                                />
                                            </th>
                                            <th className="px-3 py-5">
                                                <SelectInput defaultValue={queryParams['status']} className="w-full" onChange={e => searchFieldChange('status', e.target.value)}>
                                                    <option value="">Select Status</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="in_progress">In Progress</option>
                                                    <option value="complete">Complete</option>
                                                </SelectInput>
                                            </th>
                                            <th className="px-3 py-5"></th>
                                            <th className="px-3 py-5"></th>
                                            <th className="px-3 py-5"></th>
                                            <th className="px-3 py-5 text-right"></th>
                                        </tr>
                                    </thead>
                                    {projects?.data?.length ? (
                                        <ProjectsList projects={projects.data} />
                                    ) : (
                                        <tbody>
                                            <tr className="py-5 text-center">
                                                <h1>Project Not Found</h1>
                                            </tr>
                                        </tbody>
                                    )}                                    
                                </table>
                            </div>
                            {projects?.data?.length > 0  && <Pagination  links={projects.meta.links} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </AuthenticatedLayout>
    )
}

function ProjectsList({projects}){
    return (
        <tbody>
            {projects.map((project, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={project.id}>
                    <th className="px-3 py-5">{index+1}</th>
                    <td className="px-3 py-5">
                        <img src={project.image} alt="" />
                    </td>
                    <td className="px-3 py-5 text-nowrap text-gray-950 dark:text-white hover:underline">
                        <Link href={route('projects.show', project.id)}>
                            {project.name}
                        </Link>
                    </td>
                    <td className="px-3 py-5 text-nowrap">
                        <span className={`px-2 py-1 rounded text-white ${PROJECT_STATUS_CLASS_MAP[project.status]}`}>
                            {PROJECT_STATUS_TEXT_MAP[project.status]}
                        </span>
                    </td>
                    <td className="px-3 py-5 text-nowrap">{new Date(project.created_at).toLocaleString()}</td>
                    <td className="px-3 py-5 text-nowrap">{new Date(project.due_date).toLocaleString()}</td>
                    <td className="px-3 py-5 text-nowrap">{project.createdBy.name}</td>
                    <td className="px-3 py-5 text-nowrap">
                        <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1 bg-slate-700 py-3 px-2 rounded-md" href={route('projects.edit', project.id)}>Edit</Link>
                        <button className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}