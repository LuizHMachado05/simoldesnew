import React, { useState } from 'react';
import { 
  ClipboardList, 
  LayoutDashboard, 
  History, 
  LogOut, 
  User, 
  Settings, 
  Bell, 
  Info, 
  CheckCircle2, 
  ArrowLeft, 
  Factory, 
  PenTool as Tool, 
  AlertTriangle, 
  Eye,
  RefreshCw,
  LogIn,
  Lock
} from 'lucide-react';
import { SignOperationModal } from './components/SignOperationModal';
import { OperationActions } from './components/OperationActions';

const IMAGES = {
  logo: `${import.meta.env.BASE_URL}simoldeslogo.png`,
  loginCapa: `${import.meta.env.BASE_URL}Capa Simoldes.png`,
  programCapa: `${import.meta.env.BASE_URL}capa.png`,
  operation: `${import.meta.env.BASE_URL}operation.png`,
};

interface Operation {
  id: number;
  sequence: string;
  type: 'Furação' | 'Fresamento';
  function: string;
  centerPoint: string;
  toolRef: string;
  ic: string;
  alt: string;
  time: {
    machine: string;
    total: string;
  };
  details: {
    depth: string;
    speed: string;
    feed: string;
    coolant: string;
    notes?: string;
  };
  quality: {
    tolerance: string;
    surfaceFinish: string;
    requirements: string[];
  };
  imageUrl: string;
  completed: boolean;
  signedBy?: string;
  timestamp?: string;
  inspectionNotes?: string;
  timeRecord?: {
    start: string;
    end: string;
  };
  measurementValue?: string;
}

interface MoldProgram {
  id: string;
  name: string;
  machine: string;
  programPath: string;
  material: string;
  date: string;
  programmer: string;
  blockCenter: string;
  reference: string;
  observations: string;
  imageUrl?: string;
  operations: Operation[];
}

