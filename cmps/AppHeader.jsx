
const { Link, NavLink } = ReactRouterDOM
//special cmps from ReactRouterDOM
// both render normal <a> listen to it and control/handle it
//Link changes the url and re-renders the RootCmp. 
//NavLink better for screen readers and for main nav links
export function AppHeader() {

    return (
        <header className="app-header container">
            <section>
                <h1>React Book App</h1>
                <nav className="app-nav">
                    <NavLink to="/home" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/book">Books</NavLink>
                </nav>
            </section>
        </header>
    )
}