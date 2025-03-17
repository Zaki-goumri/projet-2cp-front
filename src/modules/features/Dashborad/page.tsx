// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { MoreHorizontal, Plus } from "lucide-react"

// export default function Dashboard() {
//   return (
//     <div className="flex flex-col min-h-screen bg-[#f8fcf8]">
//       <div className="p-6 space-y-6">
//         <h1 className="text-3xl font-semibold text-primary">Main Dashboard</h1>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
//           <Card className="!border-none !shadow-sm !bg-white">
//             <CardContent className="!p-6">
//               <div className="flex items-center space-x-4">
//                 <div className="p-2 bg-[#e8f5e9] rounded-md">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="text-primary"
//                   >
//                     <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
//                     <line x1="16" x2="16" y1="2" y2="6" />
//                     <line x1="8" x2="8" y1="2" y2="6" />
//                     <line x1="3" x2="21" y1="10" y2="10" />
//                     <path d="m9 16 2 2 4-4" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-black/40">Applied</p>
//                   <h2 className="text-3xl font-bold text-primary">64</h2>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="!border-none !shadow-sm !bg-white">
//             <CardContent className="p-6">
//               <div className="flex items-center space-x-4">
//                 <div className="p-2 bg-[#e8f5e9] rounded-md">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="text-primary"
//                   >
//                     <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
//                     <path d="m9 12 2 2 4-4" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-black/40">Acceptance</p>
//                   <h2 className="text-3xl font-bold text-primary">62</h2>
//                   <p className="text-xs text-primary">+2% since last month</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="!border-none !shadow-sm !bg-white">
//             <CardContent className="p-6">
//               <div className="flex items-center space-x-4">
//                 <div className="p-2 bg-[#ffebee] rounded-md">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="text-[#f44336]"
//                   >
//                     <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
//                     <path d="m15 9-6 6" />
//                     <path d="m9 9 6 6" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-black/40">Refunds</p>
//                   <h2 className="text-3xl font-bold text-[#f44336]">10</h2>
//                   <p className="text-xs text-[#f44336]">-7% since last month</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="!border-none !shadow-sm !bg-white">
//             <CardContent className="p-6">
//               <div className="flex items-center space-x-4">
//                 <div className="p-2 bg-[#e8f5e9] rounded-md">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="text-primary"
//                   >
//                     <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
//                     <line x1="16" x2="16" y1="2" y2="6" />
//                     <line x1="8" x2="8" y1="2" y2="6" />
//                     <line x1="3" x2="21" y1="10" y2="10" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-black/40">Total Applications</p>
//                   <h2 className="text-3xl font-bold text-primary">2935</h2>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Charts Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <Card className="border-none shadow-sm !bg-white">
//             <CardHeader className="!flex !flex-row !items-center !justify-between !pb-2">
//               <CardTitle className="!text-lg !font-medium !text-primary">Acceptance</CardTitle>
//               <Avatar className="h-8 w-8">
//                 <AvatarImage src="/placeholder-user.jpg" />
//                 <AvatarFallback>U</AvatarFallback>
//               </Avatar>
//             </CardHeader>
//             <CardContent className="pt-0">
//               <div className="h-[200px] w-full relative">
//                 {/* Line Chart Placeholder */}
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <svg viewBox="0 0 400 200" width="100%" height="100%" className="text-primary">
//                     <path
//                       d="M0,150 C50,120 70,180 100,140 C130,100 170,110 200,130 C230,150 270,90 300,70 C330,50 350,90 400,120"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                     />
//                     <path
//                       d="M0,150 C50,120 70,180 100,140 C130,100 170,110 200,130 C230,150 270,90 300,70 C330,50 350,90 400,120 L400,200 L0,200 Z"
//                       fill="rgba(76, 175, 80, 0.1)"
//                       stroke="none"
//                     />
//                     {/* Highlight area */}
//                     <rect x="280" y="0" width="40" height="200" fill="rgba(76, 175, 80, 0.1)" />
//                   </svg>
//                 </div>
//                 <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-black/40 px-2">
//                   <span>Jan</span>
//                   <span>Feb</span>
//                   <span>Mar</span>
//                   <span>Apr</span>
//                 </div>
//                 <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-black/40 py-2">
//                   <span>8</span>
//                   <span>6</span>
//                   <span>4</span>
//                   <span>2</span>
//                   <span>0</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-none shadow-sm !bg-white">
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <div>
//                 <CardTitle className="text-lg font-medium">Activity</CardTitle>
//                 <p className="text-sm text-primary">Average applications</p>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src="/placeholder-user.jpg" />
//                   <AvatarFallback>U</AvatarFallback>
//                 </Avatar>
//                 <Select defaultValue="weekly">
//                   <SelectTrigger className="w-[100px] h-8 text-xs">
//                     <SelectValue placeholder="Weekly" />
//                   </SelectTrigger>
//                   <SelectContent className="!bg-white">
//                     <SelectItem value="daily">Daily</SelectItem>
//                     <SelectItem value="weekly">Weekly</SelectItem>
//                     <SelectItem value="monthly">Monthly</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </CardHeader>
//             <CardContent className="pt-0">
//               <div className="h-[200px] w-full relative">
//                 {/* Bar Chart Placeholder */}
//                 <div className="absolute inset-0 flex items-end justify-between px-4">
//                   <div className="flex flex-col items-center">
//                     <div className="w-8 bg-[#e1bee7] h-[100px] rounded-t-sm"></div>
//                     <span className="text-xs mt-2 text-muted-foreground">MON</span>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     <div className="w-8 bg-[#e1bee7] h-[50px] rounded-t-sm"></div>
//                     <span className="text-xs mt-2 text-muted-foreground">TUE</span>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     <div className="w-8 bg-[#e1bee7] h-[120px] rounded-t-sm"></div>
//                     <span className="text-xs mt-2 text-muted-foreground">WED</span>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     <div className="w-8 bg-[#e1bee7] h-[70px] rounded-t-sm"></div>
//                     <span className="text-xs mt-2 text-muted-foreground">THU</span>
//                   </div>
//                   <div className="flex flex-col items-center relative">
//                     <div className="w-8 bg-primary h-[150px] rounded-t-sm"></div>
//                     <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-white px-2 py-1 rounded text-xs">
//                       28
//                     </div>
//                     <span className="text-xs mt-2 text-muted-foreground">FRI</span>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     <div className="w-8 bg-[#e1bee7] h-[40px] rounded-t-sm"></div>
//                     <span className="text-xs mt-2 text-muted-foreground">SAT</span>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     <div className="w-8 bg-[#e1bee7] h-[90px] rounded-t-sm"></div>
//                     <span className="text-xs mt-2 text-muted-foreground">SUN</span>
//                   </div>
//                 </div>
//                 <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-muted-foreground py-2">
//                   <span>30</span>
//                   <span>20</span>
//                   <span>10</span>
//                   <span>0</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Bottom Row */}
//         {/* Pie Chart */}
//         <Card className="border-none shadow-sm">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-lg font-medium">Your Pic</CardTitle>
//             <Select defaultValue="monthly">
//               <SelectTrigger className="w-[100px] h-8 text-xs">
//                 <SelectValue placeholder="Monthly" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="weekly">Weekly</SelectItem>
//                 <SelectItem value="monthly">Monthly</SelectItem>
//                 <SelectItem value="yearly">Yearly</SelectItem>
//               </SelectContent>
//             </Select>
//           </CardHeader>
//           <CardContent className="pt-0 flex flex-col items-center">
//             <div className="h-[150px] w-[150px] relative">
//               {/* Pie Chart Placeholder */}
//               <svg viewBox="0 0 100 100" width="100%" height="100%">
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="40"
//                   fill="transparent"
//                   stroke="#f44336"
//                   strokeWidth="20"
//                   strokeDasharray="25 100"
//                 />
//                 <circle
//                   cx="50"
//                   cy="50"
//                   r="40"
//                   fill="transparent"
//                   stroke="currentColor"
//                   strokeWidth="20"
//                   strokeDasharray="75 100"
//                   strokeDashoffset="-25"
//                 />
//               </svg>
//               <Avatar className="h-12 w-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                 <AvatarImage src="/placeholder-user.jpg" />
//                 <AvatarFallback>Pic</AvatarFallback>
//               </Avatar>
//             </div>
//             <div className="flex justify-center space-x-8 mt-4">
//               <div className="flex items-center">
//                 <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
//                 <div>
//                   <p className="text-xs text-muted-foreground">Acceptance</p>
//                   <p className="text-sm font-medium text-primary">83%</p>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-3 h-3 rounded-full bg-[#f44336] mr-2"></div>
//                 <div>
//                   <p className="text-xs text-muted-foreground">Refunds</p>
//                   <p className="text-sm font-medium text-[#f44336]">25%</p>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Teams */}
//         <Card className="border-none shadow-sm">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-lg font-medium text-primary">Teams</CardTitle>
//             <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
//               <Plus className="h-4 w-4" />
//             </Button>
//           </CardHeader>
//           <CardContent className="pt-0">
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <Avatar className="h-10 w-10 bg-slate-100">
//                     <AvatarFallback>Pic</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <p className="text-sm font-medium text-primary">The Hackers</p>
//                     <p className="text-xs text-muted-foreground">5 Members</p>
//                   </div>
//                 </div>
//                 <Button variant="ghost" size="icon">
//                   <MoreHorizontal className="h-4 w-4" />
//                 </Button>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <Avatar className="h-10 w-10 bg-slate-100">
//                     <AvatarFallback>Pic</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <p className="text-sm font-medium text-primary">Beta Pro</p>
//                     <p className="text-xs text-muted-foreground">3 Members</p>
//                   </div>
//                 </div>
//                 <Button variant="ghost" size="icon">
//                   <MoreHorizontal className="h-4 w-4" />
//                 </Button>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <Avatar className="h-10 w-10 bg-slate-100">
//                     <AvatarFallback>Pic</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <p className="text-sm font-medium text-primary">Creators</p>
//                     <p className="text-xs text-muted-foreground">7 Members</p>
//                   </div>
//                 </div>
//                 <Button variant="ghost" size="icon">
//                   <MoreHorizontal className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
