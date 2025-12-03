'use client'

import { useState, useMemo } from 'react'
import useSWR from 'swr'
import dynamic from 'next/dynamic'
import { Activity, Network, Database, HardDrive, BarChart3, LineChart, Settings, Filter, TrendingUp, Globe, Wifi, Zap, Plus, X, Languages, Layers, BarChart4, GitMerge, Table2 } from 'lucide-react'

const ECharts = dynamic(() => import('echarts-for-react'), { ssr: false })

const fetcher = (url: string) => fetch(url).then(r => r.json())

// Translations
const translations = {
  'pt-BR': {
    title: 'Akvorado',
    subtitle: 'Plataforma de Análise NetFlow',
    administrator: 'Administrador',
    dashboard: 'Dashboard',
    flowAnalysis: 'Análise de Fluxos',
    exporters: 'Exportadores',
    settings: 'Configurações',
    refresh: 'Atualizar',
    lastFlow: 'Último Fluxo',
    flowRate: 'Taxa de Fluxo',
    activeExporters: 'Exportadores Ativos',
    systemStatus: 'Status do Sistema',
    devicesOnline: 'dispositivos online',
    allOperational: 'Todos os sistemas operacionais',
    connectedExporters: 'Exportadores Conectados',
    exporter: 'Exportador',
    noExporters: 'Nenhum exportador detectado',
    waitingFlows: 'Aguardando fluxos...',
    networkTraffic: 'Tráfego de Rede',
    realtimeBandwidth: 'Uso de banda em tempo real',
    topSrcAsn: 'Top ASNs de Origem',
    topDstAsn: 'Top ASNs de Destino',
    topSrcCountry: 'Top Países de Origem',
    topDstCountry: 'Top Países de Destino',
    flowFilters: 'Filtros de Fluxo',
    dimensions: 'Dimensões',
    selectDimensions: 'Selecionar dimensões',
    timeRange: 'Intervalo de Tempo',
    last1h: 'Última 1 hora',
    last24h: 'Últimas 24 horas',
    last7d: 'Últimos 7 dias',
    last30d: 'Últimos 30 dias',
    custom: 'Personalizado',
    graphType: 'Tipo de Gráfico',
    line: 'Linha',
    stacked: 'Empilhado',
    stacked100: 'Empilhado 100%',
    sankey: 'Sankey',
    grid: 'Grade',
    units: 'Unidades',
    filterExpression: 'Expressão de Filtro',
    filterPlaceholder: 'Ex: SrcAS = 64512 AND Proto = 6',
    validateFilter: 'Validar Filtro',
    bidirectional: 'Bidirecional',
    previousPeriod: 'Período Anterior',
    limit: 'Limite',
    topBy: 'Top Por',
    sum: 'Soma',
    avg: 'Média',
    max: 'Máximo',
    p95: 'Percentil 95',
    applyFilters: 'Aplicar Filtros',
    clearFilters: 'Limpar Filtros',
    srcIp: 'IP de Origem',
    dstIp: 'IP de Destino',
    protocol: 'Protocolo',
    allProtocols: 'Todos os Protocolos',
    srcAsn: 'ASN de Origem',
    dstAsn: 'ASN de Destino',
    realtimeTraffic: 'Tráfego em Tempo Real',
    flowsPerSecond: 'fluxos por segundo',
    timestamp: 'timestamp',
    activeNow: 'ativos agora',
    source: 'Origem',
    lastFlowDetails: 'Detalhes do Último Fluxo',
    destination: 'Destino',
    bytes: 'Bytes',
    packets: 'pacotes',
    exporterDetails: 'Detalhes do Exportador',
    active: 'Ativo',
    status: 'Status',
    online: 'Online',
    type: 'Tipo',
    lastActivity: 'Última Atividade',
    apiConfig: 'Configuração da API',
    authHeaders: 'Headers de Autenticação',
    changeSettings: 'Como alterar configurações',
    editEnv: 'Edite o arquivo .env.local na raiz do projeto',
    updateVars: 'Atualize os valores das variáveis de ambiente',
    restartServer: 'Reinicie o servidor Next.js para aplicar as mudanças',
    exampleEnv: 'Exemplo .env.local:',
    srcAsnDist: 'Distribuição de ASN de Origem',
    dstAsnDist: 'Distribuição de ASN de Destino',
    addDimension: 'Adicionar Dimensão',
  },
  'en': {
    title: 'Akvorado',
    subtitle: 'NetFlow Analytics Platform',
    administrator: 'Administrator',
    dashboard: 'Dashboard',
    flowAnalysis: 'Flow Analysis',
    exporters: 'Exporters',
    settings: 'Settings',
    refresh: 'Refresh',
    lastFlow: 'Last Flow',
    flowRate: 'Flow Rate',
    activeExporters: 'Active Exporters',
    systemStatus: 'System Status',
    devicesOnline: 'devices online',
    allOperational: 'All systems operational',
    connectedExporters: 'Connected Exporters',
    exporter: 'Exporter',
    noExporters: 'No exporters detected',
    waitingFlows: 'Waiting for flows...',
    networkTraffic: 'Network Traffic',
    realtimeBandwidth: 'Real-time bandwidth usage',
    topSrcAsn: 'Top Source ASNs',
    topDstAsn: 'Top Destination ASNs',
    topSrcCountry: 'Top Source Countries',
    topDstCountry: 'Top Destination Countries',
    flowFilters: 'Flow Filters',
    dimensions: 'Dimensions',
    selectDimensions: 'Select dimensions',
    timeRange: 'Time Range',
    last1h: 'Last 1 hour',
    last24h: 'Last 24 hours',
    last7d: 'Last 7 days',
    last30d: 'Last 30 days',
    custom: 'Custom',
    graphType: 'Graph Type',
    line: 'Line',
    stacked: 'Stacked',
    stacked100: 'Stacked 100%',
    sankey: 'Sankey',
    grid: 'Grid',
    units: 'Units',
    filterExpression: 'Filter Expression',
    filterPlaceholder: 'e.g., SrcAS = 64512 AND Proto = 6',
    validateFilter: 'Validate Filter',
    bidirectional: 'Bidirectional',
    previousPeriod: 'Previous Period',
    limit: 'Limit',
    topBy: 'Top By',
    sum: 'Sum',
    avg: 'Average',
    max: 'Maximum',
    p95: '95th Percentile',
    applyFilters: 'Apply Filters',
    clearFilters: 'Clear Filters',
    srcIp: 'Source IP',
    dstIp: 'Destination IP',
    protocol: 'Protocol',
    allProtocols: 'All Protocols',
    srcAsn: 'Source ASN',
    dstAsn: 'Destination ASN',
    realtimeTraffic: 'Real-time Traffic',
    flowsPerSecond: 'flows per second',
    timestamp: 'timestamp',
    activeNow: 'active now',
    source: 'Source',
    lastFlowDetails: 'Last Flow Details',
    destination: 'Destination',
    bytes: 'Bytes',
    packets: 'packets',
    exporterDetails: 'Exporter Details',
    active: 'Active',
    status: 'Status',
    online: 'Online',
    type: 'Type',
    lastActivity: 'Last Activity',
    apiConfig: 'API Configuration',
    authHeaders: 'Authentication Headers',
    changeSettings: 'How to change settings',
    editEnv: 'Edit the .env.local file in the project root',
    updateVars: 'Update the environment variable values',
    restartServer: 'Restart the Next.js server to apply changes',
    exampleEnv: 'Example .env.local:',
    srcAsnDist: 'Source ASN Distribution',
    dstAsnDist: 'Destination ASN Distribution',
    addDimension: 'Add Dimension',
  }
}

