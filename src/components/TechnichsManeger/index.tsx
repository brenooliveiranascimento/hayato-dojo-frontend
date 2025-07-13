import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  User,
  Plus,
  X,
  Loader2,
  Users,
  AlertCircle,
  Save,
  RotateCcw,
} from "lucide-react";
import { toast } from "react-toastify";
import { addTecnic, getTecnics } from "../../services/students.service";

const TechniciansManager: React.FC = () => {
  const queryClient = useQueryClient();
  const [newTechnician, setNewTechnician] = useState("");
  const [localTechnicians, setLocalTechnicians] = useState<string[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  // Query para buscar técnicos
  const {
    data: techniciansData,
    isLoading: isLoadingTechnicians,
    isError: techniciansError,
  } = useQuery({
    queryKey: ["technicians"],
    queryFn: getTecnics,
  });

  // Converter string de técnicos em array e sincronizar com estado local
  const originalTechnicians = techniciansData?.tecnics
    ? techniciansData.tecnics
        .split(",")
        .map((name) => name.trim())
        .filter((name) => name.length > 0)
    : [];

  // Sincronizar dados do servidor com estado local
  useEffect(() => {
    if (techniciansData?.tecnics !== undefined && !hasChanges) {
      setLocalTechnicians(originalTechnicians);
    }
  }, [techniciansData?.tecnics]);

  // Verificar se há mudanças comparando com dados originais
  useEffect(() => {
    const currentString = localTechnicians.join(", ");
    const originalString = techniciansData?.tecnics || "";
    setHasChanges(currentString !== originalString);
  }, [localTechnicians, techniciansData?.tecnics]);

  // Mutation para salvar técnicos
  const saveTechniciansMutation = useMutation({
    mutationFn: (techniciansString: string) => {
      return addTecnic(techniciansString);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technicians"] });
      setHasChanges(false);
      toast.success("Técnicos salvos com sucesso!");
    },
    onError: () => {
      const errorMessage = "Erro ao salvar técnicos";
      toast.error(errorMessage);
    },
  });

  const handleAddTechnician = () => {
    const trimmedName = newTechnician.trim();
    if (!trimmedName) {
      toast.error("Digite o nome do técnico");
      return;
    }

    if (trimmedName.length < 2) {
      toast.error("O nome deve ter pelo menos 2 caracteres");
      return;
    }

    // Verificar se o técnico já existe (ignorar case)
    if (
      localTechnicians.some(
        (name) => name.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      toast.error("Este técnico já está na lista");
      return;
    }

    setLocalTechnicians((prev) => [...prev, trimmedName]);
    setNewTechnician("");
  };

  const handleRemoveTechnician = (technicianName: string) => {
    setLocalTechnicians((prev) =>
      prev.filter((name) => name !== technicianName)
    );
  };

  const handleSaveTechnicians = () => {
    const techniciansString = localTechnicians.join(", ");
    saveTechniciansMutation.mutate(techniciansString);
  };

  const handleResetChanges = () => {
    setLocalTechnicians(originalTechnicians);
    setHasChanges(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTechnician();
    }
  };

  if (techniciansError) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <p>Erro ao carregar técnicos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-red-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Gerenciar Técnicos ({localTechnicians.length})
          </h2>
        </div>

        {/* Botões de Ação */}
        {hasChanges && (
          <div className="flex space-x-2">
            <button
              onClick={handleResetChanges}
              className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-1"
              title="Descartar alterações"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Descartar</span>
            </button>
            <button
              onClick={handleSaveTechnicians}
              disabled={saveTechniciansMutation.isPending}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {saveTechniciansMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>Salvar</span>
            </button>
          </div>
        )}
      </div>

      {/* Indicador de alterações */}
      {hasChanges && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Você tem alterações não salvas.</strong> Clique em "Salvar"
            para aplicar as mudanças.
          </p>
        </div>
      )}

      {/* Formulário para adicionar técnico */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adicionar Novo Técnico
        </label>

        <div className="bg-yellow-50 p-3 rounded-lg mb-3">
          <p className="text-xs text-yellow-700">
            <strong>Como funciona:</strong> Adicione ou remova técnicos da lista
            abaixo. As alterações ficam temporárias até você clicar em "Salvar"
            para enviar para o servidor.
          </p>
        </div>

        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Ex: João Silva"
              value={newTechnician}
              onChange={(e) => setNewTechnician(e.target.value)}
              onKeyPress={handleKeyPress}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm"
            />
          </div>
          <button
            onClick={handleAddTechnician}
            disabled={!newTechnician.trim()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Adicionar</span>
          </button>
        </div>
      </div>

      {/* Lista de técnicos */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Lista de Técnicos (Local)
        </h3>

        {isLoadingTechnicians ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-500">Carregando técnicos...</span>
          </div>
        ) : localTechnicians.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum técnico na lista</p>
            <p className="text-sm text-gray-400 mt-1">
              Adicione técnicos usando o formulário acima
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {localTechnicians.map((technician, index) => (
              <div
                key={`${technician}-${index}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-red-100 p-2 rounded-full">
                    <User className="h-4 w-4 text-red-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {technician}
                  </span>
                </div>

                <button
                  onClick={() => handleRemoveTechnician(technician)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                  title={`Remover ${technician}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TechniciansManager;
