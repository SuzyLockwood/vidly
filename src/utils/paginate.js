//utility folder so we can reuse these
import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
  //calculate starting index of items on page
  const startIndex = (pageNumber - 1) * pageSize;

  //in order to call and chain lodash methods that we mention below, we first have to take our array and convert using a lodash wrapper like this -- and then the value method converts the lodash object into a regular array
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();

  /*
     _.slice(items, startIndex)
    --method in lodash that will slice array starting from the index stated

    _.take()
    --method in lodash that will pick a number of items for current page

    */
}
