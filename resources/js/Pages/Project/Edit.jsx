import FlashMessage from "@/Components/FlashMessage";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { useFetchSingleProject } from "@/hooks/useProject";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { updateProjectService } from "@/service/projectService";
import { setFlashMessage } from "@/stores/slices/flashMessageSlice";
import { createFormData } from "@/utils/createFormData";
import { handleInputChange } from "@/utils/handleInputChange";
import { updateProjectSchema } from "@/validators/projectSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function Edit({id}){

    const [processing, setProcessing] = useState(false);
    const dispatch = useDispatch();
    const {data: project, error: projectError, isLoading: projectLoading, refetch: projectRefetch} = useFetchSingleProject(id);
    const {register, handleSubmit, setValue, reset, formState: {errors} } = useForm({
        resolver: joiResolver(updateProjectSchema)
    });

    useEffect(() => {
        if(!projectLoading && project){
            console.log(project)
            reset({
                name: project.name || '',
                description: project.description || '',
                due_date: project.due_date ? new Date(project.due_date).toISOString().slice(0,10) : '',
                status: project.status || '',
            })
        }
    }, [project,projectLoading]);


    const onSubmit = async (data) => {
        setProcessing(true);
        const formData = createFormData(data);
        let response;
        try{
            response = await updateProjectService(id, formData);
            console.log(response);
            if(response.status === 200){
                dispatch(setFlashMessage({type: "success", message: "Project Updated Successfully"}));

                setTimeout(() => {
                    return router.get(route('projects.index'));
                }, 3000);
            }
        }catch(error){
            console.log(error)
            dispatch(setFlashMessage({type: "error", message: error.response.data.message ?? "Unable to Update Project"}));
            setProcessing(false);
        }
    }

    return (
        <AuthenticatedLayout    
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-white">
                        Edit Project
                    </h2>
                </div>
            }
        >

            <Head title="Edit Project" />

            {projectLoading ? (
                <   h1>Loading</h1>
                ) : (
                    <div className="py-12">
                        <div className="py-12">
                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <FlashMessage />
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                    <div className="p-6 text-gray-900 dark:text-gray-100">
                                        
                                        <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                                            {project?.image && (
                                            <div className="my-4">
                                                <img src={project.image} alt={project.name} className="w-64"/>
                                            </div>
                                                )}
                                            <div>
                                                <InputLabel htmlFor="image" value="Project Image"/>
                                                <TextInput 
                                                        id="image" 
                                                        type="file" 
                                                        name="image"
                                                        className="mt-1 block w-full"
                                                        {...register('image')}
                                                        onChange={(e) => handleInputChange(e, setValue)}
                                                />
                                                <InputError message={errors.image?.message} className="mt-2" />
                                            </div>
                                            <div className="mt-4">
                                                <InputLabel htmlFor="name" value="Project Name"/>
                                                <TextInput 
                                                        id="name" 
                                                        type="text" 
                                                        name="name" 
                                                        className="mt-1 block w-full"
                                                        {...register('name')}
                                                        onChange={(e) => handleInputChange(e, setValue)}
                                                />
                                                <InputError message={errors.name?.message} className="mt-2" />
                                            </div>
                                            <div className="mt-4">
                                                <InputLabel htmlFor="description" value="Project Description"/>
                                                <TextAreaInput
                                                        id="description" 
                                                        type="text" 
                                                        name="description" 
                                                        className="mt-1 block w-full"
                                                        {...register('description')}
                                                        onChange={(e) => handleInputChange(e, setValue)}
                                                />
                                                <InputError message={errors.description?.message} className="mt-2" />
                                            </div>
                                            <div className="mt-4">
                                                <InputLabel htmlFor="due_date" value="Project Deadline"/>
                                                <TextInput 
                                                        id="due_date" 
                                                        type="date" 
                                                        name="due_date" 
                                                        className="mt-1 block w-full"
                                                        {...register('due_date')}
                                                        onChange={(e) => handleInputChange(e, setValue)}
                                                />
                                                <InputError message={errors.due_date?.message} className="mt-2" />
                                            </div>
                                            <div className="mt-4">
                                                <InputLabel htmlFor="status" value="Project Status"/>
                                                <SelectInput 
                                                        id="status" 
                                                        name="status" 
                                                        className="mt-1 block w-full"
                                                        {...register('status')}
                                                        onChange={(e) => handleInputChange(e, setValue)}
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="in_progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                </SelectInput>
                                                <InputError message={errors.status?.message} className="mt-2" />
                                            </div>
                                            <div className="mt-4 text-right">
                                                <Link href={route('projects.index')} className="bg-gray-100 py-2 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2 text-sm">Cancel</Link>
                                                <button disabled={processing} className="bg-emerald-500 py-2 px-3 text-white rounded shadow transition-all hover:bg-emerald-600 text-sm">
                                                    {processing ? "Updating Project..." : "Update Project"}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            )}

        </AuthenticatedLayout>
    )
}