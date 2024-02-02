import Footer from "@/components/Footer";
import Navigation from "./components/Navigation";
import Partners from "@/components/sections/Partners";

export default  async function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  
  
  
  
    
    return (
      <section className="w-full flex justify-between flex-col space-x-0 h-full">
          <Navigation />
        <div className="m-0 p-0">
            {children} 
        </div>
        <Partners />
        <Footer />                
      </section>
    );
  }
  