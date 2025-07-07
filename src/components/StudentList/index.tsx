// interface Props

// export const StudentList = () => {
//   return (
//     <div className="space-y-4">
//       {filteredStudents?.length === 0 ? (
//         <div className="text-center py-8">
//           <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//           <p className="text-gray-500">
//             {searchTerm ? "Nenhum aluno encontrado" : "Nenhum aluno cadastrado"}
//           </p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full table-auto">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Nome
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Idade
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Peso
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Kyu
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Dan
//                 </th>
//                 <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Categoria
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredStudents?.map((student) => (
//                 <tr key={student.id} className="hover:bg-gray-50">
//                   <td className="px-4 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="bg-red-100 p-2 rounded-full mr-3">
//                         <User className="h-4 w-4 text-red-600" />
//                       </div>
//                       <div className="text-sm font-medium text-gray-900">
//                         {student.nome}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {student.idade} anos
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {student.peso}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap">
//                     {student.kyu ? (
//                       <span
//                         className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                           student.kyu && getKyuColor(student.kyu)
//                         }`}
//                       >
//                         {student.kyu}
//                       </span>
//                     ) : (
//                       <span className="text-gray-400 text-sm">-</span>
//                     )}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap">
//                     {student.dan ? (
//                       <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-black text-white">
//                         {student.dan}
//                       </span>
//                     ) : (
//                       <span className="text-gray-400 text-sm">-</span>
//                     )}
//                   </td>
//                   <td className="px-4 py-4 whitespace-nowrap">
//                     <span
//                       className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
//                         student.categoria
//                       )}`}
//                     >
//                       Cat. {student.categoria}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };
