import axios from "axios";

const API_URL=  'https://subtext-finder-api-resource.azure-api.net/v1';
// const API_URL= 'https://localhost:49155';

const GetIndexesOfMatchedSubtext = (text, subtext) => {
  console.log(`text: ${encodeURIComponent(text)}, subtext: ${encodeURIComponent(subtext)}`);
  let apiParams = `/?text=${ encodeURIComponent(text) }&subtext=${ encodeURIComponent(subtext) }`;
  let apiUrl = `${API_URL}${apiParams}`;
  console.log(`apiUrl=${apiUrl}`);
  return axios.get(apiUrl);
};

export default GetIndexesOfMatchedSubtext;