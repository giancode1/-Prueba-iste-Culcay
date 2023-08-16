import { useState, useEffect } from 'react'
 
export default function Home() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
 
  useEffect(() => {
    fetch('/api/products')
    // fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })

  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>

  return (
    <main>
      <h1>Hello Gian Culcay</h1>
      {/* <div>
        {data}
      </div> */}
      {
        data && <p>{JSON.stringify(data)}</p>
      }
    </main>
  )
}
