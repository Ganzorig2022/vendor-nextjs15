import React from 'react'

type MainContentProps = {
  leftTitle?: string | React.JSX.Element
  rightTitle?: string
  children: React.ReactNode
  leftContent?: React.JSX.Element
  rightContent?: React.JSX.Element
}

export const MainContent = ({
  leftTitle,
  rightTitle,
  children,
  leftContent,
  rightContent,
}: MainContentProps) => {
  return (
    <div className="m-5">
      <div className={`flex items-center m-5 justify-between`}>
        <div className="flex gap-2 items-center">
          <h1 className="text-lg font-semibold">{leftTitle}</h1>
          <div>{leftContent}</div>
        </div>
        <div className="flex gap-2 items-center">
          <h1 className="text-lg">{rightTitle}</h1>
          <div>{rightContent}</div>
        </div>
      </div>
      {children}
    </div>
  )
}