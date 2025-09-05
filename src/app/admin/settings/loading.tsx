// import { Skeleton } from "@/components/ui/skeleton";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";

// export default function SettingsLoading() {
//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <Skeleton className="h-8 w-48" />
//           <Skeleton className="h-4 w-64 mt-2" />
//         </div>
//         <Skeleton className="h-10 w-32" />
//       </div>

//       <div className="space-y-6">
//         <Skeleton className="h-10 w-full" />

//         <div className="space-y-6">
//           {Array.from({ length: 3 }).map((_, i) => (
//             <Card key={i}>
//               <CardHeader>
//                 <Skeleton className="h-6 w-48" />
//                 <Skeleton className="h-4 w-64" />
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Skeleton className="h-4 w-24" />
//                     <Skeleton className="h-10 w-full" />
//                   </div>
//                   <div className="space-y-2">
//                     <Skeleton className="h-4 w-24" />
//                     <Skeleton className="h-10 w-full" />
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-32" />
//                   <Skeleton className="h-20 w-full" />
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

export default function SettingsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-[#9b59b6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Settings...</p>
      </div>
    </div>
  );
}
