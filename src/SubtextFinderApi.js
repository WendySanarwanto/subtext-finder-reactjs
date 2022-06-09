import axios from "axios";

const API_URL= 'https://subtext-finder-api-resource.azure-api.net/v1';

const GetIndexesOfMatchedSubtext = (text, subtext) => {
  console.log(`text: ${text}, subtext: ${subtext}`);
  // /?text=Hello%20Wendy%20Sanarwanto.%20How%20are%20you%20today,%20Wendy%20?&subtext=Wendy
  let apiParams = `/>text=${text}?&subtext=${subtext}`;
  let apiUrl = encodeURI(`${API_URL}${apiParams}`);
  console.log(`apiUrl=${apiUrl}`);
  return axios.get(apiUrl);
};

export default GetIndexesOfMatchedSubtext;