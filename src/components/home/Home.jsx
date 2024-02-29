import CustomizeSection from "./CustomizeSection";
import FAQSection from "./FAQSection";
import Hero from "./Hero";
import Navbar from "./Navbar";
import PlanSection from "./PlanSection";
import SupportSection from "./SupportSection";
import WhySection from "./WhySection";

const Home = () => {

    return (
        <>
            <Navbar/>
            <Hero />
            <WhySection />
            <PlanSection />
            <CustomizeSection />
            <FAQSection />
            <SupportSection />
        </>
    )

}

export default Home;