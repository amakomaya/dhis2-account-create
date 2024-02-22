import CustomizeSection from "./CustomizeSection";
import FAQSection from "./FAQSection";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import PlanSection from "./PlanSection";
import SupportSection from "./SupportSection";
import WhySection from "./WhySection";


const Home = () => {

    return (
        <>
            <Header />
            <Hero />
            <WhySection />
            <PlanSection />
            <CustomizeSection />
            <FAQSection />
            <SupportSection />
            {/* <Footer /> */}
        </>
    )

}

export default Home;