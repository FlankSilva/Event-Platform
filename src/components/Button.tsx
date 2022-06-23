import React from 'react';


interface ButtonProps {
  icon: JSX.Element;
  variant?: 'green' | 'transparent';
  title: string;
  link?: string;
}

const custon = {
  green: {
    bgColor: 'bg-green-500',
    hover: 'hover:bg-green-700'
  },
  transparent: {
    bgColor: 'border border-blue-500',
    hover: 'hover:bg-blue-500',
    text: 'text-blue-500',
    textHover: 'hover:text-gray-900'
  }
}

export const Button: React.FC<ButtonProps> = ({ icon, variant, title, link = '#' }) => {
  const stylesButtonVariant = !!variant ?  Object.values(custon[variant]) : []

  const custonButton = stylesButtonVariant.toLocaleString().replaceAll(',', ' ')

  return (
    <a 
      href={link} 
      className={`
        ${custonButton}
        p-4 
        text-sm 
        flex 
        items-center 
        rounded 
        font-bold 
        uppercase 
        gap-2 
        justify-center 
        transition-colors
      `}
    >
      { icon }
      { title }
    </a>
  )
}
