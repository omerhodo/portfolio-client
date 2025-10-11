import { ReactNode } from 'react';

interface TabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabs: TabConfig[];
}

interface TabConfig {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

const TabButton = ({
  label,
  icon,
  isActive,
  onClick,
}: {
  label: string;
  icon?: ReactNode;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    style={{
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderBottom: isActive ? '3px solid #007bff' : '3px solid transparent',
      backgroundColor: isActive ? '#f8f9fa' : 'transparent',
      color: isActive ? '#007bff' : '#666',
      cursor: 'pointer',
      fontSize: '0.95rem',
      fontWeight: isActive ? '600' : '500',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    }}
    onMouseEnter={(e) => {
      if (!isActive) {
        e.currentTarget.style.backgroundColor = '#f8f9fa';
        e.currentTarget.style.color = '#333';
      }
    }}
    onMouseLeave={(e) => {
      if (!isActive) {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = '#666';
      }
    }}
  >
    {icon && <span>{icon}</span>}
    {label}
  </button>
);

const Tabs = ({ activeTab, onTabChange, tabs }: TabsProps) => {
  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid #ddd',
          gap: '0.5rem',
          marginBottom: '2rem',
          overflowX: 'auto',
        }}
      >
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            label={tab.label}
            icon={tab.icon}
            isActive={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          />
        ))}
      </div>
      <div>{activeTabContent}</div>
    </div>
  );
};

export default Tabs;
