export type NavItem = {
  to: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export type Notification = {
  id: string;
  title: string;
  description?: string;
  time?: string;
  unread?: boolean;
  createdAt: string;
  message: string;
  read: boolean;
}; 