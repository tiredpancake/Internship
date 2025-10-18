export interface Props{
    tilte:string 
    color?:string
}


const Header=(props:Props) =>
{
    return (
        <header>
           <h1 style={{color :props.color? props.color:'blue'}} >{props.tilte}</h1>
        </header>

    )
}

export default Header;