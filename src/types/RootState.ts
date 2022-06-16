import { DashboardState } from 'app/pages/Dashboard/slice/types';
import { ListingState } from 'app/pages/Listings/slice/types';
import { AdminState } from 'app/pages/Admin/slice/types';
import { AccountState } from 'app/pages/Account/slice/types';
import { DestinationsState } from 'app/pages/Destinations/slice/types';
import { MessagesState } from 'app/pages/Messages/slice/types';
import { ProfileState } from 'app/pages/ProfilePage/slice/types';
import { WateractivitiesState } from 'app/pages/WaterActivity/slice/types';
import { BookingState } from 'app/pages/Booking/slice/types';
import { FavoritesState } from 'app/pages/Favorites/slice/types';
import { SupportState } from 'app/pages/HelpCenter/slice/types';
import { AppState } from 'app/slice/types';
import { TripsState } from 'app/pages/Trips/slice/types';
import { ListcreationState } from 'app/pages/Listings/ListingCreation/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  dashboard?: DashboardState;
  listing?: ListingState;
  admin?: AdminState;
  account?: AccountState;
  destinations?: DestinationsState;
  messages?: MessagesState;
  profile?: ProfileState;
  wateractivities?: WateractivitiesState;
  booking?: BookingState;
  favorites?: FavoritesState;
  support?: SupportState;
  app?: AppState;
  trips?: TripsState;
  listcreation?: ListcreationState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
