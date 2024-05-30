import axios from "axios";

const url = "https://restcountries.com/v3.1/all";

export const FetchData = async () => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};

export const loaderSingleCountry = async ({
  params,
}: {
  params: { country_name: string | undefined };
}) => {
  try {
    const data = await axios.get(
      `https://restcountries.com/v3.1/name/${params.country_name}?fullText=true`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
