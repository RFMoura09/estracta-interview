import { _authService } from '../../_shared/auth/AuthService'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoginData } from '../../_shared/auth/AuthModels';
import { useLoader } from '../../_shared/ui/loader/LoaderContext';
import { useToast } from '../../_shared/ui/toast/ToastContext';


export default function LoginPage() {

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>()

  const { emitLoader } = useLoader()
  const { emitToast } = useToast()

  const login = async (model: LoginData) => {
    try {
      emitLoader(true)
      await _authService.login(model)

      emitLoader(false)
      navigate('/dashboard')
    } catch {
      emitLoader(false)
      emitToast('Um erro ocorreu! Tente novamente!')
    }
  } 

  return (
    <div className="w-screen h-screen flex justify-center items-center overflow-hidden bg-main">
      <form 
        className="w-10/12 md:w-5/12 lg:w-4/12 2xl:w-3/12 aspect-square bg-white rounded-lg flex flex-col justify-between shadow-md p-5 lg:p-10 text-gray-600"
        onSubmit={handleSubmit(login)}
      >
        <p className='text-center text-3xl mb-3 md:mb-6 lg:mb-8 text-blue-600'>Login</p>
        <div className='flex-grow'>
          <label>
            <span>Usuário</span>
            <input type="text" {...register('username', { required: true, minLength: 5 })} />
            {errors?.username && <p className='error'>Usuário precisa ter no mínimo 5 caracteres</p>}
          </label>
          <label>
            <span>Senha</span>
            <input type="text" {...register('password', { required: true, minLength: 10 })} />
            {errors?.password && <p className='error'>Senha precisa ter no mínimo 10 caracteres</p>}
          </label>
        </div>
        <div className='flex'>
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  )
}
