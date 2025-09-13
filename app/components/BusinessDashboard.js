'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import {
  DollarSign,
  Users,
  ShoppingCart,
  Eye,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

const KPICard = ({ title, value, trend, trendValue, icon: Icon, bgColor = "bg-blue-50", iconColor = "text-blue-600" }) => {
  const isPositive = trend === 'up'
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

  return (
    <div className="kpi-card">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div className={`flex items-center ${isPositive ? 'trend-up' : 'trend-down'}`}>
          <TrendIcon className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">{trendValue}</span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-600 mt-1">{title}</p>
      </div>
    </div>
  )
}

const ChartCard = ({ title, children }) => {
  return (
    <div className="chart-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  )
}

const BusinessDashboard = () => {
  // Sample data as specified in instructions
  const revenueData = [
    { month: 'Jan', revenue: 45000, customers: 120 },
    { month: 'Feb', revenue: 52000, customers: 135 },
    { month: 'Mar', revenue: 48000, customers: 128 },
    { month: 'Apr', revenue: 61000, customers: 165 },
    { month: 'May', revenue: 58000, customers: 152 },
    { month: 'Jun', revenue: 67000, customers: 178 },
    { month: 'Jul', revenue: 73000, customers: 195 },
    { month: 'Aug', revenue: 69000, customers: 188 },
    { month: 'Sep', revenue: 78000, customers: 210 },
    { month: 'Oct', revenue: 82000, customers: 225 },
    { month: 'Nov', revenue: 88000, customers: 245 },
    { month: 'Dec', revenue: 95000, customers: 265 }
  ]

  const serviceData = [
    { service: 'Web Design', sales: 85000 },
    { service: 'Development', sales: 125000 },
    { service: 'Consulting', sales: 65000 },
    { service: 'Maintenance', sales: 45000 },
    { service: 'SEO Services', sales: 35000 }
  ]

  const trafficData = [
    { name: 'Organic Search', value: 35, color: '#3B82F6' },
    { name: 'Social Media', value: 25, color: '#10B981' },
    { name: 'Direct', value: 20, color: '#F59E0B' },
    { name: 'Paid Ads', value: 15, color: '#EF4444' },
    { name: 'Referrals', value: 5, color: '#8B5CF6' }
  ]

  const customerGrowthData = revenueData.map(item => ({
    month: item.month,
    customers: item.customers
  }))

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-gray-600">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.dataKey === 'revenue' || entry.dataKey === 'sales' ? formatCurrency(entry.value) : formatNumber(entry.value)}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor your business performance and key metrics</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Revenue"
            value="$782K"
            trend="up"
            trendValue="+12.5%"
            icon={DollarSign}
            bgColor="bg-green-50"
            iconColor="text-green-600"
          />
          <KPICard
            title="New Customers"
            value="2,245"
            trend="up"
            trendValue="+8.2%"
            icon={Users}
            bgColor="bg-blue-50"
            iconColor="text-blue-600"
          />
          <KPICard
            title="Total Orders"
            value="1,852"
            trend="down"
            trendValue="-2.1%"
            icon={ShoppingCart}
            bgColor="bg-purple-50"
            iconColor="text-purple-600"
          />
          <KPICard
            title="Website Views"
            value="45.2K"
            trend="up"
            trendValue="+15.3%"
            icon={Eye}
            bgColor="bg-orange-50"
            iconColor="text-orange-600"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Trend Chart */}
          <ChartCard title="Revenue Trend">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={formatCurrency}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#3B82F6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Service Sales Chart */}
          <ChartCard title="Service Sales">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="service"
                  stroke="#6b7280"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={formatCurrency}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="sales"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Traffic Sources Chart */}
          <ChartCard title="Traffic Sources">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {trafficData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Percentage']}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Customer Growth Chart */}
          <ChartCard title="Customer Growth">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={customerGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={formatNumber}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="customers"
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#8B5CF6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            Dashboard Demo - Built with Next.js & Recharts
          </p>
        </footer>
      </div>
    </div>
  )
}

export default BusinessDashboard