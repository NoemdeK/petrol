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
        <Navigation />
        <div className="min-h-screen max-w-7xl mx-auto">
            {children} 
        </div>
        <Partners />
        <Footer />                
      </section>
    );
  }
  