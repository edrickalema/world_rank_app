import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Title from "../components/Title";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FetchData } from "../utils/FetchData";

const Home = () => {
  const [sort_by, setSort] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);
  const [isUn, setIsUn] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [region, setRegion] = useState<{
    asia: string;
    africa: string;
    america: string;
    antartica: string;
    oceania: string;
    europe: string;
    all: string;
  }>({
    asia: "",
    africa: "",
    america: "",
    antartica: "",
    oceania: "",
    europe: "",
    all: "",
  });

  const {
    isError,
    isPending,
    error,
    data: countries,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: FetchData,
  });

  // sorting countries by population, area and region

  countries?.sort(
    (
      a: {
        population: number;
        region: string;
        area: number;
      },
      b: { population: number; region: string; area: number }
    ) => {
      if (sort_by === "population") {
        return b.population - a.population;
      } else if (sort_by === "region") {
        return a.region.localeCompare(b.region);
      } else if (sort_by === "area") {
        return b.area - a.area;
      }
    }
  );

  // Filtering the countries
  const CountryData = countries
    ?.filter((country: { region: string }) => {
      if (region.asia) {
        return country.region === region.asia;
      } else if (region.africa) {
        return country.region === region.africa;
      } else if (region.america) {
        return country.region === region.america;
      } else if (region.oceania) {
        return country.region === region.oceania;
      } else if (region.europe) {
        return country.region === region.europe;
      } else {
        return countries;
      }
    })
    .filter((country: { independent: boolean }) => {
      return country.independent === status;
    })
    .filter((country: { unMember: boolean }) => {
      return country.unMember === isUn;
    })
    .filter((country: { name: { common: string } }) => {
      return country.name.common.toLowerCase().includes(name.toLowerCase());
    });

  if (isError)
    return (
      <div className="">
        <h1 className="text-center text-graySecondary">
          Error Loading: {error.message}
        </h1>
      </div>
    );

  return (
    <main className="">
      <div className="relative">
        <Hero />

        <section className="max-w-[1000px]  relative bg-darkPrimary overflow-auto max-h-screen bottom-10 m-auto border-[1px] border-grayPrimary rounded-md p-[25px]">
          <div className="flex mb-5 items-center justify-between text-grayPrimary">
            {/* Header */}
            <h1 className="text-md font-bold ">
              Found {CountryData?.length} countries
            </h1>
            <div className="flex items-center space-x-3 px-5 py-2  w-fit justify-between rounded-md bg-darkSecondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <input
                className="bg-transparent text-sm text-graySecondary  w-full outline-none"
                type="text"
                name="search"
                placeholder="Search by Name, Region, Subregion"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex  max-sm:block w-full space-x-1 justify-between gap-4">
            {/* Filter form container */}
            <div className=" max-md:max-w-[300px] flex-shrink">
              <form className="text-grayPrimary w-[100%]">
                {/* Sorting by population etc */}
                <div className="">
                  <div className="mb-5">
                    <Title title="Sort By" />
                  </div>

                  <select
                    className="p-2 w-full border-2 mt-2  border-darkSecondary rounded-md bg-transparent"
                    name="sort_by"
                    id="sort_countries"
                    onChange={(e) => setSort(e.target.value)}
                    defaultValue="population"
                  >
                    <option value="population">Population</option>
                    <option value="region">Region</option>
                    <option value="area">Area</option>
                  </select>
                </div>

                {/* Sorting by regions */}
                <div className="my-8">
                  <div className="mb-8">
                    <Title title="Regions" />
                  </div>

                  <div className="flex flex-wrap gap-3 space-y-3 items-center ">
                    <div className="">
                      {" "}
                      <label className="bg-darkSecondary font-bold text-graySecondary  cursor-pointer  text-sm  px-5 py-2 rounded-xl w-[80px]">
                        <input
                          className="hidden"
                          type="checkbox"
                          name="america"
                          value="Americas"
                          onChange={(e) =>
                            setRegion({
                              ...region,
                              america: e.target.value,
                            })
                          }
                        />
                        Americas
                      </label>
                    </div>
                    <div className="">
                      <label className="bg-darkSecondary font-bold text-graySecondary  cursor-pointer  text-sm  px-5 py-2 rounded-xl w-[80px]">
                        <input
                          className="hidden"
                          type="checkbox"
                          name="africa"
                          value="Africa"
                          onChange={(e) =>
                            setRegion({
                              ...region,
                              africa: e.target.value,
                            })
                          }
                        />
                        Africa
                      </label>
                    </div>
                    <div className="">
                      <label className="bg-darkSecondary font-bold text-graySecondary  cursor-pointer   text-sm  px-5 py-2 rounded-xl w-[80px]">
                        <input
                          className="hidden"
                          type="checkbox"
                          name="oceania"
                          value="Oceania"
                          onChange={(e) =>
                            setRegion({
                              ...region,
                              oceania: e.target.value,
                            })
                          }
                        />
                        Oceania
                      </label>
                    </div>
                    <div className="">
                      <label className="bg-darkSecondary font-bold text-graySecondary  cursor-pointer  text-sm  px-5 py-2 rounded-xl w-[80px]">
                        <input
                          className="hidden"
                          type="checkbox"
                          name="asia"
                          value="Asia"
                          onChange={(e) =>
                            setRegion({
                              ...region,
                              asia: e.target.value,
                            })
                          }
                        />
                        Asia
                      </label>
                    </div>
                    <div className="">
                      <label className="bg-darkSecondary font-bold text-graySecondary  cursor-pointer text-sm  px-5 py-2 rounded-xl  w-[80px]">
                        <input
                          className="hidden"
                          type="checkbox"
                          name="antartica"
                          value="Antartica"
                          onChange={(e) =>
                            setRegion({
                              ...region,
                              antartica: e.target.value,
                            })
                          }
                        />
                        Antartica
                      </label>
                    </div>
                    <div className="">
                      <label className="bg-darkSecondary font-bold text-graySecondary  cursor-pointer text-sm  px-5 py-2 rounded-xl  w-[80px]">
                        <input
                          className="hidden"
                          type="checkbox"
                          name="antartica"
                          value="Europe"
                          onChange={(e) =>
                            setRegion({
                              ...region,
                              europe: e.target.value,
                            })
                          }
                        />
                        Europe
                      </label>
                    </div>
                  </div>
                </div>

                {/* Filter by member status */}
                <div>
                  <div className="mb-8">
                    <Title title="Status" />
                  </div>

                  <div className="">
                    <div className="flex mb-5 space-x-2">
                      <input
                        onChange={(e) =>
                          setStatus(e.target.checked ? true : false)
                        }
                        type="checkbox"
                        name="status"
                        id="status"
                        checked={status}
                      />
                      <p className="text-graySecondary text-sm font-[500] ml-2">
                        Independent
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <input
                        onChange={(e) =>
                          setIsUn(e.target.checked ? true : false)
                        }
                        type="checkbox"
                        name="status"
                        id="status"
                        checked={isUn}
                      />
                      <p className="text-graySecondary text-sm font-[500] ml-2">
                        Member of the United Nations
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Country container */}
            <section className="flex-5 w-auto text-graySecondary flex-2 flex-grow ">
              <table className="w-full ">
                <thead>
                  <tr className="border-b border-darkSecondary">
                    <th className="px-6  text-left tracking-wider">
                      <Title title="Flag" />
                    </th>
                    <th className="px-6 py-3 text-left tracking-wider">
                      <Title title="Name" />
                    </th>
                    <th className="px-6 py-3 text-left tracking-wider">
                      <Title title="Population" />
                    </th>
                    <th className="px-6 py-3 text-left tracking-wider">
                      <Title title="Area (km²)" />
                    </th>
                    <th className="px-6 py-3 text-left tracking-wider">
                      <Title title="Region" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isPending ? (
                    <h1 className="p-5 text-graySecondary text-center">
                      Loading Countries ...
                    </h1>
                  ) : CountryData.length === 0 ? (
                    <h1 className="text-graySecondary">No country found</h1>
                  ) : (
                    CountryData.map(
                      (country: {
                        flag: string;
                        name: { common: string };
                        population: number;
                        area: number;
                        region: string;
                      }) => {
                        return (
                          <tr className="text-grayPrimary">
                            <td className="px-6 py-5 text-graySecondary font-medium text-xl ">
                              {country.flag}
                            </td>

                            {/* {`../todo/${_id}`} */}
                            <td className="px-6 text-md py-5 text-graySecondary font-medium  ">
                              <Link to={`countries/${country.name.common}`}>
                                {country.name.common}
                              </Link>
                            </td>

                            <td className="px-6 py-5 text-graySecondary font-medium text-md ">
                              {country.population}
                            </td>
                            <td className="px-6 py-5 text-graySecondary font-medium text-md ">
                              {country.area}
                            </td>
                            <td className="px-6 py-5 text-graySecondary font-medium text-md ">
                              {country.region}
                            </td>
                          </tr>
                        );
                      }
                    )
                  )}
                </tbody>
              </table>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
