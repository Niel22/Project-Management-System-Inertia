import axios from "axios";

export async function fetchProjectService(queryParams){
    const response = await axios.get(route('project.lists'), {params: queryParams});
    const {data} = response;
    return data.data;
}

export async function createProjectService(payload){
    const data = await axios.post(route('projects.store'), payload);
    return data;
}

export async function deleteProjectService(id){
    const data = await axios.delete(route('projects.destroy', id));
    return data;
}