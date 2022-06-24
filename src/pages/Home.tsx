import { gql, useMutation } from '@apollo/client';
import React, { FormEvent, useState } from 'react';
import { Logo } from '../components/Logo';

// import { Container } from './styles';

const CREATE_SUBSCRIBER_MUTATION = gql`
  mutation CreateSubscribe ($name: String!, $email: String!) {
  createSubscriber(data: {name: $name, email: $email}) {
    id
  }
}
`

export const Home: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [createSubscriber] = useMutation(CREATE_SUBSCRIBER_MUTATION)

  const hanbleSubscribe = (event: FormEvent) => {
    event.preventDefault()

    createSubscriber({
      variables: {
        name,
        email
      }
    })
  }

  return (
    <div className='min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center'>
      <div className='w-full max-w-[68.75rem] flex items-center justify-between mt-20 mx-auto'>
        <div className='max-w-[40rem]'>
          <Logo />
          <h1 className='mt-8 text-[2.5rem] leading-tight'>
            Construa uma <strong className='text-blue-500'>aplicação completa</strong>, do zero, com <strong className='text-blue-500'>React</strong>
          </h1>
          <p className='mt-4 text-gray-200 leading-relaxed'>
            Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta 
            demanda para acessar as melhores oportunidades do mercado.
          </p>
        </div>
        <div className='p-8 bg-gray-700 border border-gray-500 rounded'>
          <strong className='text-2xl mb-6 block'>Inscreva-se gratuitamente</strong>

          <form onSubmit={hanbleSubscribe} action="" className='flex flex-col gap-2 w-full'>
            <input 
              className='bg-gray-900 rounded px-5 h-14'
              type="text" 
              placeholder='Seu nome completo'
              onChange={e => setName(e.target.value)}
            />
            <input 
              className='bg-gray-900 rounded px-5 h-14'
              type="text" 
              placeholder='Digite seu e-mail'
              onChange={e => setEmail(e.target.value)}
            />

            <button
              type='submit'
              className='mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors'
            >
              Garantir minha vaga
            </button>
          </form>
        </div>
      </div>
      <img src="/src/assets/code-mockado.png" alt="" className='mt-10' />
    </div>
  )
}
