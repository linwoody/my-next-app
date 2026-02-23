import clientPromise from '@/lib/mongodb'

const About = async () => {
  let status = 'Connecting...'
  try {
    const client = await clientPromise
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    status = 'Pinged your deployment. You successfully connected to MongoDB!'
  } catch (error) {
    console.error('MongoDB connection error in About page:', error)
    status = 'Failed to connect to MongoDB.'
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>About Page</h1>
      <p>Database Status: {status}</p>
      <div style={{ marginTop: '2rem' }}>
        <a href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>
          ← Back Home
        </a>
      </div>
    </div>
  )
}

export default About
