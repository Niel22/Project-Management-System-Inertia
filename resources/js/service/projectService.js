import axios from "axios";

export default async function deleteProjectService(id){
    const data = await axios.delete(route('projects.destroy', id));
    console.log(data);
    return data;
}