import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ContainerAuth from "../components/layouts/ContainerAuth";


const BASE_URL = "https://backend-final-project-dev-bxzs.3.us-1.fl0.io";

const Register = () => {
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    axios
      .post(BASE_URL + "/api/auth/register", data)
      .then(() => {
        alert("usuario creado correctamente");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <ContainerAuth
      className="bg-dark text-white h-screen overflow-auto font-Urbanist p-4
     flex justify-center items-center bg-[url(/images/backregister-mobile.png)] 
      md:bg-[url(/images/backregister-deskpot.png)]    bg-no-repeat bg-right-bottom"
    >
      <div className="hidden md:block">
        <img className="max-w-[400px]" src="/images/registerimg.png" alt="" />
      </div>
      <main>
        <form onSubmit={handlesubmit} className="grid gap-5">
          <h2 className="text-3xl uppercase font-semibold">Cuenta Nueva</h2>
          <label className=" grid gap-4">
            <span className="text-white/40 text-sm">E-mail</span>
            <input
              className="bg-transparent border-b border-secondary outline-none rounded-md"
              type="email"
              name="email"
              required
            />
          </label>
          <label className=" grid gap-4">
            <span className="text-white/40 text-sm">Nombre de usuario</span>
            <input
              className="bg-transparent border-b border-secondary outline-none text-lg rounded-md"
              type="text"
              name="name"
              required
            />
          </label>
          <label className=" grid gap-4">
            <span className="text-white/40 text-sm">Contraseña</span>
            <input
              className="bg-transparent border-b border-secondary outline-none text-lg rounded-md"
              type="password"
              name="password"
              required
            />
          </label>
          <button
            className="bg-primary-light uppercase font-semibold p-1
            max-w-max px-8 rounded-full mx-auto mt-8 shadow-lg  shadow-purple-400/30
            hover:shadow-xl hover:shadow-purple-400/30  hover:tracking-widest transitios-all"
          >
            Crear
          </button>
          <Link to="/login" className="max-w-max mx-auto text-sm underline">
            Iniciar sesion
          </Link>
        </form>
      </main>
    </ContainerAuth>
  );
};

export default Register;
