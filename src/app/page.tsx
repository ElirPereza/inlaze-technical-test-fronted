import CategoryMovie from "@/components/principal/categorias";
import Filter from "@/components/principal/filter";
import MainBanner from "@/components/principal/main-banner";

export default function Home() {
  return (
    <div className="">
      <MainBanner />
      <div className="flex-col w-full sm:flex md:flex-row ">
        <Filter />
        <CategoryMovie/>
      </div>
    </div>
  );
}
