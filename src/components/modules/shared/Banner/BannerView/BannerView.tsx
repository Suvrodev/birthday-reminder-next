"use client";

import { TBanner } from "@/components/utils/globalTypes/globalTypes";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface IProps {
  bannerImages: TBanner[];
}

const BannerView = ({ bannerImages }: IProps) => {
  console.log("bannerData: ", bannerImages);

  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 2000); // Change the interval time as needed

    return () => clearInterval(interval);
  }, [bannerImages.length, currentIndex]); // Reset interval when currentIndex changes

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleStart = (e: any) => {
    startX.current = e.clientX || e.touches[0].clientX;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMove = (e: any) => {
    if (startX.current === null) return;

    const x = e.clientX || e.touches[0].clientX;
    const deltaX = x - startX.current;

    if (deltaX > 50) {
      // Swipe right
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
      );
      startX.current = null;
    } else if (deltaX < -50) {
      // Swipe left
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
      startX.current = null;
    }
  };

  const handleEnd = () => {
    startX.current = null;
  };

  return (
    <div>
      <div
        className="relative w-full h-[200px] md:h-[400px] overflow-hidden rounded-lg border-[4px] border-white  innerShadw"
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        {bannerImages.map((b: TBanner, index: number) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: "0",
              left: `${index * 100}%`,
              width: "100%",
              height: "100%",
              transition: "transform 0.5s ease",
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
            className=" "
          >
            {/* <BannerContent banner={banner} /> */}
            <Image
              src={b.url}
              alt={b.title}
              fill
              unoptimized
              className="object-fill"
            />
          </div>
        ))}

        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-4 rounded-xl ">
          {bannerImages.map((_, index) => (
            <p
              key={index}
              className={`w-[10px] h-[5px] bg-white rounded-full transition-width duration-500 ease-in-out  ${
                currentIndex === index ? "w-[35px]" : "w-[10px]"
              } `}
            ></p>
          ))}
        </div>
      </div>

      {/* <div className="relative w-full h-[200px] md:h-[400px] overflow-hidden rounded-lg border-[4px] border-white  innerShadw">
        <h1 className="absolute top-1/5 transform -translate-y-1/2 text-[100px] z-10">
          {bannerImages[2]?.title}
        </h1>
        <Image
          src={bannerImages[2]?.url}
          alt="Banner Title"
          fill
          unoptimized
          className="object-fill"
        />
      </div> */}
    </div>
  );
};

export default BannerView;
