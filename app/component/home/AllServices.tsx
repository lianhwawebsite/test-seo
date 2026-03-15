"use client";
import { ServiceFirst } from "@/app/component/home/ServiceFirst";
import { ServiceSecond } from "@/app/component/home/ServiceSecond";
import { ServiceThird } from "@/app/component/home/ServiceThird";
import { ServiceFourth } from "@/app/component/home/ServiceFourth";
import { AllData } from "@/app/lib/types";
import PageTransition from "../PageTransition";

export const AllServices = ({ allData }: { allData: AllData }) => {
  const { title, description, imgSrcPc, imgSrcMo, services } = allData.home;
  const productPage = allData.navbarItems[1];
  
  return (
    <>
      <PageTransition>
        <ServiceFirst title={title} description={description} imgSrcPc={imgSrcPc} imgSrcMo={imgSrcMo} />
        <ServiceSecond data={services[0]} />
        <ServiceThird data={services[1]} productPage={productPage} />
        <ServiceFourth data={services[2]} />
      </PageTransition>
    </>
  );
};
