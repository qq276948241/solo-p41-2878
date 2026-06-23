export interface PortfolioItem {
  id: number;
  category: 'wedding' | 'portrait' | 'idphoto';
  title: string;
  url: string;
  thumb: string;
  ratio: number;
}

export interface TimeSlot {
  id: string;
  time: string;
  period: 'morning' | 'afternoon' | 'evening';
  booked: boolean;
}

export const studioInfo = {
  name: '光和盐摄影工作室',
  slogan: '用光影记录每一个值得珍藏的瞬间',
  description:
    '成立于 2015 年，我们是一群热爱摄影的追光者。从婚纱到写真，从证件照到家庭影像，每一次快门都是对生活最真挚的致敬。八年时间，我们用镜头为超过三千个家庭留下了温暖的记忆。',
  address: '上海市徐汇区衡山路 888 号 3F',
  phone: '021-5888-6666',
  wechat: 'guangheyan-studio',
};

export const featuredWorks: { id: number; url: string; title: string; ratio: number }[] = [
  {
    id: 1,
    title: '城市黄昏',
    ratio: 3 / 4,
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: '山间微风',
    ratio: 4 / 5,
    url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: '花与少女',
    ratio: 2 / 3,
    url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    title: '森系婚礼',
    ratio: 5 / 6,
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    title: '复古肖像',
    ratio: 3 / 4,
    url: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?w=800&auto=format&fit=crop',
  },
  {
    id: 6,
    title: '海边仪式',
    ratio: 4 / 3,
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop',
  },
];

export const portfolioItems: PortfolioItem[] = [
  { id: 101, category: 'wedding', title: '誓言', ratio: 3 / 4, url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1600&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&auto=format&fit=crop' },
  { id: 102, category: 'wedding', title: '共舞', ratio: 2 / 3, url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop' },
  { id: 103, category: 'wedding', title: '花园', ratio: 4 / 5, url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop' },
  { id: 104, category: 'wedding', title: '海边', ratio: 4 / 3, url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&auto=format&fit=crop' },
  { id: 105, category: 'wedding', title: '晚霞', ratio: 3 / 4, url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1600&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&auto=format&fit=crop' },
  { id: 106, category: 'wedding', title: '礼堂', ratio: 5 / 6, url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&auto=format&fit=crop' },

  { id: 201, category: 'portrait', title: '胶片感', ratio: 2 / 3, url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1600&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop' },
  { id: 202, category: 'portrait', title: '窗边', ratio: 3 / 4, url: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?w=1600&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?w=600&auto=format&fit=crop' },
  { id: 203, category: 'portrait', title: '自然', ratio: 4 / 5, url: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=1600&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop' },
  { id: 204, category: 'portrait', title: '城市', ratio: 3 / 4, url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop' },
  { id: 205, category: 'portrait', title: '毛衣', ratio: 2 / 3, url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1600&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop' },
  { id: 206, category: 'portrait', title: '花', ratio: 4 / 3, url: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?w=1600&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1496440737103-cd596325d314?w=600&auto=format&fit=crop' },

  { id: 301, category: 'idphoto', title: '商务蓝', ratio: 3 / 4, url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop' },
  { id: 302, category: 'idphoto', title: '经典白', ratio: 3 / 4, url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop' },
  { id: 303, category: 'idphoto', title: '温润灰', ratio: 3 / 4, url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1600&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop' },
  { id: 304, category: 'idphoto', title: '学院风', ratio: 3 / 4, url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1600&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop' },
  { id: 305, category: 'idphoto', title: '艺术红', ratio: 3 / 4, url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1600&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop' },
  { id: 306, category: 'idphoto', title: '轻奢米', ratio: 3 / 4, url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1600&auto=format&fit=crop', thumb: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop' },
];

export const baseTimeSlots: Omit<TimeSlot, 'booked'>[] = [
  { id: 'm1', time: '09:00 - 10:00', period: 'morning' },
  { id: 'm2', time: '10:00 - 11:00', period: 'morning' },
  { id: 'm3', time: '11:00 - 12:00', period: 'morning' },
  { id: 'a1', time: '13:00 - 14:00', period: 'afternoon' },
  { id: 'a2', time: '14:00 - 15:00', period: 'afternoon' },
  { id: 'a3', time: '15:00 - 16:00', period: 'afternoon' },
  { id: 'a4', time: '16:00 - 17:00', period: 'afternoon' },
  { id: 'e1', time: '18:00 - 19:00', period: 'evening' },
  { id: 'e2', time: '19:00 - 20:00', period: 'evening' },
  { id: 'e3', time: '20:00 - 21:00', period: 'evening' },
];

export function generateDailySlots(dateStr: string): TimeSlot[] {
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) seed = (seed * 31 + dateStr.charCodeAt(i)) >>> 0;
  return baseTimeSlots.map((slot, idx) => ({
    ...slot,
    booked: ((seed >>> idx) & 1) === 1 && idx % 3 !== 0,
  }));
}

export const categoryTabs = [
  { key: 'wedding', label: '婚纱' },
  { key: 'portrait', label: '写真' },
  { key: 'idphoto', label: '证件照' },
] as const;
