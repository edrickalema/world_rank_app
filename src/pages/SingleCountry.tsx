import { useQuery } from "@tanstack/react-query";
import Hero from "../components/Hero";
import { loaderSingleCountry } from "../utils/FetchData";
import { useParams } from "react-router-dom";
import Title from "../components/Title";
import SingleCountryRow from "../components/SingleContryRow";

const SingleCountry = () => {
  const { country_name } = useParams();

  const {
    isError,
    isPending,
    error,
    data: country,
  } = useQuery({
    queryKey: ["country"],
    queryFn: async () => {
      const response = await loaderSingleCountry({ params: { country_name } });
      return response?.data;
    },
  });

  const the_country = country?.length > 0 ? country[0] : {};

  return (
    <main>
      <Hero />
      <section className="max-w-[800px] m-auto bottom-[20px] border-[1px] border-darkSecondary rounded-tl-lg rounded-tr-lg bg-darkPrimary relative">
        {isError && <h1>Error:{error.message} </h1>}
        {isPending ? (
          <h1 className="p-5 text-graySecondary text-center">
            Loading Country Details ...{" "}
          </h1>
        ) : (
          Object.keys(the_country).length > 0 && (
            <div className="text-center h-fit space-y-5 p-5  flex flex-col">
              <h1 className=" relative text-[100px]  bottom-[70px]">
                <span className="w-full">{the_country?.flag}</span>
              </h1>
              <div className="">
                <h1 className="text-xl font-bold pb-5 text-graySecondary">
                  {the_country?.name.common}
                </h1>
                <p className="font-[500] text-graySecondary">
                  {the_country?.name.official}
                </p>
              </div>

              <div className="flex items-center pb-5 justify-center space-x-4">
                <div className="bg-darkSecondary py-4 px-5 w-fit space-x-2 items-center rounded-lg flex justify-between">
                  <Title title="Population" />
                  <div className="w-[1px] h-3 bg-darkPrimary"></div>
                  <p className="text-graySecondary font-bold text-md">
                    {the_country?.population}
                  </p>
                </div>
                <div className="bg-darkSecondary py-4 px-5 w-fit space-x-2 items-center rounded-lg flex justify-between">
                  <Title title="Area (km²)" />
                  <div className="w-[1px] h-3 bg-darkPrimary"></div>
                  <p className="text-graySecondary font-bold text-md">
                    {the_country?.area}
                  </p>
                </div>
              </div>

              {/* Major Details */}

              <div className="">
                <div className="border-t-1">
                  <SingleCountryRow
                    title="Capital"
                    value={the_country?.capital[0]}
                  />

                  <SingleCountryRow
                    title="Subregion"
                    value={the_country?.subregion}
                  />
                  <SingleCountryRow
                    title="Continent"
                    value={the_country?.region}
                  />
                  <SingleCountryRow
                    title="Languages"
                    value={Object.values(the_country?.languages).join(" , ")}
                  />
                </div>
              </div>

              {/* Neighboring countries */}
              <div className="text-left px-5">
                <Title title="Neighboring Countries" />
                {the_country?.borders?.length > 0 ? (
                  the_country?.borders?.map((country: string[]) => {
                    return (
                      <p className="text-graySecondary py-4 font-bold text-md">
                        {country}
                      </p>
                    );
                  })
                ) : (
                  <p className="text-graySecondary py-4 font-bold text-md">
                    {the_country?.name.common} has no neighboring countries
                  </p>
                )}
              </div>
            </div>
          )
        )}
      </section>
    </main>
  );
};

export default SingleCountry;
