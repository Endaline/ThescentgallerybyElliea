// import { Skeleton } from "@/components/ui/skeleton";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";

// export default function AnalyticsLoading() {
//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <Skeleton className="h-8 w-48" />
//           <Skeleton className="h-4 w-64 mt-2" />
//         </div>
//         <div className="flex items-center space-x-3">
//           <Skeleton className="h-10 w-48" />
//           <Skeleton className="h-10 w-24" />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {Array.from({ length: 4 }).map((_, i) => (
//           <Card key={i}>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-24" />
//                   <Skeleton className="h-8 w-20" />
//                 </div>
//                 <Skeleton className="h-12 w-12 rounded-lg" />
//               </div>
//               <Skeleton className="h-3 w-32 mt-2" />
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {Array.from({ length: 4 }).map((_, i) => (
//           <Card key={i}>
//             <CardHeader>
//               <Skeleton className="h-6 w-32" />
//               <Skeleton className="h-4 w-48" />
//             </CardHeader>
//             <CardContent>
//               <Skeleton className="h-[300px] w-full" />
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
export default function AnalyticsLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-[#A76BCF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading admin dashboard...</p>
      </div>
    </div>
  );
}
