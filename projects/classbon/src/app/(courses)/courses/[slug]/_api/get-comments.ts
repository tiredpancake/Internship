import { readData } from "@/core/http-service/http-service";
import { CoursecommentList } from "../_types/course-comments.interface";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

type GetCommentsOptions={
    params:{
        slug:string;
        page:number;
    }
}

const GetComments=({
    params
}:GetCommentsOptions):Promise<CoursecommentList> =>{
    const {slug,page}=params;
    const url=`/courses/${slug}/comments?page=${page}`;
    return readData(url);
};

//infinite query
export const useCourseComments =({params}:GetCommentsOptions)=>{
    const {data,error,isFetchingNextPage,fetchNextPage,fetchPreviousPage,hasNextPage,refetch}= useInfiniteQuery({
        queryKey:['courseComments',params.sluga],
        queryFn:({pageParam})=>GetComments({params:{...params,page:pageParam}}),
        getNextPageParam:(lastPage)=>lastPage.nextPage,
        initialPageParam:1,
        staleTime:5*60*60*1000,
        gcTime:5*60*60*1000,

    })

    return {data,error,isFetchingNextPage,fetchNextPage,hasNextPage,refetch};
}

