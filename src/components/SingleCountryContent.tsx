import Title from "./Title";

import { Content } from "../utils/Types";

const SingleCountryContent = (props: Content) => {
  return (
    <div>
      <div className="flex justify-between">
        <Title title={props.title} />
        <p className="text-graySecondary">{props.content}</p>
      </div>
    </div>
  );
};

export default SingleCountryContent;
