// import { baseVar } from "@/components/utils/Function/baseApiFromenv";
import BannerView from "./BannerView/BannerView";

const Banner = async () => {
  // const res = await fetch(`${baseApiFromEnv()}/dummyB`, {
  // const res = await fetch(`${baseVar}/dummyB`, {
  const res = await fetch(
    `https://tutor-point-backend-ten.vercel.app/v1/api/dummyB`,
    {
      next: {
        revalidate: 30,
        tags: ["banner"],
      },
    }
  );
  const data = await res?.json();
  console.log("Banner data: ", data);

  return (
    <div>
      <BannerView bannerImages={data} />
    </div>
  );
};

export default Banner;
