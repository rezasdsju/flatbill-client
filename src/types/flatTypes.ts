type FlatStatus = "Occupied" | "Vacant" | "Under Maintenance";
type BillStatus = "Paid" | "Due" | "Partial" | "N/A";
type GasType = "Titas Line" | "Prepaid Meter" | "Cylinder";
type ElectricityType = "Prepaid" | "Postpaid" | "Sub-meter";
type RentalCategory = "Family" | "Bachelor" | "Office" | "Sublet";
type FacingDirection = "South" | "North" | "East" | "West" | "South-East" | "South-West";

export interface UserSummary {
    _id: string;
    name: string | null;
    image?: string;
    email: string;
    phone?: string | null;
    nid?: string;
}

export interface PastTenantRecord extends UserSummary {
    moveInDate: string;
    moveOutDate: string;
}

export interface PresentTenantRecord extends UserSummary {
    moveInDate: string;
    leaseEndDate?: string;
    roomOrSeatLabel?: string;
}

export interface IFlat {
    _id: string;
    buildingId: string;
    buildingName: string;
    flatNumber: string;
    floor: string;
    facing?: FacingDirection;

    // Room & Space Specs
    sizeSqFt: number;
    bedrooms: number;
    totalBathRooms: number;
    attachedBathrooms: number;
    commonBathrooms: number;
    balconies: number;
    hasDrawingDining: boolean;
    hasServantRoom?: boolean;
    flatImage?: string;
    buildingImage?: string;
    // Dhaka Specific Utilities & Amenities
    gasType: GasType;
    gasMeterOrAccountNo?: string;
    electricityType: ElectricityType;
    electricityMeterNo?: string;
    hasParking: boolean;
    parkingSlotNo?: string;
    hasLift: boolean;
    hasGenerator: boolean;

    // Financial & Billing Info
    monthlyRent: number;
    serviceCharge: number;
    waterBillFixed?: number;
    garbageBillFixed?: number;
    securityDeposit: number;
    currentDueAmount: number;
    currentMonthBillStatus: BillStatus;

    // Occupancy & Tenant Info
    rentalCategory: RentalCategory;
    status: FlatStatus;
    flatOwner: UserSummary;
    presentTenants?: PresentTenantRecord[];
    pastTenants?: PastTenantRecord[];

    // Meta
    notes?: string;
    createdAt?: string;
    updatedAt?: string;
}


export interface IAddFlat {
    // Mandatory Fields
    buildingId?: string;
    buildingName: string;
    flatNumber: string;
    floor: string;
    rentalCategory: RentalCategory;
    monthlyRent: number;
    serviceCharge: number;
    status: FlatStatus;
    gasType: GasType;
    electricityType: ElectricityType;

    // Optional Room & Space Specs
    sizeSqFt?: number;
    facing?: FacingDirection;
    bedrooms?: number;
    attachedBathrooms?: number;
    commonBathrooms?: number;
    balconies?: number;
    hasDrawingDining?: boolean;
    hasServantRoom?: boolean;

    // Optional Utilities & Amenities
    gasMeterOrAccountNo?: string;
    electricityMeterNo?: string;
    hasParking?: boolean;
    parkingSlotNo?: string;
    hasLift?: boolean;
    hasGenerator?: boolean;

    // Optional Financial & Extra Info
    securityDeposit?: number;
    waterBillFixed?: number;
    garbageBillFixed?: number;
    notes?: string;
    flatImage?: string;
    buildingImage?: string;

}




export interface IUpdateFlat {
    // Mandatory Fields
    buildingId?: string;
    buildingName?: string;
    flatNumber?: string;
    floor?: string;
    rentalCategory?: RentalCategory;
    monthlyRent?: number;
    serviceCharge?: number;
    status?: FlatStatus;
    gasType?: GasType;
    electricityType?: ElectricityType;

    // Optional Room & Space Specs
    sizeSqFt?: number;
    facing?: FacingDirection;
    bedrooms?: number;
    attachedBathrooms?: number;
    commonBathrooms?: number;
    balconies?: number;
    hasDrawingDining?: boolean;
    hasServantRoom?: boolean;

    // Optional Utilities & Amenities
    gasMeterOrAccountNo?: string;
    electricityMeterNo?: string;
    hasParking?: boolean;
    parkingSlotNo?: string;
    hasLift?: boolean;
    hasGenerator?: boolean;

    // Optional Financial & Extra Info
    currentDueAmount?: number;
    securityDeposit?: number;
    waterBillFixed?: number;
    garbageBillFixed?: number;
    notes?: string;
    flatImage?: string;
    buildingImage?: string;

    presentTenants?: PresentTenantRecord[];

}