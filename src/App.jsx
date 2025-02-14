import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Details from './pages/Details'
import Error from './pages/Error'

import MainLayout from "./layouts/MainLayout"

function App() {
    return (
        <>
            <Routes>
                <Route index element={
                    <MainLayout>
                        <Home />
                    </MainLayout>
                } />

                <Route path='/:crypto' element={
                    <MainLayout>
                        <Details />
                    </MainLayout>
                } />

                <Route path='*' element={
                    <Error />
                } />
            </Routes>
        </>
    )
}

export default App