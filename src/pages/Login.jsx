import { Link, useNavigate} from "react-router-dom"
import { login } from "../store/slices/user.slice";
import { useDispatch } from "react-redux";
import ContainerAuth from "../components/layouts/ContainerAuth";



const Login = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handlesubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    dispatch (login(data, navigate)) 
  };


  return (
    <ContainerAuth>
      <div className="hidden md:block">
          <img className="max-w-[400px]" src="/images/loginimg.png" alt="" />
        </div>
        <main>
         
          <form onSubmit={handlesubmit} 
          className="grid gap-5">
            <h2 className="text-3xl uppercase font-semibold">Iniciar sesion</h2>
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
              Entar
            </button>
            <Link to="/register" className="max-w-max mx-auto text-sm underline">
              Crear cuenta nueva
            </Link>
          </form>
        </main>
      
    </ContainerAuth>
  )
}

export default Login
