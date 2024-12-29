import { useState } from 'react'
import { Plus } from 'lucide-react'

interface WishlistItem {
  id: string
  name: string
  price: number
  link: string
  notes?: string
}

interface Wishlist {
  id: string
  name: string
  items: WishlistItem[]
}

export default function Wishlists() {
  const [wishlists, setWishlists] = useState<Wishlist[]>([])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">My Wishlists</h1>
        <button
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          onClick={() => {
            // TODO: Implement create wishlist functionality
            console.log('Create wishlist')
          }}
        >
          <Plus size={20} />
          <span>Create Wishlist</span>
        </button>
      </div>

      {wishlists.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">You haven't created any wishlists yet.</p>
          <p className="text-muted-foreground">Click the button above to create your first wishlist!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlists.map((wishlist) => (
            <div
              key={wishlist.id}
              className="p-6 border rounded-lg hover:border-primary transition-colors cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-2">{wishlist.name}</h3>
              <p className="text-muted-foreground">{wishlist.items.length} items</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
