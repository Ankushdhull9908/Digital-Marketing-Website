
function Createtoken(color)
{
        let token = document.createElement('div')
        token.style.height = '20px'
        token.style.width = '20px'
        token.style.borderRadius = '50%'
        token.style.boxShadow = '0px 0px 20px 0px black'
        token.style.backgroundColor= color
        return token
}


export const PlayerTokens = {'blue':Createtoken('blue'),'red':Createtoken('red'),
        'green':Createtoken('green'),'yellow':Createtoken('yellow')
}





