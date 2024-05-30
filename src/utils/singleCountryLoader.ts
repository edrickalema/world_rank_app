import axios from "axios";

export const loader = async ({ params }: { params: { name: string } }) => {
  try {
    const data = await axios.get(
      `https://restcountries.com/v3.1/name/${params.name}?fullText=true`
    );
    console.log(params);
    return data;
  } catch (error) {
    console.log(error);
  }
};
