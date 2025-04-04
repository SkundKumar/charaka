"use client"

import { useState } from "react"
import {
  FileText,
  Users,
  Calendar,
  Settings,
  LogOut,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Home,
  PlusCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { DashboardLayout } from "@/components/dashboard/layout/dashboard-layout"

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("patients")

  // Mock data
  const doctor = {
    name: "Dr. Sarah Johnson",
    id: "DOC-5678-1234",
    specialty: "General Physician",
    hospital: "City General Hospital",
    email: "sarah.johnson@cityhospital.com",
    phone: "+91 9876543210",
    photo: "/placeholder.svg?height=40&width=40",
  }

  const patients = [
    {
      id: 1,
      name: "John Doe",
      age: 32,
      gender: "Male",
      lastVisit: "2023-06-10",
      condition: "Hypertension",
      status: "stable",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 45,
      gender: "Female",
      lastVisit: "2023-06-05",
      condition: "Diabetes Type 2",
      status: "improving",
    },
    {
      id: 3,
      name: "Robert Johnson",
      age: 28,
      gender: "Male",
      lastVisit: "2023-06-15",
      condition: "Asthma",
      status: "stable",
    },
    {
      id: 4,
      name: "Emily Davis",
      age: 52,
      gender: "Female",
      lastVisit: "2023-06-12",
      condition: "Arthritis",
      status: "worsening",
    },
  ]

  const accessRequests = [
    {
      id: 1,
      patientName: "Michael Brown",
      patientId: "HLTH-9876-5432",
      requestedOn: "2023-06-15",
      status: "pending",
    },
    {
      id: 2,
      patientName: "Sarah Wilson",
      patientId: "HLTH-8765-4321",
      requestedOn: "2023-06-14",
      status: "pending",
    },
  ]

  const appointments = [
    {
      id: 1,
      patientName: "John Doe",
      patientId: "HLTH-1234-5678",
      date: "2023-06-25",
      time: "10:00 AM",
      status: "upcoming",
      type: "Follow-up",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      patientId: "HLTH-2345-6789",
      date: "2023-06-25",
      time: "11:30 AM",
      status: "upcoming",
      type: "Consultation",
    },
    {
      id: 3,
      patientName: "Robert Johnson",
      patientId: "HLTH-3456-7890",
      date: "2023-06-26",
      time: "09:15 AM",
      status: "upcoming",
      type: "Check-up",
    },
  ]

  const handleViewPatient = (id) => {
    toast.success(`Viewing patient ${id}`)
  }

  const handleApproveAccess = (id) => {
    toast.success("Access request approved")
  }

  const handleRejectAccess = (id) => {
    toast.success("Access request rejected")
  }

  const sidebarItems = [
    {
      title: "Dashboard",
      href: "/dashboard/doctor",
      icon: <Home className="h-4 w-4" />,
    },
    {
      title: "Patients",
      href: "/dashboard/doctor/patients",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "Appointments",
      href: "/dashboard/doctor/appointments",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "Medical Records",
      href: "/dashboard/doctor/records",
      icon: <FileText className="h-4 w-4" />,
    },
  ]

  const sidebarFooterItems = [
    {
      title: "Settings",
      href: "/dashboard/doctor/settings",
      icon: <Settings className="h-4 w-4" />,
    },
    {
      title: "Logout",
      href: "/login",
      icon: <LogOut className="h-4 w-4" />,
    },
  ]

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      footerItems={sidebarFooterItems}
      title="Doctor Dashboard"
      user={doctor}
      notifications={2}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Today's Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <div className="text-sm text-gray-600 mt-1">Scheduled for today</div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Schedule
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Access Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <div className="text-sm text-gray-600 mt-1">Pending requests</div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => setActiveTab("records")}>
              Review Requests
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <div className="text-sm text-gray-600 mt-1">Under your care</div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => setActiveTab("patients")}>
              View All Patients
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="patients" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="records">Access Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="patients">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>My Patients</CardTitle>
                  <CardDescription>Manage and view your patients' information</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      placeholder="Search patients..."
                      className="pl-9 border border-gray-300 rounded-md h-10 w-full text-gray-900 placeholder:text-gray-500"
                    />
                  </div>
                  <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Patient
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Age/Gender</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Condition</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Last Visit</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient) => (
                      <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">{patient.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {patient.age} / {patient.gender}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{patient.condition}</td>
                        <td className="py-3 px-4">
                          <Badge
                            className={`
                            ${
                              patient.status === "stable"
                                ? "bg-green-100 text-green-600"
                                : patient.status === "improving"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-red-100 text-red-600"
                            }
                          `}
                          >
                            {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{patient.lastVisit}</td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8"
                            onClick={() => handleViewPatient(patient.id)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled appointments for the next few days</CardDescription>
                </div>
                <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">{appointment.patientName}</h3>
                          <p className="text-xs text-gray-600">ID: {appointment.patientId}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            {appointment.date}, {appointment.time} • {appointment.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8">
                          Reschedule
                        </Button>
                        <Button size="sm" className="h-8 bg-sky-600 hover:bg-sky-700 text-white">
                          Start Session
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle>Access Requests</CardTitle>
              <CardDescription>Patients requesting access to their medical records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Pending Requests</h3>
                  <div className="space-y-4">
                    {accessRequests.map((request) => (
                      <div key={request.id} className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <h4 className="text-sm font-medium">{request.patientName}</h4>
                            <p className="text-xs text-gray-600">ID: {request.patientId}</p>
                            <p className="text-xs text-amber-600 mt-1">Requested on {request.requestedOn}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-red-300 bg-red-50 text-red-600 hover:bg-red-100"
                              onClick={() => handleRejectAccess(request.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              className="h-8 bg-sky-600 hover:bg-sky-700 text-white"
                              onClick={() => handleApproveAccess(request.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

