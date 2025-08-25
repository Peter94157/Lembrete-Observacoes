import Home from '../Components/Home'
import HomeObs from '../Components/HomeObs'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Observacao" element={<HomeObs />} />
            </Routes>
        </BrowserRouter>

    )

}

export default RoutesApp;