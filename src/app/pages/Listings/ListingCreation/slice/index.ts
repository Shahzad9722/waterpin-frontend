import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { listcreationSaga } from './saga';
import { ListcreationState } from './types';

export const initialState: ListcreationState = {
    payload:null,
    error:null,
    success:false,
    loading:false,
    listing: {
        listing_type_id: 1,
        listing_status: 1,
        images: [],
        location:'',
        marina_name:'',
        dock: '',
        slip_number:'',
        country: '',
        street_address:'',
        city: '',
        province:'',
        zip_code: '',
        list_details: '',
        list_details_operator: '',
        list_details_name:'',
        list_details_type: '',
        list_details_make: '',
        model:'',
        year: '',
        length: '',
        rules: [
          {
            name: "No Shoes",
            value: 0
          }, {
            name: "No Glass Bottles",
            value: 0
          }, {
            name: "No Smoking",
            value: 0
          }, {
            name: "No Fishing",
            value: 0
          }, {
            name: "No Red Wine",
            value: 0
          }, {
            name: "No Alcohol",
            value: 0
          }, {
            name: "No Kids Under 10",
            value: 0
          }, {
            name: "No Kids Under 2",
            value: 0
          }
        ],
        listing_name: '',
        list_discription: '',
        day_trips: 0,
        overnight_stays: 0
    },
    exterior: {
      flybridge: 0,
      swim_platform: 0,
      swim_ladder: 0,
      anchor: 0,
      shower: 0,
      grill: 0,
      cooler: 0,
      other_exterior_amenities: []
    },
    water_toys: {
      jet_ski: 0,
      tender: 0,
      floatine_mate: 0,
      snorkeling_gear: 0,
      diving_gear: 0,
      paddle_board: 0,
      water_jetpack: 0,
      water_jetslide: 0,
      jacuzzi: 0,
      other_jacuzzi_amenities: []
    },
    safety: {
      life_jacket: null,
      vhf_radio:  null,
      thrusters:  0,
      stabilizers:  0,
      gps:0,
      sonar: 0,
      radar: 0,
      medical_kit:  0,
      flashlight: 0,
      other_safety_amenities: []
    },
    interior: {
      bedrooms: 0,
      bathrooms: 0,
      kitchen: 0,
      refrigerator: 0,
      microwave: 0,
      airconditioning: 0,
      tv_stereo: 0,
      other_amenities: []
    },
    day_trips: {
      day_trip_hours: null,
      guest_capacity: 0,
      security_deposit: 0.00,
      taxes: 0.00,
      gratuity: 0.00,
      fuel_policy: '',
      catering_service: false,
      chef: false,
      additional_crew: false,
      extra_water_toys: null,
      other: null,
      price_for_4_hours: 0.00,
      price_for_6_hours: 0.00,
      price_for_8_hours: 0.00
    },
    overnight_stays: {
      overnight_stay_days: 0,
      overnight_stay_weeks: 0,
      guest_capacity: 1,
      security_deposit: 0.00,
      taxes: 0.00,
      gratuity: 0.00,
      apa: 0.00,
      catering_service: false,
      chef: false,
      additional_crew: false,
      extra_water_toys: null,
      other: null,
      price_per_day: 0.00,
      price_per_week:0.00
    },
    cancelation_policy: {
      flexible: 0,
      moderate: 0,
      strict: 0,
      use_your_own: ''
    },
    insurance: {
      waterpins_insurance: false,
      own_insurance: false,
      certified:false,
    },
    availability: {
      yacht_availability: null,
      availability_type: '',
      how_far_in_advance_book: '',
      yacht_availability_status:'',
      restrict_month:null,
    },
    water_activity: [
      {
        options: [
          {
            time: 0,
            type: '',
            cost: 0
          }
        ],
        title: '',
        activity_description: '',
        guest_capacity: '',
        deposit_extras: '',
        add_ons: '',
        where_water_activity_start: '',
        water_activity_type_id: ''
      }
    ],
    listingType:'Yacht'
};

