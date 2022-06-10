import axios from "axios";

const API_URL= 'https://subtext-finder-api-resource.azure-api.net/v1';

const GetIndexesOfMatchedSubtext = (text, subtext) => {
  console.log(`text: ${text}, subtext: ${subtext}`);
  let apiParams = `/?text=${text}&subtext=${subtext}`;
  let apiUrl = encodeURI(`${API_URL}${apiParams}`);
  console.log(`apiUrl=${apiUrl}`);
  return axios.get(apiUrl);
};

export default GetIndexesOfMatchedSubtext;