import Button from '@/components/Button'
import { Input } from '@/components/Input'
import { authUser } from '@/features/auth'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { useState } from 'react'

export const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginMutation = useMutation({ mutationFn: authUser })

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'email') setEmail(e.target.value)
    if (e.target.type === 'password') setPassword(e.target.value)
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const token = await loginMutation.mutateAsync({ email, password })
      Cookies.set('token', token)
      navigate('/dashboard')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || 'An error occurred')
      }
    }
  }

  return (
    <div className='flex flex-col items-center mt-36'>
      <form onSubmit={handleLogin} className='flex flex-col w-[300px] gap-2'>
        <Input type='email' placeholder='Email' value={email} onChange={handleInput} required />
        <Input type='password' placeholder='Password' value={password} onChange={handleInput} required />
        <Button type='submit' disabled={loginMutation.isPending}>
          Login
        </Button>
      </form>
    </div>
  )
}