const historicPrograms: MoldProgram[] = [
  {
    id: '1665_15',
    name: 'MOLDE LATERAL DIREITO',
    machine: 'F1400',
    programPath: 'U:/F1400/1665_15',
    material: '1730',
    date: '05/02/2024',
    programmer: 'diego.verciano',
    blockCenter: 'X0,0 Y0,0',
    reference: 'EM Z: 15,0',
    observations: 'VERIFICAR ALINHAMENTO INICIAL',
    imageUrl: IMAGES.programCapa,
    operations: [
      {
        id: 1,
        sequence: '04',
        type: 'Furação',
        function: 'Pré-furo',
        centerPoint: '42',
        toolRef: 'BK_DRILL_D38_SSD_701800022',
        ic: '235',
        alt: '260',
        time: {
          machine: '09:15:00',
          total: '09:45:30'
        },
        details: {
          depth: '85mm',
          speed: '2800 RPM',
          feed: '0.12mm/rev',
          coolant: 'Externa 45 bar'
        },
        quality: {
          tolerance: '±0.02mm',
          surfaceFinish: 'Ra 0.8',
          requirements: ['Verificar circularidade']
        },
        imageUrl: IMAGES.operation,
        completed: true,
        signedBy: 'carlos.silva',
        timestamp: '05/02/2024 09:45:30',
        timeRecord: {
          start: '09:15:00',
          end: '09:45:30'
        },
        measurementValue: '37.98'
      },
      {
        id: 2,
        sequence: '05',
        type: 'Fresamento',
        function: 'Acabamento lateral',
        centerPoint: '38',
        toolRef: 'BK_FINISH_D32_SSD_701800045',
        ic: '190',
        alt: '215',
        time: {
          machine: '10:00:00',
          total: '10:45:00'
        },
        details: {
          depth: '55mm',
          speed: '3500 RPM',
          feed: '0.08mm/rev',
          coolant: 'Externa 50 bar'
        },
        quality: {
          tolerance: '±0.01mm',
          surfaceFinish: 'Ra 0.4',
          requirements: ['Medir planicidade', 'Verificar acabamento']
        },
        imageUrl: IMAGES.operation,
        completed: true,
        signedBy: 'carlos.silva',
        timestamp: '05/02/2024 10:45:00',
        timeRecord: {
          start: '10:00:00',
          end: '10:45:00'
        },
        measurementValue: '54.99'
      }
    ]
  },
  {
    id: '1666_16',
    name: 'MOLDE BASE SUPERIOR',
    machine: 'F1600',
    programPath: 'U:/F1600/1666_16',
    material: '1740',
    date: '06/02/2024',
    programmer: 'ana.santos',
    blockCenter: 'X0,0 Y0,0',
    reference: 'EM Z: 25,0',
    observations: 'USAR SUPORTE ESPECIAL',
    imageUrl: IMAGES.programCapa,
    operations: [
      {
        id: 1,
        sequence: '06',
        type: 'Fresamento',
        function: 'Desbaste',
        centerPoint: '52',
        toolRef: 'BK_ROUGH_D63_SSD_701800078',
        ic: '280',
        alt: '305',
        time: {
          machine: '13:30:00',
          total: '14:15:00'
        },
        details: {
          depth: '95mm',
          speed: '2200 RPM',
          feed: '0.18mm/rev',
          coolant: 'Externa 55 bar'
        },
        quality: {
          tolerance: '±0.05mm',
          surfaceFinish: 'Ra 1.6',
          requirements: ['Verificar profundidade']
        },
        imageUrl: IMAGES.operation,
        completed: true,
        signedBy: 'roberto.oliveira',
        timestamp: '06/02/2024 14:15:00',
        timeRecord: {
          start: '13:30:00',
          end: '14:15:00'
        },
        measurementValue: '94.97'
      },
      {
        id: 2,
        sequence: '07',
        type: 'Fresamento',
        function: 'Acabamento',
        centerPoint: '45',
        toolRef: 'BK_FINISH_D40_SSD_701800089',
        ic: '225',
        alt: '250',
        time: {
          machine: '14:30:00',
          total: '15:30:00'
        },
        details: {
          depth: '95mm',
          speed: '3000 RPM',
          feed: '0.1mm/rev',
          coolant: 'Externa 60 bar'
        },
        quality: {
          tolerance: '±0.01mm',
          surfaceFinish: 'Ra 0.4',
          requirements: ['Medir rugosidade', 'Verificar dimensional']
        },
        imageUrl: IMAGES.operation,
        completed: true,
        signedBy: 'roberto.oliveira',
        timestamp: '06/02/2024 15:30:00',
        timeRecord: {
          start: '14:30:00',
          end: '15:30:00'
        },
        measurementValue: '95.00'
      }
    ]
  },
  {
    id: '1667_17',
    name: 'MOLDE CAVIDADE CENTRAL',
    machine: 'F1400',
    programPath: 'U:/F1400/1667_17',
    material: '1730',
    date: '07/02/2024',
    programmer: 'pedro.oliveira',
    blockCenter: 'X0,0 Y0,0',
    reference: 'EM Z: 30,0',
    observations: 'REFRIGERAÇÃO ESPECIAL',
    imageUrl: IMAGES.programCapa,
    operations: [
      {
        id: 1,
        sequence: '08',
        type: 'Furação',
        function: 'Furos de refrigeração',
        centerPoint: '58',
        toolRef: 'BK_DRILL_D12_SSD_701800099',
        ic: '150',
        alt: '175',
        time: {
          machine: '08:00:00',
          total: '09:00:00'
        },
        details: {
          depth: '150mm',
          speed: '4000 RPM',
          feed: '0.08mm/rev',
          coolant: 'Interna 70 bar'
        },
        quality: {
          tolerance: '±0.02mm',
          surfaceFinish: 'Ra 0.8',
          requirements: ['Verificar profundidade', 'Medir circularidade']
        },
        imageUrl: IMAGES.operation,
        completed: true,
        signedBy: 'maria.santos',
        timestamp: '07/02/2024 09:00:00',
        timeRecord: {
          start: '08:00:00',
          end: '09:00:00'
        },
        measurementValue: '12.01'
      },
      {
        id: 2,
        sequence: '09',
        type: 'Fresamento',
        function: 'Acabamento cavidade',
        centerPoint: '50',
        toolRef: 'BK_FINISH_D16_SSD_701800100',
        ic: '165',
        alt: '190',
        time: {
          machine: '09:30:00',
          total: '11:00:00'
        },
        details: {
          depth: '80mm',
          speed: '4500 RPM',
          feed: '0.05mm/rev',
          coolant: 'Externa 65 bar'
        },
        quality: {
          tolerance: '±0.008mm',
          surfaceFinish: 'Ra 0.2',
          requirements: ['Medir rugosidade', 'Verificar geometria']
        },
        imageUrl: IMAGES.operation,
        completed: true,
        signedBy: 'maria.santos',
        timestamp: '07/02/2024 11:00:00',
        timeRecord: {
          start: '09:30:00',
          end: '11:00:00'
        },
        measurementValue: '79.992'
      }
    ]
  }
];

