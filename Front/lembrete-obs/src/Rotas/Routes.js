import Home from '../Components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>

    )

}

export default RoutesApp;