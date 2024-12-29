import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { joinGroupWithCode } from '../lib/groups'
import { toast } from 'react-hot-toast'

export default function JoinGroup() {
  const { code } = useParams()
  const navigate = useNavigate()
  const [isJoining, setIsJoining] = useState(false)

  useEffect(() => {
    const join = async () => {
      if (!code || isJoining) return
      setIsJoining(true)

      try {
        await joinGroupWithCode(code)
        toast.success('Successfully joined group!')
        navigate('/groups')
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error('Failed to join group')
        }
        navigate('/groups')
      }
    }

    join()
  }, [code, navigate])

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Joining Group...</h1>
        <p className="text-muted-foreground">Please wait while we process your invitation.</p>
      </div>
    </div>
  )
}
