import type React from "react"
import Image from "next/image"

interface Client {
  id: number
  name: string
  logo: string
}

interface ClientsProps {
  clients: Client[]
}

const Clients: React.FC<ClientsProps> = ({ clients }) => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex flex-wrap items-center justify-center max-w-5xl">
        {clients.map((client) => (
          <div key={client.id} className="mx-4 my-2">
            {/* تعديل كيفية عرض شعارات العملاء */}
            <div className="relative w-16 h-16 mr-4 overflow-hidden rounded-full">
              <Image
                src={client.logo || "/placeholder.svg"}
                alt={client.name}
                fill
                className="object-cover"
                unoptimized // إضافة هذه الخاصية للصور الخارجية
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Clients
