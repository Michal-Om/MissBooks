const { useState } = React

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { Team } from "./cmps/Team.jsx"
import { Vision } from "./cmps/Vision.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookEdit } from "./pages/BookEdit.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { NotFound } from "./cmps/NotFound.jsx"

const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

export function RootCmp() {


    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main>
                    <Routes>
                        {/*checks matching url from top to bottom */}
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home/>} />
                        {/*what's the path url and which component or element to render*/}
                        <Route path="/about" element={<About />}>
                            <Route path="/about/team" element={<Team />} />
                            <Route path="/about/vision" element={<Vision />} />
                        </Route>
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        {/*When the URL matches /book/:bookId, React Router renders <BookDetails />. */}
                        <Route path="/book/edit" element={<BookEdit />}></Route>
                        <Route path="/book/edit/:bookId" element={<BookEdit />}></Route>
                        {/*if there's id in the params I will show the details of it*/}
                        
                        <Route path="*" element={<NotFound />}/>

                    </Routes>
                </main>
                <UserMsg />
            </section>

        </Router>
    )
} 