import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Link, router } from "@inertiajs/react";

export default function({ setQueryParams, setCurrentPage, tasks, queryParams = null, showPoject = true }){

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
        <>
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
                            {showPoject && <th className="px-3 py-5">Project Name</th>}
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
                            {showPoject && <th className="px-3 py-5">
                                <TextInput 
                                    className="w-full" 
                                    defaultValue={queryParams['project_name']}
                                    placeholder="Project name"
                                    onBlur={e => searchFieldChange('project_name', e.target.value)}
                                    onKeyPress={e => onKeyPress('project_name', e)}
                                />
                            </th>}
                            <th className="px-3 py-5">
                                <TextInput 
                                    className="w-full" 
                                    defaultValue={queryParams['name']}
                                    placeholder="Task name"
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
                    {tasks?.data?.length ? (
                        <TasksList showPoject={showPoject} tasks={tasks.data} />
                    ) : (
                        <tbody>
                            <tr className="py-5 text-center">
                                <h1>Task Not Found</h1>
                            </tr>
                        </tbody>
                    )}                                    
                </table>
                
            </div>
            {tasks?.data?.length > 0 && <Pagination setCurrentPage={setCurrentPage} meta={tasks.meta} />}
        </>
    )
}

function TasksList({tasks, showPoject}){
    return (
        <tbody>
            {tasks.map((task, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={task.id}>
                    <th className="px-3 py-5">{index + 1}</th>
                    <td className="px-3 py-5">
                        <img src={task.image} alt="" />
                    </td>
                    {showPoject && <td className="px-3 py-5 text-nowrap">{task.project.name}</td>}
                    <td className="px-3 py-5 text-nowrap">{task.name}</td>
                    <td className="px-3 py-5 text-nowrap">
                        <span className={`px-2 py-1 rounded text-white ${TASK_STATUS_CLASS_MAP[task.status]}`}>
                            {TASK_STATUS_TEXT_MAP[task.status]}
                        </span>
                    </td>
                    <td className="px-3 py-5 text-nowrap">{new Date(task.created_at).toLocaleString()}</td>
                    <td className="px-3 py-5 text-nowrap">{new Date(task.due_date).toLocaleString()}</td>
                    <td className="px-3 py-5 text-nowrap">{task.createdBy.name}</td>
                    <td className="px-3 py-5 text-nowrap">
                        <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1" href={route('tasks.edit', task.id)}>Edit</Link>
                        <button className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}