function App() {
  const [operatorId, setOperatorId] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedProgram, setSelectedProgram] = useState<MoldProgram | null>(null);
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [signModal, setSignModal] = useState({
    isOpen: false,
    operationId: null as number | null,
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleOperationClick = (operation: Operation) => {
    setSelectedOperation(operation);
  };

  const moldPrograms: MoldProgram[] = [
    {
      id: '1668_18',
      name: 'MOLDE CARCAÇA FRONTAL',
      machine: 'F1400',
      programPath: 'U:/F1400/1668_18',
      material: '1730',
      date: '10/02/2025',
      programmer: 'diego.verciano',
      blockCenter: 'X0,0 Y0,0',
      reference: 'EM Z: 20,0',
      observations: 'PRENDER SOBRE CALÇOS DE 10mm',
      imageUrl: IMAGES.programCapa,
      operations: [
        {
          id: 1,
          sequence: '07',
          type: 'Furação',
          function: 'Centro',
          centerPoint: '48',
          toolRef: 'BK_TOPDRIL_D44_SSD_701800011',
          ic: '247',
          alt: '273',
          time: {
            machine: '10:30:12',
            total: '10:38:15',
          },
          details: {
            depth: '120mm',
            speed: '2400 RPM',
            feed: '0.15mm/rev',
            coolant: 'Externa 40 bar',
            notes: 'Verificar alinhamento antes de iniciar',
          },
          quality: {
            tolerance: '±0.008mm',
            surfaceFinish: 'Ra 0.2',
            requirements: [
              'Verificar concentricidade',
              'Medir circularidade',
              'Controle 100% dimensional',
            ],
          },
          imageUrl: IMAGES.operation,
          completed: false,
        },
        {
          id: 2,
          sequence: '08',
          type: 'Fresamento',
          function: 'Desbaste',
          centerPoint: '52',
          toolRef: 'BK_MILL_D63_SSD_701800022',
          ic: '280',
          alt: '295',
          time: {
            machine: '09:30:00',
            total: '09:45:15',
          },
          details: {
            depth: '85mm',
            speed: '2800 RPM',
            feed: '0.18mm/rev',
            coolant: 'Externa 45 bar',
            notes: 'Realizar desbaste em 3 passes',
          },
          quality: {
            tolerance: '±0.05mm',
            surfaceFinish: 'Ra 1.6',
            requirements: [
              'Verificar profundidade entre passes',
              'Monitorar temperatura',
            ],
          },
          imageUrl: IMAGES.operation,
          completed: false,
        },
        {
          id: 3,
          sequence: '09',
          type: 'Fresamento',
          function: 'Acabamento',
          centerPoint: '35',
          toolRef: 'BK_FINISH_D25_SSD_701800033',
          ic: '180',
          alt: '195',
          time: {
            machine: '14:15:00',
            total: '14:45:30',
          },
          details: {
            depth: '65mm',
            speed: '3200 RPM',
            feed: '0.08mm/rev',
            coolant: 'Externa 50 bar',
            notes: 'Acabamento fino nas paredes',
          },
          quality: {
            tolerance: '±0.01mm',
            surfaceFinish: 'Ra 0.4',
            requirements: [
              'Medir rugosidade em 5 pontos',
              'Verificar paralelismo',
            ],
          },
          imageUrl: IMAGES.operation,
          completed: false,
        }
      ]
    },
    {
      id: '1669_22',
      name: 'MOLDE TAMPA SUPERIOR',
      machine: 'F1600',
      programPath: 'U:/F1600/1669_22',
      material: '1740',
      date: '12/02/2025',
      programmer: 'ana.santos',
      blockCenter: 'X0,0 Y0,0',
      reference: 'EM Z: 30,0',
      observations: 'UTILIZAR SUPORTE ESPECIAL',
      imageUrl: IMAGES.programCapa,
      operations: [
        {
          id: 1,
          sequence: '05',
          type: 'Furação',
          function: 'Pré-furo',
          centerPoint: '40',
          toolRef: 'BK_DRILL_D32_SSD_701800044',
          ic: '220',
          alt: '245',
          time: {
            machine: '11:00:00',
            total: '11:45:20',
          },
          details: {
            depth: '75mm',
            speed: '2900 RPM',
            feed: '0.10mm/rev',
            coolant: 'Interna 60 bar',
            notes: 'Controle dimensional crítico',
          },
          quality: {
            tolerance: '±0.008mm',
            surfaceFinish: 'Ra 0.2',
            requirements: [
              'Verificar concentricidade',
              'Medir circularidade',
              'Controle 100% dimensional',
            ],
          },
          imageUrl: IMAGES.operation,
          completed: false,
        }
      ]
    },
    {
      id: '1670_31',
      name: 'MOLDE BASE INFERIOR',
      machine: 'F1400',
      programPath: 'U:/F1400/1670_31',
      material: '1730',
      date: '15/02/2025',
      programmer: 'pedro.oliveira',
      blockCenter: 'X0,0 Y0,0',
      reference: 'EM Z: 25,0',
      observations: 'VERIFICAR PLANICIDADE DA BASE',
      imageUrl: IMAGES.programCapa,
      operations: [
        {
          id: 1,
          sequence: '03',
          type: 'Fresamento',
          function: 'Desbaste Base',
          centerPoint: '55',
          toolRef: 'BK_MILL_D80_SSD_701800055',
          ic: '300',
          alt: '320',
          time: {
            machine: '13:00:00',
            total: '13:30:00',
          },
          details: {
            depth: '45mm',
            speed: '2200 RPM',
            feed: '0.20mm/rev',
            coolant: 'Externa 50 bar',
            notes: 'Desbaste em 2 passes',
          },
          quality: {
            tolerance: '±0.03mm',
            surfaceFinish: 'Ra 1.2',
            requirements: [
              'Verificar planicidade',
              'Medir espessura final',
            ],
          },
          imageUrl: IMAGES.operation,
          completed: false,
        }
      ]
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (operatorId.trim() && password.trim()) {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setOperatorId('');
    setPassword('');
  };

  const handleOperationCheck = (operationId: number) => {
    if (!selectedProgram) return;

    const operationIndex = selectedProgram.operations.findIndex(
      (op) => op.id === operationId
    );
    const previousOperations = selectedProgram.operations.slice(0, operationIndex);
    const allPreviousCompleted = previousOperations.every((op) => op.completed);

    if (!allPreviousCompleted) {
      alert('Por favor, complete as operações anteriores primeiro.');
      return;
    }

    setSignModal({
      isOpen: true,
      operationId,
    });
  };

  const handleSignConfirm = (data: {
    startTime: string;
    endTime: string;
    measurement: string;
    notes?: string;
  }) => {
    if (!selectedProgram || !signModal.operationId) return;

    setSelectedProgram({
      ...selectedProgram,
      operations: selectedProgram.operations.map((op) =>
        op.id === signModal.operationId
          ? {
              ...op,
              completed: true,
              signedBy: operatorId,
              timestamp: new Date().toLocaleString(),
              inspectionNotes: data.notes,
              timeRecord: {
                start: data.startTime,
                end: data.endTime,
              },
              measurementValue: data.measurement,
            }
          : op
      ),
    });

    setSignModal({ isOpen: false, operationId: null });
  };

  const handleRefresh = (tab: string) => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000); // A animação dura 1 segundo
  };

  const refreshIconClass = `h-4 w-4 transition-transform duration-1000 ${
    isRefreshing ? 'animate-spin' : ''
  }`;

  if (!isAuthenticated) {
    return (
      <div className="login-background">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-white p-0 max-w-5xl w-full flex flex-col md:flex-row overflow-hidden rounded-2xl shadow-2xl">
            {/* Left side - Login form */}
            <div className="w-full md:w-1/2 login-overlay p-6 md:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <img
                  src={IMAGES.logo}
                  alt="Simoldes Logo"
                  className="h-12 mb-6"
                />
                <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo</h1>
                <p className="text-gray-200 text-sm">
                  Sistema de Controle de Projetos
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="operatorId" className="block text-sm font-medium text-white mb-2">
                    Número do Operador
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="operatorId"
                      value={operatorId}
                      onChange={(e) => setOperatorId(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-[#04514B] bg-white text-lg"
                      placeholder="Digite seu número"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-[#04514B] bg-white text-lg"
                      placeholder="••••••"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-white mr-2 focus:ring-[#04514B] focus:ring-offset-0 text-[#04514B]"
                    />
                    <span className="text-white">Lembrar-me</span>
                  </label>
                  <button 
                    type="button"
                    onClick={() => alert('Por favor, contate o suporte técnico.')}
                    className="text-white hover:underline"
                  >
                    Esqueci a senha
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-white text-[#04514B] rounded-xl font-medium hover:bg-gray-100 transition-colors text-lg flex items-center justify-center gap-2"
                >
                  <LogIn className="h-5 w-5" />
                  Entrar no Sistema
                </button>
              </form>
            </div>
            
            {/* Right side - Image */}
            <div className="hidden md:block w-1/2">
              <img
                src={IMAGES.loginCapa}
                alt="Login illustration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="main-layout">
        {/* Header/Topbar */}
        <header className="topbar shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-20 md:h-24 relative">
              {/* Left - Logo */}
              <div className="flex items-center">
                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                    setSelectedProgram(null);
                    setSelectedOperation(null);
                  }}
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src={IMAGES.logo}
                    alt="Simoldes Aços Logo"
                    className="h-8 md:h-10 cursor-pointer"
                  />
                </button>
              </div>

              {/* Center - Title */}
              <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
                <h1 className="text-xl md:text-2xl font-semibold text-white">
                  Sistema de Controle
                </h1>
              </div>

              {/* Right - Icons */}
              <div className="flex items-center gap-2 md:gap-6">
                <button className="text-white hover:text-gray-200 p-2">
                  <Bell className="h-5 w-5 md:h-6 md:w-6" />
                </button>
                <button className="text-white hover:text-gray-200 p-2">
                  <Settings className="h-5 w-5 md:h-6 md:w-6" />
                </button>
                <div className="flex items-center gap-2 md:gap-4 ml-2 md:ml-8">
                  <span className="text-white text-sm md:text-lg hidden sm:inline">{operatorId}</span>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-gray-200 p-2"
                  >
                    <LogOut className="h-5 w-5 md:h-6 md:w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-col md:flex-row">
          {/* Sidebar - Mobile Dropdown */}
          <div className="md:hidden bg-white p-4">
            <select 
              value={activeTab}
              onChange={(e) => {
                setActiveTab(e.target.value);
                setSelectedProgram(null);
              }}
              className="w-full p-2 rounded-lg border border-gray-300"
            >
              <option value="dashboard">Dashboard</option>
              <option value="projects">Projetos</option>
              <option value="history">Histórico</option>
            </select>
          </div>

          {/* Sidebar - Desktop */}
          <aside className="hidden md:block sidebar w-64 min-h-[calc(100vh-6rem)] p-4 space-y-2">
            <button
              onClick={() => {
                setActiveTab('dashboard');
                setSelectedProgram(null);
                setSelectedOperation(null);
              }}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-[#04514B] text-white'
                  : 'hover:bg-[#04514B] hover:text-white text-gray-700'
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('projects');
                setSelectedProgram(null);
              }}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'projects'
                  ? 'bg-[#04514B] text-white'
                  : 'hover:bg-[#04514B] hover:text-white text-gray-700'
              }`}
            >
              <ClipboardList className="h-5 w-5" />
              <span>Projetos</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('history');
                setSelectedProgram(null);
              }}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'history'
                  ? 'bg-[#04514B] text-white'
                  : 'hover:bg-[#04514B] hover:text-white text-gray-700'
              }`}
            >
              <History className="h-5 w-5" />
              <span>Histórico</span>
            </button>
          </aside>

          <main className="flex-1 p-4 md:p-8">
            {activeTab === 'dashboard' && !selectedProgram && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleRefresh('dashboard')} 
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 bg-white rounded-lg shadow-sm hover:shadow transition-all"
                    >
                      <RefreshCw className={refreshIconClass} />
                      <span>Atualizar</span>
                    </button>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-500 text-sm font-medium">Projetos Ativos</span>
                      <span className="bg-green-100 p-2 rounded-lg">
                        <ClipboardList className="h-5 w-5 text-green-600" />
                      </span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-[#04514B]">{moldPrograms.length}</span>
                      <span className="ml-2 text-sm text-gray-500">projetos</span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-500 text-sm font-medium">Em Andamento</span>
                      <span className="bg-blue-100 p-2 rounded-lg">
                        <Tool className="h-5 w-5 text-blue-600" />
                      </span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-[#04514B]">
                        {moldPrograms.filter(p => p.operations.some(op => !op.completed)).length}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">em execução</span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-500 text-sm font-medium">Concluídos Hoje</span>
                      <span className="bg-purple-100 p-2 rounded-lg">
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      </span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-[#04514B]">
                        {moldPrograms.filter(p => p.operations.every(op => op.completed)).length}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">finalizados</span>
                    </div>
                  </div>
                </div>

                {/* Recent Projects Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Projetos Recentes</h3>
                      <button 
                        onClick={() => setActiveTab('projects')}
                        className="text-sm text-[#04514B] hover:text-[#033630] font-medium"
                      >
                        Ver todos
                      </button>
                    </div>
                    <div className="space-y-4">
                      {moldPrograms.slice(0, 4).map((program) => (
                        <div
                          key={program.id}
                          onClick={() => {
                            setActiveTab('projects');
                            setSelectedProgram(program);
                          }}
                          className="flex items-center p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <Factory className="h-5 w-5 text-gray-400" />
                              <span className="font-medium text-gray-900">{program.name}</span>
                            </div>
                            <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                              <span>Máquina: {program.machine}</span>
                              <span>•</span>
                              <span>{program.date}</span>
                            </div>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            program.operations.every(op => op.completed)
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {program.operations.every(op => op.completed) 
                              ? <><CheckCircle2 className="h-3 w-3 mr-1" />Concluído</>
                              : `${program.operations.filter(op => !op.completed).length} pendentes`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Power BI Dashboard */}
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Análise em Tempo Real</h3>
                    <div className="powerbi-container rounded-lg overflow-hidden">
                      <iframe 
                        title="Dashboard Simoldes"
                        src="https://app.powerbi.com/view?r=eyJrIjoiMzdlYmM0NDctMzdjNi00YmZkLWE0NTQtMjc3MDg3OGYzNmMzIiwidCI6ImU5YzgwMThiLTQwY2YtNDE5MC1hOTA3LTI1ZjNjZjMyNzdiMiJ9"
                        className="w-full h-full border-0"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div>
                {!selectedProgram ? (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Projetos
                      </h2>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleRefresh('projects')} 
                          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 bg-white rounded-lg shadow-sm hover:shadow transition-all"
                        >
                          <RefreshCw className={refreshIconClass} />
                          <span>Atualizar</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {moldPrograms.map((program) => (
                        <div
                          key={program.id}
                          onClick={() => {
                            setSelectedOperation(null);
                            setSelectedProgram(program);
                          }}
                          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border border-transparent hover:border-[#04514B]"
                        >
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {program.name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  <Factory className="h-4 w-4 inline mr-1" />
                                  Máquina: {program.machine}
                                </p>
                              </div>
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                program.operations.every(op => op.completed)
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {program.operations.every(op => op.completed) 
                                  ? <><CheckCircle2 className="h-3 w-3 mr-1" />Concluído</>
                                  : `${program.operations.filter(op => !op.completed).length} etapas pendentes`}
                              </span>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center text-sm">
                                <Tool className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">Material: {program.material}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <User className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">{program.programmer}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <History className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">Data: {program.date}</span>
                              </div>
                            </div>

                            <div className="mt-4 text-right">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedOperation(null);
                                  setSelectedProgram(program);
                                }}
                                className="text-sm text-blue-600 hover:text-blue-800"
                              >
                                Ver detalhes →
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : !selectedOperation ? (
                  // Visualização do Programa
                  <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => setSelectedProgram(null)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <ArrowLeft className="h-6 w-6" />
                          </button>
                          <div>
                            <h2 className="text-lg font-medium text-gray-900">
                              {selectedProgram.name}
                            </h2>
                            <p className="text-sm text-gray-500">
                              Programa: {selectedProgram.programPath}
                            </p>
                          </div>
                        </div>
                        
                        {/* Botão de atualizar */}
                        <button 
                          onClick={() => handleRefresh('projects')}
                          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 bg-white rounded-lg shadow-sm hover:shadow transition-all"
                        >
                          <RefreshCw className={refreshIconClass} />
                          <span>Atualizar</span>
                        </button>
                      </div>
                      
                      {/* Conteúdo do programa */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Informações do programa */}
                        <div>
                          <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">
                              Informações do Programa
                            </h3>
                            <dl className="grid grid-cols-2 gap-2 text-sm">
                              <dt className="text-gray-500">Máquina:</dt>
                              <dd className="text-gray-900">
                                {selectedProgram.machine}
                              </dd>
                              <dt className="text-gray-500">Material:</dt>
                              <dd className="text-gray-900">
                                {selectedProgram.material}
                              </dd>
                              <dt className="text-gray-500">Data:</dt>
                              <dd className="text-gray-900">{selectedProgram.date}</dd>
                              <dt className="text-gray-500">Programador:</dt>
                              <dd className="text-gray-900">
                                {selectedProgram.programmer}
                              </dd>
                              <dt className="text-gray-500">Centro do Bloco:</dt>
                              <dd className="text-gray-900">
                                {selectedProgram.blockCenter}
                              </dd>
                              <dt className="text-gray-500">Referência:</dt>
                              <dd className="text-gray-900">
                                {selectedProgram.reference}
                              </dd>
                            </dl>
                          </div>

                          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <Info className="h-5 w-5 text-yellow-400" />
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-800">
                                  Observações
                                </h3>
                                <p className="text-sm text-yellow-700 mt-1">
                                  {selectedProgram.observations}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Visualização do programa */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-900 mb-2">
                            Visualização do Programa
                          </h3>
                          <div className="aspect-w-16 aspect-h-9">
                            <img
                              src={selectedProgram.imageUrl}
                              alt="Visualização do programa"
                              className="w-full h-full object-contain rounded-lg"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Tabela de operações */}
                      <div className="mt-6">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Seq.
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Tipo
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Função
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Ferramenta
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Parâmetros
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Qualidade
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Operador
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Horário
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Medição
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Status
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Ações
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {selectedProgram.operations.map((operation) => (
                                <tr
                                  key={operation.id}
                                  className={operation.completed ? 'bg-green-50' : ''}
                                >
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                    {operation.sequence}
                                  </td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                    {operation.type}
                                  </td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                    {operation.function}
                                  </td>
                                  <td className="px-3 py-2 text-sm text-gray-500">
                                    <div className="max-w-xs truncate">
                                      {operation.toolRef}
                                    </div>
                                  </td>
                                  <td className="px-3 py-2 text-sm text-gray-900">
                                    <div className="space-y-1">
                                      <div>
                                        Vel: {operation.details.speed}
                                      </div>
                                      <div>
                                        Av: {operation.details.feed}
                                      </div>
                                      <div>
                                        Prof: {operation.details.depth}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-3 py-2 text-sm text-gray-900">
                                    <div>Tol: {operation.quality.tolerance}</div>
                                    <div>Acab: {operation.quality.surfaceFinish}</div>
                                  </td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                    {operation.completed ? operation.signedBy : '-'}
                                  </td>
                                  <td className="px-3 py-2 text-sm text-gray-900">
                                    {operation.completed ? (
                                      <div className="space-y-1">
                                        <div>Início: {operation.timeRecord?.start}</div>
                                        <div>Fim: {operation.timeRecord?.end}</div>
                                      </div>
                                    ) : (
                                      '-'
                                    )}
                                  </td>
                                  <td className="px-3 py-2 text-sm text-gray-900">
                                    {operation.completed ? `${operation.measurementValue}mm` : '-'}
                                  </td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm">
                                    {operation.completed ? (
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        <CheckCircle2 className="h-4 w-4 mr-1" />
                                        Concluído
                                      </span>
                                    ) : (
                                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        <AlertTriangle className="h-4 w-4 mr-1" />
                                        Pendente
                                      </span>
                                    )}
                                  </td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                    <OperationActions
                                      operationId={operation.id}
                                      completed={operation.completed}
                                      onView={(e) => {
                                        handleOperationClick(operation);
                                      }}
                                      onSign={(e) => {
                                        handleOperationCheck(operation.id);
                                      }}
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Visualização da Operação
                  <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => setSelectedOperation(null)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <ArrowLeft className="h-6 w-6" />
                          </button>
                          <div>
                            <h2 className="text-lg font-medium text-gray-900">
                              Operação {selectedOperation.sequence} - {selectedOperation.type}
                            </h2>
                            <p className="text-sm text-gray-500">
                              {selectedOperation.function}
                            </p>
                          </div>
                        </div>
                        
                        {/* Mostrando apenas o status, removido o botão de assinar */}
                        <div className="flex items-center">
                          {selectedOperation.completed && (
                            <div className="flex items-center">
                              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                              <span className="text-sm font-medium text-green-700">Concluída</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                          {/* Status de Execução */}
                          {selectedOperation.completed && (
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                              <h3 className="text-sm font-medium text-gray-900 mb-4">
                                Status de Execução
                              </h3>
                              <dl className="grid grid-cols-2 gap-2 text-sm">
                                <dt className="text-gray-500">Assinado por:</dt>
                                <dd className="text-gray-900">{selectedOperation.signedBy}</dd>
                                <dt className="text-gray-500">Hora Início:</dt>
                                <dd className="text-gray-900">{selectedOperation.timeRecord?.start}</dd>
                                <dt className="text-gray-500">Hora Fim:</dt>
                                <dd className="text-gray-900">{selectedOperation.timeRecord?.end}</dd>
                                <dt className="text-gray-500">Medição:</dt>
                                <dd className="text-gray-900">{selectedOperation.measurementValue}mm</dd>
                                {selectedOperation.inspectionNotes && (
                                  <>
                                    <dt className="text-gray-500 col-span-2">Observações:</dt>
                                    <dd className="text-gray-900 col-span-2 italic">
                                      "{selectedOperation.inspectionNotes}"
                                    </dd>
                                  </>
                                )}
                              </dl>
                            </div>
                          )}

                          {/* Parâmetros de Usinagem */}
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-900 mb-4">
                              Parâmetros de Usinagem
                            </h3>
                            <dl className="grid grid-cols-2 gap-2 text-sm">
                              <dt className="text-gray-500">Velocidade:</dt>
                              <dd className="text-gray-900">
                                {selectedOperation.details.speed}
                              </dd>
                              <dt className="text-gray-500">Avanço:</dt>
                              <dd className="text-gray-900">
                                {selectedOperation.details.feed}
                              </dd>
                              <dt className="text-gray-500">Profundidade:</dt>
                              <dd className="text-gray-900">
                                {selectedOperation.details.depth}
                              </dd>
                              <dt className="text-gray-500">Refrigeração:</dt>
                              <dd className="text-gray-900">
                                {selectedOperation.details.coolant}
                              </dd>
                            </dl>
                          </div>

                          {/* Requisitos de Qualidade */}
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-900 mb-4">
                              Requisitos de Qualidade
                            </h3>
                            <dl className="grid grid-cols-2 gap-2 text-sm mb-4">
                              <dt className="text-gray-500">Tolerância:</dt>
                              <dd className="text-gray-900">
                                {selectedOperation.quality.tolerance}
                              </dd>
                              <dt className="text-gray-500">Acabamento:</dt>
                              <dd className="text-gray-900">
                                {selectedOperation.quality.surfaceFinish}
                              </dd>
                            </dl>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-2">
                                Checklist de Inspeção:
                              </h4>
                              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                {selectedOperation.quality.requirements.map((req, idx) => (
                                  <li key={idx}>{req}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Observações (se houver) */}
                          {selectedOperation.details.notes && (
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                              <div className="flex">
                                <div className="flex-shrink-0">
                                  <Info className="h-5 w-5 text-yellow-400" />
                                </div>
                                <div className="ml-3">
                                  <h3 className="text-sm font-medium text-yellow-800">
                                    Observações
                                  </h3>
                                  <p className="text-sm text-yellow-700 mt-1">
                                    {selectedOperation.details.notes}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Visualização da Operação */}
                        <div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">
                              Visualização da Operação
                            </h3>
                            <div className="aspect-w-16 aspect-h-9">
                              <img
                                src={IMAGES.programCapa}
                                alt="Visualização da operação"
                                className="w-full h-full object-contain rounded-lg"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                {!selectedProgram ? (
                  // Lista de projetos no histórico
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">
                        Histórico de Projetos
                      </h2>
                      <div className="flex gap-2">
                        <select 
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#04514B]"
                          defaultValue="all"
                        >
                          <option value="all">Todos os Status</option>
                          <option value="completed">Concluídos</option>
                          <option value="cancelled">Cancelados</option>
                        </select>
                        <select 
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#04514B]"
                          defaultValue="30"
                        >
                          <option value="7">Últimos 7 dias</option>
                          <option value="30">Últimos 30 dias</option>
                          <option value="90">Últimos 90 dias</option>
                          <option value="all">Todo período</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {historicPrograms.map((program) => (
                        <div
                          key={program.id}
                          onClick={() => {
                            setSelectedOperation(null); // Reseta a operação selecionada
                            setSelectedProgram(program);
                          }}
                          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer border border-transparent hover:border-[#04514B]"
                        >
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {program.name}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  <Factory className="h-4 w-4 inline mr-1" />
                                  Máquina: {program.machine}
                                </p>
                              </div>
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Concluído
                              </span>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center text-sm">
                                <Tool className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">Material: {program.material}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <User className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">{program.programmer}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <History className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">
                                  Data: {program.date}
                                </span>
                              </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                  <Eye className="h-4 w-4 text-[#04514B]" />
                                  <span className="text-sm text-[#04514B]">Ver detalhes</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : !selectedOperation ? (
                  // Visualização detalhada do programa
                  <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => setSelectedProgram(null)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <ArrowLeft className="h-6 w-6" />
                          </button>
                          <div>
                            <h2 className="text-lg font-medium text-gray-900">
                              {selectedProgram.name}
                            </h2>
                            <p className="text-sm text-gray-500">
                              Programa: {selectedProgram.programPath}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-900 mb-2">
                            Informações do Programa
                          </h3>
                          <dl className="grid grid-cols-2 gap-2 text-sm">
                            <dt className="text-gray-500">Máquina:</dt>
                            <dd className="text-gray-900">{selectedProgram.machine}</dd>
                            <dt className="text-gray-500">Material:</dt>
                            <dd className="text-gray-900">{selectedProgram.material}</dd>
                            <dt className="text-gray-500">Data:</dt>
                            <dd className="text-gray-900">{selectedProgram.date}</dd>
                            <dt className="text-gray-500">Programador:</dt>
                            <dd className="text-gray-900">{selectedProgram.programmer}</dd>
                          </dl>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-900 mb-2">
                            Visualização do Programa
                          </h3>
                          <div className="aspect-w-16 aspect-h-9">
                            <img
                              src={selectedProgram.imageUrl || IMAGES.programCapa}
                              alt="Visualização do programa"
                              className="w-full h-full object-contain rounded-lg"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          Operações
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seq.</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Função</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ferramenta</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parâmetros</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qualidade</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Operador</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horário</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medição</th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {selectedProgram.operations.map((operation) => (
                                <tr key={operation.id} className="hover:bg-gray-50">
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{operation.sequence}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{operation.type}</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{operation.function}</td>
                                  <td className="px-3 py-2 text-sm text-gray-500">
                                    <div className="max-w-xs truncate">{operation.toolRef}</div>
                                  </td>
                                  <td className="px-3 py-2 text-sm text-gray-900">
                                    <div className="space-y-1">
                                      <div>Vel: {operation.details.speed}</div>
                                      <div>Av: {operation.details.feed}</div>
                                      <div>Prof: {operation.details.depth}</div>
                                    </div>
                                  </td>
                                  <td className="px-3 py-2 text-sm text-gray-900">
                                    <div>Tol: {operation.quality.tolerance}</div>
                                    <div>Acab: {operation.quality.surfaceFinish}</div>
                                  </td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{operation.signedBy}</td>
                                  <td className="px-3 py-2 text-sm text-gray-900">
                                    <div>Início: {operation.timeRecord?.start}</div>
                                    <div>Fim: {operation.timeRecord?.end}</div>
                                  </td>
                                  <td className="px-3 py-2 text-sm text-gray-900">{operation.measurementValue}mm</td>
                                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                    <OperationActions
                                      operationId={operation.id}
                                      completed={operation.completed}
                                      onView={() => setSelectedOperation(operation)}
                                      onSign={() => {}}
                                      isHistory={true}
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Visualização detalhada da operação
                  <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center space-x-4 mb-6">
                        <button
                          onClick={() => setSelectedOperation(null)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <ArrowLeft className="h-6 w-6" />
                        </button>
                        <div>
                          <h2 className="text-lg font-medium text-gray-900">
                            Operação {selectedOperation.sequence} - {selectedOperation.type}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {selectedOperation.function}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">
                              Detalhes da Operação
                            </h3>
                            <dl className="grid grid-cols-2 gap-2 text-sm">
                              <dt className="text-gray-500">Ferramenta:</dt>
                              <dd className="text-gray-900">{selectedOperation.toolRef}</dd>
                              <dt className="text-gray-500">Velocidade:</dt>
                              <dd className="text-gray-900">{selectedOperation.details.speed}</dd>
                              <dt className="text-gray-500">Avanço:</dt>
                              <dd className="text-gray-900">{selectedOperation.details.feed}</dd>
                              <dt className="text-gray-500">Profundidade:</dt>
                              <dd className="text-gray-900">{selectedOperation.details.depth}</dd>
                              <dt className="text-gray-500">Tolerância:</dt>
                              <dd className="text-gray-900">{selectedOperation.quality.tolerance}</dd>
                              <dt className="text-gray-500">Acabamento:</dt>
                              <dd className="text-gray-900">{selectedOperation.quality.surfaceFinish}</dd>
                              <dt className="text-gray-500">Operador:</dt>
                              <dd className="text-gray-900">{selectedOperation.signedBy}</dd>
                              <dt className="text-gray-500">Medição:</dt>
                              <dd className="text-gray-900">{selectedOperation.measurementValue}mm</dd>
                            </dl>
                          </div>

                          {selectedOperation.details.notes && (
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                              <div className="flex">
                                <div className="flex-shrink-0">
                                  <Info className="h-5 w-5 text-yellow-400" />
                                </div>
                                <div className="ml-3">
                                  <h3 className="text-sm font-medium text-yellow-800">
                                    Observações
                                  </h3>
                                  <p className="text-sm text-yellow-700 mt-1">
                                    {selectedOperation.details.notes}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-900 mb-2">
                            Visualização da Operação
                          </h3>
                          <div className="aspect-w-16 aspect-h-9">
                            <img
                              src={selectedProgram.imageUrl || IMAGES.programCapa}
                              alt="Visualização da operação"
                              className="w-full h-full object-contain rounded-lg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
      <SignOperationModal
        isOpen={signModal.isOpen}
        onClose={() => setSignModal({ isOpen: false, operationId: null })}
        onConfirm={handleSignConfirm}
      />
    </>
  );
}

export default App;
















