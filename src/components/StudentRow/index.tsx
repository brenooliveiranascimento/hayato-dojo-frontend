import { useState, type FC } from "react";
import type { Student } from "../ManageStudents";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudent, updateStudent } from "../../services/students.service";
import { Edit2, Loader2, Save, Trash2, User, X } from "lucide-react";

interface Props {
  student: Student;
}

export const StudentRow: FC<Props> = ({ student }) => {
  const queryClient = useQueryClient();

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<number | null>(null);

  const updateMutation = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alunos"],
      });
      setEditingStudent(null);
    },
    mutationFn: (student: Student) =>
      updateStudent({
        id: student.id,
        nome: student.nome,
        idade: student.idade,
        peso: student.peso,
        kyu: student.kyu,
        categoria: student.categoria,
        dan: student.dan,
        categoriaKata: student.categoriaKata,
      }),
    onError: () => {},
  });

  const deleteMutation = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alunos"],
      });
      setDeletingStudent(null);
    },
    mutationFn: (studentId: number) => deleteStudent(studentId),
  });

  const handleEdit = () => {
    setEditingStudent(student);
  };

  const handleSaveEdit = () => {
    if (editingStudent) {
      updateMutation.mutate(editingStudent);
    }
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const handleDelete = (studentId: number) => {
    if (window.confirm("Tem certeza que deseja excluir este atleta?")) {
      setDeletingStudent(studentId);
      deleteMutation.mutate(studentId);
    }
  };

  const maxNameLength = 15;

  const getKyuColor = (kyu: string) => {
    if (Number(kyu) === 1) return "bg-gray-100 text-gray-800";
    return "bg-gray-100 text-gray-800";
  };

  const displayName =
    student.nome.length > maxNameLength
      ? student.nome.slice(0, maxNameLength) + "..."
      : student.nome;

  return (
    <tr key={student.id} className="hover:bg-gray-50">
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="bg-red-100 p-2 rounded-full mr-3">
            <User className="h-4 w-4 text-red-600" />
          </div>
          <div className="text-sm font-medium text-gray-900">
            {editingStudent?.id === student.id ? (
              <input
                type="text"
                value={editingStudent.nome}
                onChange={(e) =>
                  setEditingStudent({
                    ...editingStudent,
                    nome: e.target.value,
                  })
                }
                className="text-sm border border-gray-300 rounded px-2 py-1 w-full"
              />
            ) : (
              <>{displayName}</>
            )}
          </div>
        </div>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
        {editingStudent?.id === student.id ? (
          <input
            type="number"
            value={editingStudent.idade}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) return;
              setEditingStudent({
                ...editingStudent,
                idade: parseInt(e.target.value) || 0,
              });
            }}
            className="text-sm border border-gray-300 rounded px-2 py-1 w-16"
          />
        ) : (
          `${student.idade} anos`
        )}
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
        {editingStudent?.id === student.id ? (
          <input
            type="text"
            value={editingStudent.peso}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) return;
              setEditingStudent({
                ...editingStudent,
                peso: e.target.value,
              });
            }}
            className="text-sm border border-gray-300 rounded px-2 py-1 w-20"
          />
        ) : (
          student.peso
        )}
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        {editingStudent?.id === student.id ? (
          <input
            type="text"
            value={editingStudent.kyu}
            disabled={Boolean(editingStudent.dan)}
            placeholder={editingStudent.dan ? "-----" : "Dan"}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) return;
              setEditingStudent({
                ...editingStudent,
                kyu: e.target.value,
              });
            }}
            className="text-sm border border-gray-300 rounded px-2 py-1 w-20"
          />
        ) : student.kyu ? (
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              student.kyu && getKyuColor(student.kyu)
            }`}
          >
            {student.kyu}
          </span>
        ) : (
          <span className="text-gray-400 text-sm">-</span>
        )}
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        {editingStudent?.id === student.id ? (
          <input
            type="number"
            value={editingStudent.dan || ""}
            disabled={Boolean(editingStudent.kyu)}
            placeholder={editingStudent.kyu ? "-----" : "Kyu"}
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                dan: parseInt(e.target.value) || undefined,
              })
            }
            className="text-sm border border-gray-300 rounded px-2 py-1 w-16"
          />
        ) : student.dan ? (
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-black text-white">
            {student.dan}
          </span>
        ) : (
          <span className="text-gray-400 text-sm">-</span>
        )}
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        {editingStudent?.id === student.id ? (
          <input
            type="number"
            value={editingStudent.categoria}
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                categoria: parseInt(e.target.value) || 0,
              })
            }
            className="text-sm border border-gray-300 rounded px-2 py-1 w-16"
          />
        ) : (
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800`}
          >
            Cat. {student.categoria}
          </span>
        )}
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        {editingStudent?.id === student.id ? (
          <input
            type="number"
            value={editingStudent.categoriaKata}
            onChange={(e) =>
              setEditingStudent({
                ...editingStudent,
                categoriaKata: parseInt(e.target.value) || 0,
              })
            }
            className="text-sm border border-gray-300 rounded px-2 py-1 w-16"
          />
        ) : (
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800`}
          >
            Cat: {student.categoriaKata}
          </span>
        )}
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          {editingStudent?.id === student.id ? (
            <>
              <button
                onClick={handleSaveEdit}
                disabled={updateMutation.isPending}
                className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-full transition-colors disabled:opacity-50"
                title="Salvar alterações"
              >
                {updateMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-full transition-colors"
                title="Cancelar edição"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleEdit()}
                className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
                title="Editar atleta"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(student.id)}
                disabled={deletingStudent === student.id}
                className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                title="Excluir atleta"
              >
                {deletingStudent === student.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};
