import React, { useEffect, useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import logo from './logo.svg'

function Home() {
    return <div>Home</div>
}

function Products() {
    const [data, setData] = useState({})
    const getProducts = async (): Promise<void> => {
        try {
            const response: Response = await fetch(`/api/products`)

            if (!response.ok) {
                throw await response.json()
            }

            setData(await response.json())
        } catch (error) {
            console.log(error)
            setData({})
        }
    }
    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div>
            <div>Products</div>
            <pre>{JSON.stringify(data, null, 4)}</pre>
        </div>
    )
}

function Nav() {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Products</NavLink>
        </nav>
    )
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload----
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <Nav />
            </header>
            <main>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/products" element={<Products />} />
                </Routes>
            </main>
        </div>
    )
}

function Application() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )
}

export default Application
