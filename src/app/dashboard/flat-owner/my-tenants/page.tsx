import MyTenants from "@/app/components/dashboard/flat-owner/MyTenants";
import { getAssignedTenantsByFlatOwner } from "@/lib/api/users";



const MyTenantsPage = async() => {
    const tenants = await getAssignedTenantsByFlatOwner()
    // console.log(tenants)
    return (
        <div>
            <MyTenants tenants={tenants}/>
        </div>
    );
};

export default MyTenantsPage;