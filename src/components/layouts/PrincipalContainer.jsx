import Header from "../shared/Header";

const PrincipalContainer = ({ children, isPlubic = false  }) => {
  return (
    <section
      className="bg-dark text-white h-screen overflow-auto font-Urbanist 
  bg-[url(/images/backregister-mobile.png)]  md:bg-[url(/images/backregister-deskpot.png)]
   bg-no-repeat bg-right-bottom grid grid-rows-[auto_1fr] overflow-x-hidden"
    >
      <Header  isPlubic={isPlubic}/>
      <section className="p-4">
        <main
          className="bg-primary-dark p-8 px-4 rounded-3xl mt-12 max-w-[562px] mx-auto
   sm:px-15"
        >
          {children}
        </main>
      </section>
    </section>
  );
};

export default PrincipalContainer;
