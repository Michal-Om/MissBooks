const { useState } = React

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"

const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

export function RootCmp() {


    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main>
                    <Routes>
                        {/*checks matching url from top to bottom */}
                        <Route path="/" element={<Home/>} />
                        {/*what's the path url and which component or element to render*/}
                        <Route path="/about" element={<About/>} />
                        <Route path="/book" element={<BookIndex/>} />
                        <Route path="/book/:bookId" element={<BookDetails/>}/>
                        {/*When the URL matches /book/:bookId, React Router renders <BookDetails />. */}
                    </Routes>
                </main>
            </section>
        </Router>
    )
} 