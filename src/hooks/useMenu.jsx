import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const normalizeMenu = (items) =>
    items.map((item, index) => ({
        ...item,
        _id: item._id || `local-menu-${item.category}-${index}`,
    }));

const useMenu = () => {
    const axiosPublic = useAxiosPublic();
    const {data: menu = [], isPending: loading, refetch} = useQuery({
        queryKey: ['menu'], 
        queryFn: async() =>{
            try {
                const res = await axiosPublic.get('/menu');
                if (Array.isArray(res.data) && res.data.length > 0) {
                    return normalizeMenu(res.data);
                }
            } catch {
                // Fall back to bundled demo data when the API or database is offline.
            }

            const fallbackRes = await fetch('/menu.json');
            if (!fallbackRes.ok) {
                throw new Error('Menu data is unavailable');
            }

            const fallbackMenu = await fallbackRes.json();
            return normalizeMenu(fallbackMenu);
        }
    })


    return [menu, loading, refetch]
}

export default useMenu;
