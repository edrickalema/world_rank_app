import Title from "./Title";

const SingleCountryRow = ({
  title,
  value,
}: {
  title: string;
  value: string | string[];
}) => {
  return (
    <div className="border-t-2 border-darkSecondary">
      <div className="p-5 flex justify-between ">
        <Title title={title} />
        <p className="text-graySecondary font-bold">{value}</p>
      </div>
    </div>
  );
};

export default SingleCountryRow;
