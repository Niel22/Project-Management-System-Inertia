import FlashMessage from "@/Components/FlashMessage";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { createProjectService } from "@/service/projectService";
import { setFlashMessage } from "@/stores/slices/flashMessageSlice";
import { createFormData } from "@/utils/createFormData";
import { handleInputChange } from "@/utils/handleInputChange";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { joiResolver } from '@hookform/resolvers/joi';
import { createProjectSchema } from "@/validators/projectSchema";

export default function Create(){

    const [processing, setProcessing] = useState(false);
    const dispatch = useDispatch();

    const {register, handleSubmit, setValue, reset, formState: {errors} } = useForm({
        resolver: joiResolver(createProjectSchema)
    });

    const onSubmit = async (data) => {
        setProcessing(true);
        const formData = createFormData(data);
        
        let response;
        try{
            response = await createProjectService(formData);
            if(response.status === 200){
                dispatch(setFlashMessage({type: "success", message: "Project Created Successfully"}));

                setTimeout(() => {
                    return router.get(route('projects.index'));
                }, 3000);
            }
        }catch(error){
            dispatch(setFlashMessage({type: "error", message: error.response.data.message ?? "Unable to create Project"}));
            setProcessing(false);
        }
    }


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
                        <FlashMessage/>
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                
                                <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
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