const slice = createSlice({
  name: 'listcreation',
  initialState,
  reducers: {
    loadListing(state, action: PayloadAction<any>) {
      const data = action.payload
      state.payload = data;
    },
    loadListingSuccessful(state, action: PayloadAction<any>) {
      const data = action.payload;

      let existingListing = {
        listing_type_id: data.listing_type_id,
        listing_status: data.listing_status,
        images: data.images,
        location:data.location,
        marina_name:data.marina_name,
        dock: data.dock,
        slip_number:data.slip_number,
        country: data.country,
        street_address:data.street_address,
        city: data.city,
        province:data.province,
        zip_code: data.zip_code,
        list_details: data.details,
        list_details_operator: data.list_details_operator,
        list_details_name:data.list_details_name,
        list_details_type: data.list_details_type,
        list_details_make: data.list_details_make,
        model:data.model,
        year: data.year,
        length: data.length,
        rules: JSON.parse(data.rules),
        listing_name: data.listing_name,
        list_discription: data.list_discription,
        day_trips: data.day_trips,
        overnight_stays: data.overnight_stays
      }
      console.log(existingListing)
      state.listing = existingListing;
      let existingExterior:any = null
      let existingInterior:any = null
      let existingSafety:any = null
      let existingWaterToys:any = null
      let existingCancellation:any = null
      let existingOvernights:any = null

      if (data.amenities_interior) {
        existingExterior = {
          flybridge: data.exterior.flybridge,
          swim_platform: data.exterior.swim_platform,
          swim_ladder: data.exterior.swim_ladder,
          anchor: data.exterior.anchor,
          shower: data.exterior.shower,
          grill: data.exterior.grill,
          cooler: data.exterior.cooler,
          other_exterior_amenities: []
        }

        state.exterior = existingExterior;
      }

      if (data.amenities_interior) {
        existingInterior = {
          bedrooms: data.amenities_interior.bedrooms,
          bathrooms: data.amenities_interior.bathrooms,
          kitchen: data.amenities_interior.kitchen,
          refrigerator: data.amenities_interior.refrigerator,
          microwave: data.amenities_interior.microwave,
          airconditioning: data.amenities_interior.airconditioning,
          tv_stereo: data.amenities_interior.tv_stereo,
          other_amenities: []
        }
        state.interior = existingInterior;
      }

      if (data.amenities_safety) {
        existingSafety = {
          life_jacket: data.amenities_safety.life_jacket,
          vhf_radio:  data.amenities_safety.vhf_radio,
          thrusters:  data.amenities_safety.thrusters,
          stabilizers:  data.amenities_safety.stabilizers,
          gps:data.amenities_safety.gps,
          sonar: data.amenities_safety.sonar,
          radar: data.amenities_safety.radar,
          medical_kit:  data.amenities_safety.medical_kit,
          flashlight: data.amenities_safety.flashlight,
          other_safety_amenities: []
        }

        state.safety = existingSafety;
      }

      let existingDayTrips = {
        day_trip_hours: data.day_trip_related.day_trip_hours,
        guest_capacity: data.day_trip_related.guest_capacity,
        security_deposit: data.day_trip_related.security_deposit,
        taxes:data.day_trip_related.taxes,
        gratuity: data.day_trip_related.gratuity,
        fuel_policy: '',
        catering_service: data.day_trip_related.catering_service,
        chef: data.day_trip_related.chef,
        additional_crew: data.day_trip_related.additional_crew,
        extra_water_toys: data.day_trip_related.extra_water_toys,
        other: data.day_trip_related.other,
        price_for_4_hours: data.day_trip_related.price_for_4_hours,
        price_for_6_hours: data.day_trip_related.price_for_6_hours,
        price_for_8_hours: data.day_trip_related.price_for_8_hours
      }

      state.day_trips = existingDayTrips;

      if (data.overnights_related) {
        existingOvernights = {
          overnight_stay_days: data.overnights_related.overnight_stay_days,
          overnight_stay_weeks: data.overnights_related.overnight_stay_weeks,
          guest_capacity: data.overnights_related.guest_capacity,
          security_deposit:data.overnights_related.security_deposit,
          taxes: data.overnights_related.taxes,
          gratuity: data.overnights_related.gratuity,
          apa: data.overnights_related.apa,
          catering_service: data.overnights_related.catering_service,
          chef: data.overnights_related.chef,
          additional_crew: data.overnights_related.additional_crew,
          extra_water_toys: data.overnights_related.extra_water_toys,
          other: data.overnights_related.other,
          price_per_day:data.overnights_related.price_per_day,
          price_per_week:data.overnights_related.price_per_week
        }
      }

      state.overnight_stays = existingOvernights;

      if (data.amenities_water_toys) {
        existingWaterToys = {
          jet_ski: data.amenities_water_toys.jet_ski,
          tender: data.amenities_water_toys.tender,
          floatine_mate: data.amenities_water_toys.floatine_mate,
          snorkeling_gear: data.amenities_water_toys.snorkeling_gear,
          diving_gear: data.amenities_water_toys.diving_gear,
          paddle_board: data.amenities_water_toys.paddle_board,
          water_jetpack: data.amenities_water_toys.water_jetpack,
          water_jetslide: data.amenities_water_toys.water_jetslide,
          jacuzzi: data.amenities_water_toys.jacuzzi,
          other_jacuzzi_amenities: []
        }

        state.water_toys = existingWaterToys;
      }

      if (data.cancelation_policy) {

        existingCancellation = {
          flexible: data.cancelation_policy.flexible,
          moderate: data.cancelation_policy.moderate,
          strict: data.cancelation_policy.strict,
          use_your_own: data.cancelation_policy.use_your_own
        }

        state.cancelation_policy = existingCancellation;
      }

      let existingInsurnace = {
        waterpins_insurance:  data.insurance.waterpins_insurance,
        own_insurance: data.insurance.own_insurance,
        certified:true
      }

      state.insurance = existingInsurnace;

      let existingAvailability = {
        yacht_availability:  data.availability.yacht_availability,
        availability_type:  data.availability.availability_type,
        how_far_in_advance_book:  data.availability.how_far_in_advance_book,
        yacht_availability_status: data.availability.yacht_availability_status,
        restrict_month: data.availability.restrict_month,
      }

      state.availability = existingAvailability;


    },
    loadListingError(state, action: PayloadAction<any>) {
      const data = action.payload
      state.payload = data
    },

    setListingType(state, action: PayloadAction<any>) {
      const data = action.payload
      state.listingType = data.type
    },

    setImages(state, action: PayloadAction<any>) {
      const data = action.payload
      state.listing.images = data.images
    },

    setListingDetails(state, action: PayloadAction<any>) {
      const data = action.payload
      state.listing = { ...state.listing, [data.name]: data.value }
    },

    setAvailabilityDetails(state, action: PayloadAction<any>) {
      const data = action.payload
      state.availability = { ...state.availability, [data.name]: data.value }
    },




    setCancelationDetails(state, action: PayloadAction<any>) {
      const data = action.payload

      switch (true) {
        case data.name === 'flexible':
          state.cancelation_policy.moderate = 0
          state.cancelation_policy.strict = 0
          state.cancelation_policy.use_your_own = ''
          break;
        case data.name === 'moderate':
          state.cancelation_policy.flexible = 0
          state.cancelation_policy.strict = 0
          state.cancelation_policy.use_your_own = ''
          break;
        case data.name === 'strict':
          state.cancelation_policy.flexible = 0
          state.cancelation_policy.moderate = 0
          state.cancelation_policy.use_your_own = ''
          break;
        default:
          state.cancelation_policy.flexible = 0
          state.cancelation_policy.moderate = 0
          state.cancelation_policy.strict = 0
          break;
      }
      state.cancelation_policy = { ...state.cancelation_policy, [data.name]: data.value }
    },

    setInsuranceDetails(state, action: PayloadAction<any>) {
      const data = action.payload

      switch (true) {
        case data.name === 'waterpins_insurance':
          state.insurance.own_insurance = false
          break;
        case data.name === 'own_insurance':
          state.insurance.waterpins_insurance = false
          break;
        default:
          state.insurance.waterpins_insurance = false
          state.insurance.own_insurance = false
          break;
      }

      state.insurance = { ...state.insurance, [data.name]: data.value }
    },



    setAmenitiesInterior(state, action: PayloadAction<any>) {
      const data = action.payload
      state.interior = { ...state.interior, [data.name]: data.value }
    },

    addAmenitiesInteriorOther(state, action: PayloadAction<any>) {
      const data = action.payload
      state.interior.other_amenities = [ ...state.interior.other_amenities, data.value]
    },

    setAmenitiesInteriorOther(state, action: PayloadAction<any>) {
      const data = action.payload
      const foundElementIndex = state.interior.other_amenities.findIndex(element => element.name === data.name)
      if (foundElementIndex !== null || foundElementIndex !== undefined) {
        let newArr = [ ...state.interior.other_amenities ];
        newArr[foundElementIndex] = data
        state.interior.other_amenities = newArr
      }
    },

    setAmenitiesExterior(state, action: PayloadAction<any>) {
      const data = action.payload
      state.exterior = { ...state.exterior, [data.name]: data.value }
    },

    addAmenitiesExteriorOther(state, action: PayloadAction<any>) {
      const data = action.payload
      state.exterior.other_exterior_amenities = [ ...state.exterior.other_exterior_amenities, data.value]
    },

    setAmenitiesExteriorOther(state, action: PayloadAction<any>) {
      const data = action.payload
      const foundElementIndex = state.exterior.other_exterior_amenities.findIndex(element => element.name === data.name)
      if (foundElementIndex !== null || foundElementIndex !== undefined) {
        let newArr = [ ...state.exterior.other_exterior_amenities ];
        newArr[foundElementIndex] = data
        state.exterior.other_exterior_amenities = newArr
      }
    },




    setAmenitiesSafety(state, action: PayloadAction<any>) {
      const data = action.payload
      state.safety = { ...state.safety, [data.name]: data.value }
    },

    addAmenitiesSafetyOther(state, action: PayloadAction<any>) {
      const data = action.payload
      state.safety.other_safety_amenities = [ ...state.safety.other_safety_amenities, data.value]
    },

    setAmenitiesSafetyOther(state, action: PayloadAction<any>) {
      const data = action.payload
      const foundElementIndex = state.safety.other_safety_amenities.findIndex(element => element.name === data.name)
      if (foundElementIndex !== null || foundElementIndex !== undefined) {
        let newArr = [ ...state.safety.other_safety_amenities ];
        newArr[foundElementIndex] = data
        state.safety.other_safety_amenities = newArr
      }
    },


    setAmenitiesWaterToys(state, action: PayloadAction<any>) {
      const data = action.payload
      state.water_toys = { ...state.water_toys, [data.name]: data.value }
    },


    addAmenitiesWaterToys(state, action: PayloadAction<any>) {
      const data = action.payload
      state.water_toys.other_jacuzzi_amenities = [ ...state.water_toys.other_jacuzzi_amenities, data.value]
    },

    setAmenitiesWaterToysOther(state, action: PayloadAction<any>) {
      const data = action.payload
      const foundElementIndex = state.water_toys.other_jacuzzi_amenities.findIndex(element => element.name === data.name)
      if (foundElementIndex !== null || foundElementIndex !== undefined) {
        let newArr = [ ...state.water_toys.other_jacuzzi_amenities ];
        newArr[foundElementIndex] = data
        state.water_toys.other_jacuzzi_amenities = newArr
      }
    },

    setDayTripsDetails(state, action: PayloadAction<any>) {
      const data = action.payload
      state.day_trips = { ...state.day_trips, [data.name]: data.value }
    },
    setOvernightDetails(state, action: PayloadAction<any>) {
      const data = action.payload
      state.overnight_stays = { ...state.overnight_stays, [data.name]: data.value }
    },

    addBoatRules(state, action: PayloadAction<any>) {
      const data = action.payload
      state.listing.rules = [ ...state.listing.rules, data.value]
    },

    setBoatRules(state, action: PayloadAction<any>) {
      const data = action.payload
      const foundElementIndex = state.listing.rules.findIndex(element => element.name === data.name)
      if (foundElementIndex !== null || foundElementIndex !== undefined) {
        let newArr = [ ...state.listing.rules ];
        newArr[foundElementIndex] = data
        state.listing.rules = newArr
      }
    },


    toggleOffAllRules(state) {
      // const data = action.payload
      // state.payload = data;
      // state.loading = false;
      let rules:any[] = state.listing.rules
      let newRules:any = []
      rules.forEach(element => {
        let newElement:any = element
        newElement.value = 0;
        newRules.push(newElement)
      });

      state.listing.rules = newRules;

    },

    createListing(state, action: PayloadAction<any>) {
      const data = action.payload
      state.payload = data;
      state.loading = false;
    },
    createListingSuccessful(state, action: PayloadAction<any>) {
      const data = action.payload
      state.payload = data;
      state.loading = false;
      state.success = true;
    },
    createListingError(state, action: PayloadAction<any>) {
      const data = action.payload
      state.loading = false;
    },

  },
});

export const { actions: listcreationActions } = slice;

export const useListcreationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: listcreationSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useListcreationSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
