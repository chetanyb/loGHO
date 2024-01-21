import Button from "../components/common/Button";
import GHOToken from "../assets/svg/GHO_Token.svg";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="mx-auto text-center">
      <h1 className="text-6xl font-bold my-8 font-uni-neue-black text-white">
        Welcome to <span className="font-uni-neue-light">loGHO</span>
      </h1>
      <div className="pt-4 pb-40 text-gho-dark-primary">
        YOUR FIAT - YOUR GHO
      </div>
      <div className="flex justify-center">
        <img
          src={GHOToken}
          alt="GHO Token"
          className="token-float w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6"
        />
      </div>
      <Button onClick={handleButtonClick} className=" my-10">
        Let's get <span className="font-geospeed text-2xl">GHOing</span>
      </Button>
    </div>
  );
};

export default HomePage;
