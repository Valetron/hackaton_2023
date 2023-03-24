import HeaderItem from "./HeaderItem"

interface navbarTitleProps {
  name: string
  icon: string
  link: string
}

export default function HeaderList() {

  const navbarTitles = [
    {
      name: 'Камеры',
      icon: 'uil uil-video',
      link: '/cameras'
    },
    {
      name: 'Уведомления',
      icon: 'uil uil-exclamation-triangle',
      link: '/warnings'
    },
    {
      name: 'Настройки',
      icon: 'uil uil-setting',
      link: '/settings'
    }
  ]

  return (
    <>
      {navbarTitles.map(({ name, icon, link }: navbarTitleProps, index: number) => (
        <HeaderItem key={index} name={name} iconName={icon} link={link} />
      ))
      }
    </>
  )
}
