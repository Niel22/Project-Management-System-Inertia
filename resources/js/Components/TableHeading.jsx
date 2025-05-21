import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid'

export default function TableHeading({ name, queryParams, sort_field, sortChanged }){
    return (
        <th onClick={(e) => sortChanged(sort_field)} className="cursor-pointer px-3 py-5">
            <div className=" flex items-center justify-center gap-1">
                {name}
                <div>
                    <ChevronUpIcon className={`w-4 ${queryParams.sort_field === sort_field && queryParams.sort_direction === "asc" ? "text-white" : ''}`} />
                    <ChevronDownIcon className={`w-4 -mt-2 ${queryParams.sort_field === sort_field && queryParams.sort_direction === "desc" ? "text-white" : ''}`} />
                </div>
            </div>
        </th>
    )
}