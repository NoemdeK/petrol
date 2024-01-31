import Footer from "@/components/Footer";
import Navigation from "./components/Navigation";
import Partners from "@/components/sections/Partners";

export default  async function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  
  
  
  
    
    return (
      <section className="w-full">
        <div className="w-screen fixed top-0 left-0 bg-white">
          <Navigation />
        </div>
        <div className=" max-w-7xl mx-auto pt-28">
            {children} 
        </div>
        <Partners />
        <Footer />                
      </section>
    );
  }
  