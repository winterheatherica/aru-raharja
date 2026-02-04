import { ARU_LOCATION } from "./map.config";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export const ARU_MAP_IMAGE_URL = `
https://maps.googleapis.com/maps/api/staticmap
?center=${ARU_LOCATION.coordinates}
&zoom=${ARU_LOCATION.zoom}
&size=800x800
&scale=2
&markers=color:blue|${ARU_LOCATION.coordinates}
&key=${API_KEY}
`.replace(/\s+/g, "");
