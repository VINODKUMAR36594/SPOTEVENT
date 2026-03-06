import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { toast } from "sonner";
import { set } from "date-fns";
export const useConvexQuery=(query,...args)=>{
    const result=useQuery(query,...args);
    const [data,setData]=useState(undefined)
const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState(null)
    useEffect(()=>{
if(result===undefined){
    setIsLoading(true)
}
else{
    try{
        setData(result)
        setError(null);
    }catch(err){
        setError(err)
        toast.error("Error fetching data");
    }
    finally{
        setIsLoading(false)
    }
}
    },[result])
    return {
        data,
        isLoading,
        error
    }

}

export const useConvexMutation=(mutation,...args)=>{
    const mutationFn=useMutation(mutation);
    const [data,setData]=useState(undefined)
    const [isLoading,setIsLoading]=useState(true)
    const [error,setError]=useState(null)
    const mutate=async(...args)=>{
        setIsLoading(true);
        setError(null);
        try{
            const result=await mutationFn(...args);
            setData(result);
            return result;
        }catch(err){
            setError(err);
            toast.error("Error performing mutation");
            // throw err;
        }
        finally{
            setIsLoading(false);
        }
    }

  return {
        data,
        isLoading,
        error
    }

}