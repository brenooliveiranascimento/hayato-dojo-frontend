import { useQuery } from "@tanstack/react-query";
import { getDojoWhatsAppMessages } from "../../services/students.service";
import { useAuthStore } from "../../store/auth.store";
import { Loader2, MessageCircle, Users } from "lucide-react";
import { toast } from "react-toastify";

export default function DojoWhatsAppList() {
  const { dojo } = useAuthStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dojo-whatsapp-messages"],
    queryFn: getDojoWhatsAppMessages,
    enabled: dojo?.id === 6,
  });

  if (dojo?.id !== 6) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-red-600 mr-2" />
          <span className="text-gray-600">
            Carregando mensagens dos dojos...
          </span>
        </div>
      </div>
    );
  }

  if (isError) {
    toast.error("Erro ao carregar mensagens dos dojos");
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
        <div className="text-center">
          <p className="text-red-600">Erro ao carregar mensagens</p>
          <p className="text-sm text-gray-500 mt-1">{error?.message}</p>
        </div>
      </div>
    );
  }

  if (!data || data.dojos.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
        <div className="text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Nenhum dojo com atletas cadastrados</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <MessageCircle className="h-6 w-6 text-red-600 mr-2" />
          Mensagens WhatsApp por Dojo
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Total de {data.totais.alunos} atletas em {data.totais.dojosComAlunos}{" "}
          dojos
        </p>
      </div>

      <div className="space-y-4">
        {data.dojos.map((dojo) => (
          <div
            key={dojo.nome}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg">
                  {dojo.nome}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  <Users className="h-4 w-4 inline mr-1" />
                  {dojo.totalAlunos} atleta(s) cadastrado(s)
                </p>
              </div>

              <div className="flex gap-2">
                <a
                  href={dojo.links.whatsappApi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Enviar WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Preview da mensagem (opcional - você pode remover se não quiser) */}
            <details className="mt-3">
              <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                Ver prévia da mensagem
              </summary>
              <div className="mt-2 p-3 bg-gray-50 rounded-md">
                <pre className="text-xs text-gray-600 whitespace-pre-wrap font-sans">
                  {dojo.mensagem}
                </pre>
              </div>
            </details>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          As mensagens serão enviadas com as informações atualizadas dos atletas
          de cada dojo
        </p>
      </div>
    </div>
  );
}
