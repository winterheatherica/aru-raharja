import Carousel from "@/components/section/HomePage/Carousel";
import StatsSection from "@/components/section/HomePage/StatsSection";
import ServicesSection from "@/components/section/HomePage/ServicesSection";
import NewsSection from "@/components/section/HomePage/NewsSection";

export default function Page() {
    return (
        <main>
            <Carousel />
            <StatsSection />
            <ServicesSection />
            <NewsSection />
        </main>
    );
}

