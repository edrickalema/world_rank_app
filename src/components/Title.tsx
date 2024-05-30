type Title = {
  title: string;
};

const Title = (props: Title) => {
  return <h3 className="text-sm text-grayPrimary font-[500]">{props.title}</h3>;
};

export default Title;
