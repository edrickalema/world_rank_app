import { Link } from "react-router-dom";
import Hero_Text_Image from "../assets/Logo.svg";
const Hero = () => {
  return (
    <div className="w-full">
      <section className="bg-hero-pattern z-50 h-[300px] flex flex-col items-center justify-center">
        <Link to="/">
          <img src={Hero_Text_Image} alt="logo_image" />
        </Link>
      </section>
    </div>
  );
};

export default Hero;
