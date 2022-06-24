import { DefaultUi, Player, Youtube } from '@vime/react';
import { DiscordLogo, FileArrowDown, Image, Lightning } from 'phosphor-react';
import { FC } from 'react';
import { Button } from './Button';
import { CardToDownload } from './CardToDownload';

import { gql, useQuery } from '@apollo/client';
import '@vime/core/themes/default.css';

const GET_LESSON_BY_SLUG_QUERY = gql` 
  query GetLessonBySlug ($slug: String) {
  lesson(where: {slug: $slug}) {
    title
    videoId
    description
    teacher {
      avatarURL
      bio
      name
    }
  }
}
`

interface GetLessonBySlugResponse {
  lesson: {
    title: string;
    videoId: string;
    description: string;
    teacher: {
      avatarURL: string;
      bio: string;
      name: string;
    }
  }
}

interface VideoProps {
  lessonSlug: string;
}

export const Video: FC<VideoProps> = ({ lessonSlug }) => {
  const { data } = useQuery<GetLessonBySlugResponse>(GET_LESSON_BY_SLUG_QUERY, {
    variables: {
      slug: lessonSlug
    }
  })  

  if (!data) {
    return (
      <div className='flex-1'>
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className='flex-1'>
      <div className='bg-black flex justify-center'>
        <div className='h-full w-full max-w-[68.75rem] max-h-[60vh] aspect-video'>
          <Player>
            <Youtube videoId={data.lesson.videoId}/>
            <DefaultUi />
          </Player>
        </div>
      </div>
      <div className='p-8 max-w-[68.75rem] mx-auto'>
          <div className='flex items-start gap-16'>
            <div className='flex-1'>
              <h1 className='text-2xl'>{data.lesson.title}</h1>
              <p className='mt-4 text-gray-200 leading-relaxed'>
                { data.lesson.description }
              </p>
              <div className='flex items-center gap-4 mt-6'>
                <img 
                  className='h-16 w-16 rounded-full border-2 border-blue-500'
                  src={data.lesson.teacher.avatarURL} 
                  alt="" 
                />
                <div className='leading-relaxed'>
                  <strong className='font-bold text-2xl block'>{data.lesson.teacher.name}</strong>
                  <span className='text-gray-200 text-sm block'>{data.lesson.teacher.bio}</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              <Button 
                variant='green' 
                title='Comunidade do Discord'
                icon={<DiscordLogo />}
              /> 
              <Button 
                variant='transparent' 
                title='Acesse o desafio'
                icon={<Lightning />}
              />
            </div>
          </div>
          <div className='gap-8 mt-20 grid grid-cols-2'>
            <CardToDownload 
              icon={<FileArrowDown size={40} />}
              title='Material complementar'
              description='Acesse o material complementar para acelerar o seu desenvolvimento'
              link='#'
            />
            <CardToDownload 
              icon={<Image size={40} />}
              title='Wallpapers exclusivos'
              description='Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina'
              link='#'
            />
          </div>
        </div>
    </div>
  )
}
