export interface OrderItem {
  id: string;
  restaurant: string;
  image: string;
  orderNo: string;
  price: number;
  items: number;
  category: string;
  status: 'Preparing' | 'Accepted' | 'On the Way' | 'Completed' | 'Cancelled';
  estimatedTime?: string;
  date?: string;
  time?: string;
}

export const OngoingOrdersData: OrderItem[] = [
  {
    id: 'ongoing-1',
    restaurant: 'Pizza Hut',
    image: 'https://i.pinimg.com/1200x/69/1c/c7/691cc7dcb9cc3d1177c405c5fa5ca3e5.jpg',
    orderNo: '#162432',
    price: 35.25,
    items: 3,
    category: 'Food',
    status: 'Preparing',
    estimatedTime: '15 mins',
  },
  {
    id: 'ongoing-2',
    restaurant: 'McDonald',
    image: 'https://i.pinimg.com/736x/1e/ff/4d/1eff4d28fcc81fd175ed4274841bd37d.jpg',
    orderNo: '#242432',
    price: 40.15,
    items: 2,
    category: 'Drink',
    status: 'Accepted',
    estimatedTime: '20 mins',
  },
  {
    id: 'ongoing-3',
    restaurant: 'Starbucks',
    image: 'https://i.pinimg.com/1200x/99/d3/bf/99d3bf15bdbdfeeee94a8abc65916393.jpg',
    orderNo: '#240112',
    price: 10.20,
    items: 1,
    category: 'Drink',
    status: 'On the Way',
    estimatedTime: '8 mins',
  },
];

export const HistoryOrdersData: OrderItem[] = [
  {
    id: 'history-1',
    restaurant: 'Sushi Express',
    image: 'https://i.pinimg.com/236x/7e/ef/aa/7eefaa6bd67d8a63dd0604e6a905fe24.jpg',
    orderNo: '#310201',
    price: 42.75,
    items: 4,
    category: 'Food',
    status: 'Completed',
    date: '05 FEB',
    time: '01:20 PM',
  },
  {
    id: 'history-2',
    restaurant: 'Biryani House',
    image: 'https://i.pinimg.com/1200x/1a/59/f0/1a59f0e988c227075ce7a6e261f9f362.jpg',
    orderNo: '#310202',
    price: 22.40,
    items: 2,
    category: 'Food',
    status: 'Completed',
    date: '06 FEB',
    time: '08:10 PM',
  },
  {
    id: 'history-3',
    restaurant: 'Healthy Bowl',
    image: 'https://i.pinimg.com/1200x/91/39/f7/9139f7571010ff9a9c776680d57dd675.jpg',
    orderNo: '#310203',
    price: 16.99,
    items: 1,
    category: 'Food',
    status: 'Cancelled',
    date: '06 FEB',
    time: '12:45 PM',
  },
];
