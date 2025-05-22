import axios from "axios";

export async function createProjectService(payload){
    const data = await axios.post(route('projects.store'), payload);
    return data;
}

export async function deleteProjectService(id){
    const data = await axios.delete(route('projects.destroy', id));
    return data;
}