import { useState } from 'react'
import { Plus, Users } from 'lucide-react'

interface Group {
  id: string
  name: string
  description: string
  memberCount: number
}

export default function Groups() {
  const [groups, setGroups] = useState<Group[]>([])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">My Groups</h1>
        <div className="flex space-x-4">
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
            onClick={() => {
              // TODO: Implement join group functionality
              console.log('Join group')
            }}
          >
            <Users size={20} />
            <span>Join Group</span>
          </button>
          <button
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            onClick={() => {
              // TODO: Implement create group functionality
              console.log('Create group')
            }}
          >
            <Plus size={20} />
            <span>Create Group</span>
          </button>
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">You're not part of any groups yet.</p>
          <p className="text-muted-foreground">Create a group or join an existing one to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              className="p-6 border rounded-lg hover:border-primary transition-colors cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
              <div className="flex items-center text-muted-foreground">
                <Users size={16} className="mr-2" />
                <span>{group.memberCount} members</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
