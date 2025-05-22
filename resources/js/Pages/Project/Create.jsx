import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { createProjectService } from "@/service/projectService";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create(){

    const [processing, setProcessing] = useState(false);
    const [flashMessage, setFlashMessage] = useState({});

    const { data, setData, errors, reset} = useForm({
        image: '',
        name: '',
        status: '',
        description: '',
        due_date: ''    
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        let response;
        try{
            response = await createProjectService(data);
            if(response.status === 200){
                return router.get(route('projects.index'));
            }
        }catch(error){
            setFlashMessage({error: response ?? "Unable to create Project"})
            
        }finally{
            setProcessing(false);
        }
    }

    console.group(flashMessage);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-white">
                        Create New Project
                    </h2>
                </div>
            }
        >

            <Head title="Create Project" />

            <div className="py-12">
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {flashMessage.error && (<div className="bg-red-500 mb-2 py-3 px-4 text-white rounded">
                            {flashMessage.error}
                        </div>)}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                
                                <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                                    <div>
                                        <InputLabel htmlFor="image" value="Project Image"/>
                                        <TextInput 
                                                id="image" 
                                                type="file" 
                                                name="image"
                                                className="mt-1 block w-full"
                                                onChange={e => setData('image', e.target.files[0])}
                                        />
                                        <InputError message={errors.image} className="mt-2" />
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel htmlFor="name" value="Project Name"/>
                                        <TextInput 
                                                id="name" 
                                                type="text" 
                                                name="name" 
                                                value={data.name}
                                                className="mt-1 block w-full"
                                                onChange={e => setData('name', e.target.value)}
                                        />
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel htmlFor="description" value="Project Description"/>
                                        <TextAreaInput
                                                id="description" 
                                                type="text" 
                                                name="description" 
                                                value={data.description}
                                                className="mt-1 block w-full"
                                                onChange={e => setData('description', e.target.value)}
                                        />
                                        <InputError message={errors.description} className="mt-2" />
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel htmlFor="due_date" value="Project Deadline"/>
                                        <TextInput 
                                                id="due_date" 
                                                type="date" 
                                                name="due_date" 
                                                value={data.due_date}
                                                className="mt-1 block w-full"
                                                onChange={e => setData('due_date', e.target.value)}
                                        />
                                        <InputError message={errors.due_date} className="mt-2" />
                                    </div>
                                    <div className="mt-4">
                                        <InputLabel htmlFor="status" value="Project Status"/>
                                        <SelectInput 
                                                id="status" 
                                                name="status" 
                                                value={data.status}
                                                className="mt-1 block w-full"
                                                onChange={e => setData('status', e.target.value)}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </SelectInput>
                                        <InputError message={errors.status} className="mt-2" />
                                    </div>
                                    <div className="mt-4 text-right">
                                        <Link href={route('projects.index')} className="bg-gray-100 py-2 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2 text-sm">Cancel</Link>
                                        <button disabled={processing} className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 text-sm">
                                            {processing ? "Creating Project..." : "Create Project"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}