// Available dimensions
const availableDimensions = [
  { value: 'SrcAS', label: 'Source AS', color: 'bg-blue-500' },
  { value: 'DstAS', label: 'Destination AS', color: 'bg-green-500' },
  { value: 'SrcAddr', label: 'Source IP', color: 'bg-purple-500' },
  { value: 'DstAddr', label: 'Destination IP', color: 'bg-orange-500' },
  { value: 'SrcCountry', label: 'Source Country', color: 'bg-pink-500' },
  { value: 'DstCountry', label: 'Destination Country', color: 'bg-indigo-500' },
  { value: 'InIfName', label: 'Input Interface', color: 'bg-teal-500' },
  { value: 'OutIfName', label: 'Output Interface', color: 'bg-cyan-500' },
  { value: 'Proto', label: 'Protocol', color: 'bg-red-500' },
  { value: 'SrcPort', label: 'Source Port', color: 'bg-yellow-500' },
  { value: 'DstPort', label: 'Destination Port', color: 'bg-lime-500' },
  { value: 'EType', label: 'Ether Type', color: 'bg-amber-500' },
]

// Helper para verificar se a data é válida
const isValidDate = (date: any) => {
  if (!date) return false
  const d = new Date(date)
  return d instanceof Date && !isNaN(d.getTime())
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview')
  const [refreshInterval, setRefreshInterval] = useState(5000)
  const [language, setLanguage] = useState<'pt-BR' | 'en'>('pt-BR')

  // Advanced Filter State
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>([])
  const [timeRange, setTimeRange] = useState('last1h')
  const [graphType, setGraphType] = useState('line')
  const [units, setUnits] = useState('l3bps')
  const [filterExpression, setFilterExpression] = useState('')
  const [bidirectional, setBidirectional] = useState(false)
  const [previousPeriod, setPreviousPeriod] = useState(false)
  const [limit, setLimit] = useState('10')
  const [topBy, setTopBy] = useState('sum')

  // Filter Conditions (visual builder)
  type FilterCondition = {
    id: string
    field: string
    operator: string
    value: string
    logicalOp: 'AND' | 'OR'
  }
  const [filterConditions, setFilterConditions] = useState<FilterCondition[]>([])

  // Simple Filtros para Flows (mantidos para compatibilidade)
  const [filterSrcIP, setFilterSrcIP] = useState('')
  const [filterDstIP, setFilterDstIP] = useState('')
  const [filterSrcAS, setFilterSrcAS] = useState('')
  const [filterDstAS, setFilterDstAS] = useState('')
  const [filterProto, setFilterProto] = useState('all')

  const t = translations[language]

  // Buscar dados da API do Akvorado
  const { data: flowLast } = useSWR('/api/v0/console/widget/flow-last', fetcher, { refreshInterval })
  const { data: flowRate } = useSWR('/api/v0/console/widget/flow-rate', fetcher, { refreshInterval })
  const { data: exporters } = useSWR('/api/v0/console/widget/exporters', fetcher, { refreshInterval: 30000 })
  const { data: graphData } = useSWR('/api/v0/console/widget/graph', fetcher, { refreshInterval: 30000 })
  const { data: topSrc } = useSWR('/api/v0/console/widget/top/src-as', fetcher, { refreshInterval: 30000 })
  const { data: topDst } = useSWR('/api/v0/console/widget/top/dst-as', fetcher, { refreshInterval: 30000 })
  const { data: topSrcCountry } = useSWR('/api/v0/console/widget/top/src-country', fetcher, { refreshInterval: 30000 })
  const { data: topDstCountry } = useSWR('/api/v0/console/widget/top/dst-country', fetcher, { refreshInterval: 30000 })

  // Função para validar filtro
  const validateFilter = async () => {
    if (!filterExpression) return
    try {
      const response = await fetch('/api/v0/console/filter/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filter: filterExpression })
      })
      const data = await response.json()
      alert(data.valid ? 'Filtro válido!' : `Filtro inválido: ${data.error}`)
    } catch (error) {
      alert('Erro ao validar filtro')
    }
  }

  // Adicionar dimensão
  const addDimension = (dimension: string) => {
    if (!selectedDimensions.includes(dimension)) {
      setSelectedDimensions([...selectedDimensions, dimension])
    }
  }

  // Remover dimensão
  const removeDimension = (dimension: string) => {
    setSelectedDimensions(selectedDimensions.filter(d => d !== dimension))
  }

  // Adicionar condição de filtro
  const addFilterCondition = () => {
    const newCondition: FilterCondition = {
      id: Date.now().toString(),
      field: 'SrcAS',
      operator: '=',
      value: '',
      logicalOp: 'AND'
    }
    setFilterConditions([...filterConditions, newCondition])
  }

  // Remover condição de filtro
  const removeFilterCondition = (id: string) => {
    setFilterConditions(filterConditions.filter(c => c.id !== id))
  }

  // Atualizar condição de filtro
  const updateFilterCondition = (id: string, field: keyof FilterCondition, value: string) => {
    setFilterConditions(filterConditions.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    ))
  }

  // Construir expressão de filtro a partir das condições
  const buildFilterExpression = (): string => {
    if (filterConditions.length === 0) return ''

    return filterConditions.map((condition, index) => {
      const expr = `${condition.field} ${condition.operator} ${condition.value}`
      if (index === 0) return expr
      return ` ${filterConditions[index - 1].logicalOp} ${expr}`
    }).join('')
  }

  // Aplicar filtros e buscar dados do gráfico
  const applyFilters = async () => {
    if (selectedDimensions.length === 0) {
      alert(language === 'pt-BR' ? 'Selecione pelo menos uma dimensão' : 'Select at least one dimension')
      return
    }

    // Construir expressão de filtro automaticamente das condições
    const builtFilter = buildFilterExpression()

    // Construir o payload para a API do Akvorado
    const payload = {
      dimensions: selectedDimensions,
      filter: builtFilter || filterExpression || undefined,
      units: units,
      bidirectional: bidirectional,
      limit: parseInt(limit) || 10,
      // Configurar intervalo de tempo baseado na seleção
      start: getTimeRangeStart(),
      end: new Date().toISOString(),
    }

    try {
      // Determinar o endpoint baseado no tipo de gráfico
      const endpoint = graphType === 'sankey'
        ? '/api/v0/console/graph/sankey'
        : '/api/v0/console/graph/line'

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error('Erro ao buscar dados')
      }

      const data = await response.json()
      console.log('Dados filtrados:', data)
      alert(language === 'pt-BR' ? 'Filtros aplicados com sucesso!' : 'Filters applied successfully!')

      // Aqui você pode atualizar o estado com os novos dados
      // Por exemplo, criar um novo estado para graphFilteredData

    } catch (error) {
      console.error('Erro ao aplicar filtros:', error)
      alert(language === 'pt-BR' ? 'Erro ao aplicar filtros' : 'Error applying filters')
    }
  }

  // Calcular início do intervalo de tempo
  const getTimeRangeStart = () => {
    const now = new Date()
    switch (timeRange) {
      case 'last1h':
        return new Date(now.getTime() - 60 * 60 * 1000).toISOString()
      case 'last24h':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
      case 'last7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
      case 'last30d':
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
      default:
        return new Date(now.getTime() - 60 * 60 * 1000).toISOString()
    }
  }

  // Configuração do gráfico de tráfego
  const trafficChartOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    xAxis: {
      type: 'time',
      boundaryGap: false
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => {
          const gbps = value
          if (gbps >= 1) return gbps.toFixed(2) + ' Gbps'
          if (gbps >= 0.001) return (gbps * 1000).toFixed(2) + ' Mbps'
          return (gbps * 1000000).toFixed(2) + ' Kbps'
        }
      }
    },
    grid: { left: 80, right: 20, top: 20, bottom: 30 },
    series: [{
      type: 'line',
      smooth: true,
      symbol: 'none',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(37, 99, 235, 0.4)' },
            { offset: 1, color: 'rgba(37, 99, 235, 0.05)' }
          ]
        }
      },
      lineStyle: { color: '#2563eb', width: 3 },
      data: graphData?.data?.map((d: any) => [d.t, d.gbps]) || []
    }]
  }

  // Configuração dos gráficos de top
  const createPieOption = (data: any, title: string) => ({
    backgroundColor: 'transparent',
    title: { text: title, left: 'center', textStyle: { fontSize: 14, fontWeight: 600 } },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: { fontSize: 10 }
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['40%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: { show: false },
      emphasis: {
        label: {
          show: true,
          fontSize: 12,
          fontWeight: 'bold'
        }
      },
      data: data?.top?.slice(0, 8).map((item: any, idx: number) => ({
        value: item.percent,
        name: item.name,
        itemStyle: {
          color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'][idx % 8]
        }
      })) || []
    }]
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white shadow-2xl">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <Network className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
                <p className="text-sm text-blue-100 font-medium">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              {/* Language Selector */}
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg backdrop-blur-sm">
                <Languages className="h-4 w-4" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'pt-BR' | 'en')}
                  className="bg-transparent text-white font-medium text-sm focus:outline-none cursor-pointer"
                >
                  <option value="pt-BR" className="text-gray-900">PT-BR</option>
                  <option value="en" className="text-gray-900">EN</option>
                </select>
              </div>
              <div className="text-right bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <div className="text-sm text-blue-100">{t.administrator}</div>
                <div className="text-xs text-blue-200">admin@akvorado.local</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md border-b-2 border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-8">
              {[
                { id: 'overview', label: t.dashboard, icon: BarChart3 },
                { id: 'flows', label: t.flowAnalysis, icon: LineChart },
                { id: 'exporters', label: t.exporters, icon: Database },
                { id: 'config', label: t.settings, icon: Settings },
              ].map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 px-2 border-b-3 transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600 font-bold'
                        : 'border-transparent text-gray-600 hover:text-blue-500 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
            <div className="flex items-center gap-3">
              <Zap className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600 font-medium">{t.refresh}:</span>
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className="text-sm border-2 border-gray-300 rounded-lg px-3 py-1.5 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value={1000}>1s</option>
                <option value={2000}>2s</option>
                <option value={5000}>5s</option>
                <option value={10000}>10s</option>
                <option value={30000}>30s</option>
                <option value={60000}>1min</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Exporters First (moved to top) */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-200">
              <h2 className="text-xl font-bold mb-5 text-gray-900 flex items-center gap-2">
                <Database className="h-6 w-6 text-purple-600" />
                {t.connectedExporters}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exporters?.exporters?.map((exporter: string, idx: number) => (
                  <div key={idx} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500 rounded-full p-2">
                        <Network className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900">{exporter}</div>
                        <div className="text-sm text-gray-600">{t.exporter} #{idx + 1}</div>
                      </div>
                      <div className="text-green-600 font-bold text-lg">●</div>
                    </div>
                  </div>
                )) || (
                  <div className="col-span-3 text-center py-12 text-gray-500">
                    <Database className="h-16 w-16 mx-auto mb-3 opacity-30" />
                    <div className="text-lg font-medium">{t.noExporters}</div>
                    <div className="text-sm">{t.waitingFlows}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold uppercase tracking-wide opacity-90">{t.lastFlow}</div>
                  <Activity className="h-6 w-6 opacity-80" />
                </div>
                <div className="text-3xl font-bold">
                  {isValidDate(flowLast?.TimeReceived) ? new Date(flowLast.TimeReceived).toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--'}
                </div>
                <div className="text-xs opacity-75 mt-2">
                  {isValidDate(flowLast?.TimeReceived) ? new Date(flowLast.TimeReceived).toLocaleDateString(language) : 'Waiting...'}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold uppercase tracking-wide opacity-90">{t.flowRate}</div>
                  <TrendingUp className="h-6 w-6 opacity-80" />
                </div>
                <div className="text-3xl font-bold">
                  {flowRate?.rate ? `${(flowRate.rate / 1000).toFixed(1)}k` : '--'}
                </div>
                <div className="text-xs opacity-75 mt-2">{t.flowsPerSecond}</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold uppercase tracking-wide opacity-90">{t.activeExporters}</div>
                  <Database className="h-6 w-6 opacity-80" />
                </div>
                <div className="text-3xl font-bold">
                  {exporters?.exporters?.length || 0}
                </div>
                <div className="text-xs opacity-75 mt-2">{t.devicesOnline}</div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold uppercase tracking-wide opacity-90">{t.systemStatus}</div>
                  <Wifi className="h-6 w-6 opacity-80" />
                </div>
                <div className="text-4xl font-bold">●</div>
                <div className="text-xs opacity-75 mt-2">{t.allOperational}</div>
              </div>
            </div>

            {/* Traffic Graph - Large */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                  {t.networkTraffic}
                </h2>
                <div className="text-sm text-gray-500 font-medium">{t.realtimeBandwidth}</div>
              </div>
              <div style={{ height: '350px' }}>
                <ECharts option={trafficChartOption} style={{ height: '100%', width: '100%' }} />
              </div>
            </div>

            {/* Top ASN and Country Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-200">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  {t.topSrcAsn}
                </h3>
                <div style={{ height: '280px' }}>
                  <ECharts option={createPieOption(topSrc, '')} style={{ height: '100%', width: '100%' }} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-200">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  {t.topDstAsn}
                </h3>
                <div style={{ height: '280px' }}>
                  <ECharts option={createPieOption(topDst, '')} style={{ height: '100%', width: '100%' }} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-200">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-600" />
                  {t.topSrcCountry}
                </h3>
                <div style={{ height: '280px' }}>
                  <ECharts option={createPieOption(topSrcCountry, '')} style={{ height: '100%', width: '100%' }} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-200">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-orange-600" />
                  {t.topDstCountry}
                </h3>
                <div style={{ height: '280px' }}>
                  <ECharts option={createPieOption(topDstCountry, '')} style={{ height: '100%', width: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'flows' && (
          <div className="space-y-6">
            {/* Advanced Filters Panel - Akvorado Complete */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold">{t.flowFilters}</h2>
              </div>

              <div className="space-y-6">
                {/* Dimensions */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t.dimensions}</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedDimensions.map(dim => {
                      const dimInfo = availableDimensions.find(d => d.value === dim)
                      return (
                        <div key={dim} className={`${dimInfo?.color} text-white px-3 py-1.5 rounded-lg flex items-center gap-2 font-medium`}>
                          <span>{dimInfo?.label}</span>
                          <button onClick={() => removeDimension(dim)} className="hover:bg-white/20 rounded p-0.5">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        addDimension(e.target.value)
                        e.target.value = ''
                      }
                    }}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">{t.selectDimensions}</option>
                    {availableDimensions.map(dim => (
                      <option key={dim.value} value={dim.value} disabled={selectedDimensions.includes(dim.value)}>
                        {dim.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Time Range */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t.timeRange}</label>
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="last1h">{t.last1h}</option>
                      <option value="last24h">{t.last24h}</option>
                      <option value="last7d">{t.last7d}</option>
                      <option value="last30d">{t.last30d}</option>
                      <option value="custom">{t.custom}</option>
                    </select>
                  </div>

                  {/* Graph Type */}
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t.graphType}</label>
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        { value: 'line', label: t.line, icon: LineChart },
                        { value: 'stacked', label: t.stacked, icon: Layers },
                        { value: 'stacked100', label: t.stacked100, icon: BarChart4 },
                        { value: 'sankey', label: t.sankey, icon: GitMerge },
                        { value: 'grid', label: t.grid, icon: Table2 },
                      ].map(type => {
                        const Icon = type.icon
                        const isSelected = graphType === type.value
                        return (
                          <button
                            key={type.value}
                            onClick={() => setGraphType(type.value)}
                            className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all ${
                              isSelected
                                ? 'border-blue-600 bg-blue-50 text-blue-700'
                                : 'border-gray-300 hover:border-blue-400 text-gray-700'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <span className="text-xs font-semibold">{type.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Units */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t.units}</label>
                    <select
                      value={units}
                      onChange={(e) => setUnits(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="l3bps">L3 bps</option>
                      <option value="l2bps">L2 bps</option>
                      <option value="pps">pps</option>
                      <option value="inl2%">inl2%</option>
                      <option value="outl2%">outl2%</option>
                    </select>
                  </div>

                  {/* Limit */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t.limit}</label>
                    <input
                      type="number"
                      value={limit}
                      onChange={(e) => setLimit(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Filter Expression - Visual Builder */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-semibold text-gray-700">{t.filterExpression}</label>
                    <button
                      onClick={addFilterCondition}
                      className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      {language === 'pt-BR' ? 'Adicionar Condição' : 'Add Condition'}
                    </button>
                  </div>

                  {/* Lista de condições */}
                  <div className="space-y-2">
                    {filterConditions.map((condition, index) => (
                      <div key={condition.id} className="flex gap-2 items-center bg-gray-50 p-3 rounded-lg border-2 border-gray-200">
                        {index > 0 && (
                          <select
                            value={filterConditions[index - 1].logicalOp}
                            onChange={(e) => updateFilterCondition(filterConditions[index - 1].id, 'logicalOp', e.target.value)}
                            className="px-3 py-2 border-2 border-gray-300 rounded-lg font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="AND">AND</option>
                            <option value="OR">OR</option>
                          </select>
                        )}

                        {/* Campo/Dimensão */}
                        <select
                          value={condition.field}
                          onChange={(e) => updateFilterCondition(condition.id, 'field', e.target.value)}
                          className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {availableDimensions.map(dim => (
                            <option key={dim.value} value={dim.value}>{dim.label}</option>
                          ))}
                        </select>

                        {/* Operador */}
                        <select
                          value={condition.operator}
                          onChange={(e) => updateFilterCondition(condition.id, 'operator', e.target.value)}
                          className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="=">=</option>
                          <option value="!=">!=</option>
                          <option value=">">{'>'}</option>
                          <option value="<">{'<'}</option>
                          <option value=">=">{'>='}</option>
                          <option value="<=">{'<='}</option>
                          <option value="IN">IN</option>
                          <option value="LIKE">LIKE</option>
                        </select>

                        {/* Valor - Select dinâmico ou Input */}
                        {(condition.field === 'InIfName' || condition.field === 'OutIfName' || condition.field === 'ExporterName') && exporters?.exporters ? (
                          <select
                            value={condition.value}
                            onChange={(e) => updateFilterCondition(condition.id, 'value', e.target.value)}
                            className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">{language === 'pt-BR' ? 'Selecionar' : 'Select'}</option>
                            {exporters.exporters.map((item: string, idx: number) => (
                              <option key={idx} value={item}>{item}</option>
                            ))}
                          </select>
                        ) : condition.field === 'Proto' ? (
                          <select
                            value={condition.value}
                            onChange={(e) => updateFilterCondition(condition.id, 'value', e.target.value)}
                            className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">{language === 'pt-BR' ? 'Selecionar' : 'Select'}</option>
                            <option value="6">TCP (6)</option>
                            <option value="17">UDP (17)</option>
                            <option value="1">ICMP (1)</option>
                            <option value="2">IGMP (2)</option>
                            <option value="41">IPv6 (41)</option>
                            <option value="47">GRE (47)</option>
                            <option value="50">ESP (50)</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={condition.value}
                            onChange={(e) => updateFilterCondition(condition.id, 'value', e.target.value)}
                            placeholder={language === 'pt-BR' ? 'Valor' : 'Value'}
                            className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}

                        {/* Botão Remover */}
                        <button
                          onClick={() => removeFilterCondition(condition.id)}
                          className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Preview da expressão construída */}
                  {filterConditions.length > 0 && (
                    <div className="mt-3 p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
                      <div className="text-xs font-semibold text-blue-700 mb-1">
                        {language === 'pt-BR' ? 'Expressão Gerada:' : 'Generated Expression:'}
                      </div>
                      <div className="font-mono text-sm text-blue-900">{buildFilterExpression()}</div>
                    </div>
                  )}
                </div>

                {/* Advanced Options */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="bidirectional"
                      checked={bidirectional}
                      onChange={(e) => setBidirectional(e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="bidirectional" className="text-sm font-semibold text-gray-700 cursor-pointer">
                      {t.bidirectional}
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="previousPeriod"
                      checked={previousPeriod}
                      onChange={(e) => setPreviousPeriod(e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="previousPeriod" className="text-sm font-semibold text-gray-700 cursor-pointer">
                      {t.previousPeriod}
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">{t.topBy}</label>
                    <select
                      value={topBy}
                      onChange={(e) => setTopBy(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="sum">{t.sum}</option>
                      <option value="avg">{t.avg}</option>
                      <option value="max">{t.max}</option>
                      <option value="95th">{t.p95}</option>
                    </select>
                  </div>

                  <div className="flex items-end gap-2 col-span-2">
                    <button
                      onClick={applyFilters}
                      className="flex-1 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {t.applyFilters}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDimensions([])
                        setFilterExpression('')
                        setFilterConditions([])
                        setBidirectional(false)
                        setPreviousPeriod(false)
                        setTimeRange('last1h')
                        setGraphType('line')
                        setUnits('l3bps')
                        setLimit('10')
                        setTopBy('sum')
                      }}
                      className="flex-1 px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      {t.clearFilters}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Flow Visualization */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-200">
              <h2 className="text-xl font-bold mb-4">{t.realtimeTraffic}</h2>
              <div style={{ height: '450px' }}>
                <ECharts option={trafficChartOption} style={{ height: '100%', width: '100%' }} />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-5 rounded-xl shadow-lg border-2 border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-gray-600">{t.flowRate}</div>
                  <Activity className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {flowRate?.rate ? `${(flowRate.rate / 1000).toFixed(2)}k` : '--'}
                </div>
                <div className="text-xs text-gray-500 mt-1">{t.flowsPerSecond}</div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-lg border-2 border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-gray-600">{t.lastFlow}</div>
                  <Network className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {isValidDate(flowLast?.TimeReceived) ? new Date(flowLast.TimeReceived).toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--'}
                </div>
                <div className="text-xs text-gray-500 mt-1">{t.timestamp}</div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-lg border-2 border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-gray-600">{t.exporters}</div>
                  <Database className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {exporters?.exporters?.length || 0}
                </div>
                <div className="text-xs text-gray-500 mt-1">{t.activeNow}</div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-lg border-2 border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-semibold text-gray-600">{t.source}</div>
                  <Globe className="h-5 w-5 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {flowLast?.ExporterName || '--'}
                </div>
                <div className="text-xs text-gray-500 mt-1">{flowLast?.ExporterAddress || 'N/A'}</div>
              </div>
            </div>

            {/* ASN Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-200">
                <h3 className="text-lg font-bold mb-4">{t.srcAsnDist}</h3>
                <div style={{ height: '320px' }}>
                  <ECharts option={createPieOption(topSrc, '')} style={{ height: '100%', width: '100%' }} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-200">
                <h3 className="text-lg font-bold mb-4">{t.dstAsnDist}</h3>
                <div style={{ height: '320px' }}>
                  <ECharts option={createPieOption(topDst, '')} style={{ height: '100%', width: '100%' }} />
                </div>
              </div>
            </div>

            {/* Last Flow Details */}
            {flowLast && (
              <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-200">
                <h3 className="text-xl font-bold mb-4">{t.lastFlowDetails}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-600 font-semibold">{t.source}</div>
                    <div className="text-sm font-bold text-gray-900 mt-1">{flowLast.SrcAddr || 'N/A'}</div>
                    <div className="text-xs text-gray-500">AS{flowLast.SrcAS}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-600 font-semibold">{t.destination}</div>
                    <div className="text-sm font-bold text-gray-900 mt-1">{flowLast.DstAddr || 'N/A'}</div>
                    <div className="text-xs text-gray-500">AS{flowLast.DstAS}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-600 font-semibold">{t.protocol}</div>
                    <div className="text-sm font-bold text-gray-900 mt-1">
                      {flowLast.Proto === 6 ? 'TCP' : flowLast.Proto === 17 ? 'UDP' : flowLast.Proto === 1 ? 'ICMP' : flowLast.Proto}
                    </div>
                    <div className="text-xs text-gray-500">Port {flowLast.DstPort}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-xs text-gray-600 font-semibold">{t.bytes}</div>
                    <div className="text-sm font-bold text-gray-900 mt-1">{flowLast.Bytes?.toLocaleString() || '0'}</div>
                    <div className="text-xs text-gray-500">{flowLast.Packets} {t.packets}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'exporters' && (
          <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-200">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Database className="h-7 w-7 text-purple-600" />
              {t.exporterDetails}
            </h2>
            <div className="space-y-4">
              {exporters?.exporters?.map((exporter: string, idx: number) => (
                <div key={idx} className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl">
                        <Database className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{exporter}</h3>
                        <p className="text-sm text-gray-600">{t.exporter} #{idx + 1}</p>
                      </div>
                    </div>
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                      {t.active}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-xs text-gray-600 font-semibold uppercase">{t.status}</div>
                      <div className="text-lg font-bold text-gray-900 mt-1">{t.online}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-xs text-gray-600 font-semibold uppercase">{t.type}</div>
                      <div className="text-lg font-bold text-gray-900 mt-1">NetFlow</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-xs text-gray-600 font-semibold uppercase">{t.lastActivity}</div>
                      <div className="text-lg font-bold text-gray-900 mt-1">
                        {isValidDate(flowLast?.TimeReceived) ? new Date(flowLast.TimeReceived).toLocaleTimeString(language, { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--'}
                      </div>
                    </div>
                  </div>
                </div>
              )) || (
                <div className="text-center py-16 text-gray-500">
                  <Database className="h-20 w-20 mx-auto mb-4 opacity-30" />
                  <div className="text-xl font-bold">{t.noExporters}</div>
                  <div className="text-sm mt-2">{t.waitingFlows}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-gray-200">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Settings className="h-7 w-7 text-gray-700" />
                {t.apiConfig}
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Akvorado API URL
                  </label>
                  <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 font-mono text-sm font-semibold text-gray-900">
                    {process.env.NEXT_PUBLIC_AKVORADO_API_URL || 'http://localhost:8080'}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Variable: <code className="bg-gray-100 px-2 py-1 rounded font-mono">NEXT_PUBLIC_AKVORADO_API_URL</code>
                  </p>
                </div>

                <div className="border-t-2 pt-5">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">{t.authHeaders}</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Remote-User (Login)
                      </label>
                      <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-3 font-mono text-sm font-semibold text-gray-900">
                        {process.env.AKVORADO_REMOTE_USER || 'admin'}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Variable: <code className="bg-gray-100 px-2 py-1 rounded font-mono">AKVORADO_REMOTE_USER</code>
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Remote-Name (Full name)
                      </label>
                      <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-3 font-mono text-sm font-semibold text-gray-900">
                        {process.env.AKVORADO_REMOTE_NAME || 'Administrator'}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Variable: <code className="bg-gray-100 px-2 py-1 rounded font-mono">AKVORADO_REMOTE_NAME</code>
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Remote-Email (Email)
                      </label>
                      <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-3 font-mono text-sm font-semibold text-gray-900">
                        {process.env.AKVORADO_REMOTE_EMAIL || 'admin@akvorado.local'}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Variable: <code className="bg-gray-100 px-2 py-1 rounded font-mono">AKVORADO_REMOTE_EMAIL</code>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="text-blue-600 text-3xl">📘</div>
                <div>
                  <h3 className="font-bold text-blue-900 mb-3 text-lg">{t.changeSettings}</h3>
                  <div className="text-sm text-blue-800 space-y-2">
                    <p className="font-semibold">1. {t.editEnv}</p>
                    <p className="font-semibold">2. {t.updateVars}</p>
                    <p className="font-semibold">3. {t.restartServer}</p>
                    <div className="mt-4 bg-blue-200 p-4 rounded-lg">
                      <p className="font-bold mb-2">{t.exampleEnv}</p>
                      <pre className="text-xs overflow-x-auto font-mono bg-white p-3 rounded">
{`NEXT_PUBLIC_AKVORADO_API_URL=http://168.194.167.146:8881
AKVORADO_REMOTE_USER=admin
AKVORADO_REMOTE_NAME=Administrator
AKVORADO_REMOTE_EMAIL=admin@akvorado.local`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
