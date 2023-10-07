// assets
import { ChromeOutlined, QuestionOutlined, FireOutlined, BugOutlined, NotificationOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined,
  FireOutlined,
  BugOutlined,
  NotificationOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'firemap',
  title: 'Fire Tools',
  type: 'group',
  children: [
    {
      id: 'fire-map',
      title: 'Fire Map',
      type: 'item',
      url: '/fire-map',
      icon: icons.FireOutlined
    },
    {
      id: 'fire-report',
      title: 'Fire Report',
      type: 'item',
      url: '/fire-report',
      icon: icons.BugOutlined
    },
    {
      id: 'fire-alert',
      title: 'Fire Alert',
      type: 'item',
      url: '/fire-alert',
      icon: icons.NotificationOutlined
    }
  ]
};

export default support;
