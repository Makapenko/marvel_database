export async function authenticateWithGoogle(credential) {
  try {
    const response = await fetch('http://localhost:3001/auth/google/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tokenId: credential }),
    })

    if (!response.ok) {
      throw new Error('Failed to authenticate')
    }

    const data = await response.json()
    return data.user
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
