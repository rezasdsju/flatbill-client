import FlatDetail from "@/app/components/dashboard/flat-owner/FlatDetail";
import { getFlatByFlatOwnerById } from "@/lib/api/flats";



const FlatDetailPage = async({params}:{params: Promise<{ id: string }>}) => {
    const {id} = await params
    const flat = await getFlatByFlatOwnerById(id)
    // console.log(flat)
    return (
        <div>
            <FlatDetail flat={flat}/>
        </div>
    );
};

export default FlatDetailPage;