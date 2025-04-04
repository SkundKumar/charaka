"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/aceternity/button"
import { cn } from "@/lib/utils"

interface UserData {
  name: string
  dob: string
  gender: string
  address: string
  phone: string
  email: string
  photo?: string
}

interface ConfirmationCardProps {
  userData: UserData
  onConfirm: () => void
  onCancel: () => void
  className?: string
}

export const ConfirmationCard = ({ userData, onConfirm, onCancel, className }: ConfirmationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden max-w-md w-full", className)}
    >
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-4">
        <h2 className="text-xl font-bold text-white">Confirm Your Details</h2>
        <p className="text-sky-100 text-sm">Please verify that the information fetched from your Aadhar is correct.</p>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          {userData.photo ? (
            <img
              src={userData.photo || "/placeholder.svg"}
              alt={userData.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-sky-100"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-xl font-bold">
              {userData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{userData.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {userData.gender} • {userData.dob}
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</h4>
            <p className="text-gray-900 dark:text-white">{userData.address}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</h4>
              <p className="text-gray-900 dark:text-white">{userData.phone}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</h4>
              <p className="text-gray-900 dark:text-white">{userData.email || "Not provided"}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" className="flex-1" onClick={onCancel}>
            Go Back
          </Button>
          <Button variant="pill" className="flex-1 bg-sky-600 hover:bg-sky-700" onClick={onConfirm}>
            Confirm & Continue
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

