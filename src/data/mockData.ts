// Mock data based on the database tables shown in the images

export const mockUsers = [
  {
    id: 1,
    name: 'Santhosh Vargheese',
    email: 'santhosh@cloudtelematics.net',
    password: '123456',
    companyID: 1,
    role: 'super',
    status: 'Active'
  },
  {
    id: 4,
    name: 'Nebiyou',
    email: 'nebiyou@qttcqatar.com',
    password: '343343',
    companyID: 1,
    role: 'admin',
    status: 'Active'
  },
  {
    id: 5,
    name: 'Umerfa',
    email: 'operation@qttcqatar.com',
    password: '123456',
    companyID: 1,
    role: 'user',
    status: 'Active'
  },
  {
    id: 6,
    name: 'Arneel',
    email: 'operations@httcqa.com',
    password: '123456',
    companyID: 1,
    role: 'user',
    status: 'Active'
  },
  {
    id: 7,
    name: 'Shameer',
    email: 'workshop@qttcqatar.com',
    password: '123456',
    companyID: 1,
    role: 'user',
    status: 'Active'
  }
];

export const mockFuelUsers = [
  {
    id: 1,
    name: 'FuelMan1',
    companyid: 1,
    card: 14336,
    status: 'Active',
    acess: 'Std',
    updated_at: '2025-04-30 11:58:04'
  },
  {
    id: 2,
    name: 'FuelMan2',
    companyid: 1,
    card: 63183,
    status: 'Active',
    acess: 'Std',
    updated_at: '2025-04-30 11:58:12'
  },
  {
    id: 8,
    name: 'rtj',
    companyid: 1,
    card: 19214,
    status: 'Inactive',
    acess: 'Std',
    updated_at: '2025-04-28 07:38:42'
  },
  {
    id: 9,
    name: 'Dilshad Ahmed - 196291',
    companyid: 1,
    card: 49300,
    status: 'Active',
    acess: 'Std',
    updated_at: '2025-04-30 08:52:10'
  }
];

export const mockTransactions = [
  {
    id: 409,
    device_id: 'PUMP001',
    rfid: 14336,
    volume: 37.00,
    timestamp: '2025-04-29 15:54:23',
    created_at: '2025-04-29 13:23:01'
  },
  {
    id: 410,
    device_id: 'PUMP001',
    rfid: 14336,
    volume: 0.00,
    timestamp: '2025-04-29 15:55:26',
    created_at: '2025-04-29 13:23:03'
  },
  {
    id: 411,
    device_id: 'PUMP001',
    rfid: 14336,
    volume: 9.00,
    timestamp: '2025-04-29 15:58:11',
    created_at: '2025-04-29 13:23:04'
  },
  {
    id: 412,
    device_id: 'PUMP001',
    rfid: 14336,
    volume: 286.00,
    timestamp: '2025-04-29 16:09:27',
    created_at: '2025-04-29 13:23:05'
  },
  {
    id: 413,
    device_id: 'PUMP001',
    rfid: 14336,
    volume: 81.00,
    timestamp: '2025-04-29 16:14:38',
    created_at: '2025-04-29 13:23:06'
  },
  {
    id: 414,
    device_id: 'PUMP001',
    rfid: 14336,
    volume: 69.00,
    timestamp: '2025-04-29 16:18:47',
    created_at: '2025-04-29 13:23:07'
  },
  {
    id: 415,
    device_id: 'PUMP001',
    rfid: 14336,
    volume: 29.00,
    timestamp: '2025-04-29 16:20:30',
    created_at: '2025-04-29 13:23:08'
  },
  {
    id: 422,
    device_id: 'PUMP001',
    rfid: 14336,
    volume: 1.00,
    timestamp: '2025-04-29 17:15:18',
    created_at: '2025-04-29 14:23:05'
  },
  {
    id: 423,
    device_id: 'PUMP001',
    rfid: 14336,
    volume: 98.00,
    timestamp: '2025-04-29 17:19:21',
    created_at: '2025-04-29 14:23:06'
  },
  {
    id: 427,
    device_id: 'PUMP001',
    rfid: 14336,
    volume: 0.00,
    timestamp: '2025-04-29 17:45:51',
    created_at: '2025-04-29 14:53:01'
  },
  {
    id: 428,
    device_id: 'PUMP001',
    rfid: 14336,
    volume: 0.00,
    timestamp: '2025-04-29 17:46:42',
    created_at: '2025-04-29 14:53:03'
  },
  {
    id: 429,
    device_id: 'PUMP001',
    rfid: 14336,
    volume: 19.00,
    timestamp: '2025-04-29 17:47:57',
    created_at: '2025-04-29 14:53:04'
  },
  {
    id: 430,
    device_id: 'PUMP001',
    rfid: 14336,
    volume: 19.00,
    timestamp: '2025-04-29 17:49:01',
    created_at: '2025-04-29 14:53:05'
  },
  {
    id: 435,
    device_id: 'PUMP002',
    rfid: 14336,
    volume: 5.76,
    timestamp: '2011-06-01 00:03:16',
    created_at: '2025-04-29 15:35:05'
  },
  {
    id: 436,
    device_id: 'PUMP002',
    rfid: 14336,
    volume: 5.76,
    timestamp: '2011-06-01 00:03:16',
    created_at: '2025-04-29 15:45:05'
  },
  {
    id: 440,
    device_id: 'PUMP001',
    rfid: 14336,
    volume: 131.00,
    timestamp: '2025-04-29 19:00:57',
    created_at: '2025-04-29 16:23:03'
  }
];

// Monthly transaction data for charts
export const monthlyTransactionData = [
  { month: 'Jan', volume: 1250 },
  { month: 'Feb', volume: 1400 },
  { month: 'Mar', volume: 1800 },
  { month: 'Apr', volume: 1650 },
  { month: 'May', volume: 1200 },
  { month: 'Jun', volume: 1750 },
  { month: 'Jul', volume: 2100 },
  { month: 'Aug', volume: 1950 },
  { month: 'Sep', volume: 2300 },
  { month: 'Oct', volume: 2100 },
  { month: 'Nov', volume: 1900 },
  { month: 'Dec', volume: 2400 }
];

export const devicePerformanceData = [
  { device: 'PUMP001', efficiency: 98, uptime: 99.8, transactions: 156, volume: 3765 },
  { device: 'PUMP002', efficiency: 96, uptime: 97.5, transactions: 123, volume: 2890 },
  { device: 'PUMP003', efficiency: 94, uptime: 99.2, transactions: 145, volume: 3210 }
];

export const fuelConsumptionByUser = [
  { user: 'FuelMan1', volume: 1856 },
  { user: 'FuelMan2', volume: 1245 },
  { user: 'Dilshad Ahmed', volume: 890 },
  { user: 'Others', volume: 765 }
];