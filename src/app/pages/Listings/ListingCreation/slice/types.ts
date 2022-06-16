/* --- STATE --- */
export interface ListingStateModel {
  listing_type_id: number;
  listing_status: number;
  images: any[];
  location:string;
  marina_name:string;
  dock: string;
  slip_number:string;
  country: string;
  street_address:string;
  city: string;
  province:string;
  zip_code: string;
  list_details: string;
  list_details_operator: string;
  list_details_name:string;
  list_details_type: string;
  list_details_make: string;
  model:string;
  year: string;
  length: string;
  rules: any[];
  listing_name: string;
  list_discription: string;
  day_trips: number;
  overnight_stays: number
}

/* --- STATE --- */
export interface ListingStateExteriorModel {
  flybridge: number;
  swim_platform: number;
  swim_ladder: number;
  anchor: number;
  shower: number;
  grill: number;
  cooler: number;
  other_exterior_amenities: any | null;
}


export interface ListingStateWaterToysModel {
  jet_ski: number;
  tender: number;
  floatine_mate: number;
  snorkeling_gear: number;
  diving_gear: number;
  paddle_board: number;
  water_jetpack: number;
  water_jetslide: number;
  jacuzzi: number;
  other_jacuzzi_amenities: any | null;
}

export interface ListingStateSafetyModel {
  life_jacket: any | null;
  vhf_radio:  any | null;
  thrusters:  number;
  stabilizers:  number;
  gps:number;
  sonar: number;
  radar: number;
  medical_kit:  number;
  flashlight: number;
  other_safety_amenities: any | null;
}

export interface ListingStateInteriorModel {
  bedrooms: number;
  bathrooms: number;
  kitchen: number;
  refrigerator: number;
  microwave: number;
  airconditioning: number;
  tv_stereo: number;
  other_amenities: any | null;
}

export interface ListingStateDayTripsModel {
  day_trip_hours: any | null;
  guest_capacity: number;
  security_deposit: number;
  taxes: number;
  gratuity: number;
  fuel_policy: string;
  catering_service: boolean;
  chef: boolean;
  additional_crew: boolean;
  extra_water_toys: any | null;
  other: any | null;
  price_for_4_hours: number;
  price_for_6_hours: number;
  price_for_8_hours: number;
}


export interface ListingStateOvernightModel {
  overnight_stay_days: number;
  overnight_stay_weeks: number;
  guest_capacity: number;
  security_deposit: number;
  taxes: number;
  gratuity: number;
  apa: number;
  catering_service: boolean;
  chef: boolean;
  additional_crew: boolean;
  extra_water_toys: any | null;
  other: any | null;
  price_per_day: number;
  price_per_week:number;
}

export interface ListingStateCancelationModel {
  flexible: number;
  moderate: number;
  strict: number;
  use_your_own: string
}

export interface ListingStateInsuranceModel {
  waterpins_insurance: boolean;
  own_insurance: boolean;
  certified:boolean;
}

export interface ListingStateAvailabilityModel {
  yacht_availability: any | null;
  availability_type: string;
  how_far_in_advance_book: string;
  yacht_availability_status:string
  restrict_month:any | null;



}

export interface ListingStateWaterActivityOptionsModel {
    time: number;
    type: string;
    cost: number
}


export interface ListingStateWaterActivityModel {
  options: ListingStateWaterActivityOptionsModel[];
  title: string;
  activity_description: string;
  guest_capacity: string;
  deposit_extras: string;
  add_ons: string;
  where_water_activity_start: string;
  water_activity_type_id: string;
}


export interface ListcreationState {
  payload?:any | null;
  success?:boolean;
  loading?:boolean;
  listingType:string;
  error?:CreateListingErrorType | null;
  listing: ListingStateModel;
  exterior: ListingStateExteriorModel;
  water_toys: ListingStateWaterToysModel;
  safety: ListingStateSafetyModel;
  interior:ListingStateInteriorModel;
  day_trips:ListingStateDayTripsModel;
  overnight_stays: ListingStateOvernightModel;
  cancelation_policy: ListingStateCancelationModel;
  insurance: ListingStateInsuranceModel;
  availability: ListingStateAvailabilityModel;
  water_activity: ListingStateWaterActivityModel[];
}

export enum CreateListingErrorType {
  RESPONSE_ERROR = 1,
}
