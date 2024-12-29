import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

export default function JoinGroup() {
  const navigate = useNavigate()

  useEffect(() => {
    toast.error('This feature is not available yet')
    navigate('/groups')
  }, [navigate])

  return null
}
