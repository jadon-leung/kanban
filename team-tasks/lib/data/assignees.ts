export interface Assignee {
  id: string
  name: string
  email: string
  avatar: string
  initials: string
  role: string
  status: "active" | "away" | "busy"
}

// Using DiceBear API for consistent, professional avatars
// Alternative: https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff
export const assignees: Assignee[] = [
  {
    id: "alice-johnson",
    name: "Alice Johnson",
    email: "alice.johnson@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice&backgroundColor=b6e3f4,c0aede,d1d4f9",
    initials: "AJ",
    role: "Frontend Developer",
    status: "active"
  },
  {
    id: "bob-smith",
    name: "Bob Smith", 
    email: "bob.smith@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob&backgroundColor=b6e3f4,c0aede,d1d4f9",
    initials: "BS",
    role: "Backend Developer",
    status: "active"
  },
  {
    id: "charlie-brown",
    name: "Charlie Brown",
    email: "charlie.brown@company.com", 
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie&backgroundColor=b6e3f4,c0aede,d1d4f9",
    initials: "CB",
    role: "Full Stack Developer",
    status: "busy"
  },
  {
    id: "diana-prince",
    name: "Diana Prince",
    email: "diana.prince@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana&backgroundColor=b6e3f4,c0aede,d1d4f9",
    initials: "DP", 
    role: "Product Manager",
    status: "active"
  },
  {
    id: "ethan-hunt",
    name: "Ethan Hunt",
    email: "ethan.hunt@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan&backgroundColor=b6e3f4,c0aede,d1d4f9",
    initials: "EH",
    role: "DevOps Engineer", 
    status: "away"
  },
  {
    id: "fiona-gallagher",
    name: "Fiona Gallagher",
    email: "fiona.gallagher@company.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fiona&backgroundColor=b6e3f4,c0aede,d1d4f9",
    initials: "FG",
    role: "UX Designer",
    status: "active"
  },
  {
    id: "unassigned",
    name: "Unassigned",
    email: "",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Unassigned&backgroundColor=f3f4f6",
    initials: "?",
    role: "No assignee",
    status: "active"
  }
]

// Helper functions
export const getAssigneeById = (id: string): Assignee | undefined => {
  return assignees.find(assignee => assignee.id === id)
}

export const getAssigneeByName = (name: string): Assignee | undefined => {
  return assignees.find(assignee => 
    assignee.name.toLowerCase() === name.toLowerCase()
  )
}

export const getActiveAssignees = (): Assignee[] => {
  return assignees.filter(assignee => assignee.id !== "unassigned")
}

export const getAssigneeSelectOptions = () => {
  return assignees.map(assignee => ({
    value: assignee.id,
    label: assignee.name,
    avatar: assignee.avatar,
    initials: assignee.initials,
    role: assignee.role,
    status: assignee.status
  }))
} 