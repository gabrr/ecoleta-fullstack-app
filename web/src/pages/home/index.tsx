import React from 'react'

interface HeaderProps {
    title: string
}

const Header: React.FC<HeaderProps> = props => {
    return (
        <div>
            {props.title}
         </div>
    )
}

export default Header
