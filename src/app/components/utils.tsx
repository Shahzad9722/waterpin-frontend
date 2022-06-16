

export function paginate(collection:any[], page:any = 1, numItems:any = 10){
  if( !Array.isArray(collection) ) {
    throw `Expect array and got ${typeof collection}`;
  }
  const currentPage = parseInt(page);
  const perPage = parseInt(numItems);
  const offset = (page - 1) * perPage;
  const paginatedItems = collection.slice(offset, offset + perPage);

  return {
    currentPage,
    perPage,
    total: collection.length,
    totalPages: Math.ceil(collection.length / perPage),
    data: paginatedItems
  };
}

export const handleListingEditRedirect = (listing:any, historyProp:any) => {
  
    if (listing === null || listing === undefined) {
      return null;
    }

    if (listing.listing_type_id === 1) {
      historyProp.push('/create-listing/boat/'+listing.listing_id);
    } else if (listing.listing_type_id === 2) {
      historyProp.push('/create-listing/yacht/'+listing.listing_id);
    } else if (listing.listing_type_id === 3) {
      historyProp.push('/create-listing/water-activity/'+listing.listing_id);
    }else{
      historyProp.push('/create-listing/boat/'+listing.listing_id);
    }
};
