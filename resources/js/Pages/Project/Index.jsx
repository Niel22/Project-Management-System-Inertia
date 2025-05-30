import FlashMessage from "@/Components/FlashMessage";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import { useFetchProject } from "@/hooks/useProject";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { deleteProjectService } from "@/service/projectService";
import { clearFlashMessage, setFlashMessage } from "@/stores/slices/flashMessageSlice";
import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Index(){
    const [currentPage, setCurrentPage] = useState(1);
    const [queryParams, setQueryParams] = useState({});
    const dispatch = useDispatch()

    const {data: projects, isLoading, refetch} = useFetchProject({...queryParams, page: currentPage});

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

    const handleDelete = async (id) => {
        if(!window.confirm('Are you sure you want to delete this project?')) return;
        setFlashMessage({});

        const data = await deleteProjectService(id);
        if(data?.status === 200){
            
            dispatch(setFlashMessage({type: "success", message: "Project Deleted Successfully"}));
            refetch();
            return;
        }

        setFlashMessage((prev) => ({
            ...prev,
            success: data?.data?.message || 'An error occurred',
        }));

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
                    <FlashMessage/>
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
                                    {isLoading ? (
                                        <tbody>
                                            <tr className="py-5 text-center">
                                                <td colSpan={5}>
                                                    Project List Loading
                                                </td>
                                            </tr>
                                        </tbody>
                                    ) : projects?.data?.length ? (
                                        <ProjectsList handleDelete={handleDelete} projects={projects.data} />
                                    ) : (
                                        <tbody>
                                            <tr className="py-5 text-center">
                                                <td colSpan={5}>
                                                Project Not Found
                                                </td>
                                            </tr>
                                        </tbody>
                                    )}
                                </table>
                            </div>
                            {projects?.data?.length > 0  && <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage}  meta={projects.meta} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        </AuthenticatedLayout>
    )
}

function ProjectsList({projects, handleDelete}){

    return (
        <tbody>
            {projects.map((project, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={project.id}>
                    <th className="px-3 py-5">{index+1}</th>
                    <td className="px-3 py-5">
                        <img src={project.image} className="w-10" alt="" />
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
                    <td className="px-3 py-5 text-nowrap">{project.created_at}</td>
                    <td className="px-3 py-5 text-nowrap">{project.due_date}</td>
                    <td className="px-3 py-5 text-nowrap">{project.createdBy.name}</td>
                    <td className="px-3 py-5 text-nowrap">
                        <Link className="font-medium text-blue-600 dark:text-blue-500 bg-slate-700 hover:bg-slate-900 py-2 px-3 mx-1 rounded-md" href={route('projects.edit', project.id)}>Edit</Link>
                        <button onClick={() => handleDelete(project.id)} className="font-medium text-white dark:text-white rounded-md bg-red-600 py-2 px-3 hover:bg-red-800 transition-all shadow mx-1">Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}