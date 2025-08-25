import FormLembrete from './Form-Lembrete'
import List from './List-todo'
import './Home.css'
import { useEffect, useState } from 'react'

function Home() {
    const [lembretes, setLembretes] = useState([])
    const [novoLembrete, setNovoLembrete] = useState("")

    // Carregar lista ao montar
    useEffect(() => {
        fetch("http://localhost:4000/lembretes")
            .then(res => res.json())
            .then(data => {const arr = Object.values(data);
                setLembretes(arr);})
            .catch(error => console.error("Erro ao carregar lembrete", error))
    }, [])

    // Função para adicionar novo lembrete
    const AdicionarLembrete = async (texto) => {
        try {
            if (!texto.trim()) {
                return
            }
            const response = await fetch("http://localhost:4000/lembretes", {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ texto })
            })

            if (!response.ok) {
                throw new Error("Erro ao adicionar Lembrete")
            }

            const novo = await response.json()
            setLembretes(prev => [...prev, novo]) // adiciona sem perder os existentes
            setNovoLembrete("")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <h1>LEMBRETE</h1>
            <FormLembrete onAdd={AdicionarLembrete} dataToSend={novoLembrete} setDataToSend={setNovoLembrete} />
            <List lembrete={lembretes} />
        </>
    )
}

export default Home
