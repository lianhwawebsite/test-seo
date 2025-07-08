"use client";
import { ServiceFirst } from "@/app/component/home/ServiceFirst";
import { ServiceSecond } from "@/app/component/home/ServiceSecond";
import { ServiceThird } from "@/app/component/home/ServiceThird";
import { ServiceFourth } from "@/app/component/home/ServiceFourth";
import data from "@/data.json";

export const AllServices = () => {
  const { title, description, imgSrcPc, imgSrcMo, services } = data.home;
  const productPage = data.navbarItems.find((page) => page.label === "產品一覽");

  return (
    <>
          <ServiceFirst title={title} description={description} imgSrcPc={imgSrcPc} imgSrcMo={imgSrcMo} />
          <ServiceSecond data={services[0]} />
          <ServiceThird data={services[1]} productPage={productPage} />
          <ServiceFourth data={services[2]} />
    </>
  );
};
