import { useState, useEffect } from 'react'
import { Plus, Link as LinkIcon, Check, Copy } from 'lucide-react'
import { createGroup, createInvite, getMyGroups, type Group } from '../lib/groups'
import { toast } from 'react-hot-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../components/ui/dialog'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

export default function Groups() {
  const [groups, setGroups] = useState<Group[]>([])
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')
  const [newGroupDescription, setNewGroupDescription] = useState('')
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [inviteCode, setInviteCode] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groups = await getMyGroups()
        setGroups(groups)
      } catch (error) {
        console.error('Failed to fetch groups:', error)
        toast.error('Failed to load groups')
      }
    }
    fetchGroups()
  }, [])

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) {
      toast.error('Please enter a group name')
      return
    }

    try {
      const group = await createGroup(newGroupName.trim(), newGroupDescription.trim())
      setGroups([...groups, group])
      toast.success('Group created successfully!')
      setShowCreateDialog(false)
      setNewGroupName('')
      setNewGroupDescription('')
    } catch (error: any) {
      console.error('Failed to create group:', error)
      if (error.message) {
        toast.error(error.message)
      } else if (error.code) {
        toast.error(`Database error: ${error.code}`)
      } else {
        toast.error('Failed to create group')
      }
    }
  }

  const handleCreateInvite = async (groupId: string) => {
    try {
      const code = await createInvite(groupId)
      setInviteCode(code)
      setShowInviteDialog(true)
    } catch (error) {
      console.error(error)
      toast.error('Failed to create invite')
    }
  }

  const copyInviteLink = async () => {
    try {
      const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
      await navigator.clipboard.writeText(`${baseUrl}/groups/join/${inviteCode}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Invite link copied!');
    } catch (error) {
      toast.error('Failed to copy link');
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">My Groups</h1>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Create Group
        </Button>
      </div>

      {groups.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">You haven't created or joined any groups yet.</p>
          <p className="text-muted-foreground">Create a group to start managing gifts together!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              className="p-6 border rounded-lg space-y-4 hover:border-primary transition-colors group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {group.name}
                  </h3>
                  {group.description && (
                    <p className="text-muted-foreground mt-1">{group.description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCreateInvite(group.id)}
                  title="Create invite link"
                >
                  <LinkIcon className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Group Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
            <DialogDescription>
              Create a group to start managing gifts with friends and family.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Group Name</div>
              <Input
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Enter group name"
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Description (optional)</div>
              <Input
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
                placeholder="Enter group description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateGroup}>Create Group</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Invite Link Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Invite Link</DialogTitle>
            <DialogDescription>Share this link with others to invite them to join the group</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Input
              value={`${window.location.origin}/groups/join/${inviteCode}`}
              readOnly
              className="flex-1"
            />
            <Button onClick={copyInviteLink} size="icon">
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
